import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  return requireAdmin(async (req, res) => {
    try {
      const [
        totalUsers,
        activeUsers,
        pendingKYC,
        totalDeposits,
        totalWithdrawals,
        pendingDeposits,
        pendingWithdrawals,
      ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { status: 'active' } }),
        prisma.user.count({ where: { kycStatus: 'pending' } }),
        prisma.deposit.aggregate({ where: { status: 'completed' }, _sum: { amount: true } }),
        prisma.withdrawal.aggregate({ where: { status: 'completed' }, _sum: { amount: true } }),
        prisma.deposit.count({ where: { status: 'pending' } }),
        prisma.withdrawal.count({ where: { status: 'pending' } }),
      ]);

      // Recent users
      const recentUsers = await prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, status: true, kycStatus: true, balance: true, createdAt: true },
      });

      // Pending actions
      const pendingActions = [
        ...(await prisma.deposit.findMany({
          where: { status: 'pending' }, take: 3,
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
        })).map(d => ({ type: 'Deposit', user: d.user.name, amount: `$${d.amount}`, date: d.createdAt.toISOString().split('T')[0], priority: 'Medium' })),
        ...(await prisma.withdrawal.findMany({
          where: { status: 'pending' }, take: 3,
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
        })).map(w => ({ type: 'Withdrawal', user: w.user.name, amount: `$${w.amount}`, date: w.createdAt.toISOString().split('T')[0], priority: 'High' })),
        ...(await prisma.kYCDocument.findMany({
          where: { status: 'pending' }, take: 2,
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
        })).map(k => ({ type: 'KYC', user: k.user.name, date: k.createdAt.toISOString().split('T')[0], priority: 'Medium' })),
      ];

      const netFlow = (totalDeposits._sum.amount || 0) - (totalWithdrawals._sum.amount || 0);

      return res.json({
        success: true,
        stats: {
          totalUsers,
          activeUsers,
          pendingKYC,
          totalDeposited: totalDeposits._sum.amount || 0,
          totalWithdrawn: totalWithdrawals._sum.amount || 0,
          pendingDeposits,
          pendingWithdrawals,
          netFlow,
        },
        recentUsers,
        pendingActions: pendingActions.sort((a, b) => (b.priority === 'High' ? 1 : 0) - (a.priority === 'High' ? 1 : 0)),
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  })(req, res);
}
