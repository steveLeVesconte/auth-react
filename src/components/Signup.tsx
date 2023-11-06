import  { useRef, useState } from 'react'
import {Form, Button, Card} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext'

const Signup = () => {
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const confirmRef=useRef<HTMLInputElement>(null);
    const {signup}=useAuth();
    const [error, setError] = useState('')

function handleSubmit(e: { preventDefault: () => void; }){
    e.preventDefault();

    if (passwordRef.current?.value !== confirmRef.current?.value) {
        return setError('Passwords do not match')
      }

    signup(emailRef.current?.value, passwordRef.current?.value)
}

  return (
    <>
       {error && <div  >{error}</div>}
    <Card>
        <Card.Body>
        <h2 className='text-center mb-4'>Sign Up</h2>
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

            <Button className='w-100 mt-4' type="submit">Sign Up</Button>
  
        </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Already have an account? Login
    </div>
    </>
  )
}

export default Signup