import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as listingsApi from '../api/listings';
import ListingCard from '../components/ListingCard';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';

export default function MyListings() {
  const qc = useQueryClient();
  const { data: listings = [], isLoading } = useQuery({ queryKey: ['listings', 'mine'], queryFn: listingsApi.listMine });
  const [edit, setEdit] = React.useState(null);
  const [toast, setToast] = React.useState({ open: false, message: '', severity: 'success' });

  const removeMutation = useMutation({
    mutationFn: listingsApi.remove,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['listings', 'mine'] });
      setToast({ open: true, message: 'Удалено', severity: 'success' });
    },
    onError: () => setToast({ open: true, message: 'Ошибка удаления', severity: 'error' }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => listingsApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['listings', 'mine'] });
      setToast({ open: true, message: 'Сохранено', severity: 'success' });
      setEdit(null);
    },
    onError: () => setToast({ open: true, message: 'Ошибка сохранения', severity: 'error' }),
  });

  return (
    <div data-easytag="id1-src/pages/MyListings.jsx">
      <Typography data-easytag="id2-src/pages/MyListings.jsx" variant="h6" className="mb-4 font-semibold">Мои объявления</Typography>
      <div data-easytag="id3-src/pages/MyListings.jsx" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading && <div data-easytag="id4-src/pages/MyListings.jsx">Загрузка...</div>}
        {!isLoading && listings.map((l) => (
          <div key={l._id} data-easytag="id5-src/pages/MyListings.jsx">
            <ListingCard
              listing={l}
              actionArea={
                <div data-easytag="id6-src/pages/MyListings.jsx" className="flex gap-2">
                  <Button size="small" variant="outlined" onClick={() => setEdit(l)}>Редактировать</Button>
                  <Button size="small" variant="text" color="error" onClick={() => removeMutation.mutate(l._id)}>Удалить</Button>
                </div>
              }
            />
          </div>
        ))}
        {!isLoading && listings.length === 0 && (
          <div data-easytag="id7-src/pages/MyListings.jsx" className="text-gray-500">Нет объявлений</div>
        )}
      </div>

      <Dialog open={Boolean(edit)} onClose={() => setEdit(null)} fullWidth maxWidth="sm">
        <DialogTitle>
          <div data-easytag="id8-src/pages/MyListings.jsx">Редактировать объявление</div>
        </DialogTitle>
        <DialogContent className="space-y-3">
          <TextField
            label="Заголовок"
            fullWidth
            value={edit?.title || ''}
            onChange={(e) => setEdit((prev) => ({ ...prev, title: e.target.value }))}
          />
          <TextField
            label="Цена"
            type="number"
            fullWidth
            value={edit?.price || 0}
            onChange={(e) => setEdit((prev) => ({ ...prev, price: Number(e.target.value) }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEdit(null)}>Отмена</Button>
          <Button variant="contained" onClick={() => updateMutation.mutate({ id: edit._id, payload: { title: edit.title, price: Number(edit.price) } })}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
          <div data-easytag="id9-src/pages/MyListings.jsx">{toast.message}</div>
        </Alert>
      </Snackbar>
    </div>
  );
}
