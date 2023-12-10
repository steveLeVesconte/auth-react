import { useContext, useRef, useState } from 'react'
//import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom';
import { GameState, Turn, addMatch, addTurn } from '../firestore';
import PlayerSelectList from '../components/PlayerSelectList';
import { PlayerContext, PlayerContextType } from '../contexts/PlayerContext';
import { Alert, Button, Card, CardBody, FormControl, FormErrorMessage, FormLabel, Select, SimpleGrid } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { MdArrowDropDown } from "react-icons/md";


//type OpponentOption = {label: string, value: string}

const CreateMatch
    = () => {
        /* const { currentUser } = useAuth(); *///from AuthContext
        console.log('inCreateWatch');
        const myStoneColorRef = useRef<HTMLSelectElement>(null);
        const [opponentId, setOpponentId] = useState('')
        const [opponentName, setOpponentName] = useState('')
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(false);
        const { player } = useContext(PlayerContext) as PlayerContextType;
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

        const handleOpponentSelect = (event: ChangeEvent<HTMLSelectElement>) => {
            // setOpponentId(event.target.value);
            // setOpponentName(event.target.); 
            const playerInfoArray = event.target.value.split("_");
            setOpponentId(playerInfoArray[0]);
            setOpponentName(playerInfoArray[1]);
            /*             setSelected(selectedOption);
                        console.log(`Option selected:`, selectedOption); */
        };

        function handleSubmit(e: { preventDefault: () => void; }) {
            e.preventDefault();



            let playerBlackId = player?.id;
            let playerBlackName = player?.name;
            let playerWhiteId = opponentId;
            let playerWhiteName = opponentName;
            if (myStoneColorRef?.current?.value == "w") {
                playerBlackId = opponentId;
                playerBlackName = opponentName;
                playerWhiteId = player?.id ?? "";
                playerWhiteName = player?.name ?? "";
            }

            setLoading(true);
            setError('');
            const createDate = (new Date).toISOString();
            addMatch(
                "___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________" +
                ",___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________",
                "b",
                playerBlackId ?? "",
                playerWhiteId,
                playerBlackName ?? "",
                playerWhiteName,
                0,


                'active',
                createDate
            )
                .then((refDoc) => {

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
                        console.log('yay turn saved')
                    })
                })
                .catch(() => {
                    console.log('failed to create match')
                    setError("Failed to create Match");
                })
                .finally(() => {
                    setLoading(false);
                })
        }

        const isColorError=(!((myStoneColorRef?.current?.value==="b")||(myStoneColorRef?.current?.value==="w")))
        const isOpponentError = opponentId === '';

        return (
            <>
                <Card>
                    <CardBody>
                        <h2 className='text-center mb-4'>Create New Match</h2>
                       {/*  <div>{currentUser?.email}</div> */}{/*  currentUser starts as undefined and is then set. */}
                        {error && <Alert status="error"  >{error}</Alert>}
                        <form onSubmit={handleSubmit} >
                            <SimpleGrid columns={1} spacing={10}>
                            <FormControl id="myStoneColor" isInvalid={isColorError}>

                                <FormLabel>My Stone Color</FormLabel>
                                <Select icon={<MdArrowDropDown />} ref={myStoneColorRef} variant="filled" placeholder="select your stone color" >
                                    <option value="b" >Black</option>
                                    <option value="w" >White</option>
                                </Select>
                                <FormErrorMessage>Stone color is required.</FormErrorMessage>
                                </FormControl>
                                <FormControl id="myOpponent" isInvalid={isOpponentError}>
                                    
                                <FormLabel>My Opponent</FormLabel>
                                <Select onChange={handleOpponentSelect} icon={<MdArrowDropDown />} variant="filled" placeholder="select an opponent">
                                    <PlayerSelectList />
                                </Select>
                                <FormErrorMessage>Opponent is required.</FormErrorMessage>
                            </FormControl>
                            <Button disabled={loading} className='w-100 mt-4' type="submit">Save</Button>
                            </SimpleGrid>
                        </form>
                        {/*             <PlayerSelectList selectPlayer={onSelectPlayer}></PlayerSelectList>
             */}        </CardBody>
                </Card>
                <div className='w-100 text-center mt-2'>
                    <Link to="/">Cancel</Link>
                </div>

            </>
        )
    }

export default CreateMatch
