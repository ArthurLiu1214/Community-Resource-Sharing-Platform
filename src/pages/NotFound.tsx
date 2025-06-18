import { Home, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">頁面未找到</h1>
          <p className="text-gray-600 mb-8 text-lg">抱歉，您要找的頁面不存在或已被移除。</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Home size={20} />
              返回首頁
            </Link>
            <Link 
              to="/map" 
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search size={20} />
              搜尋物品
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
