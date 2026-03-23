"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateTime, setUpdateTime] = useState(""); // Thêm dòng này

  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/sctugfnqdhq7t') 
      .then(async (response) => {
        const apiData = await response.json();
        
        // Kiểm tra xem dữ liệu trả về có phải là mảng hợp lệ không
        if (Array.isArray(apiData)) {
          setData(apiData as any);
          if (apiData.length > 0 && apiData[0]['Cập nhật']) {
            setUpdateTime(apiData[0]['Cập nhật']);
          }
        } else {
          // Nếu API trả về lỗi (ví dụ file Sheets bị khóa)
          console.error("Dữ liệu không hợp lệ hoặc lỗi API:", apiData);
          alert("Không thể đọc được bảng giá. Vui lòng kiểm tra lại quyền chia sẻ file Google Sheets!");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Lỗi khi kết nối:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 1. Header & Logo */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Vùng Logo */}
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.jpg" // Đường dẫn tới file logo của bạn
              alt="Gia Đình Gold Logo" 
              width={40} 
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold text-yellow-700">Trường Hằng Gold</span>
          </div>
          
          {/* Menu điều hướng */}
          {/* Menu điều hướng */}
          <div className="flex items-center gap-6 text-gray-700">
            <a href="#" className="hover:text-yellow-600 transition-colors">Trang chủ</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Sản phẩm</a>
            <a href="#" className="hover:text-yellow-600 transition-colors">Dịch vụ</a>
            <a 
              href="https://www.facebook.com/profile.php?id=100036361603738" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-yellow-600 transition-colors font-bold"
            >
              Liên hệ
            </a>
          </div>
        </nav>
      </header>

      {/* 2. Banner chính */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/banner.png" // Đường dẫn tới file banner của bạn
          alt="Cửa hàng Trường Hằng Gold"
          fill
          priority
          className="object-cover"
        />
        {/* Lớp phủ mờ và text trên banner */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
            Uy Tín & Chất Lượng: Giá Trị Vĩnh Cửu
          </h2>
          <p className="text-xl text-yellow-100 max-w-2xl text-center">
            Trường Hằng Gold - Hơn 20 năm đồng hành cùng quý khách.
          </p>
        </div>
      </div>

      {/* 3. Bảng giá vàng (Dựa trên giao diện bạn đã làm) */}
      <main className="flex-grow p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-yellow-600 mb-8 mt-6">
          Giá Vàng Cửa Hàng Hôm Nay
        </h1>
        
        {loading ? (
          <p className="text-gray-500 animate-pulse">Đang cập nhật dữ liệu...</p>
        ) : (
          <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <table className="w-full text-left">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="p-4 border-b text-gray-700 font-semibold">Loại vàng</th>
                  <th className="p-4 border-b text-gray-700 font-semibold">Mua vào</th>
                  <th className="p-4 border-b text-gray-700 font-semibold">Bán ra</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-yellow-50/50 transition-colors">
                    <td className="p-4 border-b font-medium text-gray-800">{item['Loại vàng']}</td>
                    <td className="p-4 border-b text-green-600 font-bold">{item['Mua vào']}</td>
                    <td className="p-4 border-b text-red-500 font-bold">{item['Bán ra']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-gray-50 p-3 text-right text-sm text-gray-500 italic">
              Cập nhật lần cuối: <span className="font-semibold text-gray-700">{updateTime || "Đang tải..."}</span>
            </div>
          </div>
        )}
      </main>

      {/* Footer (tùy chọn) */}
      <footer className="bg-white border-t mt-12 py-6 text-center text-gray-600">
        <p className="text-sm mt-1">Số 22 - Lê Xoay - Ngô Quyền - Vĩnh Yên - Vĩnh Phúc</p>
      </footer>
    </div>
  );
}