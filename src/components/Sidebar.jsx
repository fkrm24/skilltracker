import React from 'react';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-semibold">SkillTracker</h2>
      <nav className="mt-6">
        <ul>
          <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Dashboard</a></li>
          <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Skills</a></li>
          <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded-md">Tasks</a></li>
        </ul>
      </nav>
    </div>
  );
}

