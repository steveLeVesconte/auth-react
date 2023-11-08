
import { useRef, useState } from 'react'
import { Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link} from 'react-router-dom';

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

                        <Card.Body>
                            <h2 className='text-center mb-4'>Password Reset</h2>
                            <div>{currentUser?.email}</div>{/*  currentUser starts as undefined and is then set. */}
                            {error && <Alert variant="danger"  >{error}</Alert>}
                            {message && <Alert variant="success"   >{message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="emial">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required></Form.Control>
                                </Form.Group>


                                <Button disabled={loading} className='w-100 mt-4' type="submit">Reset Password</Button>

                            </Form>
                            <div className='w-100 text-center mt-2'>
                        <Link to= "/login">Login</Link>
                    </div>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        Need to Sign Up?  <Link to= "/signup">Sign Up</Link>
                    </div>

        </>
    )
}

export default ForgotPassword