import React from 'react';
import { Camera, Calendar } from 'lucide-react';
import Dialog from './Dialog';

const AddStudentDialog = ({ open, onClose, onAdd, studentForm, setStudentForm, onPhotoSelect }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Add Student"
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
            Save
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Photo Upload */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {studentForm.photo ? (
                <img src={studentForm.photo} alt="Student" className="w-full h-full object-cover" />
              ) : (
                <Camera className="text-gray-400" size={40} />
              )}
            </div>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              onChange={onPhotoSelect}
              className="hidden"
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <Camera size={20} />
            </label>
          </div>
        </div>

        {/* Student ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
          <input
            type="text"
            value={studentForm.id}
            onChange={(e) => setStudentForm({ ...studentForm, id: e.target.value })}
            placeholder="e.g., ADJ234"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            value={studentForm.firstName}
            onChange={(e) => setStudentForm({ ...studentForm, firstName: e.target.value })}
            placeholder="Enter first name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            value={studentForm.lastName}
            onChange={(e) => setStudentForm({ ...studentForm, lastName: e.target.value })}
            placeholder="Enter last name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <div className="relative">
            <input
              type="date"
              value={studentForm.dob}
              onChange={(e) => setStudentForm({ ...studentForm, dob: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Calendar className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddStudentDialog;