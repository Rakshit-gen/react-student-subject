import React, { useState } from 'react';
import { useMemoryStorage } from './hooks/useMemoryStorage';
import SubjectScreen from './screens/SubjectScreen';
import StudentScreen from './screens/StudentScreen';
import StudentDetailsScreen from './components/StudentDetailsScreen';

function App() {
  const [screen, setScreen] = useState('subjects');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Use memory storage for data persistence during session
  const [subjects, setSubjects] = useMemoryStorage('appSubjects', []);
  const [students, setStudents] = useMemoryStorage('appStudents', []);
  const [scores, setScores] = useMemoryStorage('appScores', {});

  // Update score function
  const updateScore = (studentId, subject, field, value) => {
    const key = `${studentId}-${subject}`;
    setScores({
      ...scores,
      [key]: {
        ...scores[key],
        [field]: parseFloat(value) || 0
      }
    });
  };

  // Handle student click to view details
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setScreen('studentDetails');
  };

  // Handle back navigation from student details
  const handleBack = () => {
    setScreen('students');
    setSelectedStudent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header - No changes to header during navigation */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <h1 className="text-2xl font-bold text-center tracking-wide">College Admin</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4 py-6">
        {screen === 'studentDetails' ? (
          <StudentDetailsScreen
            student={selectedStudent}
            subjects={subjects}
            scores={scores}
            updateScore={updateScore}
            onBack={handleBack}
          />
        ) : (
          <>
            {/* Tab Navigation - Modern Design */}
            <div className="bg-white rounded-xl shadow-md mb-6 p-1">
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setActiveTab(0);
                    setScreen('subjects');
                  }}
                  className={`flex-1 py-3 px-4 text-center font-semibold rounded-lg transition-all duration-200 ${
                    activeTab === 0
                      ? 'bg-blue-600 text-white shadow-md transform scale-[1.02]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Subjects
                </button>
                <button
                  onClick={() => {
                    setActiveTab(1);
                    setScreen('students');
                  }}
                  className={`flex-1 py-3 px-4 text-center font-semibold rounded-lg transition-all duration-200 ${
                    activeTab === 1
                      ? 'bg-blue-600 text-white shadow-md transform scale-[1.02]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Students
                </button>
              </div>
            </div>

            {/* Screen Content */}
            <div className="animate-fadeIn">
              {screen === 'subjects' && (
                <SubjectScreen subjects={subjects} setSubjects={setSubjects} />
              )}
              {screen === 'students' && (
                <StudentScreen
                  students={students}
                  setStudents={setStudents}
                  subjects={subjects}
                  scores={scores}
                  setScores={setScores}
                  onStudentClick={handleStudentClick}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;