import Head from 'next/head'
import { Box, Container, VStack } from '@chakra-ui/react'
import Header from '../components/Header'
import IdeaGenerator from '../components/IdeaGenerator'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Head>
        <title>Generador de Ideas de Negocio con IA</title>
        <meta name="description" content="Genera ideas de negocio innovadoras con IA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Container maxW="container.lg" flex="1" py={12}>
        <IdeaGenerator />
      </Container>
      <Footer />
    </Box>
  )
}