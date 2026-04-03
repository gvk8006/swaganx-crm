const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  await prisma.bonus.deleteMany();
  await prisma.iBCommission.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.withdrawal.deleteMany();
  await prisma.deposit.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.kYCDocument.deleteMany();
  await prisma.tradingAccount.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.forexCharge.deleteMany();
  await prisma.accountType.deleteMany();
  await prisma.systemSettings.deleteMany();
  await prisma.user.deleteMany();

  // 1. Admin user
  const adminPass = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin Boss',
      email: 'setupfx@gmail.com',
      passwordHash: adminPass,
      role: 'admin',
      status: 'active',
      kycStatus: 'approved',
      balance: 0,
      referralCode: 'ADMIN001',
    },
  });

  // 2. Demo user
  const demoPass = await bcrypt.hash('demo123', 10);
  const demoUser = await prisma.user.create({
    data: {
      name: 'Demo User',
      email: 'demo@demo.com',
      phone: '+91 98765 43210',
      address: 'Mumbai, India',
      passwordHash: demoPass,
      role: 'user',
      status: 'active',
      kycStatus: 'approved',
      balance: 7800,
      referralCode: 'DEMO2026',
    },
  });

  // 3. Regular users
  const users = [
    { name: 'Maria Garcia', email: 'maria@example.com', phone: '+34 612-345-678', role: 'user', balance: 34200, kyc: 'approved', status: 'active' },
    { name: 'John Thompson', email: 'john@example.com', phone: '+1 234-567-8901', role: 'user', balance: 12450, kyc: 'approved', status: 'active' },
    { name: 'Ahmed Hassan', email: 'ahmed@example.com', phone: '+971 50-123-4567', role: 'user', balance: 8900, kyc: 'approved', status: 'active' },
    { name: 'Emma Wilson', email: 'emma@example.com', phone: '+44 7700-123456', role: 'user', balance: 15600, kyc: 'approved', status: 'active' },
    { name: 'Sarah Kim', email: 'sarah@example.com', phone: '+82 10-1234-5678', role: 'user', balance: 0, kyc: 'pending', status: 'pending' },
    { name: 'Li Wei', email: 'liwei@example.com', phone: '+86 138-1234-5678', role: 'user', balance: 500, kyc: 'rejected', status: 'suspended' },
  ];

  const createdUsers = [];
  for (const u of users) {
    const refCode = u.name.split(' ')[0].substring(0, 4).toUpperCase() + Math.floor(Math.random() * 9000 + 1000);
    const user = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        phone: u.phone,
        passwordHash: await bcrypt.hash('password123', 10),
        role: u.role,
        status: u.status,
        kycStatus: u.kyc,
        balance: u.balance,
        referralCode: refCode,
        referredById: u.email === 'john@example.com' ? demoUser.id : null,
      },
    });
    createdUsers.push(user);
  }

  // 4. Trading accounts
  const accounts = [
    { userId: demoUser.id, login: '77730631', name: 'Real Plus', type: 'real', group: 'swaganx\\real\\plus', leverage: 100 },
    { userId: demoUser.id, login: '68175002', name: 'Real Pro', type: 'real', group: 'swaganx\\real\\pro', leverage: 500 },
    { userId: demoUser.id, login: '88123456', name: 'Demo Standard', type: 'demo', group: 'swaganx\\demo', leverage: 100 },
    { userId: createdUsers[0].id, login: '99200111', name: 'ECN Account', type: 'real', group: 'swaganx\\real\\ecn', leverage: 200 },
    { userId: createdUsers[1].id, login: '99200222', name: 'Standard', type: 'real', group: 'swaganx\\real\\standard', leverage: 100 },
  ];

  for (const a of accounts) {
    await prisma.tradingAccount.create({ data: { userId: a.userId, login: a.login, name: a.name, accountType: a.type, group: a.group, leverage: a.leverage } });
  }

  // 5. Deposits
  const deposits = [
    { userId: demoUser.id, amount: 5000, method: 'bank_transfer', status: 'completed', accountId: '77730631', date: '2026-03-22' },
    { userId: demoUser.id, amount: 10000, method: 'usdt_trc20', status: 'completed', accountId: '77730631', date: '2026-03-28' },
    { userId: createdUsers[0].id, amount: 25000, method: 'bank_transfer', status: 'completed', date: '2026-04-02' },
    { userId: createdUsers[1].id, amount: 5000, method: 'usdt_trc20', status: 'completed', date: '2026-04-02' },
    { userId: createdUsers[3].id, amount: 10000, method: 'credit_card', status: 'pending', date: '2026-04-02' },
    { userId: createdUsers[2].id, amount: 3500, method: 'btc', status: 'completed', date: '2026-04-01' },
    { userId: createdUsers[5].id, amount: 500, method: 'bank_transfer', status: 'pending', date: '2026-04-01' },
  ];

  for (const d of deposits) {
    await prisma.deposit.create({
      data: {
        userId: d.userId,
        amount: d.amount,
        method: d.method,
        status: d.status,
        accountId: d.accountId,
        createdAt: new Date(d.date + 'T10:00:00Z'),
        processedAt: d.status === 'completed' ? new Date(d.date + 'T14:00:00Z') : null,
      },
    });
    // Create transaction record
    if (d.status === 'completed') {
      const user = await prisma.user.findUnique({ where: { id: d.userId } });
      await prisma.transaction.create({
        data: {
          userId: d.userId,
          type: 'deposit',
          amount: d.amount,
          balance: (user?.balance || 0) + d.amount,
          description: `Deposit via ${d.method.replace('_', ' ')}`,
          createdAt: new Date(d.date + 'T14:00:00Z'),
        },
      });
    }
  }

  // 6. Withdrawals
  const withdrawals = [
    { userId: demoUser.id, amount: 2200, method: 'usdt_trc20', walletAddress: 'TXmK8f...3j7q', status: 'completed' },
    { userId: createdUsers[0].id, amount: 15000, method: 'usdt_trc20', walletAddress: 'TJxR4f...8k2p', status: 'pending' },
    { userId: createdUsers[1].id, amount: 5200, method: 'bank_transfer', status: 'pending' },
    { userId: createdUsers[2].id, amount: 3000, method: 'btc', walletAddress: 'bc1q...w4mn', status: 'completed' },
    { userId: createdUsers[3].id, amount: 8500, method: 'eth', walletAddress: '0x71C...9d4F', status: 'completed' },
  ];

  for (const w of withdrawals) {
    await prisma.withdrawal.create({
      data: {
        userId: w.userId,
        amount: w.amount,
        method: w.method,
        walletAddress: w.walletAddress || null,
        status: w.status,
        createdAt: new Date('2026-03-15T10:00:00Z'),
        processedAt: w.status === 'completed' ? new Date('2026-03-16T10:00:00Z') : null,
      },
    });
  }

  // 7. IB Commissions
  await prisma.iBCommission.create({
    data: {
      userId: demoUser.id,
      referredId: createdUsers[1].id,
      accountId: '99200222',
      lots: 15.5,
      rate: 2,
      amount: 31,
      level: 'Standard',
    },
  });

  // 8. Bonuses
  const bonuses = [
    { userId: createdUsers[0].id, amount: 500, type: 'Deposit Bonus', reqLots: 5, compLots: 3.2, status: 'active' },
    { userId: createdUsers[1].id, amount: 100, type: 'Welcome Bonus', reqLots: 2, compLots: 0, status: 'active' },
    { userId: createdUsers[2].id, amount: 1000, type: 'Deposit Bonus', reqLots: 10, compLots: 10, status: 'credited' },
    { userId: createdUsers[3].id, amount: 250, type: 'Loyalty Bonus', reqLots: 3, compLots: 1.5, status: 'active' },
    { userId: demoUser.id, amount: 200, type: 'Trading Bonus', reqLots: 8, compLots: 8, status: 'credited' },
  ];

  for (const b of bonuses) {
    await prisma.bonus.create({
      data: {
        userId: b.userId,
        amount: b.amount,
        bonusType: b.type,
        tradingLots: b.reqLots,
        completedLots: b.compLots,
        status: b.status,
      },
    });
  }

  // 9. Employees
  const employees = [
    { name: 'Priya Sharma', email: 'priya@swaganx.com', phone: '+91 87654 32109', role: 'Manager' },
    { name: 'Rahul Verma', email: 'rahul@swaganx.com', phone: '+91 76543 21098', role: 'Support' },
    { name: 'Anita Desai', email: 'anita@swaganx.com', phone: '+91 65432 10987', role: 'Accountant' },
    { name: 'Meera Patel', email: 'meera@swaganx.com', phone: '+91 43210 98765', role: 'Manager' },
  ];

  for (const e of employees) {
    await prisma.employee.create({
      data: { name: e.name, email: e.email, phone: e.phone, role: e.role },
    });
  }

  // 10. Support tickets
  await prisma.supportTicket.create({
    data: {
      userId: createdUsers[0].id,
      subject: 'Cannot withdraw funds',
      message: 'I have been trying to withdraw $15,000 for the past 3 days. Please help.',
      status: 'open',
      priority: 'high',
    },
  });
  await prisma.supportTicket.create({
    data: {
      userId: demoUser.id,
      subject: 'Account leverage change request',
      message: 'I would like to change my leverage from 1:100 to 1:500.',
      status: 'in_progress',
      priority: 'medium',
      adminReply: 'Your request is being processed. We will update you shortly.',
    },
  });

  // 11. KYC Documents
  await prisma.kYCDocument.createMany({
    data: [
      { userId: createdUsers[4].id, docType: 'passport', status: 'pending' },
      { userId: createdUsers[5].id, docType: 'national_id', status: 'pending' },
      { userId: createdUsers[0].id, docType: 'passport', status: 'approved', reviewedAt: new Date('2026-03-30') },
    ],
  });

  // 12. Banners
  await prisma.banner.createMany({
    data: [
      { title: 'Welcome to SwaganX', position: 'home', link: '/user/register', order: 1, isActive: true },
      { title: 'Trade with $0 Commission', position: 'home', link: '/account', order: 2, isActive: true },
      { title: 'IB Programme — Earn $6/lot', position: 'home', link: '/ib', order: 3, isActive: true },
      { title: 'Deposit Bonus — 50% Extra', position: 'dashboard', link: '/wallet', order: 1, isActive: true },
    ],
  });

  // 13. System settings
  const settings = [
    { key: 'company_name', value: 'SwaganX Technologies' },
    { key: 'support_email', value: 'support@swaganx.com' },
    { key: 'platform_url', value: 'https://swaganx.com' },
    { key: 'default_currency', value: 'USD' },
    { key: 'default_leverage', value: '100' },
    { key: 'min_deposit_bank', value: '100' },
    { key: 'min_deposit_crypto', value: '50' },
    { key: 'min_withdrawal', value: '10' },
    { key: 'ib_default_commission', value: '2' },
    { key: 'withdrawal_processing_hours', value: '24' },
    { key: 'maintenance_mode', value: 'false' },
  ];

  for (const s of settings) {
    await prisma.systemSettings.upsert({ where: { key: s.key }, update: { value: s.value }, create: { key: s.key, value: s.value } });
  }

  // 14. Forex charges
  await prisma.forexCharge.createMany({
    data: [
      { name: 'Standard Commission', type: 'commission', value: 7, valueType: 'fixed', method: 'standard' },
      { name: 'Plus Commission', type: 'commission', value: 5, valueType: 'fixed', method: 'plus' },
      { name: 'Pro Commission', type: 'commission', value: 3, valueType: 'fixed', method: 'pro' },
      { name: 'ECN Commission', type: 'commission', value: 2, valueType: 'fixed', method: 'ecn' },
      { name: 'Crypto Deposit Fee', type: 'deposit_fee', value: 0, valueType: 'percentage', method: 'crypto' },
      { name: 'Bank Deposit Fee', type: 'deposit_fee', value: 0, valueType: 'percentage', method: 'bank_transfer' },
      { name: 'Crypto Withdrawal Fee', type: 'withdrawal_fee', value: 1, valueType: 'percentage', method: 'crypto' },
      { name: 'Bank Withdrawal Fee', type: 'withdrawal_fee', value: 15, valueType: 'fixed', method: 'bank_transfer' },
    ],
  });

  // 15. Account types
  await prisma.accountType.createMany({
    data: [
      { name: 'Standard', description: 'Standard account with fixed spreads', leverage: 100, spread: 1.5, commission: 7, minDeposit: 100, sortOrder: 1 },
      { name: 'Plus', description: 'Plus account with tighter spreads', leverage: 100, spread: 1.0, commission: 5, minDeposit: 500, sortOrder: 2 },
      { name: 'Pro', description: 'Professional account with raw spreads', leverage: 500, spread: 0.5, commission: 3, minDeposit: 1000, sortOrder: 3 },
      { name: 'ECN', description: 'ECN account with raw spreads + commission', leverage: 200, spread: 0, commission: 2, minDeposit: 5000, sortOrder: 4 },
      { name: 'Demo', description: 'Practice account with virtual funds', leverage: 100, spread: 1.5, commission: 0, minDeposit: 0, sortOrder: 5 },
    ],
  });

  // 16. Notifications
  await prisma.notification.createMany({
    data: [
      { userId: demoUser.id, title: 'Welcome to SwaganX!', message: 'Your account has been created successfully.', type: 'success' },
      { userId: demoUser.id, title: 'Deposit Confirmed', message: 'Your deposit of $10,000 has been credited.', type: 'success' },
      { userId: createdUsers[0].id, title: 'Withdrawal Pending', message: 'Your withdrawal of $15,000 is being processed.', type: 'info' },
    ],
  });

  console.log('✅ Seed completed successfully!');
  console.log(`   Users: ${2 + users.length}`);
  console.log(`   Trading Accounts: ${accounts.length}`);
  console.log(`   Deposits: ${deposits.length}`);
  console.log(`   Withdrawals: ${withdrawals.length}`);
  console.log(`   Bonuses: ${bonuses.length}`);
  console.log(`   Employees: ${employees.length}`);
  console.log(`   Admin login: setupfx@gmail.com / Admin@123`);
  console.log(`   Demo login: demo@demo.com / demo123`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
