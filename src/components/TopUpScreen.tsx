import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, Building2, CreditCard, Wallet, Bitcoin, Apple, Banknote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopUpScreen() {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('KZT');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [expandedPaymentMethod, setExpandedPaymentMethod] = useState<string | null>(null);
  
  const currencies = [
    { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge' },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
    { code: 'USD', symbol: '$', name: 'US Dollar' }
  ];
  
  const paymentMethods = [
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      description: 'Direct account transfer',
      icon: Building2,
      bgColor: 'bg-[#1436ee]/20',
      iconColor: 'text-[#1436ee]',
      currencies: ['KZT', 'RUB', 'USD'],
      popular: false
    },
    {
      id: 'bank-card',
      name: 'Bank Card',
      description: 'Visa, Mastercard',
      icon: CreditCard,
      bgColor: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
      currencies: ['KZT', 'RUB', 'USD'],
      popular: false
    },
    {
      id: 'kaspi',
      name: 'Kaspi.kz',
      description: 'Quick transfer',
      icon: Wallet,
      bgColor: 'bg-green-500/20',
      iconColor: 'text-green-400',
      currencies: ['KZT'],
      popular: true
    },
    {
      id: 'sberbank',
      name: 'Sberbank',
      description: 'Online banking',
      icon: Banknote,
      bgColor: 'bg-green-600/20',
      iconColor: 'text-green-600',
      currencies: ['RUB'],
      popular: true
    },
    {
      id: 'yandex-money',
      name: 'YooMoney',
      description: 'Digital wallet',
      icon: Wallet,
      bgColor: 'bg-yellow-500/20',
      iconColor: 'text-yellow-600',
      currencies: ['RUB'],
      popular: false
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Digital payments',
      icon: Wallet,
      bgColor: 'bg-blue-500/20',
      iconColor: 'text-blue-500',
      currencies: ['USD'],
      popular: true
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      description: 'Quick payment',
      icon: Apple,
      bgColor: 'bg-gray-700',
      iconColor: 'text-white',
      currencies: ['USD', 'RUB'],
      popular: false
    },
    {
      id: 'usdt',
      name: 'USDT',
      description: 'Cryptocurrency',
      icon: Bitcoin,
      bgColor: 'bg-yellow-500/20',
      iconColor: 'text-yellow-400',
      currencies: ['USD'],
      popular: false
    }
  ];
  
  const currentCurrency = currencies.find(c => c.code === selectedCurrency);
  const availablePaymentMethods = paymentMethods.filter(method => 
    method.currencies.includes(selectedCurrency)
  );

  const renderPaymentForm = (methodId: string) => {
    switch (methodId) {
      case 'bank-transfer':
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input
                  type="text"
                  placeholder="Enter your account number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <input
                  type="text"
                  placeholder="Enter bank name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors">
                Proceed with Bank Transfer
              </button>
            </div>
          </div>
        );

      case 'bank-card':
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <button className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors">
                Pay with Card
              </button>
            </div>
          </div>
        );

      case 'kaspi':
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+7 (777) 123-45-67"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="bg-green-50 p-3 rounded-xl">
                <p className="text-sm text-green-700">You will receive a push notification in your Kaspi app to confirm the payment.</p>
              </div>
              <button className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors">
                Pay with Kaspi
              </button>
            </div>
          </div>
        );

      case 'paypal':
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-xl">
                <p className="text-sm text-blue-700">You will be redirected to PayPal to complete your payment securely.</p>
              </div>
              <button className="w-full bg-blue-500 text-white font-medium py-3 rounded-xl hover:bg-blue-600 transition-colors">
                Continue with PayPal
              </button>
            </div>
          </div>
        );

      case 'apple-pay':
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-sm text-gray-700">Use Touch ID or Face ID to complete your payment with Apple Pay.</p>
              </div>
              <button className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition-colors">
                Pay with Apple Pay
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-sm text-gray-700">Payment form for {methodId} will be available soon.</p>
              </div>
            </div>
          </div>
        );
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCurrencyDropdown && !(event.target as Element).closest('.currency-dropdown')) {
        setShowCurrencyDropdown(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showCurrencyDropdown]);

  // Reset expanded payment method when currency changes
  useEffect(() => {
    setExpandedPaymentMethod(null);
  }, [selectedCurrency]);

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
          <h2 className="text-xl font-bold text-gray-900 ml-4">Top Up Account</h2>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600 text-sm">Top up amount</p>
            <div className="relative currency-dropdown">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
              >
                <span className="text-sm font-medium text-gray-900">{currentCurrency?.code}</span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showCurrencyDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-w-48">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency.code);
                        setShowCurrencyDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{currency.code}</span>
                        <span className="text-gray-600 text-sm">{currency.symbol}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{currency.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="relative">
            <input 
              type="number" 
              placeholder="0.00" 
              className="w-full text-3xl font-bold text-gray-900 bg-transparent border-none outline-none pr-12"
            />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">{currentCurrency?.symbol}</span>
          </div>
          
          <p className="text-gray-600 text-sm mt-2">
            Minimum amount: {currentCurrency?.symbol}{selectedCurrency === 'KZT' ? '1,000' : selectedCurrency === 'RUB' ? '500' : '10'}
          </p>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-4">
        <h3 className="text-gray-900 font-semibold mb-4">Choose payment method</h3>
        
        {availablePaymentMethods.map((method) => {
          const IconComponent = method.icon;
          const isExpanded = expandedPaymentMethod === method.id;
          
          return (
            <div
              key={method.id}
              className={`w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${
                isExpanded ? 'border-primary/50' : ''
              }`}
            >
              <button
                onClick={() => {
                  setExpandedPaymentMethod(isExpanded ? null : method.id);
                }}
                className="w-full p-4 flex items-center space-x-4 active:scale-[0.98] transition-transform"
              >
                <div className={`w-12 h-12 ${method.bgColor} rounded-full flex items-center justify-center`}>
                  <IconComponent className={`w-6 h-6 ${method.iconColor}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-900 font-medium">{method.name}</p>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </div>
                {method.popular && (
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Popular</span>
                )}
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {isExpanded && (
                <div className="px-4 pb-4">
                  {renderPaymentForm(method.id)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}