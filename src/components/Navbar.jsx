import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verifica se o token existe no localStorage
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
            {/* Nome do site alinhado à esquerda */}
            <h1 className="text-xl font-bold">Liz's Shops</h1>

            <div className="flex gap-4">
                {/* Home centralizado no eixo Y */}
                <div className="flex-1 text-center flex items-center">
                    <Link to="/" className="hover:underline text-lg">
                        Home
                    </Link>
                </div>

                {/* Botões à direita */}
                <div className="flex gap-4 items-center">
                    {isAuthenticated ? (
                        <>
                            <Link to="/admin" className="hover:underline text-lg">
                                Dashboard
                            </Link>
                            <LogoutButton />
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                            <Link to="/cadastro" className="hover:underline">
                                Cadastro
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
