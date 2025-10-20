import React from 'react';
import { X } from 'lucide-react';

const Dialog = ({ open, onClose, title, children, actions }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {actions && (
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-2 border-t">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;
