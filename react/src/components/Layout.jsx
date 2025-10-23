import React from 'react';
import { AppBar, Toolbar, Button, Container, Box, Typography } from '@mui/material';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import { useAuth } from '../hooks/useAuth';

export default function Layout() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div data-easytag="id1-src/components/Layout.jsx" className="min-h-screen flex flex-col">
      <header data-easytag="id2-src/components/Layout.jsx">
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <div data-easytag="id3-src/components/Layout.jsx" className="flex items-center gap-4 w-full">
              <div data-easytag="id4-src/components/Layout.jsx" className="cursor-pointer" onClick={() => navigate('/') }>
                <Typography data-easytag="id5-src/components/Layout.jsx" variant="h6" className="text-blue-600 font-bold">Easyappz Market</Typography>
              </div>
              <div data-easytag="id6-src/components/Layout.jsx" className="flex-1"><NavbarSearch /></div>
              <div data-easytag="id7-src/components/Layout.jsx" className="flex items-center gap-2">
                {!isAuthenticated && (
                  <>
                    <Link data-easytag="id8-src/components/Layout.jsx" to="/login"><Button variant="text">Войти</Button></Link>
                    <Link data-easytag="id9-src/components/Layout.jsx" to="/register"><Button variant="outlined">Регистрация</Button></Link>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    <Link data-easytag="id10-src/components/Layout.jsx" to="/profile"><Button variant="text">{user?.name || 'Мой профиль'}</Button></Link>
                    <Link data-easytag="id11-src/components/Layout.jsx" to="/my-listings"><Button variant="text">Мои объявления</Button></Link>
                    <Button data-easytag="id12-src/components/Layout.jsx" variant="text" color="inherit" onClick={logout}>Выйти</Button>
                  </>
                )}
                <Link data-easytag="id13-src/components/Layout.jsx" to="/create"><Button variant="contained" color="primary">Разместить объявление</Button></Link>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </header>

      <main data-easytag="id14-src/components/Layout.jsx" className="flex-1">
        <Container data-easytag="id15-src/components/Layout.jsx" maxWidth="lg" className="py-6">
          <Outlet />
        </Container>
      </main>

      <footer data-easytag="id16-src/components/Layout.jsx" className="bg-gray-100 border-t">
        <Container data-easytag="id17-src/components/Layout.jsx" maxWidth="lg" className="py-6">
          <Box data-easytag="id18-src/components/Layout.jsx" className="flex items-center justify-between">
            <Typography data-easytag="id19-src/components/Layout.jsx" variant="body2" color="text.secondary">© {new Date().getFullYear()} Easyappz</Typography>
            <div data-easytag="id20-src/components/Layout.jsx" className="text-xs text-gray-500">Сделано с любовью к простоте</div>
          </Box>
        </Container>
      </footer>
    </div>
  );
}
