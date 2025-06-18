
import React from 'react';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: '全部', emoji: '🏠' },
  { id: '工具', name: '工具', emoji: '🔧' },
  { id: '廚具', name: '廚具', emoji: '🍳' },
  { id: '家電', name: '家電', emoji: '📺' },
  { id: '運動用品', name: '運動用品', emoji: '⚽' },
  { id: '書籍', name: '書籍', emoji: '📚' },
  { id: '樂器', name: '樂器', emoji: '🎸' },
  { id: '其他', name: '其他', emoji: '📦' }
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">物品分類</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-green-500 text-white border-green-500 shadow-lg scale-105'
                : 'bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:shadow-md'
            }`}
          >
            <span className="text-lg">{category.emoji}</span>
            <span className="font-semibold">{category.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;
