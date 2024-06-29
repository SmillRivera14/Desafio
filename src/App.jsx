import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Nav from './componentes/Nav';
import Register from './pages/Registro';
import Home from './pages/Home';
import Products from './pages/Products';
import AdminPages from './pages/AdminPages';
import Editar from './pages/Editar'


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Nav />
        <main className="form-signin">
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<Products />} />
            <Route path='/adminpages' element={<AdminPages />} />
            <Route path='/editar/:id' element={<Editar />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
