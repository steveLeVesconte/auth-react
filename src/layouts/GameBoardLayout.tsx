//import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const GameBoardLayout = () => {
  return (<>
  
    {/* <Box> */}
        <Outlet></Outlet>
    {/* </Box> */}
    </>
  )
}

export default GameBoardLayout