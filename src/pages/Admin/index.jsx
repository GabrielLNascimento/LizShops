import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const nameRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token'); // Pega o token salvo no login
        if (!token) {
            alert('Você precisa estar logado para cadastrar produtos!');
            return;
        }

        const formData = new FormData();
        formData.append('name', nameRef.current.value);
        formData.append('price', priceRef.current.value);
        formData.append('image', imageRef.current.files[0]);

        try {
            const response = await fetch('https://api-liz-shops-o13z.vercel.app/products', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`, // Envia o token JWT
                },
            });

            const data = await response.json();
            console.log('Produto cadastrado:', data);
            alert('Produto cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar produto:', error);
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-lg mx-auto border rounded-lg shadow-lg mt-5">
            <h1 className="text-center text-2xl font-bold text-gray-800">
                Adicionar Produto
            </h1>
            <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label
                        htmlFor="name"
                        className="mb-1 text-gray-600 font-bold"
                    >
                        Nome do produto
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o nome do produto"
                        className="border border-gray-500 rounded-md shadow-md py-2 px-4"
                        ref={nameRef}
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="price"
                        className="mb-1 text-gray-600 font-bold"
                    >
                        Preço do produto
                    </label>
                    <input
                        type="text"
                        placeholder="Digite o preço do produto"
                        className="border border-gray-500 rounded-md shadow-md py-2 px-4"
                        ref={priceRef}
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="image"
                        className="mb-1 text-gray-600 font-bold"
                    >
                        Imagem do produto
                    </label>
                    <input
                        type="file"
                        className="border border-gray-500 rounded-md shadow-md py-2 px-4"
                        ref={imageRef}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-400 py-2 px-4 rounded-md text-white font-bold hover:bg-blue-500 cursor-pointer"
                >
                    Criar Produto
                </button>
            </form>
        </div>
    );
};

export default Index;
