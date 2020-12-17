import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Typography from '@material-ui/core/Typography';

export default function History(){
    const [history, setHistory] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.post('/gethistory')
            if(result.data.success === true){
                setHistory(result.data.results)
            }
        }
        fetchData()
    }, [])
    return (
        <>
        {history && history.length > 0 ? history.map((data) => (
            <Typography key={data.id} align="center" gutterBottom>{data.firstname + " " + data.lastname}</Typography>
        )) : "No data now"} 
        </>
    )
}