

import PocketBase from 'pocketbase';
export const pb = new PocketBase(process.env.POCKETBASE_URL || 'http://127.0.0.1:8090');
