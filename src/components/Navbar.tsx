
import React from 'react';
import { Search, Map, Star, Home, PlusCircle, Bell, User, History } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Home size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">社區共享</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
              <Home size={20} />
              首頁
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
              <Map size={20} />
              地圖
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
              <Search size={20} />
              搜尋
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors">
              <PlusCircle size={20} />
              上架物品
            </a>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={24} className="text-gray-700 hover:text-green-600 cursor-pointer transition-colors" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
              <Star size={16} className="text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700">4.8</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-sm font-semibold text-blue-600">850 積分</span>
            </div>
            <User size={32} className="text-gray-700 hover:text-green-600 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-gray-50 border-t">
        <div className="flex justify-around py-2">
          <a href="#" className="flex flex-col items-center p-2 text-gray-600 hover:text-green-600">
            <Home size={20} />
            <span className="text-xs mt-1">首頁</span>
          </a>
          <a href="#" className="flex flex-col items-center p-2 text-gray-600 hover:text-green-600">
            <Map size={20} />
            <span className="text-xs mt-1">地圖</span>
          </a>
          <a href="#" className="flex flex-col items-center p-2 text-gray-600 hover:text-green-600">
            <Search size={20} />
            <span className="text-xs mt-1">搜尋</span>
          </a>
          <a href="#" className="flex flex-col items-center p-2 text-gray-600 hover:text-green-600">
            <PlusCircle size={20} />
            <span className="text-xs mt-1">上架</span>
          </a>
          <a href="#" className="flex flex-col items-center p-2 text-gray-600 hover:text-green-600">
            <User size={20} />
            <span className="text-xs mt-1">個人</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
