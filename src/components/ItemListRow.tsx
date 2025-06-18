import React from 'react';
import { Star, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ItemListRowProps {
  item: {
    id: number;
    title: string;
    category: string;
    image: string;
    distance: string;
    points: number;
    rating: number;
    owner: string;
    ownerRating: number;
    description: string;
  };
}

const ItemListRow: React.FC<ItemListRowProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleBorrowClick = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="relative w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute top-1 left-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {item.category}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{item.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
            </div>
          </div>
          
          {/* Info Row */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Map size={14} />
              <span>{item.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-500 fill-current" />
              <span>{item.rating}</span>
            </div>
            <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
              {item.points} 點數
            </div>
          </div>

          {/* Owner Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {item.owner.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-700">{item.owner}</div>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-500">{item.ownerRating}</span>
                </div>
              </div>
            </div>
            <motion.button 
              onClick={handleBorrowClick}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              立即借用
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemListRow; 