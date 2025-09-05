import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Building2,
  CreditCard,
  Wallet,
  Bitcoin,
  Banknote,
  Coins,
  DollarSign,
  Plus,
  Check,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SavedCard {
  id: string;
  lastFour: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
  holderName: string;
}

export default function WithdrawScreen() {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("KZT");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [expandedPaymentMethod, setExpandedPaymentMethod] = useState<
    string | null
  >(null);
  const [amount, setAmount] = useState<string>("");
  const [selectedSavedCard, setSelectedSavedCard] = useState<string | null>(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  // Mock saved cards - in real app this would come from API/storage
  const [savedCards] = useState<SavedCard[]>([
    {
      id: "card-1",
      lastFour: "4242",
      brand: "Visa",
      expiryMonth: "12",
      expiryYear: "26",
      holderName: "John Doe"
    },
    {
      id: "card-2",
      lastFour: "5555",
      brand: "Mastercard",
      expiryMonth: "08",
      expiryYear: "25",
      holderName: "John Doe"
    }
  ]);

  const currencies = [
    { code: "KZT", symbol: "₸", name: "Kazakhstani Tenge" },
    { code: "RUB", symbol: "₽", name: "Russian Ruble" },
    { code: "USD", symbol: "$", name: "US Dollar" },
  ];

  const paymentMethods = [
    {
      id: "bank-transfer",
      name: "Bank Transfer",
      description: "Withdraw to your bank account",
      icon: Building2,
      bgColor: "bg-[#1436ee]/20",
      iconColor: "text-[#1436ee]",
      currencies: ["KZT", "RUB", "USD"],
      popular: false,
    },
    {
      id: "bank-card",
      name: "Bank Card",
      description: "Direct withdrawal to card",
      icon: CreditCard,
      bgColor: "bg-purple-500/20",
      iconColor: "text-purple-400",
      currencies: ["KZT", "RUB", "USD"],
      popular: false,
    },
    {
      id: "kaspi",
      name: "Kaspi.kz",
      description: "Instant withdrawal via Kaspi",
      icon: Wallet,
      bgColor: "bg-green-500/20",
      iconColor: "text-green-400",
      currencies: ["KZT"],
      popular: true,
    },
    {
      id: "sberbank",
      name: "Sberbank",
      description: "Russia's largest bank",
      icon: Banknote,
      bgColor: "bg-green-600/20",
      iconColor: "text-green-600",
      currencies: ["RUB"],
      popular: true,
    },
    {
      id: "yandex-money",
      name: "YooMoney",
      description: "Digital wallet withdrawal",
      icon: Wallet,
      bgColor: "bg-yellow-500/20",
      iconColor: "text-yellow-600",
      currencies: ["RUB"],
      popular: false,
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Secure global withdrawals",
      icon: Wallet,
      bgColor: "bg-blue-500/20",
      iconColor: "text-blue-500",
      currencies: ["USD"],
      popular: true,
    },
    {
      id: "bitcoin",
      name: "Bitcoin (BTC)",
      description: "Bitcoin network withdrawal",
      icon: Bitcoin,
      bgColor: "bg-orange-500/20",
      iconColor: "text-orange-500",
      currencies: ["USD"],
      popular: true,
    },
    {
      id: "ethereum",
      name: "Ethereum (ETH)",
      description: "Ethereum network withdrawal",
      icon: Coins,
      bgColor: "bg-blue-600/20",
      iconColor: "text-blue-600",
      currencies: ["USD"],
      popular: true,
    },
    {
      id: "usdt",
      name: "USDT",
      description: "Tether stablecoin withdrawal",
      icon: DollarSign,
      bgColor: "bg-green-600/20",
      iconColor: "text-green-600",
      currencies: ["USD"],
      popular: true,
    },
  ];

  const currentCurrency = currencies.find((c) => c.code === selectedCurrency);
  const availablePaymentMethods = paymentMethods.filter((method) =>
    method.currencies.includes(selectedCurrency)
  );

  // Fee calculation logic for withdrawals
  const calculateFee = (methodId: string, amount: number) => {
    const fees: Record<string, { percentage?: number; fixed?: number; min?: number; max?: number }> = {
      'bank-transfer': { fixed: selectedCurrency === 'KZT' ? 500 : selectedCurrency === 'RUB' ? 30 : 2 },
      'bank-card': { percentage: 1.5, min: selectedCurrency === 'KZT' ? 200 : selectedCurrency === 'RUB' ? 15 : 1 },
      'kaspi': { percentage: 0 }, // Free for popular method
      'sberbank': { percentage: 1 },
      'yandex-money': { percentage: 1.5 },
      'paypal': { percentage: 2.9, fixed: selectedCurrency === 'USD' ? 0.30 : 0 },
      'bitcoin': { fixed: selectedCurrency === 'USD' ? 15 : 0 }, // Network fee
      'ethereum': { fixed: selectedCurrency === 'USD' ? 8 : 0 }, // Gas fee
      'usdt': { fixed: selectedCurrency === 'USD' ? 3 : 0 } // Tether network fee
    };

    const feeConfig = fees[methodId];
    if (!feeConfig) return 0;

    let fee = 0;
    if (feeConfig.fixed) fee += feeConfig.fixed;
    if (feeConfig.percentage) fee += (amount * feeConfig.percentage) / 100;
    if (feeConfig.min && fee < feeConfig.min) fee = feeConfig.min;
    if (feeConfig.max && fee > feeConfig.max) fee = feeConfig.max;

    return fee;
  };

  const formatFeePercentage = (methodId: string) => {
    const fees: Record<string, { percentage?: number; fixed?: number; min?: number; max?: number }> = {
      'bank-transfer': { fixed: selectedCurrency === 'KZT' ? 500 : selectedCurrency === 'RUB' ? 30 : 2 },
      'bank-card': { percentage: 1.5, min: selectedCurrency === 'KZT' ? 200 : selectedCurrency === 'RUB' ? 15 : 1 },
      'kaspi': { percentage: 0 },
      'sberbank': { percentage: 1 },
      'yandex-money': { percentage: 1.5 },
      'paypal': { percentage: 2.9, fixed: selectedCurrency === 'USD' ? 0.30 : 0 },
      'bitcoin': { fixed: selectedCurrency === 'USD' ? 15 : 0 },
      'ethereum': { fixed: selectedCurrency === 'USD' ? 8 : 0 },
      'usdt': { fixed: selectedCurrency === 'USD' ? 3 : 0 }
    };

    const feeConfig = fees[methodId];
    if (!feeConfig) return 'Free';

    if (feeConfig.percentage === 0) return 'Free';
    if (feeConfig.percentage && !feeConfig.fixed) return `${feeConfig.percentage}%`;
    if (feeConfig.fixed && !feeConfig.percentage) {
      const symbol = currentCurrency?.symbol || '';
      return `${symbol}${feeConfig.fixed}`;
    }
    if (feeConfig.percentage && feeConfig.fixed) {
      const symbol = currentCurrency?.symbol || '';
      return `${feeConfig.percentage}% + ${symbol}${feeConfig.fixed}`;
    }

    return 'Free';
  };

  const getTransferTime = (methodId: string) => {
    const transferTimes: Record<string, string> = {
      'bank-transfer': '1-2 business days',
      'bank-card': 'Instant',
      'kaspi': 'Instant',
      'sberbank': '2-10 minutes',
      'yandex-money': '2-5 minutes',
      'paypal': 'Instant',
      'bitcoin': '10-60 minutes',
      'ethereum': '2-15 minutes',
      'usdt': '2-30 minutes'
    };
    
    return transferTimes[methodId] || 'Unknown';
  };

  const renderPaymentForm = (methodId: string) => {
    switch (methodId) {
      case "bank-transfer":
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your account number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                </label>
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

      case "bank-card":
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              {/* Saved Cards Section */}
              {savedCards.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Saved Cards</h4>
                  <div className="space-y-2">
                    {savedCards.map((card) => (
                      <button
                        key={card.id}
                        onClick={() => {
                          setSelectedSavedCard(selectedSavedCard === card.id ? null : card.id);
                          setShowNewCardForm(false);
                        }}
                        className={`w-full p-3 border rounded-xl text-left transition-colors ${
                          selectedSavedCard === card.id
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                              <span className="text-xs text-white font-bold">
                                {card.brand === 'Visa' ? 'V' : 'MC'}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                •••• •••• •••• {card.lastFour}
                              </p>
                              <p className="text-sm text-gray-600">
                                {card.holderName} • {card.expiryMonth}/{card.expiryYear}
                              </p>
                            </div>
                          </div>
                          {selectedSavedCard === card.id && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowNewCardForm(!showNewCardForm);
                      setSelectedSavedCard(null);
                    }}
                    className="w-full mt-3 p-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Card</span>
                  </button>
                </div>
              )}

              {/* New Card Form */}
              {(savedCards.length === 0 || showNewCardForm) && (
                <div className="space-y-4">
                  {savedCards.length > 0 && (
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">Add New Card</h4>
                      <button
                        onClick={() => setShowNewCardForm(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="save-card-withdraw"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="save-card-withdraw" className="text-sm text-gray-700">
                      Save this card for future withdrawals
                    </label>
                  </div>
                </div>
              )}

              {/* CVV for saved cards */}
              {selectedSavedCard && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter CVV for security verification
                  </p>
                </div>
              )}

              <button className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors">
                {selectedSavedCard ? "Withdraw to Saved Card" : "Withdraw to Card"}
              </button>
            </div>
          </div>
        );

      case "kaspi":
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+7 (777) 123-45-67"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="bg-green-50 p-3 rounded-xl">
                <p className="text-sm text-green-700">
                  You will receive a push notification in your Kaspi app to
                  confirm the withdrawal.
                </p>
              </div>
              <button className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors">
                Withdraw with Kaspi
              </button>
            </div>
          </div>
        );

      case "paypal":
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PayPal Email
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                <p className="text-sm text-blue-700">
                  Funds will be transferred to your PayPal account securely.
                </p>
              </div>
              <button className="w-full bg-blue-500 text-white font-medium py-3 rounded-xl hover:bg-blue-600 transition-colors">
                Withdraw to PayPal
              </button>
            </div>
          </div>
        );

      case "bitcoin":
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bitcoin Wallet Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your Bitcoin address (starts with 1, 3, or bc1)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Network Fee
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="standard">Standard (~30 min) - $15</option>
                    <option value="fast">Fast (~15 min) - $25</option>
                    <option value="instant">Priority (~5 min) - $40</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmations
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-600">
                    3 confirmations
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl">
                <p className="text-sm text-orange-700">
                  <strong>Warning:</strong> Bitcoin transactions are irreversible. Double-check your address before confirming.
                </p>
              </div>
              <button className="w-full bg-orange-500 text-white font-medium py-3 rounded-xl hover:bg-orange-600 transition-colors">
                Withdraw Bitcoin
              </button>
            </div>
          </div>
        );

      case "ethereum":
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ethereum Wallet Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your Ethereum address (0x...)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gas Fee
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="slow">Slow (5-15 min) - $8</option>
                    <option value="standard">Standard (2-5 min) - $12</option>
                    <option value="fast">Fast (~1 min) - $20</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Network
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-600">
                    Ethereum Mainnet
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                <p className="text-sm text-blue-700">
                  Make sure your wallet supports ETH on Ethereum mainnet. Gas fees vary with network congestion.
                </p>
              </div>
              <button className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-colors">
                Withdraw Ethereum
              </button>
            </div>
          </div>
        );

      case "usdt":
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  USDT Wallet Address
                </label>
                <input
                  type="text"
                  placeholder="Enter your wallet address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Network
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="trc20">TRC20 (Tron) - $1 fee</option>
                  <option value="erc20">ERC20 (Ethereum) - $8 fee</option>
                  <option value="bep20">BEP20 (BSC) - $1 fee</option>
                  <option value="polygon">Polygon - $0.01 fee</option>
                </select>
              </div>
              <div className="bg-green-50 p-3 rounded-xl">
                <p className="text-sm text-green-700">
                  <strong>Recommended:</strong> TRC20 network for lowest fees and fast transfers.
                </p>
              </div>
              <button className="w-full bg-green-600 text-white font-medium py-3 rounded-xl hover:bg-green-700 transition-colors">
                Withdraw USDT
              </button>
            </div>
          </div>
        );


      default:
        return (
          <div className="pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-sm text-gray-700">
                  Withdrawal form for {methodId} will be available soon.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showCurrencyDropdown &&
        !(event.target as Element).closest(".currency-dropdown")
      ) {
        setShowCurrencyDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showCurrencyDropdown]);

  // Reset expanded payment method and amount when currency changes
  useEffect(() => {
    setExpandedPaymentMethod(null);
    setAmount("");
  }, [selectedCurrency]);

  return (
    <div className="min-h-screen bg-white fixed inset-0 z-50 overflow-y-auto">
      <div className="bg-gradient-to-b from-gray-50 to-white p-6 pb-8 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h2 className="text-xl font-bold text-gray-900 ml-4">
            Withdraw Funds
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600 text-sm">Withdrawal amount</p>
            <div className="relative currency-dropdown">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors active:scale-95"
              >
                <span className="text-sm font-medium text-gray-900">
                  {currentCurrency?.code}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${
                    showCurrencyDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showCurrencyDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-48">
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
                        <span className="font-medium text-gray-900">
                          {currency.code}
                        </span>
                        <span className="text-gray-600 text-sm">
                          {currency.symbol}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {currency.name}
                      </p>
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-3xl font-bold text-gray-900 bg-transparent border-none outline-none pr-12"
            />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">
              {currentCurrency?.symbol}
            </span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-600 text-sm">
              Minimum amount: {currentCurrency?.symbol}
              {selectedCurrency === "KZT"
                ? "2,000"
                : selectedCurrency === "RUB"
                ? "1,000"
                : "25"}
            </p>
            <p className="text-gray-600 text-sm">
              Available: {currentCurrency?.symbol}
              {selectedCurrency === "KZT"
                ? "125,430"
                : selectedCurrency === "RUB"
                ? "84,250"
                : "1,520"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4 pb-8">
        <h3 className="text-gray-900 font-semibold mb-4">
          Choose withdrawal method
        </h3>

        {availablePaymentMethods.map((method) => {
          const IconComponent = method.icon;
          const isExpanded = expandedPaymentMethod === method.id;
          const amountNumber = parseFloat(amount) || 0;
          const fee = calculateFee(method.id, amountNumber);

          return (
            <div
              key={method.id}
              className={`w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${
                isExpanded ? "border-primary/50" : ""
              }`}
            >
              <button
                onClick={() => {
                  setExpandedPaymentMethod(isExpanded ? null : method.id);
                }}
                className="w-full p-4 flex items-center space-x-4 active:scale-[0.98] transition-transform"
              >
                <div
                  className={`w-12 h-12 ${method.bgColor} rounded-full flex items-center justify-center`}
                >
                  <IconComponent className={`w-6 h-6 ${method.iconColor}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-900 font-medium">{method.name}</p>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                  <p className="text-gray-500 text-xs">Fee: {formatFeePercentage(method.id)}</p>
                  <p className="text-gray-500 text-xs">{getTransferTime(method.id)}</p>
                  {amountNumber > 0 && (
                    <p className="text-xs text-gray-500 mt-1 font-medium">
                      You'll receive: {currentCurrency?.symbol}{(amountNumber - fee).toFixed(2)}
                    </p>
                  )}
                </div>
                {method.popular && (
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="px-4 pb-4">{renderPaymentForm(method.id)}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}