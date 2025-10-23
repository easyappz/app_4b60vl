import React from 'react';
import { TextField } from '@mui/material';

export default function FormTextField({ name, label, register, errors, type = 'text', multiline = false, rows, placeholder }) {
  const err = errors?.[name]?.message;
  return (
    <div data-easytag="id1-src/components/FormTextField.jsx">
      <TextField
        fullWidth
        type={type}
        label={label}
        placeholder={placeholder}
        error={Boolean(err)}
        helperText={err || ''}
        multiline={multiline}
        rows={rows}
        {...register(name)}
      />
    </div>
  );
}
