import React, { useEffect, useState } from 'react';
import axiosHelper from '../lib/axiosHelper';

export default function RequestList() {

    const [data, setData] = useState([]);

    const getRequests = async () => {
        try {
            const response = await axiosHelper('/api/request/list', 'POST');
            setData(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        getRequests();
    }, []);

    if (!data) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className='container mt-3'>
            <div className='ml-3 mb-3'>
                <h3>Request List</h3>
            </div>

            <div className='row'>
                <div className='col'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Playlist</th>
                                <th scope='col'>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((request, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope='row'>{index + 1}</th>
                                        <td>{request.name}</td>
                                        <td>{request.email}</td>
                                        <td>{request.playlist}</td>
                                        <td>{request.message}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
