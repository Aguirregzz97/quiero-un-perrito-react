import * as React from 'react'
import { useState, useEffect } from 'react'
import { Grid, TextField, Button, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import { getApiBaseUrl } from '../shared/GetApiBaseUrl'
import Select from '@material-ui/core/Select';
import * as firebase from 'firebase/app'
import 'firebase/functions'
import 'firebase/firestore'


type UserPreferences = {
    city: string,
    size: string,
}

type Metadata = {
    cities: Array<string>,
    sizes: Array<string>,
}


export default function Preferences() {
    const [userPreferences, setUserPreferences] = useState<UserPreferences>({
        city: '',
        size: '',
    })

    const [metadata, setMetadata] = useState<Metadata>({
        cities: [],
        sizes: [],
    })

    const fetchMetadata = async () => {
        let getMetadata = firebase.functions().httpsCallable('getMetadata');
        getMetadata({token: "letMeIn"}).then(function(result) {
            const data = result.data
            setMetadata({
                cities: data.cities,
                sizes: data.sizes,
            })
        });
    }

    useEffect(() => {
        fetchMetadata()
    }, [])


    function updateUserPreferences(setFunc: (userInstance: UserPreferences, val: string) => void) {
        return (event: any) => {
            if (!userPreferences) {
                return
            }
            let newPreferences = { ...userPreferences }
            setFunc(newPreferences, event.target.value)
            setUserPreferences(newPreferences)
        }
    }

    function postState(){
        UserCollection.doc()
    }

    const grid = (
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
            <h3>Preferencias de perro</h3>
                <FormControl variant="outlined">
                <InputLabel>Ubicación</InputLabel>
                    <Select
                    onChange={ updateUserPreferences((userInstance, val) => { userInstance.city = val }) }
                    label="Ciudad"
                    >
                        {metadata.cities.map((city) => {
                            return (
                            <MenuItem value={city}>{city}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl variant="outlined">
                <InputLabel>Tamaño de perro</InputLabel>
                    <Select
                    onChange={ updateUserPreferences((userInstance, val) => { userInstance.size = val }) }
                    label="Tamaño"
                    >
                        {metadata.sizes.map((size) => {
                            return (
                            <MenuItem value={size}>{size}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <Button onClick={ fetchMetadata } style={{ padding: '1em 2em' }} variant="contained" color="primary">Guardar</Button>
            </Grid>
        </Grid>
    )

    return <>{grid}</>
}