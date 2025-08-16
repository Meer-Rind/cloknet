import { useState, useMemo } from 'react';
import ServerCard from '../components/ServerCard';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

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

  const filteredServers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return servers.filter((server) => {
      const matchesSearch =
        !term ||
        server.country.toLowerCase().includes(term) ||
        server.city.toLowerCase().includes(term);
      const matchesFilter =
        filter === 'all' ||
        (filter === 'free' && server.type === 'free') ||
        (filter === 'premium' && server.type === 'premium') ||
        (filter === 'normal' && server.type === 'normal');
      return matchesSearch && matchesFilter;
    });
  }, [servers, searchTerm, filter]);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Ambient brand glows */}
      <span className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 bg-cyan-400/10 blur-3xl rounded-full" />
      <span className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 bg-fuchsia-500/10 blur-3xl rounded-full" />
      {/* Conic halo */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
        <div className="absolute -inset-px bg-[conic-gradient(from_180deg_at_50%_0%,rgba(0,207,255,.18),transparent,rgba(255,0,128,.15),transparent,rgba(0,207,255,.18))]" />
      </div>
      {/* Soft grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold mb-4 drop-shadow-[0_0_24px_rgba(0,207,255,.15)]">
            Cloknet VPN <span className="text-primary">Servers</span>
          </h1>
          <p className="text-lighttext max-w-2xl mx-auto">
            Connect to any of our high-speed servers worldwide for secure and private browsing.
          </p>
          {/* animated underline */}
          <div className="relative w-28 h-[3px] mx-auto mt-5 bg-white/10 rounded-full overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#00CFFF] to-[#9B5CFF] animate-[underline_2.2s_ease-in-out_infinite]" />
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            {/* Search (glassy) */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-0 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl pointer-events-none" />
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  inputMode="search"
                  placeholder="Search servers..."
                  aria-label="Search servers by country or city"
                  className="bg-transparent text-white text-sm rounded-xl block w-full pl-10 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/60 border border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter (glassy select) */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <FiFilter className="text-lighttext" />
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-xl bg-[conic-gradient(from_0deg,rgba(0,207,255,.35),rgba(155,92,255,.25),rgba(0,207,255,.35))] opacity-30 blur-sm" />
                <select
                  className="relative appearance-none bg-white/5 border border-white/10 text-white text-sm rounded-xl focus:ring-2 focus:ring-primary/60 focus:border-primary/60 py-2.5 pl-3 pr-10 backdrop-blur-xl"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  aria-label="Filter servers"
                >
                  <option value="all">All Servers</option>
                  <option value="free">Free Servers</option>
                  <option value="premium">Premium Servers</option>
                  <option value="normal">Normal Servers</option>
                </select>
                {/* caret */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">▾</span>
              </div>
            </div>
          </div>

          {/* Legend + result count */}
          <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <div className="flex flex-wrap items-center justify-between text-sm text-lighttext gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span>Low load (&lt;50%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span>Medium load (50–80%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>High load (&gt;80%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>Premium server</span>
              </div>
              <div className="hidden md:block text-white/80">
                {filteredServers.length} result{filteredServers.length === 1 ? '' : 's'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filteredServers.length > 0 ? (
            <motion.div
              key="grid"
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredServers.map((server) => (
                <motion.div key={server.id} variants={fadeUp}>
                  <ServerCard server={server} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, ease } }}
              exit={{ opacity: 0 }}
              className="text-center py-14"
            >
              <div className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-5">
                <div className="mr-4 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <FiSearch />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white mb-1">No servers found</h3>
                  <p className="text-lighttext">Try adjusting your search or filter criteria</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* keyframes + reduced motion safety */}
      <style>{`
        @keyframes underline { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important;}
        }
      `}</style>
    </section>
  );
};

export default Servers;
