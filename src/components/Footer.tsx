import { Box, Text, Container, Link } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box bg="gray.800" color="gray.300" py={6}>
      <Container maxW="container.xl" textAlign="center">
        <Text>&copy; 2024 Generador de Ideas de Negocio con IA. Todos los derechos reservados.</Text>
        <Text mt={2}>
          Desarrollado con <span role="img" aria-label="love">❤️</span> por{' '}
          <Link href="https://tuwebsite.com" isExternal color="brand.300">
            Tu Nombre
          </Link>
        </Text>
      </Container>
    </Box>
  )
}