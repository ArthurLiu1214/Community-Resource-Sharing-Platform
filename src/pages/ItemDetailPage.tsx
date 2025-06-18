import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Map, ArrowLeft, User, Shield, Calendar, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      ownerJoinDate: "2023年3月"
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
      ownerJoinDate: "2023年1月"
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
      ownerJoinDate: "2023年6月"
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
      ownerJoinDate: "2022年11月"
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
      ownerJoinDate: "2023年4月"
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
      ownerJoinDate: "2023年2月"
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
      ownerJoinDate: "2022年8月"
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
      ownerJoinDate: "2023年5月"
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
      ownerJoinDate: "2023年1月"
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
      ownerJoinDate: "2023年3月"
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
      ownerJoinDate: "2022年12月"
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
      ownerJoinDate: "2022年10月"
    }
  };

  // 根據 ID 獲取物品資料
  const item = itemsDatabase[parseInt(id || '1') as keyof typeof itemsDatabase];

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          <ArrowLeft size={20} />
          返回
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 物品圖片和基本信息 */}
          <div>
            <Card>
              <CardContent className="p-0">
                <div className="relative h-96 bg-gray-200 overflow-hidden rounded-t-lg">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Map size={14} />
                    {item.distance}
                  </div>
                </div>
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">{item.title}</h1>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">狀況：{item.condition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">可借用：{item.borrowDuration}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{item.points} 點數</div>
                      <div className="text-sm text-gray-600">借用費用</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Star size={16} className="text-yellow-500 fill-current" />
                        <span className="font-semibold">{item.rating}</span>
                      </div>
                      <div className="text-sm text-gray-600">物品評分</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 物主信息和借用選項 */}
          <div className="space-y-6">
            {/* 物主信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={20} />
                  物主信息
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                    {item.owner.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.owner}</h3>
                    <div className="flex items-center gap-1 mb-1">
                      <Shield size={14} className="text-green-500" />
                      <span className="text-sm text-gray-600">信譽分數：{item.ownerRating}/100</span>
                    </div>
                    <p className="text-sm text-gray-500">加入時間：{item.ownerJoinDate}</p>
                    <p className="text-sm text-gray-500">位置：{item.ownerLocation}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="text-sm font-semibold text-gray-700 mb-1">信譽等級進度</div>
                  <div className="bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${item.ownerRating}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">優質等級</div>
                </div>
              </CardContent>
            </Card>

            {/* 詳細描述 */}
            <Card>
              <CardHeader>
                <CardTitle>詳細說明</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{item.fullDescription}</p>
              </CardContent>
            </Card>

            {/* 借用選項 */}
            <Card>
              <CardHeader>
                <CardTitle>借用選項</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">可借用日期</label>
                    <div className="flex flex-wrap gap-2">
                      {item.availableDates.map(date => (
                        <span key={date} className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                          {date}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="text-sm font-semibold text-yellow-800 mb-1">押金資訊</div>
                    <div className="text-sm text-yellow-700">需支付押金 ${item.deposit}，歸還時退還</div>
                  </div>

                  <Button 
                    onClick={handleBorrow}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                  >
                    申請借用
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
