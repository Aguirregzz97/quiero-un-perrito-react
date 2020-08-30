import * as React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

const CenterBox = styled.div`
    display: grid;
    place-items: center;
    color: red;
`


type UserRegistration = {
    email: string,
    password: string,
}

const [userRegistration, setUserRegistration] = useState<UserRegistration>()



export default function Register() {
    return (
        <CenterBox>
            <h1>This is Registration</h1>
        </CenterBox>
    )
}