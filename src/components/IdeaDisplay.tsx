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
  onSave: () => void;
}

const IdeaDisplay: React.FC<IdeaDisplayProps> = ({ idea, onSave }) => {
  return (
    <div className="bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-xl p-4 md:p-6 shadow-lg text-white">
      <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-blue-300">{idea.nombreNegocio}</h3>
      <p className="text-lg md:text-xl text-gray-200 mb-4 md:mb-6 italic">{idea.descripcionBreve}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Section title="Propuesta de valor única" content={idea.propuestaValor} />
        <Section title="Público objetivo" content={idea.publicoObjetivo} />
        <Section title="Productos o servicios principales" content={idea.productosServicios} />
        <Section title="Modelo de negocio básico" content={idea.modeloNegocio} />
        <Section title="Estrategia de marketing inicial" content={idea.estrategiaMarketing} />
        <Section title="Próximos pasos" content={idea.proximosPasos} />
      </div>
      
      <div className="mt-4 md:mt-6 flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {idea.etiquetas.map((tag, index) => (
            <span key={index} className="bg-blue-600 px-2 py-1 rounded-full text-xs md:text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={onSave}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
        >
          Guardar Idea
        </button>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="bg-purple-800 bg-opacity-50 p-3 md:p-4 rounded-lg">
    <h4 className="font-semibold mb-1 md:mb-2 text-blue-300 text-sm md:text-base">{title}</h4>
    <p className="text-gray-300 text-sm md:text-base">{content}</p>
  </div>
);

export default IdeaDisplay;