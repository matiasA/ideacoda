import { Box, Text, Container } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box bg="gray.800" color="white" py={4}>
      <Container maxW="container.xl" textAlign="center">
        <Text>&copy; 2024 Generador de Ideas de Negocio con IA. Todos los derechos reservados.</Text>
      </Container>
    </Box>
  )
}