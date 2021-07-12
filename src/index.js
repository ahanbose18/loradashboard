import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './components/App';
import { extendTheme,ChakraProvider } from "@chakra-ui/react"
const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
})


ReactDOM.render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


