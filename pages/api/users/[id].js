import { requireAuth, requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/users/me — current user profile
// GET /api/users?search=&page=&limit= — admin list all users
// PATCH /api/users/[id]/status — change user status
// PATCH /api/users/[id]/kyc — change KYC status

async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true, name: true, email: true, phone: true, address: true,
        role: true, status: true, kycStatus: true, balance: true,
        referralCode: true, createdAt: true,
        accounts: { select: { id: true, login: true, name: true, accountType: true, group: true, currency: true, leverage: true, status: true, createdAt: true } },
        _count: { select: { referrals: true, deposits: true, withdrawals: true } },
      },
    });
    return res.json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

async function listUsers(req, res) {
  try {
    const { search, status, kyc, page = 1, limit = 50 } = req.query;
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }
    if (status && status !== 'all') where.status = status;
    if (kyc && kyc !== 'all') where.kycStatus = kyc;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where, skip, take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, name: true, email: true, phone: true,
          role: true, status: true, kycStatus: true, balance: true,
          referralCode: true, createdAt: true,
          accounts: { select: { login: true, accountType: true, status: true } },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return res.json({ success: true, users, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export default async function handler(req, res) {
  const { method } = req;
  const { query } = req;

  // POST /api/users/me — get current user
  if (query.action === 'me') {
    return requireAuth(getMe)(req, res);
  }

  // Admin routes
  if (method === 'GET') {
    return requireAdmin(listUsers)(req, res);
  }

  if (method === 'PATCH') {
    return requireAdmin(async (req, res) => {
      const { id } = query;
      const { status, kycStatus, balance } = req.body;
      try {
        const data = {};
        if (status) data.status = status;
        if (kycStatus) data.kycStatus = kycStatus;
        if (balance !== undefined) data.balance = parseFloat(balance);
        const user = await prisma.user.update({ where: { id }, data });
        return res.json({ success: true, user });
      } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
    })(req, res);
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
