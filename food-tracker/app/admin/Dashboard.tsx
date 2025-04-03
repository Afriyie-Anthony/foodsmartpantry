
import Sidebar from '@/components/ui/adminSideBar';
const adminDashboard = () => {
    return (
      <section className="flex">
      <Sidebar />
      <div className="p-6 flex-1 overflow-scroll h-[100vh]">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to SmartPantry+ Admin Dashboard.</p>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Total Inventory</h2>
            <p className="text-2xl font-bold text-green-600">1,245</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Orders Processed</h2>
            <p className="text-2xl font-bold text-blue-600">320</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Registered Users</h2>
            <p className="text-2xl font-bold text-purple-600">528</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Deliveries</h2>
            <p className="text-2xl font-bold text-yellow-600">350+</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Food Wastage</h2>
            <p className="text-2xl font-bold text-red-600">80</p>
            <p className="text-l font-bold text-gray-500">Tracked food waste</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Monetization</h2>
            <p className="text-2xl font-bold text-green-600">$45049.98</p>
            <p className="text-l font-bold text-gray-500">Income from Ads</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Orders Processed</h2>
            <p className="text-2xl font-bold text-blue-600">320</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Orders Processed</h2>
            <p className="text-2xl font-bold text-blue-600">320</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Orders Processed</h2>
            <p className="text-2xl font-bold text-blue-600">320</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Orders Processed</h2>
            <p className="text-2xl font-bold text-blue-600">320</p>
          </div>
        </div>
      </div>
      </section>
    );
  };
  
  export default adminDashboard;
  