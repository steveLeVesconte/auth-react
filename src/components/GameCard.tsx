import {
    Card,
    CardBody,
    Heading,
    HStack,
    Image,
    Text
  } from '@chakra-ui/react';
  //import { Link } from 'react-router-dom';
  import { Match } from '../firestore';
  import defaultImage from '../assets/igo.jpg';
  //import getCroppedImageUrl from '../services/image-url';
  //import CriticScore from './CriticScore';
  //import Emoji from './Emoji';
  //mport PlatformIconList from './PlatformIconList';
  
  interface Props {
    match: Match;
  }
  
  const GameCard = ({ match }: Props) => {
    return (
      <Card>
        <Image src={defaultImage} boxSize='300px' />
        <CardBody>
{/*           <HStack justifyContent="space-between" marginBottom={3}>
            <PlatformIconList
              platforms={game.parent_platforms?.map(
                (p) => p.platform
              )}
            />
            <CriticScore score={game.metacritic} />
          </HStack> */}
          <Heading fontSize="2xl">
            <div>
            <Text>Black: {match.playerBlackName} </Text></div>
            <div>  <Text>White: {match.playerWhiteName} </Text></div>
            <div>  <Text>Date: {match.createDate} </Text></div>
            <div>  <Text>Move: {match.turnNumber} </Text></div>
            <div>  <Text>Move: {match.id} </Text></div>
            {/* <Emoji rating={game.rating_top} /> */}
          </Heading>
        </CardBody>
      </Card>
    );
  };
  
  export default GameCard;
  