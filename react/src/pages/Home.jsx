import React from 'react';
import { Button, Typography, Grid, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as listingsApi from '../api/listings';
import * as categoriesApi from '../api/categories';
import ListingCard from '../components/ListingCard';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';

export default function Home() {
  const [toast, setToast] = React.useState({ open: false, message: '', severity: 'success' });

  const { data: listings = [], isLoading: listingsLoading } = useQuery({
    queryKey: ['listings', 'popular'],
    queryFn: listingsApi.listAll,
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.listCategories,
  });

  return (
    <div data-easytag="id1-src/pages/Home.jsx" className="space-y-8">
      <section data-easytag="id2-src/pages/Home.jsx" className="bg-blue-50 rounded-xl p-8 flex items-center justify-between">
        <div data-easytag="id3-src/pages/Home.jsx">
          <Typography data-easytag="id4-src/pages/Home.jsx" variant="h4" className="font-bold text-blue-700">Покупайте и продавайте легко</Typography>
          <Typography data-easytag="id5-src/pages/Home.jsx" variant="body1" className="mt-2 text-gray-600">Разместите объявление за минуту и найдите покупателя рядом с вами.</Typography>
          <div data-easytag="id6-src/pages/Home.jsx" className="mt-4">
            <Link data-easytag="id7-src/pages/Home.jsx" to="/create"><Button variant="contained">Разместить объявление</Button></Link>
          </div>
        </div>
        <div data-easytag="id8-src/pages/Home.jsx" className="hidden md:block">
          <img data-easytag="id9-src/pages/Home.jsx" src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop" alt="banner" className="w-80 h-40 object-cover rounded-lg shadow" />
        </div>
      </section>

      <section data-easytag="id10-src/pages/Home.jsx">
        <Typography data-easytag="id11-src/pages/Home.jsx" variant="h6" className="mb-4 font-semibold">Категории</Typography>
        <div data-easytag="id12-src/pages/Home.jsx" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(categoriesLoading ? [
            { key: 'realty', label: 'Недвижимость' },
            { key: 'auto', label: 'Авто' },
            { key: 'electronics', label: 'Электроника' },
            { key: 'furniture', label: 'Мебель' },
          ] : categories).map((c) => (
            <div key={c.key} data-easytag="id13-src/pages/Home.jsx" className="bg-white rounded-lg border p-4 flex items-center gap-3">
              <div data-easytag="id14-src/pages/Home.jsx" className="text-blue-600">
                {c.key === 'realty' && <HomeOutlinedIcon />}
                {c.key === 'auto' && <DirectionsCarOutlinedIcon />}
                {c.key === 'electronics' && <PhoneIphoneOutlinedIcon />}
                {c.key === 'furniture' && <ChairOutlinedIcon />}
              </div>
              <div data-easytag="id15-src/pages/Home.jsx" className="font-medium">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section data-easytag="id16-src/pages/Home.jsx">
        <Typography data-easytag="id17-src/pages/Home.jsx" variant="h6" className="mb-4 font-semibold">Популярные объявления</Typography>
        <div data-easytag="id18-src/pages/Home.jsx" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(listingsLoading ? [] : listings.slice(0, 8)).map((l) => (
            <div key={l._id} data-easytag="id19-src/pages/Home.jsx">
              <ListingCard listing={l} />
            </div>
          ))}
          {(!listingsLoading && listings.length === 0) && (
            <div data-easytag="id20-src/pages/Home.jsx" className="text-gray-500">Нет объявлений</div>
          )}
        </div>
      </section>

      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
          <div data-easytag="id21-src/pages/Home.jsx">{toast.message}</div>
        </Alert>
      </Snackbar>
    </div>
  );
}
