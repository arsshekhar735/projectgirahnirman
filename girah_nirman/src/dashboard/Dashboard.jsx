import React, { useState } from "react";
import { motion } from "framer-motion";
import BudgetPaymentsCard from "./BudgetPaymentsCard";
import MaterialResourceTracking from "./MaterialResourceTracking";
import CommunicationHub from "./CommunicationHub";
import DocumentsContracts from "./DocumentsContracts";
import ReportsAnalytics from "./ReportsAnalytics";
import SupportHelp from "./SupportHelp";
import logo from "../assets/logo.png";
import {
  BellIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  HomeIcon,
  ClipboardDocumentIcon,
  FolderIcon,
  ArrowUturnLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Sidebar
const Sidebar = ({ activePage, setActivePage, isCollapsed, isMobileOpen, toggleMobile }) => {
  const menuItems = [
    { name: "Overview", icon: HomeIcon },
    { name: "Projects", icon: FolderIcon },
    { name: "Budget", icon: ClipboardDocumentIcon },
    { name: "Materials", icon: BellIcon },
    { name: "Reports", icon: UserCircleIcon },
    { name: "Communication", icon: ChatBubbleLeftRightIcon },
    { name: "Support", icon: ArrowUturnLeftIcon },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden ${
          isMobileOpen ? "visible" : "invisible"
        }`}
        onClick={toggleMobile}
      />

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobileOpen ? 0 : -260, // Mobile slide
          width: isCollapsed ? 0 : 288, // Desktop collapse
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`fixed lg:top-0 lg:left-0 h-full flex flex-col shadow-2xl z-40
          bg-gradient-to-b from-gray-900 via-gray-800 to-black/90
          backdrop-blur-xl border-r border-yellow-500/30
          overflow-hidden`}
      >
        {/* Animated highlight bar */}
        {!isCollapsed && (
          <motion.div
            layout
            className="absolute left-0 w-1 bg-yellow-400 rounded-r-full"
            animate={{
              top: `${
                menuItems.findIndex((m) => m.name === activePage) * 60 + 120
              }px`,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        )}

        {/* Logo */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "space-x-3"
          } p-6 border-b border-yellow-600/30`}
        >
          <motion.img
            src={logo}
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="h-12 w-12 rounded-full bg-white shadow-lg"
          />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-3 text-2xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent"
            >
              NirmanX
            </motion.span>
          )}
        </div>

        {/* Menu */}
        <nav className="flex flex-col p-4 space-y-4 flex-1">
          {menuItems.map(({ name, icon: Icon }) => (
            <motion.button
              whileHover={{ scale: 1.08, rotateY: 10 }}
              whileTap={{ scale: 0.95 }}
              key={name}
              onClick={() => {
                setActivePage(name);
                toggleMobile();
              }}
              className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition font-semibold ${
                activePage === name
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-300"
              }`}
            >
              <Icon className="h-6 w-6" />
              {!isCollapsed && <span>{name}</span>}
            </motion.button>
          ))}
        </nav>

        {/* Close Button (Mobile only) */}
        <button
          onClick={toggleMobile}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-amber-600 transition"
        >
          <XMarkIcon className="h-6 w-6 text-white" />
        </button>
      </motion.aside>
    </>
  );
};

// Topbar
const Topbar = ({ toggleSidebar, toggleMobile }) => {
  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="flex justify-between items-center 
        bg-gradient-to-r from-gray-900 via-gray-800 to-black/90 
        backdrop-blur-lg shadow-xl px-6 h-16 sticky top-0 z-20 
        border-b border-yellow-500/30"
    >
      <div className="flex items-center space-x-4">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={toggleMobile}
          className="lg:hidden p-2 text-yellow-400 hover:scale-110 transition"
        >
          ☰
        </button>

        {/* Desktop Collapse Button */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:block p-2 text-yellow-400 hover:scale-110 transition"
        >
          ☰
        </button>

        <div className="text-lg font-bold text-yellow-400 tracking-wider flex items-center space-x-2">
          <span>🚧</span> <span>NirmanX Dashboard</span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {[BellIcon, ChatBubbleLeftRightIcon, UserCircleIcon].map((Icon, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-2 rounded-full bg-gray-700/40 hover:bg-yellow-500/20 transition"
          >
            <Icon className="h-7 w-7 text-yellow-400" />
          </motion.button>
        ))}
      </div>
    </motion.header>
  );
};

// Content Components Map
const ContentMap = {
  Overview: (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-black/80 text-gray-200 rounded-2xl shadow-2xl p-6 hover:shadow-yellow-500/30 transition backdrop-blur-md border border-yellow-500/20"
      >
        <h2 className="text-xl font-semibold mb-4 text-yellow-400 border-b border-gray-700 pb-2">
          Project Overview
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">Current Projects</p>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 1 }}
                className="bg-yellow-500 h-4 rounded-full"
              ></motion.div>
            </div>
            <p className="text-sm text-yellow-400 mt-1 font-semibold">
              70% Complete
            </p>
          </div>
          <div className="flex justify-between text-sm text-gray-300">
            <div>
              <p>Est. Completion:</p>
              <p className="font-semibold text-yellow-300">Dec 2025</p>
            </div>
            <div>
              <p>Budget Used:</p>
              <p className="font-semibold text-yellow-300">$350K / $500K</p>
            </div>
            <div>
              <p>Workers On-site:</p>
              <p className="font-semibold text-yellow-300">15</p>
            </div>
            <div>
              <p>Safety Updates:</p>
              <p className="font-semibold text-green-400">No incidents</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-black/80 text-gray-200 rounded-2xl shadow-2xl p-6 hover:shadow-yellow-500/30 transition backdrop-blur-md border border-yellow-500/20"
      >
        <h2 className="text-xl font-semibold mb-4 text-yellow-400 border-b border-gray-700 pb-2">
          Live Activity Feed
        </h2>
        <ul className="space-y-3 text-gray-300">
          {[
            "Foundation completed",
            "Materials delivered",
            "Site inspection done",
            "Electrical wiring started",
          ].map((act, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="border-b border-gray-700 pb-2"
            >
              {act}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  ),
  Projects: <DocumentsContracts />,
  Budget: <BudgetPaymentsCard />,
  Communication: <CommunicationHub />,
  Support: <SupportHelp />,
  Materials: <MaterialResourceTracking />,
  Reports: <ReportsAnalytics />,
};

export default function Dashboard() {
  const [activePage, setActivePage] = useState("Overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black font-[Poppins,sans-serif] relative">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        toggleMobile={() => setIsMobileOpen(!isMobileOpen)}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-500 ease-in-out">
        <Topbar
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
          toggleMobile={() => setIsMobileOpen(!isMobileOpen)}
        />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {ContentMap[activePage]}
        </main>
      </div>
    </div>
  );
}
