import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProdutos = async () => {
            const token = localStorage.getItem('token'); // Acesse o token armazenado no localStorage (ou onde você o estiver armazenando)

            if (!token) {
                setError('Token não encontrado. Por favor, faça login novamente.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar os produtos');
                }

                const data = await response.json();
                setProdutos(data); // Armazena os produtos no estado
            } catch (err) {
                setError('Erro ao buscar os produtos');
            }
        };

        fetchProdutos(); // Chama a função para buscar os produtos
    }, []); // O array vazio garante que a requisição será feita uma vez ao carregar o componente

    return (
        <div className="border border-gray-300 p-5 shadow-lg rounded-lg max-w-md m-auto mt-6">
            <h2 className="text-2xl font-bold text-center text-gray-700">
                Produtos
            </h2>
            {error && <p className="text-red-600">{error}</p>}
            {/* Exibe a mensagem de erro, se houver */}
            <div>
                {produtos.length === 0 ? (
                    <p>Nenhum produto encontrado.</p>
                ) : (
                    <ul>
                        {produtos.map((produto) => (
                            <li key={produto.id} className="border-b py-2">
                                <p className="font-bold">{produto.nome}</p>
                                <p>{produto.descricao}</p>
                                <p>R${produto.preco}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Link
                to="/login"
                className="text-blue-600 hover:underline font-bold block text-center m-4"
            >
                Voltar para o login
            </Link>
        </div>
    );
};

export default Produtos;
