import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './assets/pages/Login';
import CriarLogin from './assets/pages/CriarLogin';
import App from './App';
import ControleProduto from './assets/pages/ControleProduto';
import CriarProduto from './assets/pages/CriarProduto';
import EditarProduto from './assets/pages/EditarProduto';
import LerProduto from './assets/pages/LerProduto';
import RemoverProduto from './assets/pages/RemoverProduto';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './assets/routes/PrivateRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/criar" element={<CriarLogin />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            }
          />

          <Route
            path="/produtos"
            element={
              <PrivateRoute>
                <ControleProduto />
              </PrivateRoute>
            }
          />
          <Route
            path="/produtos/criar"
            element={
              <PrivateRoute>
                <CriarProduto />
              </PrivateRoute>
            }
          />
          <Route
            path="/produtos/ler/:id"
            element={
              <PrivateRoute>
                <LerProduto />
              </PrivateRoute>
            }
          />
          <Route
            path="/produtos/editar/:id"
            element={
              <PrivateRoute>
                <EditarProduto />
              </PrivateRoute>
            }
          />
          <Route
            path="/produtos/remover/:id"
            element={
              <PrivateRoute>
                <RemoverProduto />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);