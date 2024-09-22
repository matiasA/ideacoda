// Elimina esta línea si no estás usando axios
// import axios from 'axios'

interface IdeaStructure {
  nombreNegocio: string;
  descripcionBreve: string;
  propuestaValor: string;
  publicoObjetivo: string;
  productosServicios: string;
  modeloNegocio: string;
  estrategiaMarketing: string;
  proximosPasos: string;
  etiquetas: string[];
}

const CACHE_KEY = 'generatedIdeas';
const CACHE_EXPIRATION = 1000 * 60 * 60; // 1 hora

export async function generateIdeas(skills: string, industry: string, numberOfIdeas: number): Promise<IdeaStructure[]> {
  const cacheKey = `${CACHE_KEY}_${skills}_${industry}_${numberOfIdeas}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { timestamp, ideas } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      console.log("Usando ideas en caché");
      return ideas;
    }
  }

  try {
    const response = await fetch('/api/generate-idea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skills, industry, numberOfIdeas }),
    });

    if (!response.ok) {
      throw new Error('Error al generar las ideas');
    }

    const data = await response.json();
    console.log("Respuesta completa de la API:", data);
    
    const ideas: IdeaStructure[] = data.ideas;
    
    // Guardar en caché
    localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      ideas
    }));

    return ideas;
  } catch (error) {
    console.error('Error en generateIdeas:', error);
    throw error;
  }
}