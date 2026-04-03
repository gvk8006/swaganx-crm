import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, phone, address, password, referralCode } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Name, email, and password required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }

    const bcrypt = require('bcryptjs');
    const passwordHash = await bcrypt.hash(password, 10);
    const refCode = name.substring(0, 4).toUpperCase() + Math.floor(Math.random() * 9000 + 1000);

    let referredBy = null;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({ where: { referralCode } });
      if (referrer) referredBy = referrer.id;
    }

    const user = await prisma.user.create({
      data: {
        name, email, phone, address, passwordHash,
        role: 'user',
        status: 'active',
        kycStatus: 'pending',
        balance: 0,
        referralCode: refCode,
        referredBy,
      },
    });

    // Create welcome notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Welcome to SwaganX!',
        message: 'Your account has been created successfully. Complete KYC to start trading.',
        type: 'success',
      },
    });

    return res.status(201).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
