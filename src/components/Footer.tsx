import { Heart, Github, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 關於我們 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">關於我們</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              社區物品共享平台致力於促進鄰里間的資源共享，
              讓閒置物品發揮最大價值，建立更緊密的社區關係
            </p>
          </div>

          {/* 快速連結 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速連結</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">首頁</a></li>
              <li><a href="/map" className="text-gray-300 hover:text-white transition-colors">搜尋物品</a></li>
              <li><a href="/list-item" className="text-gray-300 hover:text-white transition-colors">上架物品</a></li>
              <li><a href="/profile" className="text-gray-300 hover:text-white transition-colors">個人中心</a></li>
            </ul>
          </div>

          {/* 聯絡資訊 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">聯絡資訊</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <Mail size={16} />
                <span>community-share@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Phone size={16} />
                <span>0800-123-456</span>
              </li>
            </ul>
          </div>

          {/* 社群連結 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">社群連結</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* 版權資訊 */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 社區物品共享平台
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 