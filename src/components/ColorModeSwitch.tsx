import { Text, HStack, Switch, useColorMode } from '@chakra-ui/react';

const ColorModeSwitch = () => {
  const {toggleColorMode, colorMode} =  useColorMode();

  return (
    <HStack >
        <Switch colorScheme='gray' isChecked={colorMode ==='dark'} onChange={toggleColorMode}></Switch>
       <Text>  {colorMode === "dark" ? "Dark": "Light"}</Text> 
    </HStack>
  )
}

export default ColorModeSwitch