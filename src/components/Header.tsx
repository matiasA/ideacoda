import { Box, Heading, Container, Text } from '@chakra-ui/react'

export default function Header() {
  return (
    <Box bg="brand.500" color="white" py={8} shadow="md">
      <Container maxW="container.xl">
        <Heading as="h1" size="2xl" fontWeight="bold" mb={2}>
          Generador de Ideas de Negocio con IA
        </Heading>
        <Text fontSize="xl">Transforma tus habilidades en oportunidades innovadoras</Text>
      </Container>
    </Box>
  )
}