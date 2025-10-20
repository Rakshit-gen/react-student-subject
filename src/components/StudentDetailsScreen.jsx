import React from 'react';
import { ChevronLeft, Camera } from 'lucide-react';

const StudentDetailsScreen = ({ student, subjects, scores, updateScore, onBack }) => {
  const calculatePercentage = (subject) => {
    const key = `${student.id}-${subject}`;
    const scoreData = scores[key] || { score: 0, maxScore: 100 };
    if (scoreData.maxScore === 0) return 0;
    return ((scoreData.score / scoreData.maxScore) * 100).toFixed(2);
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'First class';
    if (percentage >= 75) return 'Second class';
    if (percentage >= 60) return 'Third class';
    if (percentage >= 50) return 'Pass';
    return 'Fail';
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Student Details</h1>
      </div>

      {/* Student Info Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mr-4">
            {student.photo ? (
              <img src={student.photo} alt={student.firstName} className="w-full h-full object-cover" />
            ) : (
              <Camera className="text-gray-400" size={30} />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{student.firstName} {student.lastName}</h2>
            <p className="text-gray-600">ID: {student.id}</p>
            <p className="text-gray-600">DOB: {student.dob}</p>
          </div>
        </div>
      </div>

      {/* Subjects and Scores */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Subjects</h3>
        {subjects.map((subject, index) => {
          const key = `${student.id}-${subject}`;
          const scoreData = scores[key] || { score: 0, maxScore: 100 };
          const percentage = calculatePercentage(subject);
          const grade = getGrade(percentage);

          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <h4 className="font-semibold text-gray-800">{subject}</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Score</label>
                  <input
                    type="number"
                    value={scoreData.score}
                    onChange={(e) => updateScore(student.id, subject, 'score', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Max Score</label>
                  <input
                    type="number"
                    value={scoreData.maxScore}
                    onChange={(e) => updateScore(student.id, subject, 'maxScore', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Percentage</span>
                  <span className="font-semibold text-blue-600">{percentage}%</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Grade</span>
                  <span className={`font-semibold ${
                    parseFloat(percentage) >= 50 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {grade}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {subjects.length === 0 && (
          <p className="text-center text-gray-500 py-8">No subjects available. Please add subjects first.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDetailsScreen;