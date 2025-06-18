import React, { useState } from 'react';
import { Search, Star, Home, PlusCircle, Bell, User, History } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PointsDisplay from '../components/PointsDisplay';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            社區物品共享平台
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            與鄰居分享，讓資源循環，讓社區更美好
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜尋你需要的物品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <Link to="/list-item" className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 whitespace-nowrap">
              <PlusCircle size={20} />
              上架物品
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Points Display */}
        <PointsDisplay />

        {/* Community Stats */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">社區共享成果</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">1,234</div>
              <div className="text-gray-600">共享物品數</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">567</div>
              <div className="text-gray-600">活躍使用者</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-purple-600 mb-2">2,890</div>
              <div className="text-gray-600">成功借用次數</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-orange-600 mb-2">$900,000↑</div>
              <div className="text-gray-600">節省金額</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
