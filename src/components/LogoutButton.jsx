import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove o token
        window.location.reload()
        navigate('/login'); // Redireciona para login
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
