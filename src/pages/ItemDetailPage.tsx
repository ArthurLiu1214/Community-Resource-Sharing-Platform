import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Map, ArrowLeft, User, Shield, Calendar, Package, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [showLocation, setShowLocation] = useState(false);
  // 假設每個物品有一個經緯度，這裡用範例座標
  const itemPosition = item && item.locationLatLng ? item.locationLatLng : [24.9575, 121.2417];

  // 完整的物品資料庫
  const itemsDatabase = {
    1: {
      id: 1,
      title: "電動螺絲起子",
      category: "工具",
      image: "/images/items/drill.jpg",
      distance: "0.1km",
      points: 30,
      rating: 4.8,
      owner: "王小明",
      ownerRating: 85,
      description: "Bosch電動螺絲起子，適合家具組裝，功能完好，附原廠充電器和各種螺絲頭。",
      fullDescription: "這是一把專業級的Bosch電動螺絲起子，適合各種家具組裝和維修工作。設備保養良好，功能完全正常。包含原廠充電器、多種螺絲頭配件，以及收納盒。電池續航力約2-3小時連續使用。",
      condition: "九成新",
      availableDates: ["2024-01-15", "2024-01-16", "2024-01-17"],
      borrowDuration: "1-3天",
      deposit: 500,
      ownerLocation: "中原大學正門附近",
      ownerJoinDate: "2023年3月",
      locationLatLng: [24.9575, 121.2417],
    },
    2: {
      id: 2,
      title: "氣炸鍋",
      category: "廚具",
      image: "/images/items/air-fryer.jpg",
      distance: "0.3km",
      points: 50,
      rating: 4.9,
      owner: "李小華",
      ownerRating: 92,
      description: "飛利浦氣炸鍋，九成新，容量3.5L，適合家庭使用。",
      fullDescription: "飛利浦氣炸鍋，容量3.5L，適合4-6人家庭使用。設備九成新，功能齊全，包含原廠配件。可製作各種美食，如炸雞、薯條、烤魚等。操作簡單，清潔方便。",
      condition: "九成新",
      availableDates: ["2024-01-15", "2024-01-16", "2024-01-18", "2024-01-19"],
      borrowDuration: "1-7天",
      deposit: 800,
      ownerLocation: "中原夜市附近",
      ownerJoinDate: "2023年1月",
      locationLatLng: [24.9577, 121.2419],
    },
    3: {
      id: 3,
      title: "瑜伽墊",
      category: "運動用品",
      image: "/images/items/yoga-mat.jpg",
      distance: "0.2km",
      points: 15,
      rating: 4.7,
      owner: "陳美美",
      ownerRating: 78,
      description: "專業瑜伽墊，厚度6mm，防滑材質，適合各種瑜伽練習。",
      fullDescription: "專業級瑜伽墊，厚度6mm，採用環保TPE材質製成。表面防滑設計，提供良好的抓地力。適合各種瑜伽練習，包括哈達瑜伽、流瑜伽等。墊子輕便易攜帶，清潔方便。",
      condition: "八成新",
      availableDates: ["2024-01-15", "2024-01-16", "2024-01-17", "2024-01-20"],
      borrowDuration: "1-14天",
      deposit: 200,
      ownerLocation: "中原大學體育館附近",
      ownerJoinDate: "2023年6月",
      locationLatLng: [24.9579, 121.2421],
    },
    4: {
      id: 4,
      title: "除濕機",
      category: "家電",
      image: "/images/items/dehumidifier.jpg",
      distance: "0.5km",
      points: 80,
      rating: 4.6,
      owner: "張大哥",
      ownerRating: 88,
      description: "國際牌除濕機，適合10坪空間，除濕效果佳。",
      fullDescription: "國際牌除濕機，除濕能力12L/日，適合10坪空間使用。具有智能除濕功能，可設定濕度範圍。配備空氣清淨功能，過濾PM2.5。適合潮濕季節或地下室使用。",
      condition: "七成新",
      availableDates: ["2024-01-15", "2024-01-16", "2024-01-17", "2024-01-21"],
      borrowDuration: "1-30天",
      deposit: 1200,
      ownerLocation: "中原商圈",
      ownerJoinDate: "2022年11月",
      locationLatLng: [24.9581, 121.2423],
    },
    5: {
      id: 5,
      title: "投影機",
      category: "電子設備",
      image: "/images/items/projector.jpg",
      distance: "0.4km",
      points: 120,
      rating: 4.9,
      owner: "林小姐",
      ownerRating: 90,
      description: "BenQ投影機，適合家庭電影院，畫質清晰。",
      fullDescription: "BenQ投影機，解析度1920x1080，亮度3000流明，適合家庭電影院使用。配備HDMI、USB等多種連接埠，支援藍牙音響連接。包含投影幕布和遙控器。",
      condition: "八成新",
      availableDates: ["2024-01-15", "2024-01-16", "2024-01-18", "2024-01-19"],
      borrowDuration: "1-7天",
      deposit: 2000,
      ownerLocation: "中原大學圖書館附近",
      ownerJoinDate: "2023年4月",
      locationLatLng: [24.9583, 121.2425],
    },
    6: {
      id: 6,
      title: "露營帳篷",
      category: "戶外用品",
      image: "/images/items/tent.jpg",
      distance: "0.6km",
      points: 90,
      rating: 4.5,
      owner: "陳先生",
      ownerRating: 82,
      description: "4人帳篷，防水材質，適合露營活動。",
      fullDescription: "4人帳篷，採用防水材質製成，適合家庭露營使用。包含帳篷主體、地墊、營釘、營繩等完整配件。搭建簡單，收納方便。適合春夏季節使用。",
      condition: "七成新",
      availableDates: ["2024-01-15", "2024-01-16", "2024-01-17", "2024-01-22"],
      borrowDuration: "1-14天",
      deposit: 800,
      ownerLocation: "中原大學後山附近",
      ownerJoinDate: "2023年2月",
      locationLatLng: [24.9585, 121.2427],
    },
    7: {
      id: 7,
      title: "電動腳踏車",
      category: "交通工具",
      image: "/images/items/e-bike.jpg",
      distance: "0.8km",
      points: 200,
      rating: 4.7,
      owner: "黃先生",
      ownerRating: 95,
      description: "捷安特電動腳踏車，續航力50公里，適合通勤。",
      fullDescription: "捷安特電動腳踏車，電池容量36V 10.4Ah，續航力約50公里。配備LED車燈、後視鏡、車籃等配件。適合市區通勤和短程旅行。包含充電器和安全帽。",
      condition: "八成新",
      availableDates: ["2024-01-15", "2024-01-16", "2024-01-17", "2024-01-23"],
      borrowDuration: "1-7天",
      deposit: 3000,
      ownerLocation: "中原大學側門附近",
      ownerJoinDate: "2022年8月",
      locationLatLng: [24.9587, 121.2429],
    },
    8: {
      id: 8,
      title: "咖啡機",
      category: "廚具",
      image: "/images/items/coffee-machine.jpg",
      distance: "0.2km",
      points: 60,
      rating: 4.8,
      owner: "吳小姐",
      ownerRating: 87,
      description: "義式咖啡機，可製作拿鐵、卡布奇諾等咖啡。",
      fullDescription: "義式咖啡機，15Bar壓力，可製作濃縮咖啡、拿鐵、卡布奇諾等。配備奶泡器、咖啡粉勺、壓粉器等配件。操作簡單，清潔方便。適合咖啡愛好者使用。",
      condition: "九成新",
      availableDates: ["2024-01-15", "2024-01-16", "2024-01-17", "2024-01-20"],
      borrowDuration: "1-7天",
      deposit: 1000,
      ownerLocation: "中原大學宿舍區",
      ownerJoinDate: "2023年5月",
      locationLatLng: [24.9589, 121.2431],
    },
    9: {
      id: 9,
      title: "健身器材組合",
      category: "運動用品",
      image: "/images/items/fitness-equipment.jpg",
      distance: "0.7km",
      points: 150,
      rating: 4.6,
      owner: "劉先生",
      ownerRating: 89,
      description: "啞鈴、瑜珈球、彈力帶組合，適合居家健身。",
      fullDescription: "健身器材組合包含：5kg啞鈴一對、瑜珈球、彈力帶、瑜珈墊。適合居家健身和瑜珈練習。器材品質良好，適合初學者到中級使用者。",
      condition: "八成新",
      availableDates: ["2024-01-15", "2024-01-16", "2024-01-17", "2024-01-24"],
      borrowDuration: "1-30天",
      deposit: 1500,
      ownerLocation: "中原大學操場附近",
      ownerJoinDate: "2023年1月",
      locationLatLng: [24.9591, 121.2433],
    },
    10: {
      id: 10,
      title: "掃地機器人",
      category: "家電",
      image: "/images/items/robot-vacuum.jpg",
      distance: "0.3km",
      points: 100,
      rating: 4.9,
      owner: "楊小姐",
      ownerRating: 93,
      description: "小米掃地機器人，智能規劃路線，清潔效果好。",
      fullDescription: "小米掃地機器人，具有LDS激光導航，智能規劃清潔路線。配備大容量電池，續航力約2小時。支援APP控制，可設定清潔時間和區域。包含充電座和清潔刷。",
      condition: "九成新",
      availableDates: ["2024-01-15", "2024-01-16", "2024-01-18", "2024-01-19"],
      borrowDuration: "1-7天",
      deposit: 1500,
      ownerLocation: "中原大學工學院附近",
      ownerJoinDate: "2023年3月",
      locationLatLng: [24.9593, 121.2435],
    },
    11: {
      id: 11,
      title: "攝影器材",
      category: "電子設備",
      image: "/images/items/camera.jpg",
      distance: "0.4km",
      points: 180,
      rating: 4.8,
      owner: "周先生",
      ownerRating: 91,
      description: "Canon相機、三腳架、閃光燈，適合攝影愛好者。",
      fullDescription: "Canon EOS R相機，配備24-70mm鏡頭、專業三腳架、外接閃光燈。適合人像、風景、活動攝影。包含相機包、記憶卡、備用電池等配件。",
      condition: "八成新",
      availableDates: ["2024-01-15", "2024-01-16", "2024-01-17", "2024-01-25"],
      borrowDuration: "1-7天",
      deposit: 5000,
      ownerLocation: "中原大學商學院附近",
      ownerJoinDate: "2022年12月",
      locationLatLng: [24.9595, 121.2437],
    },
    12: {
      id: 12,
      title: "烤肉架",
      category: "戶外用品",
      image: "/images/items/bbq-grill.jpg",
      distance: "0.5km",
      points: 40,
      rating: 4.4,
      owner: "鄭先生",
      ownerRating: 79,
      description: "大型烤肉架，適合家庭聚會和戶外活動。",
      fullDescription: "大型烤肉架，尺寸120x60cm，適合6-8人使用。配備烤網、炭火盤、工具組等配件。材質堅固耐用，清潔方便。適合家庭聚會、朋友聚餐等場合。",
      condition: "六成新",
      availableDates: ["2024-01-15", "2024-01-16", "2024-01-17", "2024-01-26"],
      borrowDuration: "1-3天",
      deposit: 500,
      ownerLocation: "中原大學後山附近",
      ownerJoinDate: "2022年10月",
      locationLatLng: [24.9597, 121.2439],
    }
  };

  useEffect(() => {
    const foundItem = itemsDatabase[parseInt(id || '1') as keyof typeof itemsDatabase];
    setItem(foundItem || itemsDatabase[1]);
  }, [id]);

  // 如果找不到物品，顯示錯誤
  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">物品不存在</h1>
          <p className="text-gray-600 mb-6">抱歉，找不到您要查看的物品。</p>
          <Button onClick={() => navigate('/')} className="bg-green-600 hover:bg-green-700">
            返回首頁
          </Button>
        </div>
      </div>
    );
  }

  const handleBorrow = () => {
    // 這裡可以添加借用邏輯
    alert(`借用申請已送出！物品：${item.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側主卡片 */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow flex flex-col overflow-hidden">
            <Button 
              onClick={() => navigate(-1)}
              className="m-4 w-fit flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              <ArrowLeft size={20} />
              返回
            </Button>
            {/* 圖片區塊 */}
            <div className="relative bg-white flex items-center justify-center h-80">
              <img 
                src={item.image} 
                alt={item.title} 
                className="object-contain max-h-72 w-full"
              />
              <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">{item.category}</span>
              <span className="absolute top-3 right-3 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold shadow">{item.distance}</span>
            </div>
            {/* 下方白底主內容 */}
            <div className="bg-white p-5 flex flex-col gap-2 flex-1 justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 flex-1">{item.title}</h1>
                  <div className="flex items-center gap-1 text-yellow-500 text-base font-semibold">
                    <Star size={18} className="inline-block" />
                    <span className="text-gray-800 font-bold">{item.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">物品評分</span>
                  </div>
                </div>
                <div className="text-gray-600 mb-1 text-sm">{item.description}</div>
                <div className="flex flex-wrap gap-4 text-xs text-gray-700 mb-2">
                  <span>狀況：{item.condition}</span>
                  <span>可借用：{item.borrowDuration}</span>
                </div>
              </div>
              {/* 詳細說明區塊 */}
              <div className="bg-white rounded-2xl border border-gray-100 p-4 mt-0">
                <h2 className="text-base font-bold text-gray-800 mb-2">詳細說明</h2>
                <div className="text-gray-700 text-sm whitespace-pre-line">{item.fullDescription}</div>
              </div>
            </div>
          </div>

          {/* 右側三卡片 */}
          <div className="flex flex-col gap-4">
            {/* 物主信息卡 */}
            <div className="bg-white rounded-2xl shadow p-4">
              <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2"><User size={18}/>物主信息</h2>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white text-lg font-bold">
                  {item.owner[0]}
                </div>
                <div className="space-y-2">
                  <div className="font-semibold text-gray-800 text-sm">{item.owner}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1"><Shield size={12}/> 信譽分數：{item.ownerRating}/100</div>
                  <div className="text-xs text-gray-500">加入時間：{item.ownerJoinDate}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    位置：{item.ownerLocation}
                    <button onClick={() => setShowLocation(true)} title="查看地圖">
                      <MapPin size={16} className="text-blue-500 hover:text-blue-700 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xs text-gray-600 mb-1">信譽評分</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: `${item.ownerRating}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.ownerRating >= 90 ? '優質等級' : item.ownerRating >= 70 ? '中等等級' : '低等等級'}</div>
              </div>
            </div>
            {/* 借用選項卡 */}
            <div className="bg-white rounded-2xl shadow p-4 flex flex-col h-full min-h-[320px] justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-800 mb-3">借用選項</h2>
                <div className="mb-2 text-xs text-gray-700">可借用日期</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.availableDates.map(date => (
                    <span 
                      key={date} 
                      className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs text-center"
                    >
                      {date}
                    </span>
                  ))}
                </div>
                {/* 藍底點數卡片 */}
                <div className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3 mb-4">
                  <div className="text-xl font-bold text-blue-700">{item.points} 點數</div>
                  <span className="text-xs text-gray-500 ml-2">所需花費</span>
                </div>
                {/* 押金資訊 */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-xs text-yellow-800">
                  押金資訊<br/>需支付押金 <span className="font-bold">${item.deposit}</span>，歸還時退還
                </div>
              </div>
              <Button 
                onClick={handleBorrow}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 text-base font-semibold rounded-lg transition-colors mt-auto"
              >
                申請借用
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* 位置地圖彈窗 */}
      {showLocation && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 min-w-[320px] text-center relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowLocation(false)}>&times;</button>
            <div className="text-lg font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <MapPin size={20} className="text-blue-500" />物品位置地圖
            </div>
            <div className="mb-2 text-gray-700">{item.ownerLocation}</div>
            <div className="w-full h-64">
              <MapContainer center={itemPosition} zoom={16} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={itemPosition}>
                  <Popup>物品位置</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;
