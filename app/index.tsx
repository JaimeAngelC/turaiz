import React from 'react'
import { Redirect } from 'expo-router'

const index = () => {
    return <Redirect href={'/(uber-app)/home/welcome'} />
}

export default index