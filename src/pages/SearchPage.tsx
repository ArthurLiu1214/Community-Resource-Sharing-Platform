
import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import CategoryFilter from '../components/CategoryFilter';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('distance');

  // 模擬搜尋結果
  const searchResults = [
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
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">搜尋物品</h1>
          <p className="text-gray-600">找到您需要的物品，開始借用吧！</p>
        </div>

        {/* Advanced Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜尋物品名稱、品牌、型號..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="distance">距離排序</option>
                <option value="points">積分排序</option>
                <option value="rating">評分排序</option>
                <option value="newest">最新上架</option>
              </select>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <SlidersHorizontal size={20} />
                進階篩選
              </button>
              
              <div className="flex gap-2 ml-auto">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <Grid size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Search Results */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">搜尋結果 ({searchResults.length} 件物品)</h2>
            <div className="text-sm text-gray-600">
              找到 {searchResults.length} 件符合條件的物品
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map(item => (
                <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{item.category}</span>
                      <span>{item.distance}</span>
                      <span className="text-blue-600 font-semibold">{item.points} 積分</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors h-fit">
                    立即借用
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
