import { Request, Response, NextFunction } from 'express';
import { RecordService } from '../services/recordService';
import { logger } from '../utils/logger';

export const getRecords = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === 'viewer') {
      return res.status(403).json({ message: 'Viewers can only access the dashboard' });
    }

    const { type, category, startDate, endDate } = req.query;
    const records = await RecordService.getRecords({
      type: type as string,
      category: category as string,
      startDate: startDate as string,
      endDate: endDate as string
    });

    res.json(records);
  } catch (err) {
    next(err);
  }
};

export const createRecord = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { amount, type, category, date, notes } = req.body;
    if (!amount || !type || !category || !date) {
      return res.status(400).json({ message: 'Amount, type, category, and date are required' });
    }

    const record = await RecordService.createRecord({
      userId: req.user.id,
      amount: Number(amount),
      type,
      category,
      date,
      notes
    });

    logger.info(`Financial record created by ${req.user.email} (ID: ${req.user.id})`);
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
};

export const updateRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const record = await RecordService.updateRecord(req.params.id, req.body);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.json(record);
  } catch (err) {
    next(err);
  }
};

export const deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await RecordService.deleteRecord(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const getDashboardStats = async (req: any, res: Response, next: NextFunction) => {
  try {
    const stats = await RecordService.getStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
