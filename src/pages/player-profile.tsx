import { useContext,  useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Link as ChakraLink,
  Input,
  SimpleGrid,
  FormErrorMessage,
} from "@chakra-ui/react";
import { PlayerContext, PlayerContextType } from "../contexts/PlayerContext";
import { useForm } from "react-hook-form";
import { Player, addPlayerProfile, getPlayerByName } from "../services/data/player-service";

interface FormData {
  name: string;
  location: string;
  bio: string;
  rankInfo: string;
}

const PlayerProfile = () => {
  const { currentUser } = useAuth(); //from AuthContext
//   const nameRef = useRef<HTMLInputElement>(null);
//   const bioRef = useRef<HTMLInputElement>(null);
//   const rankInfoRef = useRef<HTMLInputElement>(null);
//   const locationRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
 // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updatePlayer } = useContext(PlayerContext) as PlayerContextType;
  const {
    handleSubmit,
    register,
    //watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>();

  async function handleFormSubmit(values: FormData) {
    setError("");
    const nameExists= await checkIfPlayerExists(values.name);
      
    if(nameExists){
        setError('The name "'+values.name+'" is already in use.');
        return;
    }

    //e.preventDefault();
  //  setLoading(true);
    const createDate = new Date().toISOString();
    setError("");
    addPlayerProfile(
      values.name,
      values.location,
      values.rankInfo,
      values.bio,
      "active",
      currentUser.uid,
      createDate
    )
      .then((refDoc) => {
        const newPlayer: Player = {
          name:  values.name,
          bio: values.bio,
          rankInfo: values.rankInfo,
          location:  values.location,
          id: refDoc.id,
          createDate: createDate,
          status: "active",
          uid: currentUser.uid,
        };
        console.log("new player context: ", newPlayer);
        updatePlayer(newPlayer);

     /*    if (nameRef.current) nameRef.current.value = "";
        if (bioRef.current) bioRef.current.value = "";
        if (rankInfoRef.current) rankInfoRef.current.value = "";
        if (locationRef.current) locationRef.current.value = "";
 */
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        //setLoading(false);
      });
  }

   const  checkIfPlayerExists=(name:string): Promise<boolean> => {
        return new Promise((resolve,reject)=>{
         getPlayerByName(name).then((existingPlayer)=>{
        console.log('existingPlayer: ',existingPlayer);
        if(existingPlayer==null){
            console.log('existingPlayer is null: ',existingPlayer);
           resolve(false);
        }
        console.log('existingPlayer  is true: ',existingPlayer);
        resolve(true);
    }).catch((e)=>{
        console.log('checkIfPlayerExists reject name: ',name,e);
        reject();
    });
        });
        

  }


  return (
    <>
      <Card className="sign-up-card">
        <CardBody>
          <Heading marginBottom={6}>Enter Game Player Profile</Heading>
          {error && <Alert status="error">{error}</Alert>}
          <form onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
          <SimpleGrid columns={1} spacing={3}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <FormLabel>{currentUser?.email}</FormLabel>
            </FormControl>
            <FormControl id="name"   isInvalid={!!errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                {...register("name", {
                  required: "Name is required.",
                })}
                placeholder="required as game handle"
              ></Input>
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl id="location">
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                {...register("location", {
                  
                })}

                placeholder="optional city, country, planet, galexy or plane of existance"
              ></Input>
            </FormControl>
            <FormControl id="bio">
              <FormLabel>Bio</FormLabel>
              <Input
                type="text"
                {...register("bio", {  
                })}
                placeholder="optional inroduction information"
              ></Input>
            </FormControl>
            <FormControl id="rank">
              <FormLabel>Rank Information</FormLabel>
              <Input
                type="text"
                {...register("rankInfo", {  
                })}
                placeholder="optional rank information"
              ></Input>
            </FormControl>
 
            <Button 
              isLoading={isSubmitting}
              disabled={!isValid}
            
            marginBottom={3} 
            marginTop={3}  colorScheme="orange" type="submit">
              Save
            </Button>

                <Box textAlign="right">
                  <ChakraLink
                    as={ReactRouterLink}
                    id="c"
                    color="orange.300"
                    to="/auth/login"
                  >
                    Cancel
                  </ChakraLink>
                </Box>
              </SimpleGrid>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default PlayerProfile;
