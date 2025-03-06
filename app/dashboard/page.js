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

// Main Dashboard Component
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
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
          <SidebarLink
            icon={<Home size={20} />}
            label="Dashboard"
            tab="dashboard"
            setActiveTab={setActiveTab}
            isActive={activeTab === "dashboard"}
          />
          {/* Redirect to /exercise-section for Exercises */}
          <SidebarLinkWithRedirect
            icon={<Book size={20} />}
            label="Exercises"
            href="/exercise-section"
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
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && <DashboardHome />}
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
function DashboardHome() {
  return (
    <div>
      <h2 className="text-3xl font-semibold">Welcome to FluentAI!</h2>
      <p className="text-gray-600 mt-2">
        Track your progress, practice with AI, and complete daily exercises.
      </p>
      {/* Add more dashboard elements here */}
    </div>
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
  return (
    <div>
      <h2 className="text-2xl font-semibold">Progress</h2>
      <p className="text-gray-600 mt-2">
        Track your language learning journey with detailed analytics.
      </p>
    </div>
  );
}

function Achievements() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Achievements</h2>
      <p className="text-gray-600 mt-2">
        Celebrate your milestones and earn badges.
      </p>
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
