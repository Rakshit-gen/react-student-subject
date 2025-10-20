import React from 'react';
import Dialog from './Dialog';

const AddSubjectDialog = ({ open, onClose, onAdd, value, onChange }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Add Subject"
      actions={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </>
      }
    >
      <input
        type="text"
        placeholder="Subject name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
    </Dialog>
  );
};

export default AddSubjectDialog;