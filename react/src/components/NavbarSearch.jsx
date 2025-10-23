import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function NavbarSearch() {
  const [value, setValue] = React.useState('');
  return (
    <div data-easytag="id1-src/components/NavbarSearch.jsx">
      <TextField
        fullWidth
        size="small"
        placeholder="Поиск по объявлениям (скоро)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div data-easytag="id2-src/components/NavbarSearch.jsx">
                <SearchIcon color="action" />
              </div>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
