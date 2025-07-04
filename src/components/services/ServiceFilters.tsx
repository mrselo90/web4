'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Service, ServiceCategory } from '@/data/services';

interface ServiceFiltersProps {
  categories: ServiceCategory[];
  onFilterChange: (filters: {
    search: string;
    category: string;
    priceRange: [number, number];
    duration: string;
  }) => void;
}

const durationOptions = [
  { value: 'any', label: 'Any Duration' },
  { value: 'short', label: 'Short (1-2 hours)' },
  { value: 'medium', label: 'Medium (2-4 hours)' },
  { value: 'long', label: 'Long (4+ hours)' },
];

export function ServiceFilters({ categories, onFilterChange }: ServiceFiltersProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('any');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleFilterChange = () => {
    onFilterChange({
      search,
      category,
      priceRange: [0, 10000],
      duration,
    });
  };

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleFilterChange();
            }}
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <FunnelIcon className="h-5 w-5" />
          Filters
        </button>
      </div>

      {/* Filter Options */}
      {isFiltersOpen && (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  handleFilterChange();
                }}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                  handleFilterChange();
                }}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              >
                {durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 