
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SkillList from '../components/SkillList';
import TaskOverview from '../components/TaskOverview';

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="main-content">
        <Header />
        <SkillList />
        <TaskOverview />
      </div>
    </div>
  );
}
