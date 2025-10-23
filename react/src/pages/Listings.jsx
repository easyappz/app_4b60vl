import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as listingsApi from '../api/listings';
import ListingCard from '../components/ListingCard';
import { Typography } from '@mui/material';

export default function Listings() {
  const { data: listings = [], isLoading } = useQuery({ queryKey: ['listings', 'all'], queryFn: listingsApi.listAll });

  return (
    <div data-easytag="id1-src/pages/Listings.jsx">
      <Typography data-easytag="id2-src/pages/Listings.jsx" variant="h6" className="mb-4 font-semibold">Все объявления</Typography>
      <div data-easytag="id3-src/pages/Listings.jsx" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading && (
          <div data-easytag="id4-src/pages/Listings.jsx" className="text-gray-500">Загрузка...</div>
        )}
        {!isLoading && listings.map((l) => (
          <div key={l._id} data-easytag="id5-src/pages/Listings.jsx">
            <ListingCard listing={l} />
          </div>
        ))}
        {!isLoading && listings.length === 0 && (
          <div data-easytag="id6-src/pages/Listings.jsx" className="text-gray-500">Нет объявлений</div>
        )}
      </div>
    </div>
  );
}
