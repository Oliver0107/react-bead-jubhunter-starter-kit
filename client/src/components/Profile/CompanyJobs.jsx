import { Button } from '@chakra-ui/react'
import React from 'react'
import { useEffect, useState } from 'react';

import axios from 'axios';
const CompanyJobs = () => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3030/jobs')
            .then(res => {
                setJobs(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const onModifyJob = () => {
        console.log('Modify job')
    }

    const onViewJobDetails = () => {
        console.log('View job details')
    }

    const onDeleteJob = () => {
        console.log('Delete job')
    }


    return (
        <div>
            {
                jobs.map((job, index) => (
                    <div key={index} className='bg-white p-8 w-[100%] mb-4 flex flex-row shadow-lg'>
                        <div className='w-2/3'>
                            <h1 className='text-4xl font-bold'>{job.position}</h1>
                            <div className='flex flex-row gap-4 mt-2 text-zinc-500'>
                                <h3>{job.type}</h3>
                                <h3>{job.homeOffice == 1 ? 'Remote' : 'Not remote'}</h3>
                                <h1 >{job.salaryFrom} - {job.salaryTo} Ft</h1>
                            </div>
                        </div>
                        <div className='flex w-1/3 gap-3 justify-end items-center'>
                            <Button size='lg' onClick={onModifyJob} >Szerkesztés</Button>
                            <Button size='lg' onClick={onViewJobDetails} >Megtekintés</Button>
                            <Button size='lg' colorScheme='red' onClick={onDeleteJob} >Törlés</Button>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default CompanyJobs