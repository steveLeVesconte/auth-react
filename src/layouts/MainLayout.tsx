import { Box  } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const MainLayout = () => {
  return (<>
{/*   <Grid templateAreas={{base:`'main' 'main' 'main'`,
xl:`'leftside' 'main' 'rightside'`
}}>
  <GridItem area='leftside'></GridItem>
  <GridItem area='main'> */}
  <NavBar />
    <Box padding={5}>
        <Outlet></Outlet>
    </Box>


 {/*  </GridItem> */}
{/*   <GridItem area='rightside'></GridItem> */}


  {/* </Grid> */}

    </>
  )
}

export default MainLayout