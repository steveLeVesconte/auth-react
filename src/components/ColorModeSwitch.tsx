import {  HStack, Switch, useColorMode } from '@chakra-ui/react';

const ColorModeSwitch = () => {
  const {toggleColorMode, colorMode} =  useColorMode();

  return (
    <HStack >
        <Switch colorScheme='gray' isChecked={colorMode ==='dark'} onChange={toggleColorMode}></Switch>
       <div style={{color:"white"}}>  {colorMode === "dark" ? "Dark": "Light"}</div> 
    </HStack>
  )
}

export default ColorModeSwitch