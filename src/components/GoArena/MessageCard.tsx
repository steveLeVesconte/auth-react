import {
    Card,
    CardBody,
    CardHeader,
  } from '@chakra-ui/react';

import { Message } from '../../firestore';
  
  interface Props {
    message:Message;
  }
  
  const MessageCard = ( {message} : Props) => {
    return (
      <Card>
        <CardHeader>
            <h3>{message.speakerName} {message.createDate.substring(0,10)}</h3>
        </CardHeader>
        <CardBody>
          <div >
            {message.message}
          </div>
      
        </CardBody>
      </Card>
    );
  };
  
  export default MessageCard;