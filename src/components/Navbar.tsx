import { useState } from 'react';
import { Search, Star, Home, PlusCircle, Bell, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              {/* 使用自定義圖片 logo */}
              <img 
                src={`${import.meta.env.BASE_URL}logo.png`} 
                alt="社區共享平台" 
                className="w-8 h-8 object-contain"
              />
              
              <span className="text-xl font-bold text-gray-800">社區共享</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/" 
                className={`flex items-center gap-2 transition-colors ${
                  location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={handleNavigation}
              >
                <Home size={20} />
                首頁
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/map" 
                className={`flex items-center gap-2 transition-colors ${
                  location.pathname === '/map' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={handleNavigation}
              >
                <Search size={20} />
                搜尋
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/list-item" 
                className={`flex items-center gap-2 transition-colors ${
                  location.pathname === '/list-item' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={handleNavigation}
              >
                <PlusCircle size={20} />
                上架物品
              </Link>
            </motion.div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell size={24} className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" />
              <motion.span 
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                3
              </motion.span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star size={16} className="text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700">4.8</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-semibold text-blue-600">850 點數</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/profile" onClick={handleNavigation}>
                <User size={32} className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-gray-50 border-t">
        <div className="flex justify-around py-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className={`flex flex-col items-center p-2 transition-colors ${
                location.pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={handleNavigation}
            >
              <Home size={20} />
              <span className="text-xs mt-1">首頁</span>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/map" 
              className={`flex flex-col items-center p-2 transition-colors ${
                location.pathname === '/map' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={handleNavigation}
            >
              <Search size={20} />
              <span className="text-xs mt-1">搜尋</span>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/list-item" 
              className={`flex flex-col items-center p-2 transition-colors ${
                location.pathname === '/list-item' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={handleNavigation}
            >
              <PlusCircle size={20} />
              <span className="text-xs mt-1">上架</span>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/profile" 
              className={`flex flex-col items-center p-2 transition-colors ${
                location.pathname === '/profile' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={handleNavigation}
            >
              <User size={20} />
              <span className="text-xs mt-1">個人</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
