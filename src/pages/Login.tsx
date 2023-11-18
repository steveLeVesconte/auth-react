
import { useRef, useState } from 'react'
//import { Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, CardBody, FormControl, FormLabel, Input } from '@chakra-ui/react';

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

                        <CardBody>
                            <h2 className='text-center mb-4'>Log In</h2>
                            <div>{currentUser?.email}</div>{/*  currentUser starts as undefined and is then set. */}
                            {error && <Alert status="error"  >{error}</Alert>}
                            <form onSubmit={handleSubmit}>
                                <FormControl id="emial">
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" ref={emailRef} required></Input>
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" ref={passwordRef} required></Input>
                                </FormControl>

                                <Button disabled={loading} className='w-100 mt-4' type="submit">Log In</Button>

                            </form>
                            <div className='w-100 text-center mt-2'>
                        <Link to= "/auth/forgot-password">Forgot Password?</Link>
                    </div>
                        </CardBody>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        Need to Sign Up?  <Link to= "/auth/signup">Sign Up</Link>
                    </div>

        </>
    )
}

export default Login