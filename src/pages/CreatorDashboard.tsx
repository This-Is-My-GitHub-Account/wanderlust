import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { PlusCircle, Image } from 'lucide-react';

export function CreatorDashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    features: '',
    accommodation: 0,
    food: 0,
    attractions: 0,
    activities: 0,
    cost: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'destinations'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      navigate('/destinations');
    } catch (error) {
      console.error('Error adding destination:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.match(/accommodation|food|attractions|activities|cost/)
        ? parseFloat(value)
        : value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <PlusCircle className="h-6 w-6 text-blue-800" />
          <h1 className="text-3xl font-bold">Add New Destination</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="beach">Beach</option>
                    <option value="mountain">Mountain</option>
                    <option value="city">City</option>
                    <option value="cultural">Cultural</option>
                    <option value="adventure">Adventure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="e.g., WiFi, Pool, Restaurant"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Comparison Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['accommodation', 'food', 'attractions', 'activities', 'cost'].map((metric) => (
                  <div key={metric}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {metric} Rating (1-5)
                    </label>
                    <input
                      type="number"
                      name={metric}
                      value={formData[metric as keyof typeof formData]}
                      onChange={handleChange}
                      min="1"
                      max="5"
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload (UI only) */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Images</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Image className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">
                  Drag and drop images here, or click to select files
                </p>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Select Files
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/destinations')}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
              >
                Create Destination
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}