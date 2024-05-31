import React from 'react'
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux';

//TODO: ha employee vagy company role akkor más talán a kiírása a Dashboard helyett

const Navbar = () => {
    const user = useSelector(state => state.user.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }
    const handleLogin = () => {
        navigate('/signin')
    }
    const handleSignup = () => {
        navigate('/signup')
    }

    const handleProfile = () => {
        navigate('/profile')
    }

    const handleAddCompany = () => {
        navigate('/addCompany')
    }

    return (
        <>
            <nav className="navbar bg-slate-800 text-white">
                <div className="container flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-auto ml-5" src="https://tailwindui.com/img/logos/workflow-mark-white.svg" alt="Workflow" />
                        </div>
                        <div className="hidden md:block">
                            {user.loginCode == null &&
                                <div className="ml-10 flex items-baseline space-x-2">
                                    <button onClick={handleSignup} className=" text-xl font-bold hover:underline ">
                                        Regisztráció
                                    </button>
                                    <button onClick={handleLogin} className=" text-xl font-bold hover:underline ">
                                        Bejelentkezés
                                    </button>
                                </div>
                            }
                            {user.role == 'employee' && user.loginCode != null &&
                                <div className="ml-10 flex items-baseline space-x-3">
                                    <button onClick={handleLogout} className=" text-xl font-bold hover:underline ">
                                        Álláshírdetések
                                    </button>
                                    <button onClick={handleProfile} className=" text-xl font-bold hover:underline ">
                                        Profilom
                                    </button>
                                    <button onClick={handleLogout} className=" text-xl font-bold hover:underline ">
                                        Kijelentkezés
                                    </button>
                                </div>
                            }
                            {user.role == 'company' && user.loginCode != null &&
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <button onClick={handleProfile} className=" text-xl font-bold hover:underline ">
                                        Álláshírdetések
                                    </button>
                                    <button onClick={handleProfile} className=" text-xl font-bold hover:underline ">
                                        Profilom
                                    </button>
                                    <button onClick={handleAddCompany} className=" text-xl font-bold hover:underline ">
                                        Álláshírdetés hozzáadása
                                    </button>
                                    <button onClick={handleLogout} className=" text-xl font-bold hover:underline ">
                                        Kijelentkezés
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
            <div className=' shadow-md text-4xl text-slate-950 font-bold p-8' >Dashboard</div>
        </>
    )
}

export default Navbar