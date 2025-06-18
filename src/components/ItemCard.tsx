import React from 'react';
import { Star, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ItemCardProps {
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

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleBorrowClick = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {item.category}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
          <Map size={12} />
          {item.distance}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        
        {/* Points and Rating */}
        <div className="flex justify-between items-center mb-3">
          <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
            {item.points} 點數
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
          </div>
        </div>

        {/* Owner Info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
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
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            借用
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
