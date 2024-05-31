import React from 'react';

const Job = ({ position, city, type, salaryFrom, salaryTo, homeOffice }) => {
    const handleClick = () => {
        console.log('clicked')
    }
    return (
        <tr className='border-t-2 cursor-pointer' onClick={handleClick}>
            <td className='w-1/2'>
                <h1 className='font-bold'>{position}</h1>
                <h3>{city}</h3>
            </td>
            <td className='w-1/4'>
                {homeOffice == 1 && 'Home Office'}
            </td>
            <td className='w-1/4 text-right'>
                <h1 className='font-bold'>{salaryFrom} - {salaryTo} Ft</h1>
                <h3>{type}</h3>
            </td>
        </tr>
    );
}

export default Job;
