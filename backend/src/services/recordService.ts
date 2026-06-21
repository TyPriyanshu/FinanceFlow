import { FinancialRecord } from '../models/FinancialRecord';

export class RecordService {
  static async getRecords(filter: { type?: string; category?: string; startDate?: string; endDate?: string }) {
    const query: any = {};
    if (filter.type) query.type = filter.type;
    if (filter.category) query.category = filter.category;
    if (filter.startDate || filter.endDate) {
      query.date = {};
      if (filter.startDate) query.date.$gte = filter.startDate;
      if (filter.endDate) query.date.$lte = filter.endDate;
    }

    const records = await FinancialRecord.find(query).lean() as any[];
    return records.map((r: any) => ({
      ...r,
      id: r._id ? r._id.toString() : r.id
    }));
  }

  static async createRecord(recordData: { userId: string; amount: number; type: 'income' | 'expense'; category: string; date: string; notes?: string }) {
    const newRecord = new FinancialRecord({
      userId: recordData.userId,
      amount: recordData.amount,
      type: recordData.type,
      category: recordData.category,
      date: recordData.date,
      notes: recordData.notes || ''
    });
    const saved = await newRecord.save();
    const savedObj = saved.toObject() as any;
    return { ...savedObj, id: savedObj._id ? savedObj._id.toString() : savedObj.id };
  }

  static async updateRecord(id: string, recordData: any) {
    const updated = await FinancialRecord.findByIdAndUpdate(id, recordData, { new: true }).lean() as any;
    if (!updated) return null;
    return { ...updated, id: updated._id ? updated._id.toString() : updated.id };
  }

  static async deleteRecord(id: string) {
    const result = await FinancialRecord.findByIdAndDelete(id);
    return !!result;
  }

  static async getStats() {
    const records = await FinancialRecord.find({}).lean();
    const totalIncome = records.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
    const totalExpense = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
    const netBalance = totalIncome - totalExpense;

    const categorySummary = records.reduce((acc: any, r) => {
      acc[r.category] = (acc[r.category] || 0) + r.amount;
      return acc;
    }, {});

    const recentTransactions = [...records]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5)
      .map(r => ({
        id: (r as any)._id ? (r as any)._id.toString() : (r as any).id,
        userId: r.userId,
        amount: r.amount,
        type: r.type,
        category: r.category,
        date: r.date,
        notes: r.notes
      }));

    return {
      totalIncome,
      totalExpense,
      netBalance,
      categorySummary,
      recentTransactions
    };
  }
}

