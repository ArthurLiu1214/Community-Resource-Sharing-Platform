
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Map, ArrowLeft, User, Shield, Calendar, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 模擬物品詳細資料
  const item = {
    id: parseInt(id || '1'),
    title: "電動螺絲起子",
    category: "工具",
    image: "/placeholder.svg",
    distance: "0.2km",
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
    ownerLocation: "台北市大安區",
    ownerJoinDate: "2023年3月"
  };

  const handleBorrow = () => {
    // 這裡可以添加借用邏輯
    alert('借用申請已送出！');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
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
