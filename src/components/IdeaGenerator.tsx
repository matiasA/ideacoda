import React, { useState, useEffect } from 'react'
import { generateIdeas } from '../services/aiService'
import IdeaDisplay from './IdeaDisplay'
import SavedIdeas from './SavedIdeas'

const industries = [
  "Tecnología", "Salud", "Educación", "Finanzas", "Alimentación", "Moda", "Turismo", "Deportes", "Arte y Cultura", "Medio Ambiente"
]

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

export default function IdeaGenerator() {
  const [skills, setSkills] = useState('')
  const [industry, setIndustry] = useState('')
  const [ideas, setIdeas] = useState<IdeaStructure[]>([])
  const [savedIdeas, setSavedIdeas] = useState<IdeaStructure[]>([])
  const [loading, setLoading] = useState(false)
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('savedIdeas')
    if (saved) {
      setSavedIdeas(JSON.parse(saved))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const generatedIdeas = await generateIdeas(skills, industry, 1)
      if (generatedIdeas.length > 0) {
        setIdeas(generatedIdeas)
        setIsGeneratorOpen(false)
      } else {
        throw new Error('No se generaron ideas');
      }
    } catch (error: unknown) {
      console.error('Error al generar la idea:', error)
      alert(error instanceof Error ? error.message : 'No se pudo generar la idea. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const saveIdea = (idea: IdeaStructure) => {
    const savedIdea = {
      nombreNegocio: idea.nombreNegocio,
      descripcionBreve: idea.descripcionBreve,
      etiquetas: idea.etiquetas
    };
    const updatedSavedIdeas = [...savedIdeas, savedIdea];
    setSavedIdeas(updatedSavedIdeas);
    localStorage.setItem('savedIdeas', JSON.stringify(updatedSavedIdeas));
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4 md:p-8">
        <div className="mb-4 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">AI Business Idea Generator</h2>
          <button
            onClick={() => setIsGeneratorOpen(true)}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Nueva Idea
          </button>
        </div>
        {ideas.length > 0 ? (
          <div className="space-y-4 md:space-y-8">
            {ideas.map((idea, index) => (
              <IdeaDisplay key={index} idea={idea} onSave={() => saveIdea(idea)} />
            ))}
          </div>
        ) : (
          <p className="text-white text-center">No hay ideas generadas. ¡Crea una nueva!</p>
        )}
        <SavedIdeas ideas={savedIdeas} />
      </div>
      
      {isGeneratorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-full md:w-96 bg-purple-900 bg-opacity-90 p-4 md:p-8 shadow-lg overflow-y-auto">
            <button
              onClick={() => setIsGeneratorOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              X
            </button>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Generate Your Next Big Idea</h3>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="skills" className="block text-white text-sm font-medium mb-2">Your Skills</label>
                <input
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="E.g., programming, design, marketing"
                  required
                  className="w-full p-3 rounded-lg bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="industry" className="block text-white text-sm font-medium mb-2">Industry</label>
                <select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg bg-purple-800 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                  <option value="">Select an industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Generate Idea'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}