import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { User } from '../models/User';
import { FinancialRecord } from '../models/FinancialRecord';

// Load env variables from backend/.env or root .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in environment variables.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB Atlas... ⏳');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB.');

    // Clear existing collections if desired
    console.log('🧹 Clearing existing users and records...');
    await User.deleteMany({});
    await FinancialRecord.deleteMany({});

    console.log('🌱 Seeding default accounts (Admin, Analyst, Viewer)...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const analystPassword = await bcrypt.hash('analyst123', 10);
    const viewerPassword = await bcrypt.hash('viewer123', 10);

    const seededUsers = await User.insertMany([
      { email: 'admin@example.com', password: adminPassword, role: 'admin', name: 'Admin User' },
      { email: 'analyst@example.com', password: analystPassword, role: 'analyst', name: 'Analyst User' },
      { email: 'viewer@example.com', password: viewerPassword, role: 'viewer', name: 'Viewer User' }
    ]);

    const adminUser = seededUsers.find(u => u.role === 'admin');
    if (adminUser) {
      console.log('🌱 Seeding initial financial records for Admin...');
      await FinancialRecord.insertMany([
        { userId: adminUser._id.toString(), amount: 5000, type: 'income', category: 'Salary', date: '2026-03-01', notes: 'Monthly salary' },
        { userId: adminUser._id.toString(), amount: 150, type: 'expense', category: 'Food', date: '2026-03-02', notes: 'Grocery shopping' },
        { userId: adminUser._id.toString(), amount: 1200, type: 'expense', category: 'Rent', date: '2026-03-05', notes: 'March rent' },
        { userId: adminUser._id.toString(), amount: 200, type: 'expense', category: 'Utilities', date: '2026-03-10', notes: 'Electricity bill' },
        { userId: adminUser._id.toString(), amount: 300, type: 'income', category: 'Freelance', date: '2026-03-15', notes: 'Logo design' }
      ]);
    }

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
