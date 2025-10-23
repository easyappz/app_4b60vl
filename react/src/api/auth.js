import instance from './axios';

export async function register(data) {
  const res = await instance.post('/api/auth/register', data);
  return res.data;
}

export async function login(data) {
  const res = await instance.post('/api/auth/login', data);
  return res.data;
}

export async function me() {
  const res = await instance.get('/api/auth/me');
  return res.data;
}
