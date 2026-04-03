import { requireAuth, requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/withdrawals — admin list
// POST /api/withdrawals — user creates request
// PATCH /api/withdrawals?id= — approve/reject

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    return requireAdmin(async (req, res) => {
      try {
        const { status, userId, page = 1, limit = 50 } = req.query;
        const where = {};
        if (status && status !== 'all') where.status = status;
        if (userId) where.userId = userId;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [withdrawals, total] = await Promise.all([
          prisma.withdrawal.findMany({
            where, skip, take: parseInt(limit),
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true, email: true } } },
          }),
          prisma.withdrawal.count({ where }),
        ]);

        const pendingAmount = await prisma.withdrawal.aggregate({
          where: { status: 'pending' },
          _sum: { amount: true },
        });

        return res.json({
          success: true, withdrawals, total,
          stats: { pendingAmount: pendingAmount._sum.amount || 0 },
        });
      } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
    })(req, res);
  }

  if (method === 'POST') {
    return requireAuth(async (req, res) => {
      const { amount, method, walletAddress, accountId, bankDetails } = req.body;
      if (!amount || !method) {
        return res.status(400).json({ success: false, error: 'Amount and method required' });
      }
      try {
        const user = await prisma.user.findUnique({ where: { id: req.userId } });
        if ((user?.balance || 0) < parseFloat(amount)) {
          return res.status(400).json({ success: false, error: 'Insufficient balance' });
        }

        const withdrawal = await prisma.withdrawal.create({
          data: {
            userId: req.userId,
            amount: parseFloat(amount),
            method,
            walletAddress,
            accountId,
            bankDetails: bankDetails ? JSON.stringify(bankDetails) : null,
            status: 'pending',
          },
        });

        return res.status(201).json({ success: true, withdrawal });
      } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
    })(req, res);
  }

  if (method === 'PATCH') {
    return requireAdmin(async (req, res) => {
      const { id } = req.query;
      const { status, adminNote } = req.body;
      if (!id || !status) {
        return res.status(400).json({ success: false, error: 'Withdrawal ID and status required' });
      }
      try {
        const withdrawal = await prisma.withdrawal.update({
          where: { id },
          data: { status, adminNote, processedAt: new Date() },
        });

        // If rejected, return balance to user
        if (status === 'rejected') {
          const user = await prisma.user.findUnique({ where: { id: withdrawal.userId } });
          await prisma.user.update({
            where: { id: withdrawal.userId },
            data: { balance: (user?.balance || 0) + withdrawal.amount },
          });
        }

        // If approved, deduct balance
        if (status === 'completed') {
          const user = await prisma.user.findUnique({ where: { id: withdrawal.userId } });
          await prisma.user.update({
            where: { id: withdrawal.userId },
            data: { balance: Math.max(0, (user?.balance || 0) - withdrawal.amount) },
          });
          await prisma.transaction.create({
            data: {
              userId: withdrawal.userId,
              type: 'withdrawal',
              amount: -withdrawal.amount,
              balance: Math.max(0, (user?.balance || 0) - withdrawal.amount),
              referenceId: withdrawal.id,
              description: `Withdrawal via ${withdrawal.method.replace(/_/g, ' ')}`,
            },
          });
        }

        return res.json({ success: true, withdrawal });
      } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
    })(req, res);
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
