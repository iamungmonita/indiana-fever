import React, { useEffect, useState } from 'react'
import { FormDataInterface } from './form'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Items = () => {
    const [items, setItems] = useState<FormDataInterface[]>([])
    useEffect(() => {
        fetch('http://localhost:4002/items', {
            method: 'GET'
        }).then((res) => res.json()).then((data) => setItems(data.items || []))
    }, [items])
    return (
        <div className='p-12 w-[600px] ' >
            <TableContainer component={Paper} className='overflow-scroll h-96' >
                <Table >
                    <TableHead className='bg-gray-200'>
                        <TableRow className='font-bold'>
                            <TableCell className='font-bold'>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className=' overflow-scroll'>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center">No items available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Items