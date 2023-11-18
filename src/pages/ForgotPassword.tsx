
import { useRef, useState } from 'react'
//import { Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link} from 'react-router-dom';
import { Alert, Button, Card, CardBody, FormControl, FormLabel, Input } from '@chakra-ui/react';

const ForgotPassword = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const {  currentUser, resetPassword } = useAuth();//from AuthContext
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    //const navigate = useNavigate()


    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        try {
          setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current?.value)
            setMessage('Check your inbox for further instructions.')
        } catch {
            setError('Failed to reset password')
        }
        setLoading(false);
    }

    return (
        <>

                    <Card>

                        <CardBody>
                            <h2 className='text-center mb-4'>Password Reset</h2>
                            <div>{currentUser?.email}</div>{/*  currentUser starts as undefined and is then set. */}
                            {error && <Alert status="error"  >{error}</Alert>}
                            {message && <Alert variant="success"   >{message}</Alert>}
                            <form onSubmit={handleSubmit}>
                                <FormControl id="emial">
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" ref={emailRef} required></Input>
                                </FormControl>


                                <Button disabled={loading} className='w-100 mt-4' type="submit">Reset Password</Button>

                            </form>
                            <div className='w-100 text-center mt-2'>
                        <Link to= "/auth/login">Login</Link>
                    </div>
                        </CardBody>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        Need to Sign Up?  <Link to= "/auth/signup">Sign Up</Link>
                    </div>

        </>
    )
}

export default ForgotPassword