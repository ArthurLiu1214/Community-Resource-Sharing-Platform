import React from 'react';
import { Star, PlusCircle, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const PointsDisplay = () => {
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Points */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">我的點數</h3>
            <div className="text-4xl font-bold mb-2">850</div>
            <p className="opacity-90 text-sm">可兌換中高價值物品</p>
          </div>

          {/* Credit Score */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
              <Star size={20} />
              信譽等級
            </h3>
            <div className="text-2xl font-bold mb-2">優質等級</div>
            <div className="bg-white/20 rounded-full h-2 mb-2">
              <div className="bg-yellow-400 h-2 rounded-full w-[95%]"></div>
            </div>
            <p className="opacity-90 text-sm">信譽分數：95 / 100</p>
          </div>

          {/* Quick Actions */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-2">快速操作</h3>
            <div className="flex flex-col gap-2 items-end">
              <Link to="/list-item" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm w-32">
                <PlusCircle size={16} />
                上架物品
              </Link>
              <Link to="/profile" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm w-32">
                <History size={16} />
                借用記錄
              </Link>
            </div>
          </div>
        </div>

        {/* Points Earning Tips */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <h4 className="font-semibold mb-3">獲得點數方式：</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-semibold">上架物品</div>
              <div className="opacity-90">+10-50 點數</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-semibold">成功出借</div>
              <div className="opacity-90">+20-100 點數</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-semibold">準時歸還</div>
              <div className="opacity-90">+10 點數</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-semibold">鄰居推薦</div>
              <div className="opacity-90">+50 點數</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PointsDisplay;
