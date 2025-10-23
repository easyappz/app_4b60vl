import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Paper, Typography, MenuItem, TextField, Snackbar, Alert } from '@mui/material';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as listingsApi from '../api/listings';
import * as categoriesApi from '../api/categories';
import FormTextField from '../components/FormTextField';

const schema = z.object({
  title: z.string({ required_error: 'Введите заголовок' }).min(5, { message: 'Минимум 5 символов' }),
  description: z.string({ required_error: 'Введите описание' }).min(10, { message: 'Минимум 10 символов' }),
  price: z.coerce.number({ required_error: 'Введите цену' }).nonnegative({ message: 'Цена должна быть неотрицательной' }),
  category: z.string({ required_error: 'Укажите категорию' }).min(1, { message: 'Выберите категорию' }),
  city: z.string().optional().default(''),
  imagesInput: z.string().optional().default(''),
});

export default function ListingCreate() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: categoriesApi.listCategories });
  const [toast, setToast] = React.useState({ open: false, message: '', severity: 'success' });

  const { register, handleSubmit, setError, formState: { errors }, reset } = useForm({
    defaultValues: { title: '', description: '', price: '', category: '', city: '', imagesInput: '' },
  });

  const createMutation = useMutation({
    mutationFn: listingsApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['listings'] });
      setToast({ open: true, message: 'Объявление создано', severity: 'success' });
      reset();
      navigate('/my-listings');
    },
    onError: (e) => setToast({ open: true, message: e?.response?.data?.message || 'Ошибка создания', severity: 'error' }),
  });

  const onSubmit = (values) => {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach((i) => setError(i.path[0], { type: 'manual', message: i.message }));
      return;
    }
    const images = (parsed.data.imagesInput || '').split('\n').map((s) => s.trim()).filter((s) => s.length > 0);
    createMutation.mutate({
      title: parsed.data.title,
      description: parsed.data.description,
      price: Number(parsed.data.price),
      category: parsed.data.category,
      city: parsed.data.city,
      images,
    });
  };

  return (
    <div data-easytag="id1-src/pages/ListingCreate.jsx" className="max-w-2xl mx-auto">
      <Paper elevation={1} className="p-6 space-y-4">
        <Typography data-easytag="id2-src/pages/ListingCreate.jsx" variant="h6" className="font-semibold">Создать объявление</Typography>
        <form data-easytag="id3-src/pages/ListingCreate.jsx" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormTextField name="title" label="Заголовок" register={register} errors={errors} placeholder="Например: iPhone 13 128GB" />
          <FormTextField name="description" label="Описание" register={register} errors={errors} multiline rows={4} placeholder="Опишите состояние, комплектацию и т.д." />
          <FormTextField name="price" label="Цена" register={register} errors={errors} type="number" placeholder="0" />
          <div data-easytag="id4-src/pages/ListingCreate.jsx">
            <TextField select fullWidth label="Категория" defaultValue="" {...register('category')} error={Boolean(errors?.category?.message)} helperText={errors?.category?.message || ''}>
              <MenuItem value="" data-easytag="id5-src/pages/ListingCreate.jsx">Не выбрано</MenuItem>
              {categories.map((c) => (
                <MenuItem key={c.key} value={c.key} data-easytag="id6-src/pages/ListingCreate.jsx">{c.label}</MenuItem>
              ))}
            </TextField>
          </div>
          <FormTextField name="city" label="Город" register={register} errors={errors} placeholder="Москва" />
          <div data-easytag="id7-src/pages/ListingCreate.jsx">
            <TextField
              label="Изображения (URL, по одному в строке)"
              placeholder="https://..."
              multiline
              rows={4}
              fullWidth
              {...register('imagesInput')}
              error={Boolean(errors?.imagesInput?.message)}
              helperText={errors?.imagesInput?.message || ''}
            />
          </div>
          <div data-easytag="id8-src/pages/ListingCreate.jsx" className="pt-2">
            <Button type="submit" variant="contained" disabled={createMutation.isLoading}>{createMutation.isLoading ? 'Сохранение...' : 'Создать'}</Button>
          </div>
        </form>
      </Paper>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
          <div data-easytag="id9-src/pages/ListingCreate.jsx">{toast.message}</div>
        </Alert>
      </Snackbar>
    </div>
  );
}
