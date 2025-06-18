
import React, { useState } from 'react';
import { Search, Map, Star, Home, AddCircle, Notifications, AccountCircle, History } from 'lucide-react';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import MapSection from '../components/MapSection';
import PointsDisplay from '../components/PointsDisplay';
import CategoryFilter from '../components/CategoryFilter';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 模擬物品資料
  const mockItems = [
    {
      id: 1,
      title: "電動螺絲起子",
      category: "工具",
      image: "/placeholder.svg",
      distance: "0.2km",
      points: 30,
      rating: 4.8,
      owner: "王小明",
      ownerRating: 4.9,
      description: "Bosch電動螺絲起子，適合家具組裝"
    },
    {
      id: 2,
      title: "氣炸鍋",
      category: "廚具",
      image: "/placeholder.svg",
      distance: "0.5km",
      points: 50,
      rating: 4.9,
      owner: "李小華",
      ownerRating: 5.0,
      description: "飛利浦氣炸鍋，九成新，容量3.5L"
    },
    {
      id: 3,
      title: "瑜伽墊",
      category: "運動用品",
      image: "/placeholder.svg",
      distance: "0.3km",
      points: 15,
      rating: 4.7,
      owner: "陳美美",
      ownerRating: 4.8,
      description: "專業瑜伽墊，厚度6mm，防滑材質"
    },
    {
      id: 4,
      title: "除濕機",
      category: "家電",
      image: "/placeholder.svg",
      distance: "0.8km",
      points: 80,
      rating: 4.6,
      owner: "張大哥",
      ownerRating: 4.7,
      description: "國際牌除濕機，適合10坪空間"
    }
  ];

  const filteredItems = mockItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              <AddCircle size={20} />
              上架物品
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Points Display */}
        <PointsDisplay />

        {/* Map Section */}
        <MapSection items={mockItems} />

        {/* Category Filter */}
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Items Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Home size={24} />
            附近可借用物品
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

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
              <div className="text-3xl font-bold text-orange-600 mb-2">₭45,670</div>
              <div className="text-gray-600">節省金額</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
