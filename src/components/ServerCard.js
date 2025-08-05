import { FiDownload, FiShield, FiZap } from 'react-icons/fi';

const ServerCard = ({ server }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900/40 via-gray-800/50 to-black/60 border border-white/10 backdrop-blur-xl shadow-[0_0_20px_#00CFFF33] hover:shadow-[0_0_30px_#00CFFF99] rounded-2xl transition-all duration-300 group">
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={`https://flagcdn.com/w40/${server.countryCode.toLowerCase()}.png`}
              alt={server.country}
              className="w-9 h-6 object-cover rounded shadow-md"
            />
            <div>
              <h3 className="font-bold text-white text-base leading-tight">{server.country}</h3>
              <p className="text-xs text-gray-400">{server.city}</p>
            </div>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full font-semibold tracking-wide shadow-md ${
              server.type === 'free'
                ? 'bg-green-600/10 text-green-300 border border-green-400/20'
                : 'bg-purple-600/10 text-purple-300 border border-purple-400/20'
            }`}
          >
            {server.type === 'free' ? 'Free Tier' : 'Premium Tier'}
          </span>
        </div>

        {/* Metrics */}
        <div className="flex justify-between text-sm mb-4">
          {/* Load */}
          <div className="text-lighttext w-1/2 pr-2">
            <span className="block text-xs font-medium text-gray-300">Server Load</span>
            <div className="w-full bg-gray-700/50 rounded-full h-2 mt-1">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  server.load < 50
                    ? 'bg-green-400'
                    : server.load < 80
                    ? 'bg-yellow-400'
                    : 'bg-red-500'
                }`}
                style={{ width: `${server.load}%` }}
              ></div>
            </div>
          </div>

          {/* Ping */}
          <div className="text-right w-1/2 pl-2">
            <span className="block text-xs font-medium text-gray-300">Ping</span>
            <span
              className={`font-semibold text-sm ${
                server.ping < 50
                  ? 'text-green-400'
                  : server.ping < 100
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}
            >
              {server.ping} ms
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-4 space-y-3 text-sm text-gray-300">
          <div className="flex items-start">
            <FiDownload className="mr-2 text-primary mt-0.5" />
            <span>
              Fast download speeds up to <strong className="text-white">{server.speed} Mbps</strong>
            </span>
          </div>
          <div className="flex items-start">
            <FiShield className="mr-2 text-primary mt-0.5" />
            <span>
              <strong className="text-white">Encrypted traffic</strong> & secure node
            </span>
          </div>
          <div className="flex items-start">
            <FiZap className="mr-2 text-primary mt-0.5" />
            <span>
              Optimized for <strong className="text-white">streaming & gaming</strong>
            </span>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-5 text-[11px] text-gray-500 italic">
          This server is available for Cloknet users. Choose the best region for your needs.
        </div>
      </div>
    </div>
  );
};

export default ServerCard;
