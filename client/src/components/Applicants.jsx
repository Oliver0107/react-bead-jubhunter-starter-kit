import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Applicants = ({ jobId }) => {
    const [applicants, setApplicants] = useState([]);
    const user = useSelector(state => state.user.value);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3030/applicants?jobId=' + jobId, {
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
    }, [])

    const onViewApplicant = (applicantId) => {
        navigate("/applicantdetails/" + applicantId);
    }

    return (
        <>
            {
                applicants.map((applicant, index) => (
                    <div key={index} className='bg-white p-8 w-[100%] mb-4 shadow-lg flex justify-center'>
                        <div className=' cursor-pointer' onClick={() => onViewApplicant(applicant.id)}>
                            <h1 className='text-2xl font-bold'>{applicant.user.fullname}</h1>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Applicants