import React from 'react'
import Loader from 'react-loader-spinner'

export default function LoadingPage() {
    return (
        <div style={{backgroundColor: 'black', height: '100vh', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
                <Loader
                    type="Hearts"
                    color="red"
                    height={500}
                    width={500}
                />
        </div>
    )
}
