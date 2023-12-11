import { useContext, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { Player, addPlayerProfile } from '../firestore';
import { Alert, Button, Card, CardBody, FormControl, FormLabel, Input } from '@chakra-ui/react';
import {PlayerContext,  PlayerContextType } from '../contexts/PlayerContext';

const PlayerProfile
    = () => {
        const { currentUser } = useAuth();//from AuthContext
        const nameRef = useRef<HTMLInputElement>(null);
        const bioRef = useRef<HTMLInputElement>(null);
        const rankInfoRef = useRef<HTMLInputElement>(null);
        const locationRef = useRef<HTMLInputElement>(null);
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate()
        const {updatePlayer} = useContext(PlayerContext) as PlayerContextType;

        function handleSubmit(e: { preventDefault: () => void; }) {
            e.preventDefault();
            setLoading(true);
            setError('');
            addPlayerProfile(currentUser?.uid, nameRef.current?.value ?? "", rankInfoRef.current?.value ?? "", bioRef.current?.value ?? "", "active", (new Date).toISOString())
                .then((refDoc) => {
                    const newPlayer:Player = {name:nameRef.current?.value??"", 
                    bio:bioRef.current?.value??"",
                rankInfo:rankInfoRef.current?.value??"",
            location:locationRef.current?.value??"",
             id:refDoc.id,
            createDate:(new Date).toISOString(),
        status:"active",
    uid:currentUser.uid }
    console.log('new player context: ',newPlayer)
                    updatePlayer(newPlayer);

                    if (nameRef.current)
                        nameRef.current.value = "";
                    if (bioRef.current)
                        bioRef.current.value = "";
                    if (rankInfoRef.current)
                        rankInfoRef.current.value = "";
                    if (locationRef.current)
                        locationRef.current.value = "";
                   
                    navigate("/");
                })
                .catch(() => {
                    setError("Failed to update account");
                })
                .finally(() => {
                    setLoading(false);
                })
        }

        return (
            <>
                <Card>
                    <CardBody>
                        <h2 className='text-center mb-4'>Update Game Player Profile</h2>
                        <div>{currentUser?.email}</div>{/*  currentUser starts as undefined and is then set. */}
                        {error && <Alert status="error"  >{error}</Alert>}
                        <form onSubmit={handleSubmit} >
                            <FormControl id="name">
                                <FormLabel>Name</FormLabel>
                                <Input type="text" ref={nameRef} required placeholder='required as game handle' ></Input>{/* //defaultValue={currentUser.email} */}
                            </FormControl>
                            <FormControl id="location">
                                <FormLabel>Location</FormLabel>
                                <Input type="text" ref={locationRef} placeholder='optional city or country'></Input>{/* //defaultValue={currentUser.email} */}
                            </FormControl>
                            <FormControl id="bio">
                                <FormLabel>Bio</FormLabel>
                                <Input type="text" ref={bioRef} placeholder='optional inroduction information' ></Input>{/* //defaultValue={currentUser.email} */}
                            </FormControl>
                            <FormControl id="rank">
                                <FormLabel>Rank Information</FormLabel>
                                <Input type="text" ref={rankInfoRef} placeholder='optional rank information' ></Input>{/* //defaultValue={currentUser.email} */}
                            </FormControl>
                            <Button disabled={loading} className='w-100 mt-4' type="submit">Save</Button>
                        </form>
                    </CardBody>
                </Card>
                <div className='w-100 text-center mt-2'>
                    <Link to="/">Cancel</Link>
                </div>
            </>
        )
    }

export default PlayerProfile
