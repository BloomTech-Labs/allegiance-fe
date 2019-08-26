import React from "react"
import { useSelector } from 'react-redux'

const TestRedux = () => {
    const user = useSelector(state => state.userReducer.loggedInUser);

    console.log(user)

    return (
        <div />
    )
}

export default TestRedux;