import React, { useState } from 'react';
import { Search, Map, Star, Home, PlusCircle, Bell, User, History } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import MapSection from '../components/MapSection';
import PointsDisplay from '../components/PointsDisplay';
import CategoryFilter from '../components/CategoryFilter';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
    },
    {
      id: 5,
      title: "投影機",
      category: "電子設備",
      image: "/placeholder.svg",
      distance: "0.4km",
      points: 120,
      rating: 4.9,
      owner: "林小姐",
      ownerRating: 4.8,
      description: "BenQ投影機，適合家庭電影院"
    },
    {
      id: 6,
      title: "露營帳篷",
      category: "戶外用品",
      image: "/placeholder.svg",
      distance: "0.6km",
      points: 90,
      rating: 4.5,
      owner: "陳先生",
      ownerRating: 4.6,
      description: "4人帳篷，防水材質，適合露營"
    },
    {
      id: 7,
      title: "電動腳踏車",
      category: "交通工具",
      image: "/placeholder.svg",
      distance: "0.7km",
      points: 200,
      rating: 4.7,
      owner: "黃先生",
      ownerRating: 4.9,
      description: "捷安特電動腳踏車，續航力50公里"
    },
    {
      id: 8,
      title: "咖啡機",
      category: "廚具",
      image: "/placeholder.svg",
      distance: "0.3km",
      points: 60,
      rating: 4.8,
      owner: "吳小姐",
      ownerRating: 4.7,
      description: "義式咖啡機，可製作拿鐵、卡布奇諾"
    },
    {
      id: 9,
      title: "健身器材組合",
      category: "運動用品",
      image: "/placeholder.svg",
      distance: "0.9km",
      points: 150,
      rating: 4.6,
      owner: "劉先生",
      ownerRating: 4.8,
      description: "啞鈴、瑜珈球、彈力帶組合"
    },
    {
      id: 10,
      title: "掃地機器人",
      category: "家電",
      image: "/placeholder.svg",
      distance: "0.5km",
      points: 100,
      rating: 4.9,
      owner: "楊小姐",
      ownerRating: 4.9,
      description: "小米掃地機器人，智能規劃路線"
    },
    {
      id: 11,
      title: "攝影器材",
      category: "電子設備",
      image: "/placeholder.svg",
      distance: "0.4km",
      points: 180,
      rating: 4.8,
      owner: "周先生",
      ownerRating: 4.7,
      description: "Canon相機、三腳架、閃光燈"
    },
    {
      id: 12,
      title: "烤肉架",
      category: "戶外用品",
      image: "/placeholder.svg",
      distance: "0.6km",
      points: 40,
      rating: 4.4,
      owner: "鄭先生",
      ownerRating: 4.5,
      description: "大型烤肉架，適合家庭聚會"
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
