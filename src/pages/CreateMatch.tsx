
import { useContext, useRef, useState } from 'react'
//import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { GameState, Player, Turn, addMatch, addTurn } from '../firestore';
import PlayerSelectList from '../components/PlayerSelectList';
import {PlayerContext} from '../contexts/PlayerContext';
import { Alert, Button, Card, CardBody, FormControl, FormLabel, Select } from '@chakra-ui/react';

       

const CreateMatch
    = () => {
        const {  currentUser } = useAuth();//from AuthContext
        //const x=currentUser?.id;
        console.log('inCreateWatch');
        const myStoneColorRef = useRef<HTMLSelectElement>(null);
        //const bioRef = useRef<HTMLInputElement>(null);
        // const rankInfoRef = useRef<HTMLInputElement>(null);
        // const locationRef = useRef<HTMLInputElement>(null);
        // const Ref = useRef<HTMLInputElement>(null);
        // const bioRef = useRef<HTMLInputElement>(null);
        // const confirmRef = useRef<HTMLInputElement>(null);
        //const { updatePassword, updateEmail, currentUser } = useAuth();//from AuthContext
        const [opponentId, setOpponentId] = useState('')
        const [opponentName, setOpponentName] = useState('')
      
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(false);
      //  const navigate = useNavigate();
        const currentPlayer=useContext(PlayerContext);
        console.log('current player: ',currentPlayer)
        function onSelectPlayer(selectedPlayer:Player){

            console.log('selected player: ',selectedPlayer)
          setOpponentId(selectedPlayer.id);
          setOpponentName(selectedPlayer.name);

          console.log('in select:  id ',opponentId, opponentName);
        }

        function handleSubmit(e: { preventDefault: () => void; }) {
            e.preventDefault();

console.log('in submit!!!!!!!!!!!!!!!!!!!!!')
           let playerBlackId= currentPlayer?.id;
           let playerBlackName=currentPlayer?.name;
           let playerWhiteId=opponentId;
           let playerWhiteName=opponentName;
           if(myStoneColorRef?.current?.value=="w")
           {
            playerBlackId= opponentId;
            playerBlackName=opponentName;
            playerWhiteId=currentPlayer?.id??"";
            playerWhiteName=currentPlayer?.name??"";
           }
            

            // if (passwordRef.current?.value !== confirmRef.current?.value) {
            //     return setError('Passwords do not match')
            // }
            console.log('handle sub user: ', currentUser)
            console.log('handle sub uid: ', currentUser?.uid)


           // const promises = [];
            setLoading(true);
            setError('');
            const createDate=(new Date).toISOString();
        console.log('before add match')
                addMatch(
                    "b",
                    playerBlackId??"",
                    playerWhiteId,
                    playerBlackName??"",
                    playerWhiteName,
                    0,
                    'active',
                    createDate
                )
                .then((refDoc) => {
                    console.log('refdoc.id: ',refDoc.id);

                    console.log('matchCreationSuccess!!!!!!!!!!!!!!!!!!');



                 const koComareState:GameState={
                    board:"___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________"+
                          "___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________",
                          prisonersOfBlack:0,
                          prisonersOfWhite:0};
                          const initialState:GameState={
                            board:"___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________"+
                                  "___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________",
                                  prisonersOfBlack:0,
                                  prisonersOfWhite:0};
                                  const resultState:GameState={
                                    board:"",
                                          prisonersOfBlack:0,
                                          prisonersOfWhite:0};                               
                 


                    const startTurn:Turn ={
                        id:"",
                        matchId:refDoc.id,
                        turnPlayerColor:"b",
                        turnNumber:0,
                        playerBlackId:playerBlackId??"missing",
                        playerWhiteId:playerWhiteId,
                        playerBlackName:playerBlackName??"missing",
                        playerWhiteName:playerWhiteName,
                        koCompareState:koComareState,
                        initialState:initialState,
                        resultState:resultState,
                        action:{actionType:"start",location: null},
                        isValid:true,
                        isKo:false,
                        comments:"",
                        createDate:createDate,
                        updateDate:createDate
                        



                    };

                    addTurn(startTurn).then(()=>{
                        console.log('yay turn saved')
                    })
                //     if(myNameRef.current)
                //    nameRef.current.value="";

                //    if(bioRef.current)
                //    bioRef.current.value="";
                //    if(rankInfoRef.current)
                //    rankInfoRef.current.value="";
                //    if(locationRef.current)
                //    locationRef.current.value="";
                

                   // navigate("/");
                })
            .catch(() => {
                console.log('failed to create match')
                setError("Failed to create Match");

            })
            .finally(() => {
                setLoading(false);
            })


            // if (emailRef?.current?.value !== currentUser.email) {
            //     promises.push(updateEmail(emailRef?.current?.value))
            // }
            // if (passwordRef?.current?.value) {
            //     promises.push(updatePassword(passwordRef?.current?.value))
            // }

            // Promise.all(promises).then(() => {
            //     navigate("/");
            // })
            //     .catch(() => {
            //         setError("Failed to update account");
            //     })
            //     .finally(() => {
            //         setLoading(false);
            //     })
        }




        return (
            <>

                <Card>

                    <CardBody>
                        <h2 className='text-center mb-4'>Create New Match</h2>
                        <div>{currentUser?.email}</div>{/*  currentUser starts as undefined and is then set. */}
                        {error && <Alert status="error"  >{error}</Alert>}
                        <form onSubmit={handleSubmit} >
                            {/* <FormControl id="my-name">
                                <FormLabel>Name</FormLabel>
                                <Input type="text" ref={myNameRef} required readOnly ></Input>{/* //defaultValue={currentUser.email} */}
                        {/*     </FormControl> */}

       {/*                      <FormControl id="my-id">
                                <FormLabel>My Id</FormLabel>
                                <Input type="text" ref={myIdRef} readOnly  ></Input>
                            </FormControl>  */}


                            <FormControl id="myStoneColor">
                                <FormLabel>My Stone Color</FormLabel>
                                <Select  ref={myStoneColorRef}  >
                                <option value="b" >Black</option>
                                <option value="w" >White</option>
                                  </Select>
                            </FormControl>
                


                            <Button disabled={loading} className='w-100 mt-4' type="submit">Save</Button>

                        </form>
<PlayerSelectList selectPlayer={onSelectPlayer}></PlayerSelectList>
                    </CardBody>
                </Card>
                <div className='w-100 text-center mt-2'>
                    <Link to="/">Cancel</Link>
                </div>

            </>
        )
    }

export default CreateMatch
