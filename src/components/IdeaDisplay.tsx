import React from 'react';

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

interface IdeaDisplayProps {
  idea: IdeaStructure;
}

const IdeaDisplay: React.FC<IdeaDisplayProps> = ({ idea }) => {
  return (
    <div className="bg-purple-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg text-white">
      <h3 className="text-3xl font-bold mb-4 text-blue-300">{idea.nombreNegocio}</h3>
      <p className="text-xl text-gray-300 mb-6 italic">{idea.descripcionBreve}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="Propuesta de valor única" content={idea.propuestaValor} />
        <Section title="Público objetivo" content={idea.publicoObjetivo} />
        <Section title="Productos o servicios principales" content={idea.productosServicios} />
        <Section title="Modelo de negocio básico" content={idea.modeloNegocio} />
        <Section title="Estrategia de marketing inicial" content={idea.estrategiaMarketing} />
        <Section title="Próximos pasos" content={idea.proximosPasos} />
      </div>
      
      <div className="mt-6">
        <h4 className="font-semibold mb-2 text-blue-300">Etiquetas:</h4>
        <div className="flex flex-wrap gap-2">
          {idea.etiquetas.map((tag, index) => (
            <span key={index} className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="bg-purple-800 bg-opacity-50 p-4 rounded-lg">
    <h4 className="font-semibold mb-2 text-blue-300">{title}</h4>
    <p className="text-gray-300">{content}</p>
  </div>
);

export default IdeaDisplay;