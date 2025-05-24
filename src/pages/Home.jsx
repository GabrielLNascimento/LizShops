import { useState, useEffect } from 'react';
import { db } from '../assets/firebase';
import { auth } from '../assets/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
    const [produtos, setProduto] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'produtos'));
                const lista = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProduto(lista);
            } catch {
                alert('Erro ao buscar produtos');
            }
        };

        fetchProdutos();
    }, []);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsub();
    }, []);

    const handleComprar = async (id) => {
        const confirmar = window.confirm('Deseja comprar este produto?');
        if (!confirmar) return;

        try {
            await deleteDoc(doc(db, 'produtos', id));
            setProduto((prev) => prev.filter((produto) => produto.id !== id));
            alert('Produto comprado com sucesso!');
        } catch {
            alert('Erro ao comprar produto');
        }
    };

    return (
        <div>
            <h2 className="text-2xl text-center my-5">Produtos</h2>
            <div className="flex gap-5 m-auto justify-center flex-wrap">
                {produtos.map((produto) => (
                    <div
                        key={produto.id}
                        className="flex flex-col border rounded-lg p-4 w-xs"
                    >
                        <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="w-full h-auto object-cover rounded-md mb-2"
                        />

                        <h3 className="text-lg font-semibold mb-1 text-center text-xl ">
                            {produto.nome}
                        </h3>
                        <p className="text-center text-green-700 font-bold text-xl">
                            R${produto.preco}
                        </p>
                        {user && (
                            <button
                                onClick={() => handleComprar(produto.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-md mt-2 font-bold w-fit mx-auto hover:bg-red-700 cursor-pointer"
                            >
                                Comprar
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
