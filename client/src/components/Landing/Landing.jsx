import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import Job from './Job';

import { Button, Input, Table } from '@chakra-ui/react'

const Landing = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user.value);
    const [jobs, setJobs] = useState([]);
    console.log(user);

    useEffect(() => {
        axios.get('http://localhost:3030/jobs')
            .then(res => {
                setJobs(res.data.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        < div>
            <Navbar />
            <div className='  flex justify-center'>
                <div className='w-[60vw] h-max p-4 mt-4'>
                    <h1 className=' text-3xl font-semibold'>Böngéssz az állások között:</h1>
                    <div className='flex flex-row gap-4 mt-2'>
                        <Input size='lg' />
                        <Button size='lg' colorScheme='blue'>Keresés</Button>
                        <Button size='lg' >Szűrés</Button>
                    </div>

                    <Table className='mt-5' w={"90%"} align='center' variant='simple'>
                        <thead>
                            <tr className='text-left'>
                                <th className=' font-normal  '  >Állás neve</th>
                            </tr>
                        </thead>
                        <tbody >
                            {jobs.map((job, index) => (
                                <Job key={index} {...job} />
                            ))}

                        </tbody>
                    </Table>

                </div>

            </div>
        </div>




    )
}

export default Landing;