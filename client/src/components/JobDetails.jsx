import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'

import { Button, Table, Tbody, Tr, Td, useToast } from '@chakra-ui/react'

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState({});
    const user = useSelector(state => state.user.value);
    const [applicants, setApplicants] = useState([]);
    const [isApplicantForThisJob, setIsApplicantForThisJob] = useState(false);

    const toast = useToast();

    useEffect(() => {
        axios.get(`http://localhost:3030/jobs/${id}`)
            .then(res => {
                setJob(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        axios.get('http://localhost:3030/applicants?jobId=' + id, {
            headers: {
                'Authorization': `Bearer ${user.loginCode}`
            }
        })
            .then(res => {
                setApplicants(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        applicants.forEach(applicant => {
            if (applicant.userId == user.id) {
                setIsApplicantForThisJob(true);

            }
        })
    }, [])

    const onApplyForJob = (jobId) => {
        axios.post('http://localhost:3030/applicants', { jobId: jobId },
            {
                headers: {
                    'Authorization': `Bearer ${user.loginCode}`
                }
            }
        )
            .then(() => {
                setIsApplicantForThisJob(true);
                return (toast({
                    title: 'Jelentkezés sikeres!',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                }))
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const onUnapplyForJob = (jobId) => {
        axios.delete('http://localhost:3030/applicants?jobId=' + jobId, {
            headers: {
                'Authorization': `Bearer ${user.loginCode}`
            }
        })
            .then(() => {
                setIsApplicantForThisJob(false);
                return (toast({
                    title: 'Lejelentkezés sikeres!',

                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                }))
            })
            .catch((err) => {
                console.log(err);
            })

    }


    return (
        <div className='h-screen'>
            <Navbar page={job.company} job={job} />
            <div className=' flex bg-slate-100 justify-center' style={{ minHeight: 'calc(100vh - 11rem)' }}>

                <div className='w-[60vw] bg-white h-max mt-14 pt-8 rounded-md shadow-lg'>
                    <div className='flex justify-center mb-8 mx-8'>
                        <div className=' w-1/2 '>
                            <h1 className='text-3xl font-semibold'>Cég részletei</h1>
                            <h3>Megtetszett a lehetőség? Jelentkezz!</h3>
                        </div>
                        <div className=' w-1/2 flex justify-end items-center'>
                            {user.role == "jobseeker" && !isApplicantForThisJob && <Button size='md' colorScheme='blue' onClick={() => onApplyForJob(job.id)}>Jelentkezés</Button>}
                            {user.role == "jobseeker" && isApplicantForThisJob && <Button size='md' colorScheme='red' onClick={() => onUnapplyForJob(job.id)}>Lejelentkezés</Button>}
                        </div>
                    </div>
                    <div>
                        <Table variant={"striped"} colorScheme='gray'>

                            <Tbody>
                                <Tr>
                                    <Td className='p-6  w-1/3 '>Név</Td>
                                    <Td className='font-semibold w-2/3 '>{job.company}</Td>
                                </Tr>
                                <Tr>
                                    <Td className='p-6  w-1/3 '>Pozíció</Td>
                                    <Td className='font-semibold w-2/3 '>{job.position}</Td>
                                </Tr>
                                <Tr>
                                    <Td className='p-6  w-1/3 '>Leírás</Td>
                                    <Td className='font-semibold w-2/3 '>{job.description}</Td>
                                </Tr>
                                <Tr>
                                    <Td className='p-6  w-1/3 '>Fizetési sáv</Td>
                                    <Td className='p-6  w-2/3 font-semibold'>Bruttó {job.salaryFrom} - {job.salaryTo} Ft</Td>
                                </Tr>
                                <Tr>
                                    <Td className='p-6  w-1/3 '>Foglalkoztatás típusa</Td>
                                    <Td className='p-6  w-2/3 font-semibold'>{job.type == "full-time" ? "Teljes munkaidős" : (job.type == "part-time" ? "Részmunkaidős" : "Gyakornoki")}</Td>
                                </Tr>
                                <Tr>
                                    <Td className='p-6  w-1/3 '>Település</Td>
                                    <Td className='p-6  w-2/3 font-semibold'>{job.city}</Td>
                                </Tr>
                                <Tr>
                                    <Td className='p-6  w-1/3 '>Home Office</Td>
                                    <Td className='p-6  w-2/3 font-semibold'>{job.homeOffice == 1 ? 'Van' : 'Nincs'}</Td>
                                </Tr>
                            </Tbody>
                        </Table>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default JobDetails