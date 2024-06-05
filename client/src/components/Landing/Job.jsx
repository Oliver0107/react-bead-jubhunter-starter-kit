import React from 'react';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/jobdetails/${job.id}`)
    }
    return (
        <tr className='border-t-2 cursor-pointer' onClick={handleClick}>
            <td className='w-1/2'>
                <h1 className='font-bold'>{job.position}</h1>
                <h3>{job.city}</h3>
            </td>
            <td className='w-1/4'>
                {job.homeOffice == 1 && 'Home Office'}
            </td>
            <td className='w-1/4 text-right'>
                <h1 className='font-bold'>{job.salaryFrom} - {job.salaryTo} Ft</h1>
                <h3>{job.type}</h3>
            </td>
        </tr>
    );
}

export default Job;
