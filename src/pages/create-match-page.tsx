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
import { Turn, addTurn } from "../services/data/turn-service";
import { Match, addMatch } from "../services/data/match-service";
import {
  EMPTY_BOARD,
  EMPTY_GAME_STATE,
  MATCH_STATUS_ACTIVE,
  STONE_BLACK,
  STONE_WHITE,
} from "../constants";
import utilities from "../services/utilitities";

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
    const { playerBlackId, playerBlackName, playerWhiteId, playerWhiteName } =
      utilities.stoneColorDependentValues(
        player,
        userStoneColor,
        opponentId,
        opponentName
      );
    const createDate = new Date().toISOString();
    const newMatch: Match = {
      board: EMPTY_BOARD,
      nextTurnPlayer: STONE_WHITE,
      playerBlackId: playerBlackId ?? "",
      playerWhiteId: playerWhiteId,
      playerBlackName: playerBlackName ?? "",
      playerWhiteName: playerWhiteName,
      turnNumber: 0,
      status: MATCH_STATUS_ACTIVE,
      createDate: createDate,
      updateDate: createDate,
      id: "",
    };

    addMatch(newMatch)
      .then((refDoc) => {
        newMatch.id = refDoc.id;
        const startTurn: Turn = {
          id: "",
          matchId: refDoc.id,
          turnPlayerColor: STONE_WHITE,
          turnNumber: 0,
          playerBlackId: playerBlackId ?? "missing",
          playerWhiteId: playerWhiteId,
          playerBlackName: playerBlackName ?? "missing",
          playerWhiteName: playerWhiteName,
          koCompareState: EMPTY_GAME_STATE,
          initialState: EMPTY_GAME_STATE,
          resultState: EMPTY_GAME_STATE,
          action: { actionType: "start", location: null },
          isValid: true,
          isKo: false,
          comments: "",
          createDate: createDate,
          updateDate: createDate,
        };

        addTurn(startTurn).then(() => {
          navigate("/go-board", { state: { match: newMatch } });
        });
      })
      .catch(() => {
        console.log("failed to create match"); //TBD make visible
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
                  <option value={STONE_BLACK}>Black</option>
                  <option value={STONE_WHITE}>White</option>
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
