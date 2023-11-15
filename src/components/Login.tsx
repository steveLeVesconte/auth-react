
import { useRef, useState } from 'react'
import { Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { login, currentUser } = useAuth();//from AuthContext
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
console.log('in hanld submit');
        try {
            setError('');
            setLoading(true);
            console.log('in hanld submit values: ',emailRef.current?.value, passwordRef.current?.value);
            await login(emailRef.current?.value, passwordRef.current?.value)
            navigate("/");
        } catch {
            console.log('in hanld submit error!!!!!!!!!!!!!!!: ',emailRef.current?.value, passwordRef.current?.value);
         
            setError('Failed to log in')
        }
        setLoading(false);
    }

    return (
        <>

                    <Card>

                        <Card.Body>
                            <h2 className='text-center mb-4'>Log In</h2>
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

                                <Button disabled={loading} className='w-100 mt-4' type="submit">Log In</Button>

                            </Form>
                            <div className='w-100 text-center mt-2'>
                        <Link to= "/forgot-password">Forgot Password?</Link>
                    </div>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        Need to Sign Up?  <Link to= "/signup">Sign Up</Link>
                    </div>

        </>
    )
}

export default Login