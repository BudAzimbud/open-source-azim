import { useState } from 'react';

interface SupportFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

interface SupportData {
  name: string;
  amount: number;
  message: string;
  email: string;
  paymentMethod: 'midtrans' | 'xendit' | 'paypal' | 'stripe' | 'qris';
}

const SupportForm: React.FC<SupportFormProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState<SupportData>({
    name: '',
    amount: 5,
    message: '',
    email: '',
    paymentMethod: 'midtrans'
  });

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const predefinedAmounts = [
    { value: 5, label: 'Single Coffee', icon: '☕', description: 'A regular coffee' },
    { value: 15, label: 'Coffee Boost', icon: '☕☕☕', description: 'Solid coding session', popular: true },
    { value: 25, label: 'Coffee + Snack', icon: '☕🍰', description: 'Marathon debugging' },
  ];

  const handleAmountSelect = (amount: number) => {
    setFormData(prev => ({ ...prev, amount }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      onError?.('Please enter your name');
      return;
    }

    if (formData.amount < 1) {
      onError?.('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess?.(result.data);
        setShowForm(false);
        setFormData({
          name: '',
          amount: 5,
          message: '',
          email: '',
          paymentMethod: 'midtrans'
        });
      } else {
        onError?.(result.error || 'Something went wrong');
      }
    } catch (error) {
      onError?.('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const simulatePayment = () => {
    // Simulasi redirect ke payment gateway
    if (formData.paymentMethod === 'stripe') {
      // Dalam production, gunakan Stripe Checkout
      alert('Redirecting to Stripe Checkout...');
    } else if (formData.paymentMethod === 'paypal') {
      // Dalam production, gunakan PayPal SDK
      alert('Redirecting to PayPal...');
    }
  };

  if (!showForm) {
    return (
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {predefinedAmounts.map((option) => (
          <div
            key={option.value}
            className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 cursor-pointer ${
              option.popular
                ? 'border-amber-300 relative'
                : 'border-transparent hover:border-amber-200'
            }`}
            onClick={() => {
              setFormData(prev => ({ ...prev, amount: option.value }));
              setShowForm(true);
            }}
          >
            {option.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Popular
                </span>
              </div>
            )}
            <div className="text-4xl mb-4">{option.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">{option.label}</h3>
            <div className="text-3xl font-light text-amber-600 mb-4">${option.value}</div>
            <p className="text-gray-600 mb-6">{option.description}</p>
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300">
              Support with ${option.value}
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-lg">
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">☕</div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Support My Work</h3>
        <p className="text-gray-600">Thank you for your support!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Amount
          </label>
          <div className="grid grid-cols-3 gap-3 mb-3">
            {predefinedAmounts.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleAmountSelect(option.value)}
                className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                  formData.amount === option.value
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className="text-lg mb-1">{option.icon}</div>
                <div className="font-medium">${option.value}</div>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Custom:</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              min="1"
              step="0.01"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email (optional)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message (optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            placeholder="Leave a nice message..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="midtrans">🇮🇩 Trakteer (QRIS, Bank Transfer, E-Wallet)</option>
            <option value="qris">🇮🇩 QRIS (Semua E-Wallet Indonesia)</option>
            <option value="xendit">🇮🇩 E-Wallet (GoPay, OVO, Dana, ShopeePay)</option>
            <option value="paypal">🌍 Ko-fi (PayPal, Credit Card)</option>
            <option value="stripe">🌍 Buy Me A Coffee (Credit Card)</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors duration-300"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                </svg>
                Processing...
              </>
            ) : (
              `Support with $${formData.amount}`
            )}
          </button>
        </div>
      </form>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure payment processing. Your data is protected.</span>
        </div>
      </div>
    </div>
  );
};

export default SupportForm;
