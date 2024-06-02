import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import { Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios';

const SignIn = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3030/authentication', { password, email, strategy: "local" })
            .then((res) => {
                dispatch(login({
                    id: res.data.user.id,
                    loginCode: res.data.accessToken,
                    name: res.data.user.fullname,
                    role: res.data.user.role,
                    email
                }));
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='h-screen'>
            <Navbar page='Bejelentkezés' />
            <div className="flex flex-col items-center bg-slate-100 mb-4" style={{ height: 'calc(100vh - 11rem)' }}>
                <div className='w-[40%] mt-14 flex flex-col items-center'>
                    <div className='w-1/2'>
                        <h3 className="text-lg text-gray-500 font-semibold mb-1">
                            E-mail
                        </h3>
                        <Input background={"white"} size={'lg'} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mt-4 w-1/2'>
                        <h3 className="text-lg text-gray-500 font-semibold mb-1">
                            Jelszó
                        </h3>
                        <Input background={"white"} size={'lg'} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button className='mt-8' size='lg' colorScheme='blue' onClick={handleLogin}>
                        Bejelentkezés
                    </Button>
                </div>
            </div>
        </div >
    );
};

export default SignIn;
