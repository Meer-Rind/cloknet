import { useState } from 'react';
import ServerCard from '../components/ServerCard';
import { FiSearch, FiFilter } from 'react-icons/fi';

const Servers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const servers = [
    { id: 1, country: 'United States', countryCode: 'US', city: 'New York', type: 'free', load: 45, ping: 28, speed: 85 },
    { id: 2, country: 'United Kingdom', countryCode: 'GB', city: 'London', type: 'free', load: 62, ping: 42, speed: 72 },
    { id: 3, country: 'Germany', countryCode: 'DE', city: 'Frankfurt', type: 'free', load: 38, ping: 35, speed: 91 },
    { id: 4, country: 'Japan', countryCode: 'JP', city: 'Tokyo', type: 'free', load: 71, ping: 128, speed: 65 },
    { id: 5, country: 'Canada', countryCode: 'CA', city: 'Toronto', type: 'free', load: 53, ping: 45, speed: 78 },
    { id: 6, country: 'France', countryCode: 'FR', city: 'Paris', type: 'free', load: 47, ping: 39, speed: 82 },
    { id: 7, country: 'Singapore', countryCode: 'SG', city: 'Singapore', type: 'free', load: 65, ping: 152, speed: 68 },
    { id: 8, country: 'Australia', countryCode: 'AU', city: 'Sydney', type: 'premium', load: 29, ping: 198, speed: 88 },
    { id: 9, country: 'Brazil', countryCode: 'BR', city: 'São Paulo', type: 'premium', load: 41, ping: 145, speed: 76 },
    { id: 10, country: 'South Korea', countryCode: 'KR', city: 'Seoul', type: 'premium', load: 36, ping: 135, speed: 79 },
    { id: 11, country: 'Netherlands', countryCode: 'NL', city: 'Amsterdam', type: 'premium', load: 44, ping: 32, speed: 84 },
    { id: 12, country: 'Sweden', countryCode: 'SE', city: 'Stockholm', type: 'normal', load: 51, ping: 48, speed: 81 },
    { id: 13, country: 'Switzerland', countryCode: 'CH', city: 'Zurich', type: 'normal', load: 33, ping: 52, speed: 89 },
  ];

  const filteredServers = servers.filter(server => {
    const matchesSearch = server.country.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         server.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'free' && server.type === 'free') || 
                         (filter === 'premium' && server.type === 'premium') || 
                         (filter === 'normal' && server.type === 'normal');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Cloknet VPN <span className="text-primary">Servers</span></h1>
          <p className="text-lighttext max-w-2xl mx-auto">
            Connect to any of our high-speed servers worldwide for secure and private browsing.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search servers..."
                className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <FiFilter className="text-lighttext" />
              <select
                className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Servers</option>
                <option value="free">Free Servers</option>
                <option value="premium">Premium Servers</option>
                <option value="normal">Normal Servers</option>
              </select>
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
            <div className="flex flex-wrap items-center justify-between text-sm text-lighttext">
              <div className="flex items-center space-x-2 mb-2 md:mb-0">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Low load (&lt;50%)</span>
              </div>
              <div className="flex items-center space-x-2 mb-2 md:mb-0">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Medium load (50-80%)</span>
              </div>
              <div className="flex items-center space-x-2 mb-2 md:mb-0">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>High load (&gt;80%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>Premium server</span>
              </div>
            </div>
          </div>
        </div>
        
        {filteredServers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServers.map(server => (
              <ServerCard key={server.id} server={server} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-lighttext mb-2">No servers found</h3>
            <p className="text-lighttext">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Servers;