import React from 'react';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const index = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data: token } = await api.post('/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
            localStorage.setItem('token', token);
            navigate('/admin');
            window.location.reload();
        } catch (err) {
            console.log(err);
            alert('Erro ao logar usuário');
        }
    };

    return (
        <div className="border border-gray-300 p-5 shadow-lg rounded-lg max-w-md m-auto mt-6">
            <h2 className="text-2xl font-bold text-center text-gray-700">
                Login
            </h2>
            <form
                className="flex flex-col gap-2 my-5"
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none"
                    ref={emailRef}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none"
                    ref={passwordRef}
                />
                <button className="w-full bg-blue-400 py-2 px-4 rounded-md text-white font-bold hover:bg-blue-500 cursor-pointer">
                    Entrar-se
                </button>
            </form>
            <Link
                to="/"
                className="text-blue-600 hover:underline font-bold block text-center m-4"
            >
                Não tem uma conta? Faça seu cadastro
            </Link>
        </div>
    );
};

export default index;
