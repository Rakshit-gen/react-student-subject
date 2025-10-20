import React from 'react';
import { Plus } from 'lucide-react';

const FAB = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors z-40"
    >
      <Plus size={24} />
    </button>
  );
};

export default FAB;