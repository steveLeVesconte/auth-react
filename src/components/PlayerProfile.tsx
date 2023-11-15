
import { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { addPlayerProfile } from '../firestore';

       

const PlayerProfile
    = () => {
        const {  currentUser } = useAuth();//from AuthContext
        //const x=currentUser?.id;
        console.log('inProfile');
        const nameRef = useRef<HTMLInputElement>(null);
        const bioRef = useRef<HTMLInputElement>(null);
        const rankInfoRef = useRef<HTMLInputElement>(null);
        const locationRef = useRef<HTMLInputElement>(null);
        // const Ref = useRef<HTMLInputElement>(null);
        // const bioRef = useRef<HTMLInputElement>(null);
        // const confirmRef = useRef<HTMLInputElement>(null);
        //const { updatePassword, updateEmail, currentUser } = useAuth();//from AuthContext
      //  const [name, setName] = useState('')
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate()

        function handleSubmit(e: { preventDefault: () => void; }) {
            e.preventDefault();

            // if (passwordRef.current?.value !== confirmRef.current?.value) {
            //     return setError('Passwords do not match')
            // }
            console.log('handle sub user: ', currentUser)
            console.log('handle sub uid: ', currentUser?.uid)


           // const promises = [];
            setLoading(true);
            setError('');

        
                addPlayerProfile(currentUser?.uid,nameRef.current?.value??"",rankInfoRef.current?.value??"",bioRef.current?.value??"","active",(new Date).toISOString())
                .then(() => {
                    if(nameRef.current)
                   nameRef.current.value="";

                   if(bioRef.current)
                   bioRef.current.value="";
                   if(rankInfoRef.current)
                   rankInfoRef.current.value="";
                   if(locationRef.current)
                   locationRef.current.value="";
                

                    navigate("/");
                })
            .catch(() => {
                setError("Failed to update account");
            })
            .finally(() => {
                setLoading(false);
            })


            // if (emailRef?.current?.value !== currentUser.email) {
            //     promises.push(updateEmail(emailRef?.current?.value))
            // }
            // if (passwordRef?.current?.value) {
            //     promises.push(updatePassword(passwordRef?.current?.value))
            // }

            // Promise.all(promises).then(() => {
            //     navigate("/");
            // })
            //     .catch(() => {
            //         setError("Failed to update account");
            //     })
            //     .finally(() => {
            //         setLoading(false);
            //     })
        }


        return (
            <>

                <Card>

                    <Card.Body>
                        <h2 className='text-center mb-4'>Update Game Player Profile</h2>
                        <div>{currentUser?.email}</div>{/*  currentUser starts as undefined and is then set. */}
                        {error && <Alert variant="danger"  >{error}</Alert>}
                        <Form onSubmit={handleSubmit} >
                            <Form.Group id="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" ref={nameRef} required placeholder='required as game handle' ></Form.Control>{/* //defaultValue={currentUser.email} */}
                            </Form.Group>

                            <Form.Group id="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" ref={locationRef}  placeholder='optional city or country'></Form.Control>{/* //defaultValue={currentUser.email} */}
                            </Form.Group>
                            <Form.Group id="bio">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control type="text" ref={bioRef} placeholder='optional inroduction information' ></Form.Control>{/* //defaultValue={currentUser.email} */}
                            </Form.Group>
                            <Form.Group id="rank">
                                <Form.Label>Rank Information</Form.Label>
                                <Form.Control type="text" ref={rankInfoRef} placeholder='optional rank information' ></Form.Control>{/* //defaultValue={currentUser.email} */}
                            </Form.Group>
                



                            <Button disabled={loading} className='w-100 mt-4' type="submit">Save</Button>

                        </Form>

                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    <Link to="/">Cancel</Link>
                </div>

            </>
        )
    }

export default PlayerProfile
