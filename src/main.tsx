import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
//import "bootstrap/dist/css/bootstrap.min.css"
//import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>   
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
