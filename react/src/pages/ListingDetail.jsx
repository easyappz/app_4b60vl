import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as listingsApi from '../api/listings';
import { Typography, Paper } from '@mui/material';
import dayjs from 'dayjs';

export default function ListingDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({ queryKey: ['listing', id], queryFn: () => listingsApi.getById(id) });

  if (isLoading) {
    return <div data-easytag="id1-src/pages/ListingDetail.jsx">Загрузка...</div>;
  }

  if (!data) {
    return <div data-easytag="id2-src/pages/ListingDetail.jsx">Объявление не найдено</div>;
  }

  return (
    <div data-easytag="id3-src/pages/ListingDetail.jsx" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div data-easytag="id4-src/pages/ListingDetail.jsx" className="md:col-span-2">
        <Paper className="p-4">
          <div data-easytag="id5-src/pages/ListingDetail.jsx" className="h-80 w-full bg-gray-100 overflow-hidden rounded">
            <img data-easytag="id6-src/pages/ListingDetail.jsx" src={(data.images && data.images[0]) || 'https://via.placeholder.com/600x400?text=No+Image'} alt={data.title} className="h-80 w-full object-cover" />
          </div>
          <Typography data-easytag="id7-src/pages/ListingDetail.jsx" variant="h5" className="mt-4 font-semibold">{data.title}</Typography>
          <Typography data-easytag="id8-src/pages/ListingDetail.jsx" variant="h6" color="primary" className="mt-2">{new Intl.NumberFormat('ru-RU').format(data.price)} ₽</Typography>
          <div data-easytag="id9-src/pages/ListingDetail.jsx" className="mt-2 text-gray-600">Категория: {data.category || '—'}</div>
          <div data-easytag="id10-src/pages/ListingDetail.jsx" className="mt-1 text-gray-600">Город: {data.city || '—'}</div>
          <Typography data-easytag="id11-src/pages/ListingDetail.jsx" variant="body1" className="mt-4 whitespace-pre-wrap">{data.description}</Typography>
        </Paper>
      </div>
      <div data-easytag="id12-src/pages/ListingDetail.jsx">
        <Paper className="p-4 space-y-2">
          <Typography data-easytag="id13-src/pages/ListingDetail.jsx" variant="subtitle1" className="font-semibold">Продавец</Typography>
          <div data-easytag="id14-src/pages/ListingDetail.jsx">ID владельца: {data.owner}</div>
          <div data-easytag="id15-src/pages/ListingDetail.jsx">Опубликовано: {dayjs(data.createdAt).format('DD.MM.YYYY')}</div>
        </Paper>
      </div>
    </div>
  );
}
