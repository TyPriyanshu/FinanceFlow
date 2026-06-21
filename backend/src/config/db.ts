import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { FinancialRecord } from '../models/FinancialRecord';

// Disable query buffering globally so we never hang on operations
mongoose.set('bufferCommands', false);

export const isUsingMongoDB = !!process.env.MONGODB_URI;

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is missing.');
    console.warn('⚠️ Please set MONGODB_URI in backend/.env or your environment settings to connect to MongoDB Atlas.');
    return;
  }

  try {
    console.log('Connecting to MongoDB Atlas... ⏳');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas successfully.');
    await seedDatabase();
  } catch (err: any) {
    console.error('❌ Failed to connect to MongoDB Atlas:', err.message);
    console.warn('⚠️ Ensure your database credentials and Atlas IP Access List (allowing access from all IPs) are configured correctly.');
  }
}

export async function seedDatabase() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding default accounts (Admin, Analyst, Viewer) into MongoDB...');
      
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
        console.log('🌱 Seeding initial financial records for Admin into MongoDB...');
        await FinancialRecord.insertMany([
          { userId: adminUser._id.toString(), amount: 5000, type: 'income', category: 'Salary', date: '2026-03-01', notes: 'Monthly salary' },
          { userId: adminUser._id.toString(), amount: 150, type: 'expense', category: 'Food', date: '2026-03-02', notes: 'Grocery shopping' },
          { userId: adminUser._id.toString(), amount: 1200, type: 'expense', category: 'Rent', date: '2026-03-05', notes: 'March rent' },
          { userId: adminUser._id.toString(), amount: 200, type: 'expense', category: 'Utilities', date: '2026-03-10', notes: 'Electricity bill' },
          { userId: adminUser._id.toString(), amount: 300, type: 'income', category: 'Freelance', date: '2026-03-15', notes: 'Logo design' }
        ]);
      }
      console.log('🌱 MongoDB seeding completed successfully.');
    }
  } catch (err: any) {
    console.error('❌ Failed to seed database:', err.message);
  }
}

