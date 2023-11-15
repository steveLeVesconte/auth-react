import { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmRef = useRef<HTMLInputElement>(null);
    const { signup, currentUser } = useAuth();//from AuthContext
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        if (passwordRef.current?.value !== confirmRef.current?.value) {
            return setError('Passwords do not match')
        }
        console.log('got match', passwordRef.current?.value, emailRef.current?.value)
        try {
            setError('');
            setLoading(true);
            const data = await signup(emailRef.current?.value, passwordRef.current?.value)
            console.log('data: ', data);
            console.log('newUserId: ', data.user.uid);
            navigate("/");
        } catch (error) {
            console.log('error: ', error);
            setError('Failed to create an account')
        }
        setLoading(false);
    }

    return (
        <>

            <Card>

                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    <div>{currentUser?.email}</div>{/*  currentUser starts as undefined and is then set. */}
                    {error && <Alert variant="danger"  >{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="emial">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={confirmRef} required></Form.Control>
                        </Form.Group>

                        <Button disabled={loading} className='w-100 mt-4' type="submit">Sign Up</Button>

                    </Form>

                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to="/login">Log In</Link>
            </div>


        </>
    )
}

export default Signup