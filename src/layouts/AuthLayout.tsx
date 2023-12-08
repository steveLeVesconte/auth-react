import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (<>

    <Box padding={5}>
        <Outlet></Outlet>
    </Box>
    </>
  )
}

export default AuthLayout