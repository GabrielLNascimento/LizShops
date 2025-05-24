import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { auth } from './assets/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// components
import Navbar from './components/Navbar';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Notfound from './pages/Notfound';
import Dashboard from './pages/Dashboard';

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    if (loading) return <p>Carregando...</p>;

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={user ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Notfound />} />
            </Routes>
        </BrowserRouter>
    );
}
