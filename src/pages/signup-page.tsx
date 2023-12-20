import { useState } from "react";
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
  Input,
  SimpleGrid,
  Link as ChakraLink,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const { signup } = useAuth(); //from AuthContext
  const [error, setError] = useState("");
  //const [ setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>();
  const pwd = watch("password");

  async function handleFormSubmit(values: FormData) {
    setError("");
    try {
      setError("");
      const data: FormData = await signup(values.email, values.password);
      console.log("data: ", data);

      navigate("/");
    } catch (error) {
      console.log("error: ", error);
      setError("Failed to create an account");
    }
  }

  return (
    <>
      <Card className="sign-up-card">
        <CardBody>
          <Heading marginBottom={6}>Sign Up</Heading>
          {error && <Alert status="error">{error}</Alert>}
          <form
            onSubmit={handleSubmit((data) => handleFormSubmit(data))}
            onChange={() => {
              setError("");
            }}
          >
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
              <FormControl
                id="password-confirm"
                isInvalid={!!errors?.confirmPassword}
              >
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required.",
                    validate: (value) =>
                      value === pwd || "The passwords do not match",
                  })}
                  type="password"
                ></Input>
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                isLoading={isSubmitting}
                disabled={!isValid}
                type="submit"
                colorScheme="orange"
              >
                Sign Up
              </Button>
              <SimpleGrid templateColumns="50% 50%">
                <div>
                  Already have an account?{" "}
                  <ChakraLink
                    color="orange.300"
                    as={ReactRouterLink}
                    to="/auth/login"
                  >
                    Log In
                  </ChakraLink>
                </div>
              </SimpleGrid>
            </SimpleGrid>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default Signup;
