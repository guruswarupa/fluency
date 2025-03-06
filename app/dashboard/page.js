'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import {
  Home,
  Book,
  MessageSquare,
  Target,
  BarChart,
  Trophy,
  Settings,
} from "lucide-react";
import Cookies from "js-cookie"; // Assuming you're using cookies for auth
import AIChat from "../components/aichat";
import { FaMedal } from "react-icons/fa";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Dashboard from "../components/dashboard";

// Registering required chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const trophies = [
  { level: "Beginner", color: "#FF9F00" },
  { level: "Conversationalist", color: "#4CAF50" },
  { level: "Fluent", color: "#2196F3" },
  { level: "Polyglot", color: "#9C27B0" },
  { level: "Master of Vocabulary", color: "#FFC107" },
  { level: "Grammar Guru", color: "#FF5722" },
  { level: "Perfect Pronunciation", color: "#8BC34A" },
  { level: "Cultural Explorer", color: "#03A9F4" }
];

// Main Dashboard Component
export default function DashboardHome() {
  const [activeTab, setActiveTab] = useState("exercises");
  const [isLoading, setIsLoading] = useState(true); // New state to handle loading
  const router = useRouter();

  // Check if the user is authenticated
  useEffect(() => {
    const isAuthenticated = Cookies.get("isAuthenticated") === "true";
    
    if (!isAuthenticated) {
      // If not authenticated, redirect to login
      router.push("/login");
    } else {
      setIsLoading(false); // Stop loading once authentication check is complete
    }
  }, [router]);

  if (isLoading) {
    // Show loader while authentication is being verified
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 pt-18">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col space-y-6">
        <h2 className="text-2xl font-semibold text-blue-600">
          FluentAI Dashboard
        </h2>
        <nav className="flex flex-col space-y-3">
          {/* Redirect to /exercise-section for Exercises */}
          <SidebarLink
            icon={<Home size={20} />}
            label="Exercises"
            tab="exercises"
            setActiveTab={setActiveTab}
            isActive={activeTab === "exercises"}
          />
          <SidebarLink
            icon={<MessageSquare size={20} />}
            label="AI Conversations"
            tab="chat"
            setActiveTab={setActiveTab}
            isActive={activeTab === "chat"}
          />
          <SidebarLink
            icon={<Target size={20} />}
            label="Challenges"
            tab="challenges"
            setActiveTab={setActiveTab}
            isActive={activeTab === "challenges"}
          />
          <SidebarLink
            icon={<BarChart size={20} />}
            label="Progress"
            tab="progress"
            setActiveTab={setActiveTab}
            isActive={activeTab === "progress"}
          />
          <SidebarLink
            icon={<Trophy size={20} />}
            label="Achievements"
            tab="achievements"
            setActiveTab={setActiveTab}
            isActive={activeTab === "achievements"}
          />
          <SidebarLink
            icon={<Settings size={20} />}
            label="Settings"
            tab="settings"
            setActiveTab={setActiveTab}
            isActive={activeTab === "settings"}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "exercises" && <DashboardComponent />}
        {activeTab === "chat" && <ChatAI />}
        {activeTab === "challenges" && <Challenges />}
        {activeTab === "progress" && <Progress />}
        {activeTab === "achievements" && <Achievements />}
        {activeTab === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}

// Sidebar Link Component (For tabs that stay on the dashboard)
function SidebarLink({ icon, label, tab, setActiveTab, isActive }) {
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-3 text-gray-800 px-4 py-2 rounded-lg transition ${
        isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// Sidebar Link with Redirect (For Exercises)
function SidebarLinkWithRedirect({ icon, label, href }) {
  return (
    <Link href={href} passHref>
      <div className="flex items-center space-x-3 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
}

// Dashboard Home Component
function DashboardComponent() {
  return (
    <Dashboard/>
  );
}

// Placeholder Components for Other Tabs
function ChatAI() {
  return (
    <div>
      <AIChat/>
    </div>
  );
}

function Challenges() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Challenges</h2>
      <p className="text-gray-600 mt-2">
        Take on daily challenges to test your skills.
      </p>
    </div>
  );
}

function Progress() {
  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'], // Weeks or milestones
    datasets: [
      {
        label: 'Progress',
        data: [10, 20, 40, 60, 80, 100], // Progress in percentage (can be dynamic)
        fill: false,
        borderColor: '#4CAF50',
        tension: 0.1, // Makes the line smooth
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#4CAF50',
      },
    ],
  };

  // Options to customize the chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Your Language Learning Progress',
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`, // Format the tooltip to show progress in percentage
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Weeks',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Progress streak count',
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-black">Learning Progress</h2>
      <p className="text-gray-600 mt-2">Track your progress in learning the language over time.</p>
      <div className="mt-6">
        <Line data={progressData} options={options} />
      </div>
    </div>
  );
};

function Achievements() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-black font-semibold">Achievements</h2>
      <p className="text-gray-600 mt-2">
        Celebrate your milestones and earn badges.
      </p>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {trophies.map((trophy) => (
          <div key={trophy.level} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
            <FaMedal size={50} style={{ color: trophy.color }} />
            <p className="text-sm font-medium text-gray-600 mt-2">{trophy.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Settings</h2>
      <p className="text-gray-600 mt-2">Customize your learning experience.</p>
    </div>
  );
}
