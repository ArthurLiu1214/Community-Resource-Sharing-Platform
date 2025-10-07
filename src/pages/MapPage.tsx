import { useState } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // 完整的物品資料（與首頁相同）
  const mockItems = [
    {
      id: 1,
      title: "電動螺絲起子",
      category: "工具",
      image: `${import.meta.env.BASE_URL}images/items/drill.jpg`,
      distance: "0.1km",
      points: 30,
      rating: 4.8,
      owner: "王小明",
      ownerRating: 4.9,
      description: "Bosch電動螺絲起子，適合家具組裝",
      locationLatLng: [24.9575, 121.2417],
    },
    {
      id: 2,
      title: "氣炸鍋",
      category: "廚具",
      image: `${import.meta.env.BASE_URL}images/items/air-fryer.jpg`,
      distance: "0.3km",
      points: 50,
      rating: 4.9,
      owner: "李小華",
      ownerRating: 5.0,
      description: "飛利浦氣炸鍋，九成新，容量3.5L",
      locationLatLng: [24.9577, 121.2419],
    },
    {
      id: 3,
      title: "瑜伽墊",
      category: "運動用品",
      image: `${import.meta.env.BASE_URL}images/items/yoga-mat.jpg`,
      distance: "0.2km",
      points: 15,
      rating: 4.7,
      owner: "陳美美",
      ownerRating: 4.8,
      description: "專業瑜伽墊，厚度6mm，防滑材質",
      locationLatLng: [24.9579, 121.2421],
    },
    {
      id: 4,
      title: "除濕機",
      category: "家電",
      image: `${import.meta.env.BASE_URL}images/items/dehumidifier.jpg`,
      distance: "0.5km",
      points: 80,
      rating: 4.6,
      owner: "張大哥",
      ownerRating: 4.7,
      description: "國際牌除濕機，適合10坪空間",
      locationLatLng: [24.9581, 121.2423],
    },
    {
      id: 5,
      title: "投影機",
      category: "電子設備",
      image: `${import.meta.env.BASE_URL}images/items/projector.jpg`,
      distance: "0.4km",
      points: 120,
      rating: 4.9,
      owner: "林小姐",
      ownerRating: 4.8,
      description: "BenQ投影機，適合家庭電影院",
      locationLatLng: [24.9583, 121.2425],
    },
    {
      id: 6,
      title: "露營帳篷",
      category: "戶外用品",
      image: `${import.meta.env.BASE_URL}images/items/tent.jpg`,
      distance: "0.6km",
      points: 90,
      rating: 4.5,
      owner: "陳先生",
      ownerRating: 4.6,
      description: "4人帳篷，防水材質，適合露營",
      locationLatLng: [24.9585, 121.2427],
    },
    {
      id: 7,
      title: "電動腳踏車",
      category: "交通工具",
      image: `${import.meta.env.BASE_URL}images/items/e-bike.jpg`,
      distance: "0.8km",
      points: 200,
      rating: 4.7,
      owner: "黃先生",
      ownerRating: 4.9,
      description: "捷安特電動腳踏車，續航力50公里",
      locationLatLng: [24.9587, 121.2429],
    },
    {
      id: 8,
      title: "咖啡機",
      category: "廚具",
      image: `${import.meta.env.BASE_URL}images/items/coffee-machine.jpg`,
      distance: "0.2km",
      points: 60,
      rating: 4.8,
      owner: "吳小姐",
      ownerRating: 4.7,
      description: "義式咖啡機，可製作拿鐵、卡布奇諾",
      locationLatLng: [24.9589, 121.2431],
    },
    {
      id: 9,
      title: "健身器材組合",
      category: "運動用品",
      image: `${import.meta.env.BASE_URL}images/items/fitness-equipment.jpg`,
      distance: "0.7km",
      points: 150,
      rating: 4.6,
      owner: "劉先生",
      ownerRating: 4.8,
      description: "啞鈴、瑜珈球、彈力帶組合",
      locationLatLng: [24.9591, 121.2433],
    },
    {
      id: 10,
      title: "掃地機器人",
      category: "家電",
      image: `${import.meta.env.BASE_URL}images/items/robot-vacuum.jpg`,
      distance: "0.3km",
      points: 100,
      rating: 4.9,
      owner: "楊小姐",
      ownerRating: 4.9,
      description: "小米掃地機器人，智能規劃路線",
      locationLatLng: [24.9593, 121.2435],
    },
    {
      id: 11,
      title: "攝影器材",
      category: "電子設備",
      image: `${import.meta.env.BASE_URL}images/items/camera.jpg`,
      distance: "0.4km",
      points: 180,
      rating: 4.8,
      owner: "周先生",
      ownerRating: 4.7,
      description: "Canon相機、三腳架、閃光燈",
      locationLatLng: [24.9595, 121.2437],
    },
    {
      id: 12,
      title: "烤肉架",
      category: "戶外用品",
      image: `${import.meta.env.BASE_URL}images/items/bbq-grill.jpg`,
      distance: "0.5km",
      points: 40,
      rating: 4.4,
      owner: "鄭先生",
      ownerRating: 4.5,
      description: "大型烤肉架，適合家庭聚會",
      locationLatLng: [24.9597, 121.2439],
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">搜尋</h1>
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

        {/* 使用與首頁相同的地圖組件 */}
        <MapSection items={mockItems} />
      </div>

      <Footer />
    </div>
  );
};

export default MapPage;
