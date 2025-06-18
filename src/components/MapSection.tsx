import React, { useState, useEffect } from 'react';
import { Map, Navigation, Filter, Wrench, Utensils, Dumbbell, Monitor, Camera, Tent, Bike, Grid, List, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ItemCard from './ItemCard';
import ItemListRow from './ItemListRow';

// 修復 Leaflet 圖標問題
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapSectionProps {
  items: Array<{
    id: number;
    title: string;
    category: string;
    distance: string;
    points: number;
    rating: number;
    owner: string;
    description: string;
  }>;
}

const MapSection: React.FC<MapSectionProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [mapCenter, setMapCenter] = useState<[number, number]>([24.9569, 121.2409]); // 中原大學座標
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('distance');

  // 模擬物品位置（中原大學校園周遭 - 分散分布）
  const itemLocations = [
    { id: 1, position: [24.9569, 121.2408], category: "工具" }, // 中原大學正門
    { id: 2, position: [24.9595, 121.2435], category: "廚具" }, // 中原夜市東北
    { id: 3, position: [24.9563, 121.2402], category: "運動用品" }, // 中原大學體育館
    { id: 4, position: [24.9588, 121.2440], category: "家電" }, // 中原商圈東北
    { id: 5, position: [24.9572, 121.2410], category: "電子設備" }, // 中原大學圖書館
    { id: 6, position: [24.9545, 121.2385], category: "戶外用品" }, // 中原大學後山西南
    { id: 7, position: [24.9550, 121.2420], category: "交通工具" }, // 中原大學東南側
    { id: 8, position: [24.9600, 121.2415], category: "廚具" }, // 中原夜市西北
    { id: 9, position: [24.9598, 121.2445], category: "運動用品" }, // 中原大學操場東北
    { id: 10, position: [24.9565, 121.2398], category: "家電" }, // 中原大學宿舍區西南
    { id: 11, position: [24.9580, 121.2405], category: "電子設備" }, // 中原大學工學院西北
    { id: 12, position: [24.9578, 121.2438], category: "戶外用品" }, // 中原大學商學院東北
  ];

  // 獲取用戶位置
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.log('無法獲取位置:', error);
        }
      );
    }
  }, []);

  // 篩選和排序邏輯
  const filteredItems = items.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'points':
        return a.points - b.points;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const filteredLocations = itemLocations.filter(location => {
    if (activeCategory === 'all') return true;
    return location.category === activeCategory;
  });

  // 自定義圖標
  const createCustomIcon = (category: string) => {
    const colors: { [key: string]: string } = {
      '工具': '#ef4444',
      '廚具': '#3b82f6',
      '運動用品': '#10b981',
      '家電': '#8b5cf6',
      '電子設備': '#f59e0b',
      '戶外用品': '#06b6d4',
      '交通工具': '#84cc16'
    };

    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${colors[category] || '#6b7280'}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  // 處理借用物品按鈕點擊
  const handleBorrowClick = (itemId: number) => {
    navigate(`/item/${itemId}`);
  };

  // 分類圖示映射
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '工具':
        return <Wrench size={16} />;
      case '廚具':
        return <Utensils size={16} />;
      case '運動用品':
        return <Dumbbell size={16} />;
      case '家電':
        return <Monitor size={16} />;
      case '電子設備':
        return <Camera size={16} />;
      case '戶外用品':
        return <Tent size={16} />;
      case '交通工具':
        return <Bike size={16} />;
      default:
        return <Filter size={16} />;
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Map size={24} />
        社區地圖
      </h2>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* 地圖容器 */}
        <div className="relative h-96">
          <MapContainer
            center={mapCenter}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            className="z-10"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* 用戶位置標記 */}
            {userLocation && (
              <Marker position={userLocation}>
                <Popup>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">您的位置</div>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* 物品標記 */}
            {filteredLocations.map((location) => {
              const item = items.find(i => i.id === location.id);
              if (!item) return null;

              return (
                <Marker
                  key={location.id}
                  position={location.position as [number, number]}
                  icon={createCustomIcon(location.category)}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-green-600 font-semibold">{item.points} 點</span>
                        <span className="text-gray-500">{item.distance}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm">{item.rating}</span>
                        <span className="text-gray-500 text-xs">({item.owner})</span>
                      </div>
                      <button 
                        onClick={() => handleBorrowClick(item.id)}
                        className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        借用物品
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* 地圖控制按鈕 */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => {
                if (userLocation) {
                  setMapCenter(userLocation);
                }
              }}
              className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
              title="回到我的位置"
            >
              <Navigation size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* 物品分類篩選面板 */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">物品分類篩選：</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                activeCategory === 'all' 
                  ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Filter size={16} />
              全部 ({items.length})
            </button>
            <button 
              onClick={() => setActiveCategory('工具')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                activeCategory === '工具' 
                  ? 'bg-red-100 text-red-600 border border-red-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Wrench size={16} />
              工具 ({items.filter(item => item.category === '工具').length})
            </button>
            <button 
              onClick={() => setActiveCategory('廚具')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                activeCategory === '廚具' 
                  ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Utensils size={16} />
              廚具 ({items.filter(item => item.category === '廚具').length})
            </button>
            <button 
              onClick={() => setActiveCategory('家電')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                activeCategory === '家電' 
                  ? 'bg-purple-100 text-purple-600 border border-purple-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Monitor size={16} />
              家電 ({items.filter(item => item.category === '家電').length})
            </button>
            <button 
              onClick={() => setActiveCategory('運動用品')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                activeCategory === '運動用品' 
                  ? 'bg-green-100 text-green-600 border border-green-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Dumbbell size={16} />
              運動用品 ({items.filter(item => item.category === '運動用品').length})
            </button>
            <button 
              onClick={() => setActiveCategory('電子設備')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                activeCategory === '電子設備' 
                  ? 'bg-yellow-100 text-yellow-600 border border-yellow-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Camera size={16} />
              電子設備 ({items.filter(item => item.category === '電子設備').length})
            </button>
            <button 
              onClick={() => setActiveCategory('戶外用品')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                activeCategory === '戶外用品' 
                  ? 'bg-cyan-100 text-cyan-600 border border-cyan-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Tent size={16} />
              戶外用品 ({items.filter(item => item.category === '戶外用品').length})
            </button>
            <button 
              onClick={() => setActiveCategory('交通工具')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                activeCategory === '交通工具' 
                  ? 'bg-lime-100 text-lime-600 border border-lime-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Bike size={16} />
              交通工具 ({items.filter(item => item.category === '交通工具').length})
            </button>
          </div>
        </div>

        {/* 篩選結果統計 */}
        <div className="px-4 py-3 bg-white border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              顯示 {filteredItems.length} 件物品
              {activeCategory !== 'all' && ` (${activeCategory}類別)`}
            </span>
            <span className="text-xs text-gray-500">
              點擊地圖標記或下方卡片查看詳情
            </span>
          </div>
        </div>
      </div>

      {/* 下方物品列表 */}
      {filteredItems.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              地圖物品列表 {activeCategory !== 'all' && `- ${activeCategory}`}
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-gray-600" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                >
                  <option value="distance">距離排序</option>
                  <option value="points">點數排序</option>
                  <option value="rating">評分排序</option>
                  <option value="newest">最新上架</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                  title="網格檢視"
                >
                  <Grid size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                  title="列表檢視"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map(item => (
                <ItemListRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 無結果提示 */}
      {filteredItems.length === 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-gray-400 text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            沒有找到 {activeCategory !== 'all' ? activeCategory : ''} 類別的物品
          </h3>
          <p className="text-gray-500">請嘗試選擇其他分類或查看全部物品</p>
        </div>
      )}
    </section>
  );
};

export default MapSection;
