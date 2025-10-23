import instance from './axios';

export async function listCategories() {
  const res = await instance.get('/api/categories');
  return res.data;
}
