import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const GameBoardLayout = () => {
  return (<>
  
    <Box padding={5}>
        <Outlet></Outlet>
    </Box>
    </>
  )
}

export default GameBoardLayout