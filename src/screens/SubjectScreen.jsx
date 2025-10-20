import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import SubjectList from '../components/SubjectList';
import AddSubjectDialog from '../components/AddSubjectDialog';
import FAB from '../components/FAB';

const SubjectScreen = ({ subjects, setSubjects }) => {
  const [subjectSearch, setSubjectSearch] = useState('');
  const [addSubjectDialog, setAddSubjectDialog] = useState(false);
  const [newSubject, setNewSubject] = useState('');

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject('');
      setAddSubjectDialog(false);
    }
  };

  return (
    <div className="pb-20">
      <SearchInput value={subjectSearch} onChange={setSubjectSearch} />
      <SubjectList subjects={subjects} searchTerm={subjectSearch} />
      <FAB onClick={() => setAddSubjectDialog(true)} />
      <AddSubjectDialog
        open={addSubjectDialog}
        onClose={() => {
          setAddSubjectDialog(false);
          setNewSubject('');
        }}
        onAdd={handleAddSubject}
        value={newSubject}
        onChange={setNewSubject}
      />
    </div>
  );
};

export default SubjectScreen;