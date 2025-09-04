import React from 'react';
import { ChevronLeft, Building2, CreditCard, Wallet, Bitcoin, Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopUpScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white fixed inset-0 z-50 flex flex-col">
      <div className="bg-gradient-to-b from-gray-50 to-white p-6 pb-8 border-b border-gray-200">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h2 className="text-xl font-bold text-gray-900 ml-4">Пополнение счета</h2>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <p className="text-gray-600 text-sm mb-1">Сумма пополнения</p>
          <input 
            type="number" 
            placeholder="0.00" 
            className="w-full text-3xl font-bold text-gray-900 bg-transparent border-none outline-none"
          />
          <p className="text-gray-600 text-sm mt-2">Минимальная сумма: ₸1,000</p>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-4">
        <h3 className="text-gray-900 font-semibold mb-4">Выберите способ оплаты</h3>
        
        <button className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center space-x-4 active:scale-[0.98] transition-transform shadow-sm">
          <div className="w-12 h-12 bg-[#1436ee]/20 rounded-full flex items-center justify-center">
            <Building2 className="w-6 h-6 text-[#1436ee]" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-900 font-medium">Банковский перевод</p>
            <p className="text-gray-600 text-sm">Прямой перевод со счета</p>
          </div>
        </button>

        <button className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center space-x-4 active:scale-[0.98] transition-transform shadow-sm">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-900 font-medium">Банковская карта</p>
            <p className="text-gray-600 text-sm">Visa, Mastercard</p>
          </div>
        </button>

        <button className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center space-x-4 active:scale-[0.98] transition-transform shadow-sm">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
            <Wallet className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-900 font-medium">Kaspi.kz</p>
            <p className="text-gray-600 text-sm">Быстрый перевод</p>
          </div>
          <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Популярно</span>
        </button>

        <button className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center space-x-4 active:scale-[0.98] transition-transform shadow-sm">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <Bitcoin className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-900 font-medium">USDT</p>
            <p className="text-gray-600 text-sm">Криптовалюта</p>
          </div>
        </button>

        <button className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center space-x-4 active:scale-[0.98] transition-transform shadow-sm">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            <Apple className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-900 font-medium">Apple Pay</p>
            <p className="text-gray-600 text-sm">Быстрая оплата</p>
          </div>
        </button>
      </div>

      <div className="p-6">
        <button className="w-full bg-gradient-to-r from-[#1436ee] to-purple-600 text-white font-semibold py-4 rounded-2xl active:scale-[0.98] transition-transform shadow-lg">
          Продолжить
        </button>
      </div>
    </div>
  );
}