
import { Pagination } from '@/core/components'
import React, { useEffect, useState } from 'react'

const Test3 = () => {
    const monthText = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    const [month, setMonth] = useState<string[]>(monthText)
    const [input, setInput] = useState<string>('')
    // const findMonth = (index: number): string => {
    //     const num = index - 1
    //     return monthText[num]
    // }
    // const filter = () => {
    //     return monthText.filter(texxt => texxt !== 'jan')

    // }
    // const result = filter()
    // console.log(result)s
    const jobs = { job1: '', job2: '' }
    const [real, setReal] = useState<boolean | null>(null)
    // console.log(jobs);

    // const infos = {
    //     jobs: {
    //         job1: 'nurse',
    //         job2: 'wrtier'
    //     },
    //     birthyear: '1997'
    // }

    console.log(jobs);


    // console.log(jobs);

    useEffect(() => {
        const result = monthText.filter((month) => month.toLowerCase().replace(/\s/g, '').includes(input.toLowerCase().replace(/\s/g, '')))
        const result1 = monthText.includes(input.toLowerCase().replace(/\s/g, ''))
        setMonth(result)
        if (result1) {
            setReal(true)
        } else { setReal(false) }
    }, [input])

    return (
        <div>
            <input type="text" placeholder='search month' onChange={(e) => setInput(e.target.value)} />
            {month.length ? month.map((mon, index) => <div key={index}>
                {!real ? <p key={index} className={`${real ? 'bg-red-200' : ''} `}>{mon}</p> : <mark key={index}  >{mon}</mark>}

            </div>) : 'no result'
            }
            <Pagination />
        </div >
    )
}

export default Test3