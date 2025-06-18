
import React, { useState } from 'react';
import { User, Star, Package, History, Settings, Award, Calendar, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    totalItems: 12,
    totalBorrows: 45,
    totalLends: 38,
    totalPoints: 850,
    creditScore: 4.8,
    memberSince: '2023年3月'
  };

  const recentActivity = [
    { id: 1, type: 'lend', item: '電動螺絲起子', user: '王小明', date: '2024-06-15', points: '+30' },
    { id: 2, type: 'borrow', item: '氣炸鍋', user: '李小華', date: '2024-06-12', points: '-50' },
    { id: 3, type: 'return', item: '瑜伽墊', user: '陳美美', date: '2024-06-10', points: '+10' }
  ];

  const myItems = [
    { id: 1, title: '電動螺絲起子', status: '已借出', borrower: '王小明', returnDate: '2024-06-20' },
    { id: 2, title: '咖啡機', status: '可借用', views: 23 },
    { id: 3, title: '吸塵器', status: '維護中' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <User size={48} className="text-white" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">張小明</h1>
              <p className="text-gray-600 mb-4">優質社區成員 • 加入於 {userStats.memberSince}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                  <Star size={16} className="text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-700">{userStats.creditScore}</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-blue-600">{userStats.totalPoints} 積分</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                  <Award size={16} className="text-purple-600" />
                  <span className="text-sm font-semibold text-purple-600">優質等級</span>
                </div>
              </div>
            </div>
            <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Settings size={20} />
              編輯資料
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <Package size={24} className="text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{userStats.totalItems}</div>
            <div className="text-sm text-gray-600">我的物品</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <History size={24} className="text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{userStats.totalBorrows}</div>
            <div className="text-sm text-gray-600">借用次數</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <Star size={24} className="text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{userStats.totalLends}</div>
            <div className="text-sm text-gray-600">出借次數</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <Award size={24} className="text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{userStats.creditScore}</div>
            <div className="text-sm text-gray-600">信譽分數</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${activeTab === 'overview' ? 'bg-green-50 text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-800'}`}
              >
                總覽
              </button>
              <button 
                onClick={() => setActiveTab('items')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${activeTab === 'items' ? 'bg-green-50 text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-800'}`}
              >
                我的物品
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${activeTab === 'history' ? 'bg-green-50 text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-800'}`}
              >
                借用記錄
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">最近活動</h3>
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'lend' ? 'bg-green-100 text-green-600' :
                        activity.type === 'borrow' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.type === 'lend' ? <Package size={20} /> : 
                         activity.type === 'borrow' ? <History size={20} /> : 
                         <Calendar size={20} />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {activity.type === 'lend' ? '出借' : 
                           activity.type === 'borrow' ? '借用' : '歸還'} {activity.item}
                        </div>
                        <div className="text-sm text-gray-600">{activity.user} • {activity.date}</div>
                      </div>
                      <div className={`font-semibold ${activity.points.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>
                        {activity.points} 積分
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'items' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">我的物品</h3>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    新增物品
                  </button>
                </div>
                <div className="space-y-4">
                  {myItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package size={20} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{item.title}</div>
                        <div className="text-sm text-gray-600">
                          {item.status === '已借出' ? `借用者：${item.borrower} • 歸還日期：${item.returnDate}` :
                           item.status === '可借用' ? `瀏覽次數：${item.views}` :
                           item.status}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === '已借出' ? 'bg-blue-100 text-blue-600' :
                        item.status === '可借用' ? 'bg-green-100 text-green-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {item.status}
                      </div>
                      <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                        管理
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">借用記錄</h3>
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{activity.item}</div>
                        <div className="text-sm text-gray-600">
                          {activity.type === 'lend' ? '出借給' : '借用自'} {activity.user} • {activity.date}
                        </div>
                      </div>
                      <div className={`font-semibold ${activity.points.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>
                        {activity.points} 積分
                      </div>
                      <button className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors">
                        查看詳情
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
