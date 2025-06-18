
import React from 'react';
import { Map, Navigation } from 'lucide-react';

interface MapSectionProps {
  items: Array<{
    id: number;
    title: string;
    category: string;
    distance: string;
    points: number;
  }>;
}

const MapSection: React.FC<MapSectionProps> = ({ items }) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Map size={24} />
        社區地圖
      </h2>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Map Placeholder */}
        <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <Map size={64} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">互動式社區地圖</h3>
            <p className="text-gray-500 mb-4">顯示附近可借用物品的位置</p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto">
              <Navigation size={20} />
              啟用地圖功能
            </button>
          </div>
          
          {/* Simulated map pins */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-32 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 left-1/3 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
        </div>

        {/* Map Controls */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex flex-wrap gap-2">
            <button className="bg-white border border-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-50 transition-colors">
              全部
            </button>
            <button className="bg-green-100 text-green-600 border border-green-200 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors">
              工具
            </button>
            <button className="bg-blue-100 text-blue-600 border border-blue-200 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors">
              廚具
            </button>
            <button className="bg-purple-100 text-purple-600 border border-purple-200 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors">
              家電
            </button>
            <button className="bg-orange-100 text-orange-600 border border-orange-200 px-3 py-1 rounded-full text-sm hover:bg-orange-200 transition-colors">
              運動用品
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
