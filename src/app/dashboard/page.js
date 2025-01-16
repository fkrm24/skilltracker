import React from 'react';
import Header from '../../components/Header';
import SkillList from '../../components/SkillList';
import TaskOverview from '../../components/TaskOverview';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 p-6">
      {/* Header */}
      <Header />

      {/* Skill List Section */}
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <SkillList />
        <TaskOverview />
      </div>
    </div>
  );
}
