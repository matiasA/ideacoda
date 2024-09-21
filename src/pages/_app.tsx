import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme, ThemeComponents } from '@chakra-ui/react'
import '../styles/globals.css'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#e0f7ff',
      100: '#b8e7ff',
      200: '#8ad6ff',
      300: '#5cc5ff',
      400: '#2eb4ff',
      500: '#00a3ff',
      600: '#0082cc',
      700: '#006199',
      800: '#004166',
      900: '#002033',
    },
    gray: {
      50: '#f7f7f7',
      100: '#e6e6e6',
      200: '#d4d4d4',
      300: '#c1c1c1',
      400: '#afafaf',
      500: '#9d9d9d',
      600: '#7a7a7a',
      700: '#575757',
      800: '#353535',
      900: '#121212',
    },
  },
  fonts: {
    heading: '"Roboto", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
        borderRadius: 'full',
        transition: 'all 0.3s ease-in-out',
      },
      variants: {
        solid: (props: { colorScheme: string }) => ({
          bg: `${props.colorScheme}.500`,
          color: 'white',
          _hover: {
            bg: `${props.colorScheme}.600`,
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
        }),
      },
    } as ThemeComponents['Button'],
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'full',
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: 'full',
        },
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