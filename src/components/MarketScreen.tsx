import React from 'react';
import { Bitcoin } from 'lucide-react';

export default function MarketScreen() {
  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Рынок</h2>
      <div className="space-y-4">
        {['Bitcoin', 'Ethereum', 'USDT', 'BNB'].map((coin, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#1436ee] to-purple-500 rounded-full flex items-center justify-center">
                <Bitcoin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 font-semibold">{coin}</h3>
                <p className="text-gray-600 text-sm">Криптовалюта</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-900 font-semibold">${(Math.random() * 50000).toFixed(2)}</p>
              <p className="text-green-500 text-sm">+{(Math.random() * 10).toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}