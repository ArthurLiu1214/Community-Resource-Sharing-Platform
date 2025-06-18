import React, { useState, useEffect } from 'react';
import { Map, Navigation, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
  const [mapCenter, setMapCenter] = useState<[number, number]>([25.0330, 121.5654]); // 台北市中心
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const navigate = useNavigate();

  // 模擬物品位置（實際應用中應該從後端獲取）
  const itemLocations = [
    { id: 1, position: [25.0330, 121.5654], category: "工具" },
    { id: 2, position: [25.0340, 121.5664], category: "廚具" },
    { id: 3, position: [25.0320, 121.5644], category: "運動用品" },
    { id: 4, position: [25.0350, 121.5674], category: "家電" },
    { id: 5, position: [25.0335, 121.5660], category: "電子設備" },
    { id: 6, position: [25.0345, 121.5650], category: "戶外用品" },
    { id: 7, position: [25.0325, 121.5670], category: "交通工具" },
    { id: 8, position: [25.0338, 121.5648], category: "廚具" },
    { id: 9, position: [25.0355, 121.5668], category: "運動用品" },
    { id: 10, position: [25.0342, 121.5672], category: "家電" },
    { id: 11, position: [25.0332, 121.5658], category: "電子設備" },
    { id: 12, position: [25.0348, 121.5652], category: "戶外用品" },
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

  // 過濾物品
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

        {/* 地圖控制面板 */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">篩選類別：</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeCategory === 'all' 
                  ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              全部
            </button>
            <button 
              onClick={() => setActiveCategory('工具')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeCategory === '工具' 
                  ? 'bg-red-100 text-red-600 border border-red-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              工具
            </button>
            <button 
              onClick={() => setActiveCategory('廚具')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeCategory === '廚具' 
                  ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              廚具
            </button>
            <button 
              onClick={() => setActiveCategory('家電')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeCategory === '家電' 
                  ? 'bg-purple-100 text-purple-600 border border-purple-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              家電
            </button>
            <button 
              onClick={() => setActiveCategory('運動用品')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeCategory === '運動用品' 
                  ? 'bg-green-100 text-green-600 border border-green-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              運動用品
            </button>
            <button 
              onClick={() => setActiveCategory('電子設備')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeCategory === '電子設備' 
                  ? 'bg-yellow-100 text-yellow-600 border border-yellow-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              電子設備
            </button>
            <button 
              onClick={() => setActiveCategory('戶外用品')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeCategory === '戶外用品' 
                  ? 'bg-cyan-100 text-cyan-600 border border-cyan-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              戶外用品
            </button>
            <button 
              onClick={() => setActiveCategory('交通工具')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeCategory === '交通工具' 
                  ? 'bg-lime-100 text-lime-600 border border-lime-200' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              交通工具
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
