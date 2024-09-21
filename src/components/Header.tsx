import { Box, Heading, Container } from '@chakra-ui/react'

export default function Header() {
  return (
    <Box bg="brand.500" color="white" py={4} shadow="md">
      <Container maxW="container.xl">
        <Heading as="h1" size="xl" fontWeight="bold">
          Generador de Ideas de Negocio con IA
        </Heading>
      </Container>
    </Box>
  )
}