import { useState } from 'react';
import { FiLock, FiUnlock, FiStar, FiDownload } from 'react-icons/fi';

const ServerCard = ({ server }) => {
  const [isUnlocking, setIsUnlocking] = useState(false);
  
  const handleUnlock = () => {
    if (server.type === 'premium') {
      setIsUnlocking(true);
      setTimeout(() => {
        setIsUnlocking(false);
        alert('Please watch an ad to unlock this premium server for 24 hours.');
      }, 1000);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-primary hover-glow transition">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <img 
              src={`https://flagcdn.com/w40/${server.countryCode.toLowerCase()}.png`} 
              alt={server.country} 
              className="w-8 h-6 object-cover rounded"
            />
            <div>
              <h3 className="font-medium text-white">{server.country}</h3>
              <p className="text-xs text-lighttext">{server.city}</p>
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${server.type === 'free' ? 'bg-green-900 text-green-300' : 'bg-purple-900 text-purple-300'}`}>
            {server.type === 'free' ? 'Free' : 'Premium'}
          </span>
        </div>
        
        <div className="flex justify-between text-sm mb-4">
          <div className="text-lighttext">
            <span className="block">Load</span>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
              <div 
                className={`h-1.5 rounded-full ${server.load < 50 ? 'bg-green-500' : server.load < 80 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                style={{ width: `${server.load}%` }}
              ></div>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-lighttext">Ping</span>
            <span className={`font-medium ${server.ping < 50 ? 'text-green-400' : server.ping < 100 ? 'text-yellow-400' : 'text-red-400'}`}>
              {server.ping} ms
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-lighttext">
            <FiDownload className="mr-1" />
            <span>{server.speed} Mbps</span>
          </div>
          
          {server.type === 'free' ? (
            <button className="bg-primary hover:bg-glow text-white px-3 py-1 rounded text-xs font-medium hover-glow transition flex items-center">
              <FiUnlock className="mr-1" /> Connect
            </button>
          ) : (
            <button 
              onClick={handleUnlock}
              disabled={isUnlocking}
              className={`${isUnlocking ? 'bg-gray-600' : 'bg-purple-600 hover:bg-purple-500'} text-white px-3 py-1 rounded text-xs font-medium hover-glow transition flex items-center`}
            >
              {isUnlocking ? (
                'Unlocking...'
              ) : (
                <>
                  <FiLock className="mr-1" /> Unlock
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServerCard;