import { useContext } from 'react'
//import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
//import { GameState, Match, Turn, addMatch, addTurn } from '../firestore';
import PlayerSelectList from '../components/PlayerSelectList';
import { PlayerContext, PlayerContextType } from '../contexts/PlayerContext';
import {  Box, Button, Card, CardBody, Center, FormControl, FormErrorMessage, FormLabel, Heading, Select, SimpleGrid } from '@chakra-ui/react';
//import { ChangeEvent } from 'react';
import { MdArrowDropDown } from "react-icons/md";
import { FieldValues, useForm,  } from 'react-hook-form';
import { GameState, Match, Turn, addMatch, addTurn } from '../firestore';
//import { FieldPath } from 'firebase/firestore';


//type OpponentOption = {label: string, value: string}


interface FormData{
    stoneColor: string;
    opponentKey:string;
}

const CreateMatch
    = () => {
        /* const { currentUser } = useAuth(); *///from AuthContext
        console.log('inCreateWatch');
        //const myStoneColorRef = useRef<HTMLSelectElement>(null);
       // const [userStoneColor, setuserStoneColor] = useState('')        
        //const [opponentId, setOpponentId] = useState('')
       // const [opponentName, setOpponentName] = useState('')
       // const [error, setError] = useState('')
      //  const [loading, setLoading] = useState(false);
        const { player } = useContext(PlayerContext) as PlayerContextType;
        const navigate=useNavigate();

        const {
            handleSubmit,
            register,
            formState: { errors, isSubmitting , isValid},
          } = useForm<FormData>()



        console.log('current player: ', player)
        /*         function onSelectPlayer(selectedPlayer:string) {
                    const playerInfoArray=selectedPlayer.split("_");
                    setOpponentId(playerInfoArray[0]);
                    setOpponentName(playerInfoArray[1]);
                } */

        /*         onSelectOpponent(event){
        
                    const value=event.target.value;
                    const playerInfoArray=selectedPlayer.split("_");
                    setOpponentId(playerInfoArray[0]);
                    setOpponentName(playerInfoArray[1]);   
                } */

        //const handleOpponentSelect = (values:FieldValues) => {
            // setOpponentId(event.target.value);
            // setOpponentName(event.target.); 
           //const playerInfoArray = event.target.value.split("_");
      //     console.log(values);
            // const playerInfoArray = values
            // // split("_");
            // setOpponentId(playerInfoArray[0]);
            // setOpponentName(playerInfoArray[1]);
            /*             setSelected(selectedOption);
                        console.log(`Option selected:`, selectedOption); */
     //   };


        

        function handleFormSubmit(values:FieldValues) {
            //e.preventDefault();

            // console.log('*******------------------------*******values: ', values);
            
            // return;
            const userStoneColor=values.stoneColor;
            const playerInfoArray = values.opponentKey.split("_");
            const opponentName=playerInfoArray[1];
            const opponentId=playerInfoArray[0]
            let playerBlackId = player?.id;
            let playerBlackName = player?.name;
            let playerWhiteId = opponentId;
            let playerWhiteName = opponentName;
            if (userStoneColor == "w") {
                playerBlackId = opponentId;
                playerBlackName = opponentName;
                playerWhiteId = player?.id ?? "";
                playerWhiteName = player?.name ?? "";
            }

           //  setLoading(true);
            // setError('');
            const createDate = (new Date).toISOString();
            const newMatch:Match={
 

 board:    "___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________" +
 ",___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________",

 nextTurnPlayer: userStoneColor,
 playerBlackId: playerBlackId??"",
 playerWhiteId:  playerWhiteId,
 playerBlackName: playerBlackName??"",
 playerWhiteName: playerWhiteName,
 turnNumber: 0,
 status: "active",
 createDate: createDate,
 updateDate: createDate,
 id:""
            }

            addMatch(newMatch)

                .then((refDoc) => {
                    newMatch.id=refDoc.id;
                    const koComareState: GameState = {
                        board: "___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________" +
                            ",___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________",
                        prisonersOfBlack: 0,
                        prisonersOfWhite: 0
                    };
                    const initialState: GameState = {
                        board: "___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________" +
                            ",___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________",
                        prisonersOfBlack: 0,
                        prisonersOfWhite: 0
                    };
                    const resultState: GameState = {
                        board: "___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________" +
                            ",___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________",
                        prisonersOfBlack: 0,
                        prisonersOfWhite: 0
                    };
                    const startTurn: Turn = {
                        id: "",
                        matchId: refDoc.id,
                        turnPlayerColor: "w",
                        turnNumber: 0,
                        playerBlackId: playerBlackId ?? "missing",
                        playerWhiteId: playerWhiteId,
                        playerBlackName: playerBlackName ?? "missing",
                        playerWhiteName: playerWhiteName,
                        koCompareState: koComareState,
                        initialState: initialState,
                        resultState: resultState,
                        action: { actionType: "start", location: null },
                        isValid: true,
                        isKo: false,
                        comments: "",
                        createDate: createDate,
                        updateDate: createDate
                    };

                    addTurn(startTurn).then(() => {

                        navigate('/go-board', {state:{match: newMatch}})
                        console.log('yay turn saved')
                    })
                })
                .catch(() => {
                    console.log('failed to create match')
                   // setError("Failed to create Match");
                })
                .finally(() => {
                    //setLoading(false);
                })
        }

        // const isColorError=(!((userStoneColor==="b")||(userStoneColor==="w")))
        // const isOpponentError = opponentId === '';

        return (
            <>
                <Card marginLeft="auto" marginRight="auto" maxW="500px">
                    <CardBody>
                        <Heading marginBottom={6} >Create New Match</Heading>
                       {/*  <div>{currentUser?.email}</div> */}{/*  currentUser starts as undefined and is then set. */}
                    {/*     {error && <Alert status="error"  >{error}</Alert>} */}
                   {/*  <form onSubmit={handleSubmit(handleFormSubmit)} > */}
                 {/*   <form onSubmit={handleSubmit(data=>console.log('**********data: ',data))} > */}
                   <form onSubmit={handleSubmit(data=>handleFormSubmit(data))} >
                            <SimpleGrid columns={1} spacing={10}>
                            <FormControl id="myStoneColor" >

                                <FormLabel htmlFor='stoneColor'>My Stone Color</FormLabel>
                                <Select  icon={<MdArrowDropDown />} 
                                  {...register('stoneColor', {
                                    required: 'This is required',
                                  })}
                                

                                 variant="filled" placeholder="select your stone color" >
                                    <option value="b" >Black</option>
                                    <option value="w" >White</option>
                                </Select>
                                <FormErrorMessage>{errors.stoneColor && errors.stoneColor.message}</FormErrorMessage>
                                </FormControl>
                                <FormControl id="myOpponent">
                                    
                                <FormLabel>My Opponent</FormLabel>
                                <Select 
                                             {...register('opponentKey', {
                                               required: 'This is required',
                                             })}
        
                                icon={<MdArrowDropDown />} variant="filled" placeholder="select an opponent">
                                    <PlayerSelectList />
                                </Select>
                                <FormErrorMessage>{errors.opponentKey && errors.opponentKey.message}</FormErrorMessage>
                            </FormControl>
                            <SimpleGrid templateColumns="80% 20%" >
                            <Button disabled={!isValid} isLoading = {isSubmitting} 
colorScheme='orange'
                            className='w-100 mt-4' type="submit">Save</Button>
                                <Center> <Link to="/">Cancel</Link></Center>
                            </SimpleGrid>
                            </SimpleGrid>
                        </form>
     </CardBody>
                </Card>


            </>
        )
    }

export default CreateMatch
