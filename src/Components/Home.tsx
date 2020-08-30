import * as React from 'react'
import { useState, useEffect } from 'react'
import { UserModel } from '../shared/DataTypes'
import { RestApi } from '../shared/RestApi'
import { useCurrentUser } from '../shared/UserHelper'
import { FixedSizeList } from 'react-window'
import { ListItem, ListItemText, List, ListSubheader, Grid, Modal, Dialog } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Login from './Login'


export default function Home() {

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [currentDog, setCurrentDog] = useState({})

   const currentUser = {
        UserID: 0,
        FirstName: 'Andres',
        LastName: 'Aguirre',
        Email: 'aguirregzz97@gmail.com',
        ProfilePicture: 'https://avatars2.githubusercontent.com/u/19846404?s=460&u=354d26e31cbb09b30bfbc1711fb879f0c1eb1f47&v=4',
        Password: 'password',
        isAdopting: true,
    }

    const showDogInfo = (item: any) => {
        return (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
            setCurrentDog({
                name: 'doggo'
            })
            setModalOpen(true)
        }
    }

    const handleClose = () => {
        setModalOpen(false)
    }



    if (currentUser.isAdopting) {
        return (
            <>
                <Dialog
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                    <h5>{currentDog}</h5>
                </Dialog>
                <Grid
                    style={{ paddingTop: '50px' }}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >
                <h4>¡Personas que quieren adoptar!</h4>
                <List subheader={<li />}>
                    <ul>
                        {[0, 1, 2, 3].map((item) => (
                        <ListItem key={`item- 1${item}`}>
                            <img onClick={ showDogInfo(item) } style={{ width: '75px', borderRadius: '50%', marginRight: '10%' }} src='https://avatars2.githubusercontent.com/u/19846404?s=460&u=354d26e31cbb09b30bfbc1711fb879f0c1eb1f47&v=4' />
                            <ListItemText primary={`Perro ${item}`} />
                        </ListItem>
                        ))}
                    </ul>
                </List>
                </Grid>
            </>


        )
    } else {
        return (
            <div>
                <h1>view when not adopting</h1>
            </div>
        )
    }

}