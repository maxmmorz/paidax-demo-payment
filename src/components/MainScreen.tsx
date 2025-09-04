import React from 'react';

export default function MainScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Paidax</h1>
        <p className="text-gray-600">Investment Platform</p>
        <div className="bg-gradient-to-r from-[#1436ee]/5 to-purple-50 border border-[#1436ee]/20 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome!</h2>
          <p className="text-gray-700">Start investing today</p>
        </div>
      </div>
    </div>
  );
}