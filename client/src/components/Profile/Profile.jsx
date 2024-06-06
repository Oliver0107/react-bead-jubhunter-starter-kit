import React, { useEffect } from 'react'

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar'
import CompanyJobs from './CompanyJobs'

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

    const handleAddCompany = () => {
        navigate('/createjob');
    }

    return (
        <div className='h-screen'>
            <Navbar page='Profil' />
            <div className=' bg-slate-100' style={{ minHeight: 'calc(100vh - 11rem)' }}>
                {user.role == 'company' &&
                    <div className='flex justify-center'>
                        <div className='w-[90%]  mt-4'>
                            <h1 className='text-3xl mb-4'>A te hirdetéseid:</h1>
                            <div>
                                <CompanyJobs />
                            </div>
                            <div className="flex justify-center mt-14">
                                <Button onClick={handleAddCompany} size='lg' colorScheme='blue'>Hirdetés hozzáadása</Button>
                            </div>
                        </div>

                    </div>
                }
                {user.role == 'jobseeker' &&
                    <div className='flex bg-slate-100 justify-center' style={{ height: 'calc(100vh - 11rem)' }}>
                        <div className='w-[60vw] bg-white h-max mt-14 py-20 rounded-md shadow-lg'>
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
                    </div>
                }
            </div>
        </div >
    )
}

export default Profile