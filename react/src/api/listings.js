import instance from './axios';

export async function listAll() {
  const res = await instance.get('/api/listings');
  return res.data;
}

export async function getById(id) {
  const res = await instance.get(`/api/listings/${id}`);
  return res.data;
}

export async function listMine() {
  const res = await instance.get('/api/me/listings');
  return res.data;
}

export async function create(payload) {
  const res = await instance.post('/api/listings', payload);
  return res.data;
}

export async function update(id, payload) {
  const res = await instance.patch(`/api/listings/${id}` , payload);
  return res.data;
}

export async function remove(id) {
  const res = await instance.delete(`/api/listings/${id}`);
  return res.data;
}
