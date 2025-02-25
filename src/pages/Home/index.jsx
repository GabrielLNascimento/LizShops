import { useState, useEffect } from 'react';

const Index = () => {
    const [products, setProducts] = useState([]); // Estado para armazenar os produtos
    const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o usuário está logado

    // Função para buscar os produtos
    const fetchProducts = async () => {
        try {
            const response = await fetch(
                'https://api-products-mu.vercel.app/api/produtos',
                {
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error('Erro ao buscar produtos');
            }

            const data = await response.json();
            setProducts(data); // Armazena os produtos no estado
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    // Deletar um produto (ação de "comprar produto" conforme sua lógica)
    const handleDelete = async (productId) => {
        try {
            if (!isAuthenticated) {
                alert('Você precisa estar logado para comprar!');
                return;
            }

            const token = localStorage.getItem('token'); // Obtém o token do localStorage

            const response = await fetch(
                `https://api-products-mu.vercel.app/api/produtos/delete/${productId}`,
                {
                    method: 'DELETE', // Método DELETE para remoção
                    headers: {
                        Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
                    },
                }
            );

            if (response.ok) {
                // Atualiza a lista de produtos após a exclusão
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product._id !== productId)
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

    // Buscar os produtos quando o componente for montado
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-6xl mx-auto">
            <h1 className="text-center text-2xl font-bold text-gray-800">
                Bem-vindo ao Shops by Liz
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
                {products.map((product) => (
                    <div
                        key={product._id} // Utiliza _id como chave
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
                            R$ {product.preco}
                            {/* Preço do produto */}
                        </div>
                        {/* Container da imagem sem padding */}
                        <div className="flex-1 overflow-hidden">
                            <img
                                src={product.urlImagem} // URL da imagem
                                alt={product.nome}
                                className="w-full h-full object-contain" // ou object-scale-down
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                        {isAuthenticated && (
                            <div className="p-2 text-center">
                                <button
                                    onClick={() => handleDelete(product._id)} // Usa _id para identificar o produto
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-red-600 cursor-pointer"
                                >
                                    Comprar Produto
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;
