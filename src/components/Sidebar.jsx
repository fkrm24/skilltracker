import React from 'react';
const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-xl font-bold">SkillTracker</span>
      </div>

      {/* User Panel */}
      <div className="flex items-center gap-4 p-4">
        <div className="avatar">
          <div className="w-12 rounded-full">
            {/* Avatar personnalisé */}
            <div className="bg-blue-500 text-white flex items-center justify-center h-full">
              FK
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold">Fatime Kerim</p>
          <p className="text-sm text-gray-400">View Profile</p>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="menu p-4 flex-grow">
        <li className="text-gray-300 hover:text-white">
          <a>
            <i className="fas fa-tachometer-alt"></i>
            <span className="ml-2">Dashboard</span>
          </a>
        </li>
        <li className="text-gray-300 hover:text-white">
          <a>
            <i className="fas fa-users"></i>
            <span className="ml-2">Skills</span>
          </a>
        </li>
        <li className="text-gray-300 hover:text-white">
          <a>
            <i className="fas fa-chalkboard-teacher"></i>
            <span className="ml-2">Tasks</span>
          </a>
        </li>
        <li className="text-gray-300 hover:text-white">
          <a>
            <i className="fas fa-cogs"></i>
            <span className="ml-2">Calendar</span>
          </a>
        </li>
        <li className="text-gray-300 hover:text-white">
          <a>
            <i className="fas fa-book"></i>
            <span className="ml-2">Library</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
