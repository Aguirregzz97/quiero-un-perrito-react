import * as React from 'react';
import { useState, useEffect } from 'react';
import { UserModel, Dog } from '../shared/DataTypes';
import { RestApi } from '../shared/RestApi';
import { useCurrentUser } from '../shared/UserHelper';
import { FixedSizeList } from 'react-window';
import { ListItem, ListItemText, List, ListSubheader, Grid, Modal, Dialog, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Login from './Login';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import { AdoptionRequestsCollection } from '../shared/collections';

const getEmptyDoggo = (): Dog => {
    return {
        uid: '',
        name: '',
        owner_id: '',
        bio: 'Se acabaron los perritos de tu zona. :(',
        images: [],
        size: 'small',
        breed: '',
        age: -1,
    };
};

export default function Home() {

    const [index, setIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [currentDog, setCurrentDog] = useState({});
    const [currentDoggo, setCurrentDoggo] = useState(getEmptyDoggo());
    const [nearbyDogs, setNearbyDogs] = useState(new Array<Dog>());

    const currentUser = useCurrentUser<UserModel>();

    const showDogInfo = (item: any) => {
        return (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
            setCurrentDog({
                name: 'doggo'
            });
            setModalOpen(true);
        };
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const getNearbyDogs = async () => {
        let getDogsFromMyArea = firebase.functions().httpsCallable('getDogsFromMyArea');
        getDogsFromMyArea({ token: "letMeIn" }).then(function (result) {
            setNearbyDogs(result.data.dogs as Array<Dog>);
        });
    };

    const createAdoptionRequest = async (dog: Dog) => {
        if (!currentUser) return "FAILED";
        const result = await AdoptionRequestsCollection.add(
            {
                dog_id: dog.uid,
                owner_id: dog.owner_id,
                seeker_id: currentUser.uid,
                reason_description: 'Me encanto! #poggers',
                datetime: Math.floor(Date.now() / 1000),
            }
        );
        return result ? "SUCCESS" : "FAILED";
    };

    useEffect(() => {
        getNearbyDogs();
    }, []);

    const onClickYes = async () => {
        createAdoptionRequest(currentDoggo);
        setIndex(index + 1);
    };

    const onClickNo = async () => {
        setIndex(index + 1);
    };

    useEffect(() => {
        console.log(index);
        console.log(nearbyDogs);
        if (nearbyDogs && index < nearbyDogs.length) {
            setCurrentDoggo(nearbyDogs[index]);
        } else {
            setCurrentDoggo(getEmptyDoggo());
        }
    }, [index, nearbyDogs]);

    if (currentUser && currentUser.type !== 'owner') {
        console.log(currentUser);
        return (
            <>
                <Dialog
                    open={modalOpen}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <h5>hola</h5>
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
                                    <img onClick={showDogInfo(item)} style={{ width: '75px', borderRadius: '50%', marginRight: '10%' }} src='https://avatars2.githubusercontent.com/u/19846404?s=460&u=354d26e31cbb09b30bfbc1711fb879f0c1eb1f47&v=4' />
                                    <ListItemText primary={`Perro ${item}`} />
                                </ListItem>
                            ))}
                        </ul>
                    </List>
                </Grid>
            </>
        );
    } else {
        return (
            <>
                <Grid
                    style={{ paddingTop: '50px' }}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center">
                    <>
                        <img style={{ width: '100%', height: '80%' }} src={currentDoggo.images[0]} />
                        <h3>{currentDoggo.name}</h3>
                        <p>{currentDoggo.bio}</p>
                        <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                            alignItems="center"
                        >
                            <Button style={{ marginRight: '10px' }} onClick={onClickNo} variant="contained" color="secondary">Noooo :(</Button>
                            <Button onClick={onClickYes} variant="contained" color="primary">Adoptar!</Button>
                        </Grid>
                    </>
                </Grid>
            </>
        );
    }
};