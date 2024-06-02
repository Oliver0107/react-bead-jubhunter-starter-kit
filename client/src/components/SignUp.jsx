import React from 'react'

import { Radio, RadioGroup, Button, Input, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios';
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';



const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();


    const handleSingUp = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3030/users', { password: password, email: email, role: role, fullname: name })
            .then(() => {
                navigate('/signin');
            }).catch((err) => {
                console.error('Error:', err.response);
            });
    };

    const handleRole = (e) => {
        console.log(e);
        setRole(e);
    }

    return (
        <div className='h-screen'>
            <Navbar page='Regisztráció' />
            <div className="flex flex-col items-center bg-slate-100 mb-4" style={{ height: 'calc(100vh - 11rem)' }}>
                <div className='w-[40%] mt-14 flex flex-col items-center'>
                    <div className='w-1/2'>
                        <h3 className="text-lg text-gray-500 font-semibold mb-1">
                            Név
                        </h3>
                        <Input background={"white"} size={'lg'} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mt-4 w-1/2'>
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
                    <RadioGroup onChange={handleRole}>
                        <Stack className='font-semibold' direction='row' gap={'100px'} marginTop={'32px'}>
                            <Radio size={'lg'} value='jobseeker'>Munkavállaló</Radio>
                            <Radio size={'lg'} value='company'>Munkáltató</Radio>

                        </Stack>
                    </RadioGroup>
                    <Button className='mt-8' size='lg' colorScheme='blue' onClick={handleSingUp}>
                        Regisztráció
                    </Button>
                </div>

            </div>

        </div >
    )
}

export default SignUp