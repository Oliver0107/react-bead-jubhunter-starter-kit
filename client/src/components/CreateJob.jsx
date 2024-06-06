import React from 'react'
import Navbar from './Navbar'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Select, Textarea, Checkbox } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
const CreateJob = () => {


    const user = useSelector(state => state.user.value);
    const token = user.loginCode;
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [salaryFrom, setSalaryFrom] = useState('');
    const [salaryTo, setSalaryTo] = useState('');
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const [homeOffice, setHomeOffice] = useState('');

    const navigate = useNavigate();

    const handleCompany = (e) => {
        setCompany(e);
    }
    const handlePosition = (e) => {
        setPosition(e);
    }
    const handleDescription = (e) => {
        setDescription(e);
    }
    const handleSalaryFrom = (e) => {
        setSalaryFrom(e);
    }
    const handleSalaryTo = (e) => {
        setSalaryTo(e);
    }
    const handleType = (e) => {
        setType(e);
    }
    const handleCity = (e) => {
        setCity(e);
    }
    const handleHomeOffice = (e) => {
        setHomeOffice(e);
    }

    const handleCreateJob = () => {
        console.log(company, position, description, salaryFrom, salaryTo, type, city, homeOffice);
        axios.post("http://localhost:3030/jobs/1", {
            company: company,
            position: position,
            description: description,
            salaryFrom: parseInt(salaryFrom),
            salaryTo: parseInt(salaryTo),
            type: type,
            city: city,
            homeOffice: homeOffice
        },

            {
                headers: {
                    'Authorization': `Bearer ${token}`  // Bearer token hozzáadása a kérés fejlécéhez
                }
            }
        )
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='h-screen'>
            <Navbar page={"Hirdetés hozzáadása"} />
            <div className=' flex bg-slate-100 items-center flex-col' style={{ minHeight: 'calc(100vh - 11rem)' }}>
                <div className='w-[60vw] bg-white h-max mt-14 p-8 rounded-md'>
                    <div className='flex flex-row gap-8 w-[100%]'>
                        <div className=' flex flex-col gap-5 w-1/2'>
                            <div>
                                <div className='mb-2'>Cégnév</div>
                                <Input onChange={(e) => handleCompany(e.target.value)} height={"40px"} type='text' size='lg' />
                            </div>
                            <div>
                                <div className='mb-2'>Foglalkoztatás típusa</div>
                                <Select size='lg' onChange={(e) => handleType(e.target.value)}>
                                    <option value='full-time'>Teljes munkaidős</option>
                                    <option value='part-time'>Részmunkaidős</option>
                                    <option value='internship'>Gyakornoki</option>
                                </Select>
                            </div>
                            <div>
                                <div className='mb-2'>Település</div>
                                <Input height={"40px"} type='text' size='lg' onChange={(e) => handleCity(e.target.value)} />
                            </div>
                        </div>
                        <div className=' flex flex-col gap-5 w-1/2'>
                            <div>
                                <div className='mb-2'>Pozíció neve</div>
                                <Input height={"40px"} type='text' size='lg' onChange={(e) => handlePosition(e.target.value)} />
                            </div>
                            <div className='flex flex-col h-full'>
                                <div className='mb-2'>Leírás</div>
                                <Textarea size='lg' resize={"none"} h="full" onChange={(e) => handleDescription(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between flex-row mt-4'>
                        <Checkbox onChange={(e) => handleHomeOffice(e.target.checked)} >Home Office lehetőség</Checkbox>
                        <div>
                            <div className='mb-2'>Fizetési sáv alja</div>
                            <Input height={"40px"} type='number' size='lg' onChange={(e) => handleSalaryFrom(e.target.value)} />
                        </div>
                        <div>
                            <div className='mb-2'>Fizetési sáv teteje</div>
                            <Input height={"40px"} type='number' size='lg' onChange={(e) => handleSalaryTo(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <Button size='lg' colorScheme='blue' onClick={handleCreateJob}>
                        Cég hozzáadása
                    </Button>
                </div>

            </div>
        </div >
    )
}

export default CreateJob