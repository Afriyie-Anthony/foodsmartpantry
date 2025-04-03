import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaHome, FaBox, FaUsers, FaClipboardList, FaSignOutAlt, FaFileInvoice, FaRegBell, FaTruck, FaCreditCard } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-gray-900 text-white p-5 shadow-lg border-r border-green-400 flex flex-col h-screen ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 overflow-y-auto`}>
      <div className="flex items-center justify-between p-3">
        <h1 className={`text-lg font-bold ${!isOpen && 'hidden'}`}>SmartPantry+</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all">
            <Link to="/admin/dashboard" className="flex items-center">
              <FaHome className="mr-2" /> {isOpen && 'Dashboard'}
            </Link>
          </li>
          <li className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all">
            <Link to="/admin/inventory" className="flex items-center">
              <FaBox className="mr-2" /> {isOpen && 'Inventory'}
            </Link>
          </li>
          <li className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all">
            <Link to="/admin/users" className="flex items-center">
              <FaUsers className="mr-2" /> {isOpen && 'Users'}
            </Link>
          </li>
          <li className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all">
            <Link to="/admin/orders" className="flex items-center">
              <FaClipboardList className="mr-2" /> {isOpen && 'Orders'}
            </Link>
          </li>
          <li className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all">
            <Link to="/orders" className="flex items-center">
              <FaTruck className="mr-2" /> {isOpen && 'Deliveries'}
            </Link>
          </li>
          <li className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all">
            <Link to="/orders" className="flex items-center">
              <FaCreditCard className="mr-2" /> {isOpen && 'Payments'}
            </Link>
          </li>
          <li className="mb-3 p-3 rounded-lg hover:bg-green-700 transition-all">
            <Link to="/invoices" className="flex items-center">
              <FaFileInvoice className="mr-2" /> {isOpen && 'Invoices'}
            </Link>
          </li>
          <li className="m3-4 p-3 rounded-lg hover:bg-green-700 transition-all">
            <Link to="/tips" className="flex items-center">
              <FaRegBell className="mr-2" /> {isOpen && 'Tips'}
            </Link>
          </li>
          <li className="p-3 hover:bg-red-700 mt-auto">
            <button className="flex items-center w-full">
              <FaSignOutAlt className="mr-2" /> {isOpen && 'Logout'}
            </button>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
