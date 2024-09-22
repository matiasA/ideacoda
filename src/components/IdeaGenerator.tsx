import React, { useState, useEffect } from 'react'
import { generateIdeas } from '../services/aiService'
import IdeaDisplay from './IdeaDisplay'
import SavedIdeas from './SavedIdeas'
import Header from './Header'
import AnimatedBackground from './AnimatedBackground'
import { IdeaStructure } from '../types/idea'
import Image from 'next/image'

const industries = [
  "Tecnología", "Salud", "Educación", "Finanzas", "Alimentación", "Moda", "Turismo", "Deportes", "Arte y Cultura", "Medio Ambiente"
]

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
    } as IdeaStructure;
    const updatedSavedIdeas = [...savedIdeas, savedIdea];
    setSavedIdeas(updatedSavedIdeas);
    localStorage.setItem('savedIdeas', JSON.stringify(updatedSavedIdeas));
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <AnimatedBackground />
      <Header onNewIdea={() => setIsGeneratorOpen(true)} />

      <main className="flex-grow container mx-auto p-4 md:p-6 relative z-10">
        {ideas.length > 0 ? (
          <div className="space-y-4 md:space-y-8">
            {ideas.map((idea, index) => (
              <IdeaDisplay key={index} idea={idea} onSave={() => saveIdea(idea)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Bienvenido al Generador de Ideas de Negocio con IA</h2>
            <p className="text-lg text-gray-300 mb-8">Haz clic en &quot;Nueva Idea&quot; para comenzar a generar ideas innovadoras basadas en tus habilidades e industria de interés.</p>
          </div>
        )}

        {savedIdeas.length > 0 && <SavedIdeas ideas={savedIdeas} />}
      </main>

      {isGeneratorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-purple-900 bg-opacity-90 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Genera tu próxima gran idea</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="skills" className="block text-white text-sm font-medium mb-2">Tus habilidades</label>
                <input
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Ej: programación, diseño, marketing"
                  required
                  className="w-full p-3 rounded-lg bg-purple-800 bg-opacity-50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="industry" className="block text-white text-sm font-medium mb-2">Industria</label>
                <select
                  id="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg bg-purple-800 bg-opacity-50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                  <option value="">Selecciona una industria</option>
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
                {loading ? 'Generando...' : 'Generar Idea'}
              </button>
            </form>
            <button
              onClick={() => setIsGeneratorOpen(false)}
              className="mt-4 text-gray-300 hover:text-white transition duration-300 ease-in-out"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 right-0 z-20">
        <Image
          src="/idea.png"
          alt="Idea Icon"
          width={150}
          height={150}
          className="opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </div>
  )
}