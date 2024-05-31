import React, { useEffect } from 'react'

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'

import {
    Button,
    Table,
    Tbody,
    Tr,
    Td,
} from '@chakra-ui/react'

const Profile = () => {
    const user = useSelector(state => state.user.value);
    const navigate = useNavigate();
    console.log(user);


    useEffect(() => {
        if (user.loginCode == null) {
            navigate('/');
        }
    }, [])



    return (
        <div className='h-screen'>
            <Navbar />
            <div>
                {user.role == 'employee' &&
                    <div className='w-3/4'>
                        <h1>A te hirdetéseid:</h1>
                        <div>

                        </div>
                    </div>
                }
                {user.role == 'company' &&
                    <div className=' w-[60vw] h-max mt-14 py-20 rounded-md shadow-lg'>
                        <div className='flex justify-center mb-8 mx-8'>
                            <div className=' w-1/2 '>
                                <h1 className='text-3xl font-semibold'>Személyes adatok</h1>
                                <h3>Adataid és a tapasztalataid egy helyen.</h3>
                            </div>
                            <div className=' w-1/2 flex justify-end items-center'>
                                <Button size='md' colorScheme='blue'>Tapasztalataid szerkesztése</Button>
                            </div>
                        </div>
                        <div>
                            <Table variant={"striped"} colorScheme='gray'>

                                <Tbody>
                                    <Tr>
                                        <Td className='p-6  w-1/3 '>Név</Td>
                                        <Td className='font-bold w-2/3 '>{user.name}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td className='p-6  w-1/3 '>E-mail</Td>
                                        <Td className='font-bold w-2/3 '>{user.email}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td className='p-6  w-1/3 '>Státusz</Td>
                                        <Td className='font-bold w-2/3 '>{user.status}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td className='p-6  w-1/3 font-bold'>Munkatapasztalat</Td>

                                    </Tr>
                                </Tbody>
                            </Table>

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile