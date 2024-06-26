import { Button } from '@chakra-ui/react'
import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'

import axios from 'axios';
import Applicants from '../Applicants';
const CompanyJobs = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [jobs, setJobs] = useState([]);
    const [activeJobId, setActiveJobId] = useState(null);
    const user = useSelector(state => state.user.value);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3030/jobs?userId=' + user.id)
            .then(res => {
                setJobs(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const onModifyJob = (jobId) => {
        navigate(`/modifyjob/${jobId}`);
    }

    const onDeleteJob = (jobId) => {
        axios.delete('http://localhost:3030/jobs/' + jobId, {
            headers: {
                'Authorization': `Bearer ${user.loginCode}`
            }
        })
            .then(() => {
                setJobs(jobs.filter(job => job.id !== jobId));
            })
            .catch(err => {
                console.log(err);
            })
    }
    const onViewJob = (jobId) => {
        setActiveJobId(jobId);
        onOpen();
    }


    return (
        <div>
            {
                jobs.map((job, index) => (
                    <div key={index} className='bg-white p-8 w-[100%] mb-4 flex flex-row shadow-lg'>
                        <div className='w-2/3'>
                            <h1 className='text-4xl font-bold'>{job.position}</h1>
                            <div className='flex flex-row gap-4 mt-2 text-zinc-500'>
                                <h3>{job.type == "full-time" ? "Teljes munkaidős" : (job.type == "part-time" ? "Részmunkaidős" : "Gyakornoki")}</h3>
                                <h3>{job.homeOffice == 1 ? 'Remote' : 'Not remote'}</h3>
                                <h1 >{job.salaryFrom} - {job.salaryTo} Ft</h1>
                            </div>
                        </div>
                        <div className='flex w-1/3 gap-3 justify-end items-center'>
                            <Button size='lg' onClick={() => onModifyJob(job.id)} >Szerkesztés</Button>
                            <Button size='lg' onClick={() => onViewJob(job.id)} >Megtekintés</Button>
                            <Button size='lg' colorScheme='red' onClick={() => onDeleteJob(job.id)} >Törlés</Button>
                        </div>

                    </div>
                ))
            }
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Jelentkezők</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Applicants jobId={activeJobId} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Bezárás
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CompanyJobs