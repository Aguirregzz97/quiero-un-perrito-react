import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Grid, TextField, Button } from '@material-ui/core'
import { getApiBaseUrl } from '../shared/GetApiBaseUrl'
import { auth } from './../shared/Firebase'
import Swal from 'sweetalert2'


type UserLogin = {
    Email: string,
    Password: string,
}


export default function Login() {

    const [userLogin, setUserLogin] = useState<UserLogin>({
        Email: '',
        Password: '',
    })

    function updateUserLogin(setFunc: (userInstance: UserLogin, val: string) => void) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!userLogin) {
                return
            }
            let newUser = { ...userLogin }
            setFunc(newUser, event.target.value)
            setUserLogin(newUser)
        }
    }

    const loginUser = async () => {
        try {
            auth.signInWithEmailAndPassword(userLogin.Email, userLogin.Password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
        }
        catch(error) {
            console.log(error)
        }
        await Swal.fire({
            icon: 'success',
            title: 'Login correcto!',
        })
        window.location.href = 'http://localhost:8080/#/'

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
                    style={{ height: '40%' }}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >
                <h3>Iniciar Sesión</h3>
                    <TextField onChange={ updateUserLogin((userInstance, val) => { userInstance.Email = val }) } label='Correo' variant="outlined" />
                    <TextField onChange={ updateUserLogin((userInstance, val) => { userInstance.Password = val }) } label='Contraseña' variant="outlined" />
                    <Button onClick={ loginUser } style={{ padding: '1em 2em' }} variant="contained" color="primary">Entrar</Button>
                </Grid>
            </Grid>

    )
}