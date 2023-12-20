import {  useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Link as ChakraLink,
  Box,
  CardHeader,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

const LoginCard = () => {
  const { login } = useAuth(); //from AuthContext
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>();

  async function handleFormSubmit(values: FieldValues) {
    try {
      setError("");
      await login(values.email, values.password);
      navigate("/");
    } catch {
      console.log(
        "in hanld submit error!!!!!!!!!!!!!!!: "
      );

      setError("Failed to log in");
    }
  }

  return (
    <>
      <Card marginLeft="auto" marginRight="auto">
      <CardHeader>
      <Heading marginBottom={6}>Login</Heading>
      
      </CardHeader>
    
        <CardBody>
          {error && <Alert status="error">{error}</Alert>}
          <form onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
            <SimpleGrid columns={1} spacing={10}>
              <FormControl id="emial" isInvalid={!!errors?.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required.",
                  })}
                ></Input>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={!!errors?.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  {...register("password", {
                    required: "Password is required.",
                  })}
                  type="password"
                ></Input>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                isLoading={isSubmitting}
                disabled={!isValid}
                type="submit"
                colorScheme="orange"
              >
                Log In
              </Button>
              <SimpleGrid templateColumns="50% 50%">
                <div>
                  <ChakraLink
                    color="orange.300"
                    as={ReactRouterLink}
                    to="/auth/forgot-password"
                  >
                    Forgot Password?
                  </ChakraLink>
                </div>
                <Box textAlign="right">
                  <ChakraLink
                    as={ReactRouterLink}
                    id="c"
                    color="orange.300"
                    to="/auth/signup"
                  >
                    Sign Up
                  </ChakraLink>
                </Box>
              </SimpleGrid>
            </SimpleGrid>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default LoginCard;
