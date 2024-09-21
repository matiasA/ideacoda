import { Box, Heading, Container, Text } from '@chakra-ui/react'

export default function Header() {
  return (
    <Box bg="gray.900" color="white" py={12} borderBottom="1px solid" borderColor="gray.800">
      <Container maxW="container.xl">
        <Heading as="h1" size="3xl" fontWeight="100" mb={4} color="brand.300" letterSpacing="wider">
          Generador de Ideas de Negocio con IA
        </Heading>
        <Text fontSize="xl" color="gray.400" fontWeight="300">Transforma tus habilidades en oportunidades innovadoras</Text>
      </Container>
    </Box>
  )
}