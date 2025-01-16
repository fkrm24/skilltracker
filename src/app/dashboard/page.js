"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SkillList from "../../components/SkillList";
import TaskOverview from "../../components/TaskOverview";

export default function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Récupérer le nom d'utilisateur depuis localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-purple-600 to-pink-500 p-6">
      {/* Header */}
      <header className="text-white text-center py-4">
        <h1 className="text-3xl font-bold">Skill Tracker Dashboard</h1>
        <p className="mt-2 text-lg">
          Bienvenue, <span className="font-semibold">{username || "Utilisateur"}!</span>
        </p>
      </header>

      {/* Skill List Section */}
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <SkillList />
        <TaskOverview />
      </div>
    </div>
  );
}
