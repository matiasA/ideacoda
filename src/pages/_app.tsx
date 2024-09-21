import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '../styles/globals.css'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e0f2ff',
      100: '#b8dcff',
      200: '#8ac5ff',
      300: '#5cadff',
      400: '#2e95ff',
      500: '#007bff',
      600: '#0062cc',
      700: '#004999',
      800: '#003166',
      900: '#001833',
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: (props) => ({
          bg: `${props.colorScheme}.500`,
          color: 'white',
          _hover: {
            bg: `${props.colorScheme}.600`,
          },
        }),
      },
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp