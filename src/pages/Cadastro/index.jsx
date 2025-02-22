import React from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

const index = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await api.post('/cadastro', {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
            alert("Usuario criado com sucesso")
        } catch (err) {
            alert('Erro ao cadastrar usuario!');
        }
    };

    return (
        <div className="border border-gray-300 p-5 shadow-lg rounded-lg max-w-md m-auto mt-6">
            <h2 className="text-2xl font-bold text-center text-gray-700">
                Cadastro
            </h2>
            <form
                className="flex flex-col gap-2 my-5"
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    type="text"
                    placeholder="Nome"
                    className="w-full px-3 py-2 border border-gray-500 rounded-md focus:outline-none"
                    ref={nameRef}
                />
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
                    Cadastrar-se
                </button>
            </form>
            <Link
                to="/login"
                className="text-blue-600 hover:underline font-bold block text-center m-4"
            >
                Já tem uma conta? Faça login
            </Link>
        </div>
    );
};

export default index;
