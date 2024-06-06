
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar'
import { Button, Input, Select, Textarea, Checkbox } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModifyJob = () => {
    const user = useSelector(state => state.user.value);
    const token = user.loginCode;
    const { id } = useParams();

    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [salaryFrom, setSalaryFrom] = useState('');
    const [salaryTo, setSalaryTo] = useState('');
    const [type, setType] = useState('full-time');
    const [city, setCity] = useState('');
    const [homeOffice, setHomeOffice] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3030/jobs/' + id)
            .then(res => {
                setCompany(res.data.company);
                setPosition(res.data.position);
                setDescription(res.data.description);
                setSalaryFrom(res.data.salaryFrom);
                setSalaryTo(res.data.salaryTo);
                setType(res.data.type);
                setCity(res.data.city);
                console.log(res.data.homeOffice);
                const value = res.data.homeOffice == 1 ? true : false;
                setHomeOffice(value);
                console.log(homeOffice);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

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

    const handleModifyJob = () => {
        console.log(company, position, description, salaryFrom, salaryTo, type, city, homeOffice);
        axios.patch("http://localhost:3030/jobs/" + id, {
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
                    'Authorization': `Bearer ${token}`
                }
            }
        ).then((res) => {
            console.log(res);
            navigate("/profile");
        })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='h-screen'>
            <Navbar page={company + " szerkesztése"} />
            <div className=' flex bg-slate-100 items-center flex-col' style={{ minHeight: 'calc(100vh - 11rem)' }}>
                <div className='w-[60vw] bg-white h-max mt-14 p-8 rounded-md'>
                    <div className='flex flex-row gap-8 w-[100%]'>
                        <div className=' flex flex-col gap-5 w-1/2'>
                            <div>
                                <div className='mb-2'>Cégnév</div>
                                <Input onChange={(e) => handleCompany(e.target.value)} value={company} height={"40px"} type='text' size='lg' />
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
                                <Input height={"40px"} type='text' size='lg' onChange={(e) => handleCity(e.target.value)} value={city} />
                            </div>
                        </div>
                        <div className=' flex flex-col gap-5 w-1/2'>
                            <div>
                                <div className='mb-2'>Pozíció neve</div>
                                <Input height={"40px"} type='text' size='lg' onChange={(e) => handlePosition(e.target.value)} value={position} />
                            </div>
                            <div className='flex flex-col h-full'>
                                <div className='mb-2'>Leírás</div>
                                <Textarea size='lg' resize={"none"} h="full" onChange={(e) => handleDescription(e.target.value)} value={description} />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between flex-row mt-4'>
                        <Checkbox onChange={(e) => handleHomeOffice(e.target.checked)} isChecked={homeOffice} >Home Office lehetőség</Checkbox>
                        <div>
                            <div className='mb-2'>Fizetési sáv alja</div>
                            <Input height={"40px"} type='number' size='lg' onChange={(e) => handleSalaryFrom(e.target.value)} value={salaryFrom} />
                        </div>
                        <div>
                            <div className='mb-2'>Fizetési sáv teteje</div>
                            <Input height={"40px"} type='number' size='lg' onChange={(e) => handleSalaryTo(e.target.value)} value={salaryTo} />
                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <Button size='lg' colorScheme='blue' onClick={handleModifyJob}>
                        Változtatások mentése
                    </Button>
                </div>

            </div>
        </div >
    )
}


export default ModifyJob