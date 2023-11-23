import { useContext, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom';
import { GameState, Player, Turn, addMatch, addTurn } from '../firestore';
import PlayerSelectList from '../components/PlayerSelectList';
import { PlayerContext } from '../contexts/PlayerContext';
import { Alert, Button, Card, CardBody, FormControl, FormLabel, Select } from '@chakra-ui/react';

const CreateMatch
    = () => {
        const { currentUser } = useAuth();//from AuthContext
        console.log('inCreateWatch');
        const myStoneColorRef = useRef<HTMLSelectElement>(null);
        const [opponentId, setOpponentId] = useState('')
        const [opponentName, setOpponentName] = useState('')
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(false);
        const currentPlayer = useContext(PlayerContext);
        console.log('current player: ', currentPlayer)
        function onSelectPlayer(selectedPlayer: Player) {
            setOpponentId(selectedPlayer.id);
            setOpponentName(selectedPlayer.name);
        }

        function handleSubmit(e: { preventDefault: () => void; }) {
            e.preventDefault();
            let playerBlackId = currentPlayer?.id;
            let playerBlackName = currentPlayer?.name;
            let playerWhiteId = opponentId;
            let playerWhiteName = opponentName;
            if (myStoneColorRef?.current?.value == "w") {
                playerBlackId = opponentId;
                playerBlackName = opponentName;
                playerWhiteId = currentPlayer?.id ?? "";
                playerWhiteName = currentPlayer?.name ?? "";
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
                        turnPlayerColor: "b",
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

        return (
            <>
                <Card>
                    <CardBody>
                        <h2 className='text-center mb-4'>Create New Match</h2>
                        <div>{currentUser?.email}</div>{/*  currentUser starts as undefined and is then set. */}
                        {error && <Alert status="error"  >{error}</Alert>}
                        <form onSubmit={handleSubmit} >
                            <FormControl id="myStoneColor">
                                <FormLabel>My Stone Color</FormLabel>
                                <Select ref={myStoneColorRef}  >
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
