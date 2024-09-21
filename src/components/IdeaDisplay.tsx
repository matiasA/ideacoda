import { Box, Text, VStack, Heading, UnorderedList, ListItem, Flex, Badge, Button, HStack, useToast } from '@chakra-ui/react'
import { FaShare, FaSave, FaDownload } from 'react-icons/fa'
import jsPDF from 'jspdf'

interface IdeaDisplayProps {
  idea: string
}

export default function IdeaDisplay({ idea }: IdeaDisplayProps) {
  const sections = idea.split('\n\n')
  const toast = useToast()

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mi idea de negocio generada por IA',
        text: idea,
        url: window.location.href,
      })
        .then(() => console.log('Idea compartida con éxito'))
        .catch((error) => console.log('Error al compartir', error))
    } else {
      toast({
        title: 'Compartir no disponible',
        description: 'Tu navegador no soporta la función de compartir.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleSave = () => {
    const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]')
    savedIdeas.push(idea)
    localStorage.setItem('savedIdeas', JSON.stringify(savedIdeas))
    toast({
      title: 'Idea guardada',
      description: 'La idea ha sido guardada en tus favoritos.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleDownloadPDF = () => {
    const pdf = new jsPDF()
    let yOffset = 10

    // Título
    pdf.setFontSize(20)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Idea de Negocio Generada por IA', 105, yOffset, { align: 'center' })
    yOffset += 20

    // Contenido
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    sections.forEach((section, index) => {
      const [title, ...content] = section.split('\n')

      // Título de la sección
      pdf.setFont('helvetica', 'bold')
      pdf.text(`${index + 1}. ${title}`, 10, yOffset)
      yOffset += 10

      // Contenido de la sección
      pdf.setFont('helvetica', 'normal')
      content.forEach(line => {
        const lines = pdf.splitTextToSize(line, 180)
        lines.forEach((splitLine: string) => {
          pdf.text(splitLine, 15, yOffset)
          yOffset += 7
        })
      })

      yOffset += 5

      // Nueva página si es necesario
      if (yOffset > 280) {
        pdf.addPage()
        yOffset = 10
      }
    })

    // Guardar el PDF
    pdf.save('idea_de_negocio.pdf')

    toast({
      title: 'PDF descargado',
      description: 'Tu idea de negocio ha sido descargada como PDF.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <VStack mt={12} spacing={8} align="stretch">
      <Heading as="h3" size="2xl" textAlign="center" color="brand.300" fontWeight="100" letterSpacing="wider">
        Tu Idea de Negocio Innovadora
      </Heading>
      <HStack justifyContent="center" spacing={4}>
        <Button leftIcon={<FaShare />} colorScheme="blue" onClick={handleShare} fontWeight="300">
          Compartir
        </Button>
        <Button leftIcon={<FaSave />} colorScheme="green" onClick={handleSave} fontWeight="300">
          Guardar
        </Button>
        <Button leftIcon={<FaDownload />} colorScheme="purple" onClick={handleDownloadPDF} fontWeight="300">
          Descargar PDF
        </Button>
      </HStack>
      {sections.map((section, index) => {
        const [title, ...content] = section.split('\n')
        return (
          <Box 
            key={index} 
            className="idea-box"
            borderRadius="xl" 
            boxShadow="lg"
            transition="all 0.3s ease-in-out"
            _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
            overflow="hidden"
          >
            <Box className="idea-box-content" p={8}>
              <Flex align="center" mb={4}>
                <Badge colorScheme="brand" fontSize="0.8em" mr={2} fontWeight="300">
                  {index + 1}
                </Badge>
                <Heading as="h4" size="lg" color="brand.300" fontWeight="100">
                  {title}
                </Heading>
              </Flex>
              {content.length > 1 ? (
                <UnorderedList spacing={2}>
                  {content.map((item, i) => (
                    <ListItem key={i} fontSize="md" color="gray.300" fontWeight="300">
                      {item.replace('- ', '')}
                    </ListItem>
                  ))}
                </UnorderedList>
              ) : (
                <Text fontSize="lg" fontStyle="italic" color="gray.300" fontWeight="300">
                  {content[0]}
                </Text>
              )}
            </Box>
          </Box>
        )
      })}
      <Box>
        <Heading as="h5" size="md" mb={2} color="brand.300" fontWeight="100">
          Etiquetas:
        </Heading>
        <Flex wrap="wrap" gap={2}>
          {sections[sections.length - 1].split('\n')[1].split(', ').map((tag, index) => (
            <Badge key={index} colorScheme="blue" fontWeight="300">
              {tag}
            </Badge>
          ))}
        </Flex>
      </Box>
    </VStack>
  )
}