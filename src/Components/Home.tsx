import * as React from 'react';
import { useState, useEffect } from 'react';
import { UserModel, Dog, AdoptionRequestModel } from '../shared/DataTypes';
import { RestApi } from '../shared/RestApi';
import { useCurrentUser } from '../shared/UserHelper';
import { FixedSizeList } from 'react-window';
import { ListItem, ListItemText, List, ListSubheader, Grid, Modal, Dialog, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Login from './Login';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import { AdoptionRequestsCollection } from '../shared/collections';
import { functions } from './../shared/Firebase'
import styled from 'styled-components'

const Container = styled.div`
`

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
    const [currentAdoptionRequests, setCurrentAdoptionRequests] = useState<AdoptionRequestModel[]>()
    const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0)

    const currentUser = useCurrentUser<UserModel>();

    const fetchCurrentMatches = () => {
        let getAdoptionRequests = functions.httpsCallable('getAdoptionRequests');
        getAdoptionRequests({token: "letMeIn"}).then(function(result: any) {
            const data = result.data
            setCurrentAdoptionRequests(data)
        })
    }

    useEffect(() => {
        fetchCurrentMatches()
    }, [])

    function showDogInfo(index: number) {
        return (event: any) => {
            setCurrentMatchIndex(index)
            setModalOpen(true)
        }
    }

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
    }


    useEffect(() => {
        console.log(index);
        console.log(nearbyDogs);
        if (nearbyDogs && index < nearbyDogs.length) {
            setCurrentDoggo(nearbyDogs[index]);
        } else {
            setCurrentDoggo(getEmptyDoggo());
        }
    }, [index, nearbyDogs]);

    if (!currentUser || !currentAdoptionRequests) {
        return (<h1>Loading...</h1>)
    }
    else if (currentUser && currentUser.type === 'owner' && currentAdoptionRequests) {
        return (
            <>
                <Dialog onClose={ handleClose } open={ modalOpen }>
                    <Container>
                            <img style={{ width: '300px' }} src={ currentAdoptionRequests[currentMatchIndex].dog.images[0] } />
                            <h5 style ={{ width: '100%' }}>{currentAdoptionRequests[currentMatchIndex].seeker.first_name} quiere adoptar a</h5>
                            <h5>{currentAdoptionRequests[currentMatchIndex].dog.name}</h5>
                            <h5>{currentAdoptionRequests[currentMatchIndex].adoption_request.reason_description}</h5>
                    </Container>
                </Dialog>
                <Grid
                    style={{ paddingTop: '50px' }}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >
                    <h5 className='text-center'>{currentUser.first_name}, ¡Hay personas que quieren adoptar a tu perro!</h5>
                    <List subheader={<li />}>
                        <ul>
                            {
                                currentAdoptionRequests.map((match, index) => {
                                    return (<ListItem key={match.adoption_request.reason_description}>
                                        <img onClick={ showDogInfo(index) } style={{ width: '75px', borderRadius: '50%', marginRight: '10%' }} src={ match.seeker.image } />
                                        <ListItemText primary={match.seeker.first_name} />
                                    </ListItem>)
                                })
                           }
                        </ul>
                    </List>
                </Grid>
            </>
        )
    }
    else {
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
        )
    }
}
