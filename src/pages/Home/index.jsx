import React, { useState, useEffect } from 'react';

const Index = () => {
    const [products, setProducts] = useState([]); // Estado para armazenar os produtos
    const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o usuário está logado

    // Função para buscar os produtos
    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token'); // Obtém o token do localStorage
            const response = await fetch('https://api-liz-shops-o13z.vercel.app/products', {
                method: 'GET',
                headers: {
                    // Envia o token apenas se estiver autenticado
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar produtos');
            }

            const data = await response.json();
            setProducts(data); // Armazena os produtos no estado
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    // Deletar um produto
    const handleDelete = async (productId) => {
        try {
            if (!isAuthenticated) {
                alert('Você precisa estar logado para comprar!');
                return;
            }

            const token = localStorage.getItem('token'); // Obtém o token do localStorage
            const response = await fetch(
                `https://api-liz-shops-o13z.vercel.app/products/delete/${productId}`,
                {
                    method: 'POST', // Método de requisição POST
                    headers: {
                        Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
                    },
                }
            );

            if (response.ok) {
                // Atualiza a lista de produtos após a exclusão
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product.id !== productId)
                );
                alert('Produto comprado com sucesso!');
            } else {
                throw new Error('Erro ao comprar o produto');
            }
        } catch (error) {
            console.error('Erro ao deletar o produto:', error);
            alert('Erro ao comprar o produto');
        }
    };

    // Fetch dos produtos quando o componente for montado
    useEffect(() => {
        fetchProducts();
    }, []); // O array vazio garante que a requisição seja feita apenas uma vez

    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-6xl mx-auto">
            <h1 className="text-center text-2xl font-bold text-gray-800">
                Bem-vindo ao Liz's Shops
            </h1>

            {!isAuthenticated && (
                <div className="text-center text-lg text-gray-600 mt-4">
                    Você precisa estar logado para ver os produtos e realizar
                    compras.
                    <br />
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => (window.location.href = '/login')}
                    >
                        Clique aqui para fazer login.
                    </span>
                </div>
            )}

            <div className="flex flex-wrap justify-center gap-4 mt-6">
                {isAuthenticated && products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product.id} // Use o ID do produto como chave
                            className="flex flex-col rounded-[25px] shadow-lg border border-gray-800"
                            style={{
                                flex: '1 1 300px',
                                maxWidth: '300px',
                                height: '400px',
                            }}
                        >
                            <div className="p-2 text-center font-bold">
                                {product.nome} {/* Nome do produto */}
                            </div>
                            <div className="p-2 text-center">
                                {product.preco.toFixed(2)}{' '}
                                {/* Preço do produto */}
                            </div>
                            <div className="flex-1 overflow-hidden p-6">
                                <img
                                    src={product.imagemUrl} // URL da imagem
                                    alt={product.nome}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-2 text-center">
                                <button
                                    onClick={() => handleDelete(product.id)} // Chama a função de deletar ao clicar
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-red-600 cursor-pointer"
                                >
                                    Comprar Produto
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-lg text-gray-600 mt-4">
                        Não há produtos disponíveis ou você não está logado.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;
