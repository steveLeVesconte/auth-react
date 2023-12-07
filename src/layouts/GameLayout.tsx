import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const GameBoardLayout = () => {
  return (<>
    <div className='base-phone-grid'>
    <div  className='left-edge' />

        <Box className="game-board-layout">
          <NavBar />
          <Outlet></Outlet>
        </Box>
  
      <div className='right-edge'  />
   {/*    <Box backgroundColor="black" flexGrow={0} flexShrink={0} h="100%" w="20px"></Box>
 */}    </div>
  </>
  )
}

export default GameBoardLayout