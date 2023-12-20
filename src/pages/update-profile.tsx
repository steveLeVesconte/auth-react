import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const UpdateProfile = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const { updatePassword, updateEmail, currentUser } = useAuth(); //from AuthContext
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (passwordRef.current?.value !== confirmRef.current?.value) {
      return setError("Passwords do not match");
    }
    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef?.current?.value !== currentUser.email) {
      promises.push(updateEmail(emailRef?.current?.value));
    }
    if (passwordRef?.current?.value) {
      promises.push(updatePassword(passwordRef?.current?.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Update Profile</h2>
          <div>{currentUser?.email}</div>
          {/*  currentUser starts as undefined and is then set. */}
          {error && <Alert status="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <FormControl id="emial">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              ></Input>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              ></Input>
            </FormControl>
            <FormControl id="password-confirm">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                ref={confirmRef}
                placeholder="Leave blank to keep the same"
              ></Input>
            </FormControl>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Update
            </Button>
          </form>
        </CardBody>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
