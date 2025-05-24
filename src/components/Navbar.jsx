import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../assets/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsub();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <nav className="p-3 bg-slate-700 flex text-white justify-between">
            <div>
                <span className="font-bold text-2xl cursor-pointer">
                    Liz Shops
                </span>
            </div>

            <div className="flex gap-5">
                {user && (
                    <Link to="/" className="hover:underline self-center">
                        Home
                    </Link>
                )}

                {user && (
                    <Link
                        to="/dashboard"
                        className="hover:underline self-center"
                    >
                        Dashboard
                    </Link>
                )}

                {!user && (
                    <Link to="/login" className="hover:underline self-center">
                        Entrar
                    </Link>
                )}

                {!user && (
                    <Link
                        to="/register"
                        className="hover:underline self-center"
                    >
                        Registrar
                    </Link>
                )}

                {user && (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-3 cursor-pointer"
                    >
                        Sair
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
