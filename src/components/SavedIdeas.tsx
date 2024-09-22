import React from 'react';

interface IdeaStructure {
  nombreNegocio: string;
  descripcionBreve: string;
  etiquetas: string[];
}

interface SavedIdeasProps {
  ideas: IdeaStructure[];
}

const SavedIdeas: React.FC<SavedIdeasProps> = ({ ideas }) => {
  if (ideas.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Ideas Guardadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea, index) => (
          <SavedIdeaCard key={index} idea={idea} />
        ))}
      </div>
    </div>
  );
};

const SavedIdeaCard: React.FC<{ idea: IdeaStructure }> = ({ idea }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-blue-300 mb-2 truncate">{idea.nombreNegocio}</h3>
      <p className="text-sm text-gray-300 mb-2 line-clamp-2">{idea.descripcionBreve}</p>
      <div className="flex flex-wrap gap-1">
        {idea.etiquetas.slice(0, 3).map((tag, index) => (
          <span key={index} className="bg-blue-600 px-2 py-1 rounded-full text-xs text-white">
            {tag}
          </span>
        ))}
        {idea.etiquetas.length > 3 && (
          <span className="text-xs text-gray-400">+{idea.etiquetas.length - 3} más</span>
        )}
      </div>
    </div>
  );
};

export default SavedIdeas;