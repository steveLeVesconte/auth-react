
import { useRef, useState } from 'react'
//import { Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, CardBody, FormControl, FormErrorMessage, FormLabel, Heading, Input, SimpleGrid , Link as ChakraLink, Box} from '@chakra-ui/react';
import { FieldValues, useForm } from 'react-hook-form';

interface FormData{
    email: string;
    password:string;
}


const LoginCard = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { login, currentUser } = useAuth();//from AuthContext
    const [error, setError] = useState('')
    //const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting , isValid},
      } = useForm<FormData>()

    async         function handleFormSubmit(values:FieldValues) {
      
console.log('in hanld submit');
        try {
            setError('');
           // setLoading(true);
            console.log('in hanld submit values: ',values.email, values.password);
            await login(values.email, values.password)
            navigate("/");
        } catch {
            console.log('in hanld submit error!!!!!!!!!!!!!!!: ',emailRef.current?.value, passwordRef.current?.value);
         
            setError('Failed to log in')
        }
       // setLoading(false);
    }

    return (
        <>

<Card marginLeft="auto" marginRight="auto" >

                        <CardBody>
                        <Heading marginBottom={6} >Login</Heading>
                            <div>{currentUser?.email}</div>{/*  currentUser starts as undefined and is then set. */}
                            {error && <Alert status="error"  >{error}</Alert>}
                            <form onSubmit={handleSubmit(data=>handleFormSubmit(data))} >
                            <SimpleGrid columns={1} spacing={10}>
                                <FormControl id="emial" isInvalid={!!errors?.email}>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email"
                                                {...register('email', {
                                                    required: 'Email is required.',
                                                  })}
                                    
                                    ></Input>
                             <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl id="password" isInvalid={!!errors?.password}>
                                    <FormLabel>Password</FormLabel>
                                    <Input 
                                                  {...register('password', {
                                                    required: 'Password is required.',
                                                  })}
                                    type="password"  ></Input>
                               <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                                </FormControl>
                               
                         
                                <Button isLoading = {isSubmitting}  disabled={!isValid} type="submit"  colorScheme='orange'>Log In</Button>
                            
                                <SimpleGrid templateColumns="50% 50%" >
                                <div className='w-100 text-center mt-2'>
                        <ChakraLink color="orange.300" as={ReactRouterLink} to= "/auth/forgot-password">Forgot Password?</ChakraLink>
                        </div>
                    <Box textAlign="right">
                          <ChakraLink as={ReactRouterLink} id="c" color="orange.300" to= "/auth/signup">Sign Up</ChakraLink>
                    </Box>
                                
</SimpleGrid>
                                </SimpleGrid>
                            </form>
                            <div className='w-100 text-center mt-2'>
                     </div>
                        </CardBody>
                    </Card>


        </>
    )
}

export default LoginCard