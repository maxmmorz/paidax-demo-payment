import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Briefcase, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PortfolioScreen() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  
  const timePeriods = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];
  
  // Mock data for the graph (simple line chart simulation)
  const generateMockData = () => {
    const points = 30;
    const data = [];
    for (let i = 0; i < points; i++) {
      const x = (i / (points - 1)) * 100;
      const y = 50 + Math.sin(i / 5) * 20 + Math.random() * 10;
      data.push(`${x},${y}`);
    }
    return data.join(' ');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Портфель</h2>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <p className="text-gray-600 text-xs mb-1">Общий баланс</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">₸0.00</h3>
          <p className="text-gray-500 text-xs">Готов к инвестированию</p>
        </div>
      </div>

      {/* Portfolio Performance Chart */}
      <div className="mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Динамика портфеля</h3>
            <span className="text-green-500 text-sm font-medium">+12.5%</span>
          </div>
          
          {/* Mock Graph */}
          <div className="h-32 mb-4 relative">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1436ee" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#1436ee" stopOpacity="0.05"/>
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              {[20, 40, 60, 80].map(y => (
                <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f3f4f6" strokeWidth="0.5"/>
              ))}
              
              {/* Chart area */}
              <polygon
                fill="url(#chartGradient)"
                points={`0,100 ${generateMockData()} 100,100`}
              />
              
              {/* Chart line */}
              <polyline
                fill="none"
                stroke="#1436ee"
                strokeWidth="2"
                points={generateMockData()}
              />
            </svg>
          </div>
          
          {/* Time Period Selection */}
          <div className="flex justify-center space-x-2 overflow-x-auto">
            {timePeriods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedPeriod === period
                    ? 'bg-[#1436ee] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        <div className="flex flex-col items-center space-y-2">
          <button 
            onClick={() => navigate('/topup')}
            className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-sm"
          >
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-green-400" />
            </div>
          </button>
          <span className="text-gray-900 font-medium text-xs">Пополнить</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <button className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-sm">
            <div className="w-8 h-8 bg-[#1436ee]/20 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-[#1436ee]" />
            </div>
          </button>
          <span className="text-gray-900 font-medium text-xs">Конвертация</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <button className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-sm">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4 text-red-400" />
            </div>
          </button>
          <span className="text-gray-900 font-medium text-xs">Вывод</span>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <button className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-sm">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-purple-400" />
            </div>
          </button>
          <span className="text-gray-900 font-medium text-xs">Портфель</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <h3 className="text-gray-900 font-semibold mb-3">Последние операции</h3>
        <p className="text-gray-600 text-center py-8">Нет операций</p>
      </div>
    </div>
  );
}