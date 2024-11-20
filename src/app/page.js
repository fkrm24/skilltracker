// pages/index.js
// src/app/page.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SkillList from '../components/SkillList';
import TaskOverview from '../components/TaskOverview';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto bg-white shadow-lg rounded-lg mx-4">
        {/* Header */}
        <Header />

        {/* Skill List Section */}
        <div className="mt-6">
          <SkillList />
        </div>

        {/* Task Overview Section */}
        <div className="mt-6">
          <TaskOverview />
        </div>
      </div>
    </div>
  );
}

