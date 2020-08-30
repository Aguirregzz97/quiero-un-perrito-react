import * as React from 'react'
import { useState, useEffect } from 'react'
import { Grid, TextField, Button, FormControl, InputLabel, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { getApiBaseUrl } from '../shared/GetApiBaseUrl'
import { UserCollection } from '../shared/Collections'
import { useCurrentUser } from '../shared/UserHelper'
import { UserModel } from '../shared/DataTypes'
import Swal from 'sweetalert2'
import Select from '@material-ui/core/Select';
import * as firebase from 'firebase/app'
import 'firebase/functions'
import 'firebase/firestore'



type UserPreferences = {
    location: string,
    size: string,
    type: string,
}

type Metadata = {
    locations: Array<string>,
    sizes: Array<string>,
}

type CurrentUser = {
    currentUser: any
}


export default function Preferences() {
    const [userPreferences, setUserPreferences] = useState<UserPreferences>({
        location: '',
        size: '',
        type: ''
    })

    const [metadata, setMetadata] = useState<Metadata>({
        locations: [],
        sizes: [],
    })

    const currentUser = useCurrentUser<UserModel>()

    const fetchMetadata = () => {
        let getMetadata = firebase.functions().httpsCallable('getMetadata');
        getMetadata({token: "letMeIn"}).then(function(result) {
            const data = result.data
            setMetadata({
                locations: data.cities,
                sizes: data.sizes,
            })
        });
    }

    const fetchUserData = () => {
        console.log(currentUser)
        if(currentUser){
            UserCollection.doc(currentUser.uid).get().then((response) => {
                let data = response.data() as UserModel
                setUserPreferences({
                    location: data.location,
                    size: data.size ? data.size : "small",
                    type: data.type,
                })
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: error,
                })
            })
        }
    }

    useEffect(() => {
        fetchMetadata()
    }, [])

    useEffect(() => {
        currentUser && fetchUserData()
    }, [currentUser])


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
        if(currentUser){
            let updateObj = {
                location: userPreferences.location,
                size: userPreferences.size,
                type: userPreferences.type,
            }
            UserCollection.doc(currentUser.uid).update(updateObj).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Datos guardados exitosamente!',
                })
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: error,
                })
            })
        }
        
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
                style={{ height: '75%', flexWrap: 'nowrap'}}
                container
                direction="column"
                justify="space-between"
                alignItems="center"
            >
            <h3>Preferencias</h3>
            <FormControl component="fieldset">
                <RadioGroup value={userPreferences.type} onChange={  updateUserPreferences((userInstance, val) => { userInstance.type = val }) }>
                <FormControlLabel value="seeker" control={<Radio />} label="Adopto" />
                <FormControlLabel value="owner" control={<Radio />} label="Doy en adopción" />
                </RadioGroup>
            </FormControl>
            <h3>Preferencias de perros</h3>
                <FormControl variant="outlined" style={{ width: '15em' }}>
                <InputLabel>Ubicación</InputLabel>
                    <Select
                    value={userPreferences.location}
                    onChange={ updateUserPreferences((userInstance, val) => { userInstance.location = val }) }
                    label="Ciudad"
                    >   
                        {metadata.locations && metadata.locations.map((location) => {
                            return (
                            <MenuItem key={location} value={location}>{location}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" style={{ width: '15em' }}>
                <InputLabel>Tamaño</InputLabel>
                    <Select
                    value={userPreferences.size || "Small"}
                    onChange={ updateUserPreferences((userInstance, val) => { userInstance.size = val }) }
                    label="Tamaño"
                    >   
                        {metadata.sizes && metadata.sizes.map((size) => {
                            let label = ''
                            switch(size) {
                                case 'small':
                                    label = "Pequeño"
                                    break
                                case 'medium':
                                    label = "Mediano"
                                    break
                                case 'large':
                                    label = "Grande"
                                    break
                                default:
                                    label=size
                            }
                            
                            return (
                            <MenuItem key={size} value={size}>{label}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <Button onClick={ postState } style={{ padding: '1em 2em' }} variant="contained" color="primary">Guardar</Button>
            </Grid>
        </Grid>
    )

    return <>{grid}</>
}