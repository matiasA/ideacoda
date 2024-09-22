import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import Header from '../components/Header'
import IdeaGenerator from '../components/IdeaGenerator'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg="gray.900">
      
      <Container maxW="container.xl" flex="1" py={12}>
        <IdeaGenerator />
      </Container>
    </Box>
  )
}