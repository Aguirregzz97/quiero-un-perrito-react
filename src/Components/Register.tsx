import * as React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Grid, TextField, Button } from '@material-ui/core'
import { getApiBaseUrl } from '../shared/GetApiBaseUrl'


type UserRegistration = {
    Email: string,
    Password: string,
    FirstName: string,
    LastName: string,
}


export default function Register() {

    const [userRegistration, setUserRegistration] = useState<UserRegistration>({
        Email: '',
        Password: '',
        FirstName: '',
        LastName: '',
    })

    function updateUserRegistration(setFunc: (userInstance: UserRegistration, val: string) => void) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!userRegistration) {
                return
            }
            let newUser = { ...userRegistration }
            setFunc(newUser, event.target.value)
            setUserRegistration(newUser)
        }
    }

    const registerUser = async () => {
        const response = await fetch(`${getApiBaseUrl()}helloWorld`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                data: 'YES',
            })
        })
        console.log(await response.json())
    }

    return (
            <Grid
                style={{ height: '100%' }}
                container
                direction='row'
                justify='center'
                alignItems='center'
            >
                <Grid
                    style={{ height: '53%' }}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >
                <h3>¡Regístrate!</h3>
                    <TextField onChange={ updateUserRegistration((userInstance, val) => { userInstance.Email = val }) } label='Correo' variant="outlined" />
                    <TextField onChange={ updateUserRegistration((userInstance, val) => { userInstance.Password = val }) } label='Contraseña' variant="outlined" />
                    <TextField onChange={ updateUserRegistration((userInstance, val) => { userInstance.FirstName = val }) } label='Nombre' variant="outlined" />
                    <TextField onChange={ updateUserRegistration((userInstance, val) => { userInstance.LastName = val }) } label='Apellido' variant="outlined" />
                    <Button onClick={ registerUser } style={{ padding: '1em 2em' }} variant="contained" color="primary">Registrar</Button>
                </Grid>
            </Grid>

    )
}