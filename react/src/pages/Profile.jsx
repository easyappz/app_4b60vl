import React from 'react';
import { Paper, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  const [toast, setToast] = React.useState({ open: false, message: '', severity: 'success' });

  return (
    <div data-easytag="id1-src/pages/Profile.jsx" className="max-w-2xl mx-auto space-y-4">
      <Paper elevation={1} className="p-6 space-y-2">
        <Typography data-easytag="id2-src/pages/Profile.jsx" variant="h6" className="font-semibold">Профиль</Typography>
        <div data-easytag="id3-src/pages/Profile.jsx" className="text-gray-600">Имя: {user?.name || '—'}</div>
        <div data-easytag="id4-src/pages/Profile.jsx" className="text-gray-600">Email: {user?.email || '—'}</div>
      </Paper>
      <Paper elevation={1} className="p-6 space-y-3">
        <Typography data-easytag="id5-src/pages/Profile.jsx" variant="subtitle1" className="font-semibold">Быстрые действия</Typography>
        <div data-easytag="id6-src/pages/Profile.jsx" className="flex gap-3">
          <Link data-easytag="id7-src/pages/Profile.jsx" to="/my-listings"><Button variant="outlined">Мои объявления</Button></Link>
          <Link data-easytag="id8-src/pages/Profile.jsx" to="/create"><Button variant="contained">Создать объявление</Button></Link>
        </div>
      </Paper>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
          <div data-easytag="id9-src/pages/Profile.jsx">{toast.message}</div>
        </Alert>
      </Snackbar>
    </div>
  );
}
