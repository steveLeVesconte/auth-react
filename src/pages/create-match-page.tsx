import { useContext } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import PlayerSelectList from "../components/features/player-select-list/player-select-list";
import { PlayerContext, PlayerContextType } from "../contexts/PlayerContext";
import {
  Link as ChakraLink,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import { FieldValues, useForm } from "react-hook-form";
import { GameState, Turn, addTurn } from "../services/data/turn-service";
import { Match, addMatch } from "../services/data/match-service";
import { STONE_BLACK, STONE_WHITE } from "../constants";


interface FormData {
  stoneColor: string;
  opponentKey: string;
}

const CreateMatch = () => {
  const { player } = useContext(PlayerContext) as PlayerContextType;
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>();

  function handleFormSubmit(values: FieldValues) {
    const userStoneColor = values.stoneColor;
    const playerInfoArray = values.opponentKey.split("_");
    const opponentName = playerInfoArray[1];
    const opponentId = playerInfoArray[0];
    let playerBlackId = player?.id;
    let playerBlackName = player?.name;
    let playerWhiteId = opponentId;
    let playerWhiteName = opponentName;
    if (userStoneColor == STONE_WHITE) {
      playerBlackId = opponentId;
      playerBlackName = opponentName;
      playerWhiteId = player?.id ?? "";
      playerWhiteName = player?.name ?? "";
    }
    const createDate = new Date().toISOString();
    const newMatch: Match = {
      board:
        "___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________" +
        ",___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________",

      nextTurnPlayer: STONE_WHITE,
      playerBlackId: playerBlackId ?? "",
      playerWhiteId: playerWhiteId,
      playerBlackName: playerBlackName ?? "",
      playerWhiteName: playerWhiteName,
      turnNumber: 0,
      status: "active",
      createDate: createDate,
      updateDate: createDate,
      id: "",
    };

    addMatch(newMatch)
      .then((refDoc) => {
        newMatch.id = refDoc.id;
        const koComareState: GameState = {
          board:
            "___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________" +
            ",___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________",
          prisonersOfBlack: 0,
          prisonersOfWhite: 0,
        };
        const initialState: GameState = {
          board:
            "___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________" +
            ",___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________",
          prisonersOfBlack: 0,
          prisonersOfWhite: 0,
        };
        const resultState: GameState = {
          board:
            "___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________" +
            ",___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________,___________________",
          prisonersOfBlack: 0,
          prisonersOfWhite: 0,
        };
        const startTurn: Turn = {
          id: "",
          matchId: refDoc.id,
          turnPlayerColor: STONE_WHITE,
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
          updateDate: createDate,
        };

        addTurn(startTurn).then(() => {
          navigate("/go-board", { state: { match: newMatch } });
          console.log("yay turn saved");
        });
      })
      .catch(() => {
        console.log("failed to create match");
      })
      .finally(() => {});
  }

  return (
    <>
      <Card marginLeft="auto" marginRight="auto" maxW="500px">
        <CardBody>
          <Heading marginBottom={6}>Create New Match</Heading>
          <form onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
            <SimpleGrid columns={1} spacing={10}>
              <FormControl id="myStoneColor" isInvalid={!!errors?.stoneColor}>
                <FormLabel htmlFor="stoneColor">My Stone Color</FormLabel>
                <Select
                  icon={<MdArrowDropDown />}
                  {...register("stoneColor", {
                    required: "Your stone color choice is required",
                  })}
                  variant="filled"
                  placeholder="select your stone color"
                >
                  <option value={STONE_BLACK} >Black</option>
                  <option value={STONE_WHITE} >White</option>
                </Select>
                <FormErrorMessage>
                  {errors.stoneColor && errors.stoneColor.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="myOpponent" isInvalid={!!errors?.opponentKey}>
                <FormLabel>My Opponent</FormLabel>
                <Select
                  {...register("opponentKey", {
                    required: "Your choice of opponent is required",
                  })}
                  icon={<MdArrowDropDown />}
                  variant="filled"
                  placeholder="select an opponent"
                >
                  <PlayerSelectList />
                </Select>
                <FormErrorMessage>
                  {errors.opponentKey && errors.opponentKey.message}
                </FormErrorMessage>
              </FormControl>
              <SimpleGrid templateColumns="80% 20%">
                <Button
                  disabled={!isValid}
                  isLoading={isSubmitting}
                  colorScheme="orange"
                  className="w-100 mt-4"
                  type="submit"
                >
                  Save
                </Button>
                <Center>
                  {" "}
                  <ChakraLink as={ReactRouterLink} to="/">
                    Cancel
                  </ChakraLink>
                </Center>
              </SimpleGrid>
              <SimpleGrid templateColumns="80% 20%"></SimpleGrid>
            </SimpleGrid>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default CreateMatch;
