import React, { useState } from 'react';
import { Upload, Camera, MapPin, Calendar, DollarSign, X, Plus, Minus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ListItemPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    condition: '',
    value: '',
    points: '',
    maxDays: '',
    deposit: '',
    location: '',
    images: [] as File[]
  });

  const categories = [
    '工具', '廚具', '運動用品', '家電', '電子設備', '戶外用品', '交通工具'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'points' && value !== '' ? Number(value) : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('提交物品資料:', formData);
    // 這裡將處理表單提交
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">上架物品</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 物品照片 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">物品照片</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">點擊上傳或拖拽照片到此處</p>
                    <p className="text-sm text-gray-500">支援 JPG, PNG 格式，最多 5 張照片</p>
                  </label>
                </div>

                {/* 已上傳的圖片預覽 */}
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`預覽 ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 基本資訊 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">物品名稱</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="請輸入物品名稱"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">物品分類</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">請選擇分類</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">物品描述</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="請詳細描述物品的狀況、使用方式等"
                />
              </div>

              {/* 借用設定 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">所需點數</label>
                  <input
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="例如：30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">最長借用天數</label>
                  <input
                    type="number"
                    name="maxDays"
                    value={formData.maxDays}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="例如：7"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">押金（可選）</label>
                  <input
                    type="number"
                    name="deposit"
                    value={formData.deposit}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="例如：500"
                  />
                </div>
              </div>

              {/* 提交按鈕 */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  上架物品
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListItemPage;
