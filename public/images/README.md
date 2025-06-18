# 物品圖片使用說明

## 📁 資料夾結構
```
public/
├── images/
│   ├── items/          # 物品圖片存放位置
│   │   ├── drill.jpg              # 電動螺絲起子
│   │   ├── air-fryer.jpg          # 氣炸鍋
│   │   ├── yoga-mat.jpg           # 瑜伽墊
│   │   ├── dehumidifier.jpg       # 除濕機
│   │   ├── projector.jpg          # 投影機
│   │   ├── tent.jpg               # 露營帳篷
│   │   ├── e-bike.jpg             # 電動腳踏車
│   │   ├── coffee-machine.jpg     # 咖啡機
│   │   ├── fitness-equipment.jpg  # 健身器材組合
│   │   ├── robot-vacuum.jpg       # 掃地機器人
│   │   ├── camera.jpg             # 攝影器材
│   │   └── bbq-grill.jpg          # 烤肉架
│   └── README.md       # 本說明文件
```

## 🖼️ 圖片規格建議

### 尺寸建議
- **寬度**：400-800 像素
- **高度**：300-600 像素
- **比例**：4:3 或 16:9
- **檔案大小**：建議小於 500KB

### 格式支援
- **JPG/JPEG**：適合照片，檔案較小
- **PNG**：適合需要透明背景的圖片
- **WebP**：現代格式，檔案更小（需要瀏覽器支援）

### 命名規則
- 使用英文小寫
- 用連字號 (-) 分隔單字
- 例如：`electric-drill.jpg`、`coffee-maker.png`

## 📝 如何添加新圖片

1. **準備圖片檔案**
   - 調整圖片尺寸
   - 優化檔案大小
   - 選擇合適的格式

2. **放入資料夾**
   - 將圖片檔案放入 `public/images/items/` 資料夾
   - 使用描述性的檔案名稱

3. **更新程式碼**
   - 在 `src/pages/Index.tsx` 中更新物品的 `image` 屬性
   - 在 `src/pages/MapPage.tsx` 中同步更新
   - 在 `src/pages/ItemDetailPage.tsx` 中同步更新

## 🔧 程式碼範例

```tsx
// 在物品資料中設定圖片路徑
{
  id: 1,
  title: "電動螺絲起子",
  category: "工具",
  image: "/images/items/drill.jpg",  // 圖片路徑
  // ... 其他屬性
}
```

## ⚠️ 注意事項

1. **路徑格式**：使用 `/images/items/` 開頭的絕對路徑
2. **檔案存在**：確保圖片檔案確實存在於指定路徑
3. **備用圖片**：如果圖片載入失敗，會顯示預設的 placeholder
4. **快取問題**：更新圖片後可能需要清除瀏覽器快取

## 🎨 圖片優化建議

1. **壓縮圖片**：使用工具如 TinyPNG 壓縮圖片
2. **適當尺寸**：不要使用過大的圖片檔案
3. **一致風格**：保持所有物品圖片的風格一致
4. **背景處理**：建議使用白色或透明背景 