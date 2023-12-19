import { useState } from "react";
//import { Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import {  Link as ReactRouterLink} from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  FormErrorMessage,
  SimpleGrid,
  Box,
  Heading,
  CardHeader,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;

}


const ForgotPassword = () => {

  const { currentUser, resetPassword } = useAuth(); //from AuthContext
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
 /*  const [loading, setLoading] = useState(false) */

  const {
    handleSubmit,
    register,

    formState: { errors, isSubmitting, isValid },

  } = useForm<FormData>();

  async function handleFormSubmit(values: FormData) {
    //e.preventDefault();
    console.log('in handleFormSubmit values.email: ',values.email)
   
    try {
      setMessage("");
      setError("");
/*       setLoading(true); */
console.log('vvvvvvvvv values.email: ',values.email)
      await resetPassword(values.email);
      setMessage("Check your inbox for further instructions.");
    } catch(e) {
      console.log('eeeeeeeeeL=: ',(e as Error).message);
      setError("Failed to reset password");
    }
/*     setLoading(false); */
  }

  return (
    <>
      <Card maxW="500px" marginLeft="auto" marginRight="auto">
        <CardHeader>
      <Heading marginBottom={6}>Password Reset</Heading>
      </CardHeader>
        <CardBody>
          <div>{currentUser?.email}</div>
          {/*  currentUser starts as undefined and is then set. */}
          {error && <Alert status="error">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form onSubmit={handleSubmit((data) => handleFormSubmit(data))}
            onChange={() => {
              setError("");
            }}>
            <SimpleGrid columns={1} spacing={10}>
            <FormControl id="emial">
              <FormLabel>Email</FormLabel>
              <Input
                   {...register("email", {
                    required: "Email is required.",
                  })}
              
              type="email"  required></Input>
                        <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
     
            </FormControl>
            <Button 
                            isLoading={isSubmitting}
                            disabled={!isValid}
         type="submit">
              Reset Password
            </Button>
            <SimpleGrid templateColumns="50% 50%">
            <div className="w-100 text-center mt-2">
            <ChakraLink      color="orange.300" as={ReactRouterLink} to="/auth/login">Login</ChakraLink>
          </div>
          <Box textAlign="right">
        Need to Sign Up? <ChakraLink      color="orange.300" as={ReactRouterLink} to="/auth/signup">Sign Up</ChakraLink>
      </Box>

            </SimpleGrid> 
            </SimpleGrid>
          </form>

        </CardBody>
      </Card>

    </>
  );
};

export default ForgotPassword;
