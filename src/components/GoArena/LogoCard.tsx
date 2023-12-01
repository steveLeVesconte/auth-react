import { Box, Card, CardBody, Icon, useColorModeValue } from '@chakra-ui/react'
import { TbGoGame } from 'react-icons/tb'
import {  useNavigate } from 'react-router-dom';


export const LogoCard = () => {
    const bg = useColorModeValue('yellow.500', 'yellow.200')
    const color = useColorModeValue('white', 'gray.800')
    const navigate=useNavigate();
  return (
    <Box className='cardBox'>
    <Card>
<CardBody>
<Icon  onClick={()=>{navigate("/")}} as={TbGoGame} className="goIcon"  w={8} h={8}   bg={bg} color={color} />
    </CardBody>
    </Card>
    </Box>
  )
}
