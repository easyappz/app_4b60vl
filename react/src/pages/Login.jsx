import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Paper, Typography, Snackbar, Alert } from '@mui/material';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import FormTextField from '../components/FormTextField';

const schema = z.object({
  email: z.string({ required_error: 'Введите email' }).email({ message: 'Некорректный email' }),
  password: z.string({ required_error: 'Введите пароль' }).min(6, { message: 'Минимум 6 символов' }),
});

export default function Login() {
  const { register: rhfRegister, handleSubmit, setError, formState: { errors } } = useForm({ defaultValues: { email: '', password: '' } });
  const [toast, setToast] = React.useState({ open: false, message: '', severity: 'success' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (values) => {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach((i) => setError(i.path[0], { type: 'manual', message: i.message }));
      return;
    }
    try {
      await login(parsed.data.email, parsed.data.password);
      setToast({ open: true, message: 'Вход выполнен', severity: 'success' });
      navigate(from, { replace: true });
    } catch (e) {
      setToast({ open: true, message: e?.response?.data?.message || 'Ошибка входа', severity: 'error' });
    }
  };

  return (
    <div data-easytag="id1-src/pages/Login.jsx" className="max-w-md mx-auto">
      <Paper elevation={1} className="p-6">
        <Typography data-easytag="id2-src/pages/Login.jsx" variant="h6" className="mb-4 font-semibold">Вход</Typography>
        <form data-easytag="id3-src/pages/Login.jsx" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormTextField name="email" label="Email" register={rhfRegister} errors={errors} placeholder="you@example.com" />
          <FormTextField name="password" label="Пароль" register={rhfRegister} errors={errors} type="password" placeholder="******" />
          <div data-easytag="id4-src/pages/Login.jsx" className="pt-2">
            <Button type="submit" variant="contained" fullWidth disabled={loading}>{loading ? 'Загрузка...' : 'Войти'}</Button>
          </div>
        </form>
      </Paper>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
          <div data-easytag="id5-src/pages/Login.jsx">{toast.message}</div>
        </Alert>
      </Snackbar>
    </div>
  );
}
