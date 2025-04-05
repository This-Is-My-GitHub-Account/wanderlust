import { useState } from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$9.99',
    features: [
      'Access to basic destination guides',
      'Limited search functionality',
      'Basic trip planning tools',
      'Community forum access'
    ]
  },
  {
    name: 'Premium',
    price: '$19.99',
    features: [
      'All Basic features',
      'Unlimited destination guides',
      'Advanced search filters',
      'AI-powered trip recommendations',
      'Priority customer support'
    ]
  },
  {
    name: 'Professional',
    price: '$29.99',
    features: [
      'All Premium features',
      'Creator account access',
      'Custom trip planning',
      'Exclusive content access',
      'Direct support line',
      'Early access to new features'
    ]
  }
];

export function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Travel Journey</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan to enhance your travel experience with WanderLust Canvas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div className="p-6 bg-blue-800 text-white text-center">
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-4xl font-bold">{plan.price}</p>
              <p className="text-sm opacity-80">per month</p>
            </div>
            <div className="p-6">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-800 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.name)}
                className="w-full py-3 px-4 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Subscribe to {selectedPlan}</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" required />
                <label className="text-sm text-gray-600">
                  I agree to the terms and conditions and authorize recurring monthly charges
                </label>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
                >
                  Confirm Subscription
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}