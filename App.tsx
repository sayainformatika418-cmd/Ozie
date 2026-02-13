
import React, { useState, useEffect } from 'react';
import { User, SchoolProfile } from './types';
import { StorageService } from './services/storage';
import Login from './views/Login';
import Register from './views/Register';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import StudentView from './views/Master/StudentView';
import TeacherView from './views/Master/TeacherView';
import SubjectView from './views/Master/SubjectView';
import ClassView from './views/Master/ClassView';
import GradeInput from './views/Input/GradeInput';
import AttendanceInput from './views/Input/AttendanceInput';
import BehaviorInput from './views/Input/BehaviorInput';
import AcademicView from './views/Academic/AcademicView';
import ReportView from './views/Reports/ReportView';
import PrintView from './views/Print/PrintView';
import SchoolProfileView from './views/Admin/SchoolProfileView';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(StorageService.getProfile());

  useEffect(() => {
    const savedUser = localStorage.getItem('ru_session');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Sync document title with school name
  useEffect(() => {
    document.title = `SIAKAD - ${schoolProfile.name}`;
  }, [schoolProfile.name]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('ru_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ru_session');
  };

  const handleProfileUpdate = (newProfile: SchoolProfile) => {
    setSchoolProfile(newProfile);
  };

  if (!currentUser) {
    return isRegistering 
      ? <Register 
          schoolProfile={schoolProfile}
          onRegister={() => setIsRegistering(false)} 
          onBackToLogin={() => setIsRegistering(false)} 
        />
      : <Login 
          schoolProfile={schoolProfile}
          onLogin={handleLogin} 
          onGoToRegister={() => setIsRegistering(true)} 
        />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard schoolProfile={schoolProfile} />;
      case 'profile': return <SchoolProfileView onUpdate={handleProfileUpdate} />;
      case 'students': return <StudentView />;
      case 'teachers': return <TeacherView />;
      case 'subjects': return <SubjectView />;
      case 'classes': return <ClassView />;
      case 'input-grades': return <GradeInput />;
      case 'input-attendance': return <AttendanceInput />;
      case 'input-behavior': return <BehaviorInput />;
      case 'academic': return <AcademicView />;
      case 'reports': return <ReportView />;
      case 'print': return <PrintView />;
      default: return <Dashboard schoolProfile={schoolProfile} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onLogout={handleLogout}
        schoolProfile={schoolProfile}
      />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 capitalize">
              {activeView.replace('-', ' ')}
            </h2>
            <p className="text-slate-500 text-sm">Selamat datang kembali di {schoolProfile.name}, {currentUser.name}</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200 shadow-sm">
                {currentUser.name.charAt(0)}
             </div>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
