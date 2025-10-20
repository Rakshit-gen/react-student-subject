import React from 'react';

const SubjectList = ({ subjects, searchTerm }) => {
  const filteredSubjects = subjects.filter(s => 
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-2">
      {filteredSubjects.map((subject, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-gray-800">{subject}</p>
        </div>
      ))}
      {filteredSubjects.length === 0 && (
        <p className="text-center text-gray-500 py-8">No subjects found</p>
      )}
    </div>
  );
};

export default SubjectList;