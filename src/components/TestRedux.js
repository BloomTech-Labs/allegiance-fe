import React from "react"
import { useSelector } from 'react-redux'

const TestRedux = () => {
    const users = useSelector(state => state.userReducer.users);

    console.log(users)

    return (
        <div />
    )
}

export default TestRedux;