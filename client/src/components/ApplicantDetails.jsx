import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';



import {
    Button,
    Table,
    Tbody,
    Tr,
    Td,
} from '@chakra-ui/react'

const Profile = () => {
    const { id } = useParams();
    const user = useSelector(state => state.user.value);
    const [applicant, setApplicant] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3030/users/' + id, {
            headers: {
                'Authorization': `Bearer ${user.loginCode}`
            }
        })
            .then(res => {
                setApplicant(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className='h-screen'>
            <Navbar page='Profil' />
            <div className=' bg-slate-100' style={{ minHeight: 'calc(100vh - 11rem)' }}>
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
                                        <Td className='font-bold w-2/3 '>{applicant.name}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td className='p-6  w-1/3 '>E-mail</Td>
                                        <Td className='font-bold w-2/3 '>{applicant.email}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td className='p-6  w-1/3 '>Státusz</Td>
                                        <Td className='font-bold w-2/3 '>{applicant.status}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td className='p-6  w-1/3 font-bold'>Munkatapasztalat</Td>

                                    </Tr>
                                </Tbody>
                            </Table>

                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Profile