import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'
import { rateLimiter } from '../../lib/rateLimiter'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Get the user's IP address
      const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;

      // Check if the user has exceeded their rate limit
      if (!rateLimiter(ip)) {
        return res.status(429).json({ error: 'Has excedido el límite de 5 consultas por día. Por favor, intenta de nuevo mañana.' });
      }

      const { skills, industry, numberOfIdeas } = req.body

      const ideas: IdeaStructure[] = []
      for (let i = 0; i < numberOfIdeas; i++) {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Eres un experto en generación de ideas de negocio innovadoras y planificación estratégica."
            },
            {
              role: "user",
              content: `Genera una idea de negocio innovadora basada en las siguientes habilidades: ${skills} y en la industria: ${industry}.`
            }
          ],
          functions: [
            {
              name: "generate_business_idea",
              description: "Genera una idea de negocio estructurada",
              parameters: {
                type: "object",
                properties: {
                  nombreNegocio: {
                    type: "string",
                    description: "Nombre del negocio"
                  },
                  descripcionBreve: {
                    type: "string",
                    description: "Descripción breve del negocio (máximo 2 frases)"
                  },
                  propuestaValor: {
                    type: "string",
                    description: "Propuesta de valor única"
                  },
                  publicoObjetivo: {
                    type: "string",
                    description: "Público objetivo"
                  },
                  productosServicios: {
                    type: "string",
                    description: "Productos o servicios principales"
                  },
                  modeloNegocio: {
                    type: "string",
                    description: "Modelo de negocio básico"
                  },
                  estrategiaMarketing: {
                    type: "string",
                    description: "Estrategia de marketing inicial"
                  },
                  proximosPasos: {
                    type: "string",
                    description: "Próximos pasos para iniciar el negocio (3-5 puntos)"
                  },
                  etiquetas: {
                    type: "array",
                    items: {
                      type: "string"
                    },
                    description: "Etiquetas (3-5 palabras clave relacionadas con la idea)"
                  }
                },
                required: ["nombreNegocio", "descripcionBreve", "propuestaValor", "publicoObjetivo", "productosServicios", "modeloNegocio", "estrategiaMarketing", "proximosPasos", "etiquetas"]
              }
            }
          ],
          function_call: { name: "generate_business_idea" }
        })

        const functionCall = completion.choices[0]?.message?.function_call
        if (functionCall && functionCall.name === "generate_business_idea") {
          const idea: IdeaStructure = JSON.parse(functionCall.arguments || '{}')
          ideas.push(idea)
        } else {
          throw new Error('No se pudo generar una idea estructurada.')
        }
      }

      res.status(200).json({ ideas })
    } catch (error: unknown) {
      console.error('Error al generar las ideas:', error)
      res.status(500).json({ error: 'Error al generar las ideas' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}