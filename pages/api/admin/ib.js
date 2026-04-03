import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  // GET — list all IB commissions
  if (method === 'GET') {
    return requireAdmin(async (req, res) => {
      try {
        const ibs = await prisma.user.findMany({
          where: { referralCode: { not: null } },
          include: {
            _count: { select: { referrals: true } },
            ibCommissions: { select: { lots: true, amount: true, createdAt: true } },
          },
        });

        const ibData = ibs.map(ib => {
          const totalLots = ib.ibCommissions.reduce((s, c) => s + c.lots, 0);
          const totalEarned = ib.ibCommissions.reduce((s, c) => s + c.amount, 0);
          const rate = ib.ibCommissions.length > 0 ? ib.ibCommissions[0].rate : 0;
          const activeReferrals = ib.referrals.filter(r => r.status === 'active').length;
          const level = totalLots > 500 ? 'Platinum' : totalLots > 200 ? 'Gold' : totalLots > 50 ? 'Silver' : totalLots > 10 ? 'Bronze' : 'Standard';
          return {
            id: ib.id,
            name: ib.name,
            email: ib.email,
            referrals: ib._count.referrals,
            activeReferrals,
            commission: `$${rate}/lot`,
            totalEarned: `$${totalEarned.toFixed(2)}`,
            lots: totalLots.toFixed(1),
            level,
            status: ib.status,
          };
        }).filter(ib => ib.referrals > 0);

        return res.json({ success: true, ibs: ibData });
      } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
    })(req, res);
  }

  // PATCH — update IB level or commission
  if (method === 'PATCH') {
    return requireAdmin(async (req, res) => {
      // Placeholder for IB management updates
      return res.json({ success: true });
    })(req, res);
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
