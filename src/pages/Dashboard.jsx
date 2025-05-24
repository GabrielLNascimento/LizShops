import { useState } from 'react';
import { db } from '../assets/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Dashboard = () => {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'produtos'), {
                nome,
                preco,
                imagem,
            });
            setNome('');
            setPreco('');
            setImagem('');
            alert('Produto adicionado com sucesso!');
        } catch {
            alert('Erro ao adicionar produto');
        }
    };

    return (
        <div className="border border-slate-700 w-full max-w-lg m-auto px-10 py-5 mt-10 rounded-xl">
            <h1 className='text-center text-3xl font-bold mb-5'>Adicionar um Produto</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className='border-b-1 border-slate-500 px-2 py-1 hover:outline cursor-pointer'
                />
                <input
                    type="text"
                    placeholder="Preço"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    className='border-b-1 border-slate-500 px-2 py-1 hover:outline cursor-pointer'
                />
                <input
                    type="text"
                    placeholder="Link da imagem"
                    value={imagem}
                    onChange={(e) => setImagem(e.target.value)}
                    className='border-b-1 border-slate-500 px-2 py-1 hover:outline cursor-pointer'
                />
                <button type="submit" className='bg-sky-600 text-white py-2 w-fit px-5 rounded-xl mx-auto cursor-pointer hover:bg-sky-800'>Adicionar Produto</button>
            </form>
        </div>
    );
};

export default Dashboard;
