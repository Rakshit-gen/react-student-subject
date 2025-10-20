import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import StudentList from '../components/StudentList';
import AddStudentDialog from '../components/AddStudentDialog';
import FAB from '../components/FAB';

const StudentScreen = ({ students, setStudents, subjects, scores, setScores, onStudentClick }) => {
  const [studentSearch, setStudentSearch] = useState('');
  const [addStudentDialog, setAddStudentDialog] = useState(false);
  const [studentForm, setStudentForm] = useState({
    id: '',
    firstName: '',
    lastName: '',
    dob: '',
    photo: null
  });

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentForm({ ...studentForm, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStudent = () => {
    if (studentForm.id && studentForm.firstName && studentForm.lastName && studentForm.dob) {
      const newStudent = { ...studentForm, id: studentForm.id.toUpperCase() };
      setStudents([...students, newStudent]);
      
      // Initialize scores for this student
      const newScores = { ...scores };
      subjects.forEach(subject => {
        const key = `${newStudent.id}-${subject}`;
        if (!newScores[key]) {
          newScores[key] = { score: 0, maxScore: 100 };
        }
      });
      setScores(newScores);
      
      setStudentForm({ id: '', firstName: '', lastName: '', dob: '', photo: null });
      setAddStudentDialog(false);
    }
  };

  const handleDeleteStudent = (studentId) => {
    // Remove student from list
    setStudents(students.filter(s => s.id !== studentId));
    
    // Remove all scores associated with this student
    const newScores = { ...scores };
    Object.keys(newScores).forEach(key => {
      if (key.startsWith(`${studentId}-`)) {
        delete newScores[key];
      }
    });
    setScores(newScores);
  };

  return (
    <div className="pb-24">
      <SearchInput value={studentSearch} onChange={setStudentSearch} />
      <StudentList 
        students={students} 
        searchTerm={studentSearch}
        onStudentClick={onStudentClick}
        onDeleteStudent={handleDeleteStudent}
      />
      {students.length === 0 && !studentSearch && (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-white rounded-full shadow-md mb-4">
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Students Yet</h3>
          <p className="text-gray-500">Click the + button to add your first student</p>
        </div>
      )}
      <FAB onClick={() => setAddStudentDialog(true)} />
      <AddStudentDialog
        open={addStudentDialog}
        onClose={() => {
          setAddStudentDialog(false);
          setStudentForm({ id: '', firstName: '', lastName: '', dob: '', photo: null });
        }}
        onAdd={handleAddStudent}
        studentForm={studentForm}
        setStudentForm={setStudentForm}
        onPhotoSelect={handlePhotoSelect}
      />
    </div>
  );
};

export default StudentScreen;