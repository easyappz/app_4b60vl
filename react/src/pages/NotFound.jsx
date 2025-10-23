import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <div data-easytag="id1-src/pages/NotFound.jsx" className="flex flex-col items-center justify-center py-16">
      <Typography data-easytag="id2-src/pages/NotFound.jsx" variant="h4" className="font-semibold mb-2">Страница не найдена</Typography>
      <Typography data-easytag="id3-src/pages/NotFound.jsx" variant="body1" className="text-gray-600 mb-4">Похоже, вы перешли по неверной ссылке.</Typography>
      <Link data-easytag="id4-src/pages/NotFound.jsx" to="/"><Button variant="contained">На главную</Button></Link>
    </div>
  );
}
