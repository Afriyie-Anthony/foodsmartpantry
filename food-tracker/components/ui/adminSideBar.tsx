"use client";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaHome,
  FaBox,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
  FaFileInvoice,
  FaRegBell,
  FaTruck,
  FaCreditCard,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile and adjust sidebar state accordingly
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <>
      {/* Mobile overlay when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-gray-900 text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      <div
        className={`bg-gray-900 text-white p-5 shadow-lg border-r border-green-400 flex flex-col h-screen ${
          isOpen ? "w-72" : "w-20"
        } transition-all duration-300 overflow-y-auto fixed md:relative z-30 ${
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-3">
          <h1 className={`text-lg font-bold ${!isOpen && "hidden"}`}>
            <div>
              <span className="ml-2 text-xl font-bold text-white-900 dark:text-white flex items-center gap-1">
                <ShoppingBasket className="h-6 w-6 text-emerald-600 dark:text-emerald-500"></ShoppingBasket>
                FreshTrack
              </span>
            </div>
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:block"
          >
            <FaBars />
          </button>
        </div>
        <nav className="mt-4">
          <Link
            className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all flex items-center"
            href="/admin"
          >
            <div className="mr-2">
              <FaHome size={18} />
            </div>{" "}
            {isOpen && "Dashboard"}
          </Link>
          <Link
            className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all flex items-center"
            href="/inventory"
          >
            <div className="mr-2">
              <FaBox size={18} />
            </div>{" "}
            {isOpen && "Inventory"}
          </Link>
          <Link
            className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all flex items-center"
            href="/user"
          >
            <div className="mr-2">
              <FaUsers size={18} />
            </div>{" "}
            {isOpen && "User"}
          </Link>
          <Link
            className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all flex items-center"
            href="/orders"
          >
            <div className="mr-2">
              <FaClipboardList size={18} />
            </div>{" "}
            {isOpen && "Orders"}
          </Link>
          <Link
            className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all flex items-center"
            href="/delivery"
          >
            <div className="mr-2">
              <FaTruck size={18} />
            </div>{" "}
            {isOpen && "Delivery"}
          </Link>
          <Link
            className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all flex items-center"
            href="/payments"
          >
            <div className="mr-2">
              <FaCreditCard size={18} />
            </div>{" "}
            {isOpen && "Payments"}
          </Link>
          <Link
            className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all flex items-center"
            href="/invoices"
          >
            <div className="mr-2">
              <FaFileInvoice size={18} />
            </div>{" "}
            {isOpen && "Invoices"}
          </Link>
          <Link
            className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all flex items-center"
            href="/tips"
          >
            <div className="mr-2">
              <FaRegBell size={18} />
            </div>{" "}
            {isOpen && "Tips"}
          </Link>

          <Link
            className="p-3 hover:bg-red-700 mt-auto flex items-center"
            href="/signout"
          >
            <button className="flex items-center w-full">
              <div className="mr-2">
                <FaSignOutAlt size={18} />
              </div>{" "}
              {isOpen && "Logout"}
            </button>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
