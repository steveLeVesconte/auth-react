import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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
import { FirebaseError } from "firebase/app";

interface FormData {
  password: string;
  confirmPassword: string;
}

const UpdateProfile = () => {
  const { updatePassword } = useAuth(); //from AuthContext
  const [error, setError] = useState("");
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
      await updatePassword(values.password);
     navigate("/");
    } catch (error: unknown) {
   
      let errorMessage = "Failed to change password. ";
      if (error instanceof FirebaseError) {

        console.error(error.message);
        errorMessage += " - " + error.message;
      }
      setError(errorMessage);
    }
  }

  return (
    <>
      <Card className="sign-up-card">
        <CardHeader>
          <Heading marginBottom={6}>Update Profile</Heading>
          {error && <Alert status="error">{error}</Alert>}
        </CardHeader>
        <CardBody>
          <form
            onSubmit={handleSubmit((data) => handleFormSubmit(data))}
            onChange={() => {
              setError("");
            }}
          >
            <SimpleGrid columns={1} spacing={10}>
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
                Update
              </Button>
              <SimpleGrid templateColumns="50% 50%">
                <div></div>
                <Box textAlign="right">
                  <ChakraLink
                    as={ReactRouterLink}
                    id="c"
                    color="orange.300"
                    to="/"
                  >
                    Cancel
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

export default UpdateProfile;
