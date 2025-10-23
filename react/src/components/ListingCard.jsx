import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function ListingCard({ listing, actionArea }) {
  return (
    <div data-easytag="id1-src/components/ListingCard.jsx" className="w-full">
      <Card elevation={1} className="h-full">
        <div data-easytag="id2-src/components/ListingCard.jsx" className="h-48 w-full bg-gray-100 overflow-hidden">
          <img data-easytag="id3-src/components/ListingCard.jsx" src={(listing.images && listing.images[0]) || 'https://via.placeholder.com/600x400?text=No+Image'} alt={listing.title} className="h-48 w-full object-cover" />
        </div>
        <CardContent>
          <div data-easytag="id4-src/components/ListingCard.jsx" className="flex items-start justify-between gap-2">
            <Typography data-easytag="id5-src/components/ListingCard.jsx" variant="subtitle1" className="font-medium line-clamp-2">{listing.title}</Typography>
            <Typography data-easytag="id6-src/components/ListingCard.jsx" variant="subtitle1" color="primary">{new Intl.NumberFormat('ru-RU').format(listing.price)} ₽</Typography>
          </div>
          <div data-easytag="id7-src/components/ListingCard.jsx" className="mt-1 text-sm text-gray-500">{listing.city || 'Город не указан'} • {dayjs(listing.createdAt).format('DD.MM.YYYY')}</div>
        </CardContent>
        <CardActions className="px-4 pb-4">
          <Link data-easytag="id8-src/components/ListingCard.jsx" to={`/listings/${listing._id}`} className="w-full">
            <Button fullWidth variant="outlined">Открыть</Button>
          </Link>
          {actionArea && (
            <div data-easytag="id9-src/components/ListingCard.jsx" className="w-full">{actionArea}</div>
          )}
        </CardActions>
      </Card>
    </div>
  );
}
