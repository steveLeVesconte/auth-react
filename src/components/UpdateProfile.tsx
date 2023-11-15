
import { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';

const UpdateProfile
    = () => {
        const emailRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);
        const confirmRef = useRef<HTMLInputElement>(null);
        const { updatePassword, updateEmail, currentUser } = useAuth();//from AuthContext
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(false);
        const navigate = useNavigate()

        function handleSubmit(e: { preventDefault: () => void; }) {
            e.preventDefault();

            if (passwordRef.current?.value !== confirmRef.current?.value) {
                return setError('Passwords do not match')
            }
            console.log('got match', passwordRef.current?.value, emailRef.current?.value)


            const promises = [];
            setLoading(true);
            setError('');

            if (emailRef?.current?.value !== currentUser.email) {
                promises.push(updateEmail(emailRef?.current?.value))
            }
            if (passwordRef?.current?.value) {
                promises.push(updatePassword(passwordRef?.current?.value))
            }

            Promise.all(promises).then(() => {
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

                    <Card.Body>
                        <h2 className='text-center mb-4'>Update Profile</h2>
                        <div>{currentUser?.email}</div>{/*  currentUser starts as undefined and is then set. */}
                        {error && <Alert variant="danger"  >{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="emial">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} placeholder='Leave blank to keep the same'></Form.Control>
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" ref={confirmRef} placeholder='Leave blank to keep the same'></Form.Control>
                            </Form.Group>

                            <Button disabled={loading} className='w-100 mt-4' type="submit">Update</Button>

                        </Form>

                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    <Link to="/">Cancel</Link>
                </div>

            </>
        )
    }

export default UpdateProfile
