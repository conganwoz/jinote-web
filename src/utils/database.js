import { db } from '../database/db';

export const getLatestNotes = async (limit = 10) => {
  return await db.notes?.toCollection()?.limit(limit)?.toArray();
};
