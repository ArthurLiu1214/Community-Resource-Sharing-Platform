
import React, { useState } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';

const MapPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // 模擬地圖上的物品標記
  const mapItems = [
    { id: 1, title: "電動螺絲起子", category: "工具", lat: 25.0330, lng: 121.5654, points: 30, rating: 4.8, distance: "0.2km" },
    { id: 2, title: "氣炸鍋", category: "廚具", lat: 25.0340, lng: 121.5644, points: 50, rating: 4.9, distance: "0.5km" },
    { id: 3, title: "瑜伽墊", category: "運動用品", lat: 25.0320, lng: 121.5664, points: 15, rating: 4.7, distance: "0.3km" },
    { id: 4, title: "除濕機", category: "家電", lat: 25.0350, lng: 121.5634, points: 80, rating: 4.6, distance: "0.8km" }
  ];

  const handleItemClick = (itemId: number) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">社區地圖</h1>
          <p className="text-gray-600">探索您附近可借用的物品</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜尋物品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Filter size={20} />
              篩選
            </button>
          </div>
        </div>

        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Map Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center relative">
            <div className="text-center">
              <MapPin size={48} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">互動式地圖</h3>
              <p className="text-gray-600">這裡將整合Google Maps API顯示實際地圖</p>
            </div>
            
            {/* 模擬地圖標記 */}
            <div className="absolute top-1/4 left-1/3 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              電動螺絲起子 (30點數)
            </div>
            <div className="absolute top-1/2 right-1/3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
              氣炸鍋 (50點數)
            </div>
            <div className="absolute bottom-1/3 left-1/4 bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
              瑜伽墊 (15點數)
            </div>
          </div>
        </div>

        {/* Item List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">地圖上的物品</h2>
          <div className="space-y-4">
            {mapItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.category} • {item.distance}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star size={14} className="text-yellow-500" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                    <span className="text-sm text-blue-600 font-semibold">{item.points} 點數</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleItemClick(item.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  查看詳情
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
