import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Paper, Typography, Snackbar, Alert } from '@mui/material';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import FormTextField from '../components/FormTextField';

const schema = z.object({
  email: z.string({ required_error: 'Введите email' }).email({ message: 'Некорректный email' }),
  name: z.string({ required_error: 'Введите имя' }).min(2, { message: 'Минимум 2 символа' }),
  password: z.string({ required_error: 'Введите пароль' }).min(6, { message: 'Минимум 6 символов' }),
});

export default function Register() {
  const { register: rhfRegister, handleSubmit, setError, formState: { errors } } = useForm({ defaultValues: { email: '', name: '', password: '' } });
  const [toast, setToast] = React.useState({ open: false, message: '', severity: 'success' });
  const { register: doRegister, loading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach((i) => setError(i.path[0], { type: 'manual', message: i.message }));
      return;
    }
    try {
      await doRegister(parsed.data);
      setToast({ open: true, message: 'Регистрация успешна', severity: 'success' });
      navigate('/');
    } catch (e) {
      setToast({ open: true, message: e?.response?.data?.message || 'Ошибка регистрации', severity: 'error' });
    }
  };

  return (
    <div data-easytag="id1-src/pages/Register.jsx" className="max-w-md mx-auto">
      <Paper elevation={1} className="p-6">
        <Typography data-easytag="id2-src/pages/Register.jsx" variant="h6" className="mb-4 font-semibold">Регистрация</Typography>
        <form data-easytag="id3-src/pages/Register.jsx" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormTextField name="email" label="Email" register={rhfRegister} errors={errors} placeholder="you@example.com" />
          <FormTextField name="name" label="Имя" register={rhfRegister} errors={errors} placeholder="Иван" />
          <FormTextField name="password" label="Пароль" register={rhfRegister} errors={errors} type="password" placeholder="******" />
          <div data-easytag="id4-src/pages/Register.jsx" className="pt-2">
            <Button type="submit" variant="contained" fullWidth disabled={loading}>{loading ? 'Загрузка...' : 'Создать аккаунт'}</Button>
          </div>
        </form>
      </Paper>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
          <div data-easytag="id5-src/pages/Register.jsx">{toast.message}</div>
        </Alert>
      </Snackbar>
    </div>
  );
}
