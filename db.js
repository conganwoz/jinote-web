import Dexie from 'dexie';

export const db = new Dexie('jinote');
db.version(1).stores({
  notes: '++id, title, content, insertedAt, updatedAt'
});
