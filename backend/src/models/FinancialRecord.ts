import mongoose, { Schema, Document } from 'mongoose';

export interface IFinancialRecord extends Document {
  userId: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  notes: string;
  createdAt: Date;
}

const FinancialRecordSchema: Schema = new Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true, trim: true },
  date: { type: String, required: true }, // 'YYYY-MM-DD'
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const FinancialRecord = mongoose.model<IFinancialRecord>('FinancialRecord', FinancialRecordSchema);
