import React from 'react';
import { User, IdCard, Trash2 } from 'lucide-react';

const StudentList = ({ students, searchTerm, onStudentClick, onDeleteStudent }) => {
  const filteredStudents = students.filter(s => 
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (e, studentId) => {
    e.stopPropagation(); // Prevent triggering the student click
    if (window.confirm('Are you sure you want to delete this student?')) {
      onDeleteStudent(studentId);
    }
  };

  return (
    <div className="space-y-3">
      {filteredStudents.map((student) => (
        <div
          key={student.id}
          onClick={() => onStudentClick(student)}
          className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 hover:transform hover:scale-[1.01] cursor-pointer group"
        >
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden flex items-center justify-center shadow-md">
                {student.photo ? (
                  <img src={student.photo} alt={student.firstName} className="w-full h-full object-cover" />
                ) : (
                  <User className="text-white" size={28} />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-semibold text-lg group-hover:text-blue-600 transition-colors">
                {student.firstName} {student.lastName}
              </p>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <IdCard size={14} className="mr-1" />
                <span>Student ID: {student.id}</span>
              </div>
            </div>
            <button
              onClick={(e) => handleDelete(e, student.id)}
              className="p-2 mr-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Delete student"
            >
              <Trash2 size={20} />
            </button>
            <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      ))}
      {filteredStudents.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No students found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default StudentList;