import { requireAuth, requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/deposits — admin list all deposits
// POST /api/deposits — user creates deposit request
// PATCH /api/deposits?id= — approve/reject deposit

export default async function handler(req, res) {
  const { method, query, body } = req;

  if (method === 'GET') {
    return requireAdmin(async (req, res) => {
      try {
        const { status, userId, page = 1, limit = 50 } = req.query;
        const where = {};
        if (status && status !== 'all') where.status = status;
        if (userId) where.userId = userId;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [deposits, total] = await Promise.all([
          prisma.deposit.findMany({
            where, skip, take: parseInt(limit),
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true, email: true } } },
          }),
          prisma.deposit.count({ where }),
        ]);

        const totalAmount = await prisma.deposit.aggregate({
          where: { status: 'completed' },
          _sum: { amount: true },
        });
        const pendingAmount = await prisma.deposit.aggregate({
          where: { status: 'pending' },
          _sum: { amount: true },
        });

        return res.json({
          success: true, deposits, total,
          stats: {
            totalDeposited: totalAmount._sum.amount || 0,
            pendingAmount: pendingAmount._sum.amount || 0,
          },
        });
      } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
    })(req, res);
  }

  if (method === 'POST') {
    return requireAuth(async (req, res) => {
      const { amount, method, walletAddress, accountId, bankDetails, txHash } = req.body;
      if (!amount || !method) {
        return res.status(400).json({ success: false, error: 'Amount and method required' });
      }
      try {
        const deposit = await prisma.deposit.create({
          data: {
            userId: req.userId,
            amount: parseFloat(amount),
            method,
            walletAddress,
            accountId,
            bankDetails: bankDetails ? JSON.stringify(bankDetails) : null,
            txHash,
            status: 'pending',
          },
        });
        return res.status(201).json({ success: true, deposit });
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
        return res.status(400).json({ success: false, error: 'Deposit ID and status required' });
      }
      try {
        const deposit = await prisma.deposit.update({
          where: { id },
          data: {
            status,
            adminNote,
            processedAt: new Date(),
          },
        });

        // If approved, update user balance
        if (status === 'approved' || status === 'completed') {
          const user = await prisma.user.findUnique({ where: { id: deposit.userId } });
          await prisma.user.update({
            where: { id: deposit.userId },
            data: { balance: (user?.balance || 0) + deposit.amount },
          });
          await prisma.transaction.create({
            data: {
              userId: deposit.userId,
              type: 'deposit',
              amount: deposit.amount,
              balance: (user?.balance || 0) + deposit.amount,
              referenceId: deposit.id,
              description: `Deposit via ${deposit.method.replace(/_/g, ' ')}${adminNote ? ' — ' + adminNote : ''}`,
            },
          });
        }

        return res.json({ success: true, deposit });
      } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
    })(req, res);
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
