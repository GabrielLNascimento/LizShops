import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Cadastro from './pages/Cadastro/index.jsx';
import Login from './pages/Login/index.jsx';
import Admin from './pages/Admin/index.jsx';
import Home from "./pages/Home/index.jsx";

import Navbar from './components/Navbar.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
