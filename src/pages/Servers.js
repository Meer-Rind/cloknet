import { useState, useMemo } from 'react';
import ServerCard from '../components/ServerCard';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const DeepBlue1 = '#021A2B';
const DeepBlue2 = '#053458';
const NeonBlue  = '#18A9FF';
const BurningBlue = '#00C7FF';

const ease = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
};
const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const Servers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const servers = [
    { id: 1,  country: 'United States',  countryCode: 'US', city: 'New York',   type: 'free',    load: 45, ping: 28,  speed: 85 },
    { id: 2,  country: 'United Kingdom', countryCode: 'GB', city: 'London',     type: 'free',    load: 62, ping: 42,  speed: 72 },
    { id: 3,  country: 'Germany',        countryCode: 'DE', city: 'Frankfurt',  type: 'free',    load: 38, ping: 35,  speed: 91 },
    { id: 4,  country: 'Japan',          countryCode: 'JP', city: 'Tokyo',      type: 'free',    load: 71, ping: 128, speed: 65 },
    { id: 5,  country: 'Canada',         countryCode: 'CA', city: 'Toronto',    type: 'free',    load: 53, ping: 45,  speed: 78 },
    { id: 6,  country: 'France',         countryCode: 'FR', city: 'Paris',      type: 'free',    load: 47, ping: 39,  speed: 82 },
    { id: 7,  country: 'Singapore',      countryCode: 'SG', city: 'Singapore',  type: 'free',    load: 65, ping: 152, speed: 68 },
    { id: 8,  country: 'Australia',      countryCode: 'AU', city: 'Sydney',     type: 'premium', load: 29, ping: 198, speed: 88 },
    { id: 9,  country: 'Brazil',         countryCode: 'BR', city: 'São Paulo',  type: 'premium', load: 41, ping: 145, speed: 76 },
    { id: 10, country: 'South Korea',    countryCode: 'KR', city: 'Seoul',      type: 'premium', load: 36, ping: 135, speed: 79 },
    { id: 11, country: 'Netherlands',    countryCode: 'NL', city: 'Amsterdam',  type: 'premium', load: 44, ping: 32,  speed: 84 },
    { id: 12, country: 'Sweden',         countryCode: 'SE', city: 'Stockholm',  type: 'normal',  load: 51, ping: 48,  speed: 81 },
    { id: 13, country: 'Switzerland',    countryCode: 'CH', city: 'Zurich',     type: 'normal',  load: 33, ping: 52,  speed: 89 },
  ];

  const filteredServers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return servers.filter((s) => {
      const matchesSearch = !term || s.country.toLowerCase().includes(term) || s.city.toLowerCase().includes(term);
      const matchesFilter =
        filter === 'all' ||
        (filter === 'free'    && s.type === 'free') ||
        (filter === 'premium' && s.type === 'premium') ||
        (filter === 'normal'  && s.type === 'normal');
      return matchesSearch && matchesFilter;
    });
  }, [servers, searchTerm, filter]);

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ background: DeepBlue1 }}
    >
      {/* Ambient brand glows + conic halo (palette-only) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl" style={{ background: `${NeonBlue}1A` }} />
        <span className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full blur-3xl" style={{ background: `${BurningBlue}1A` }} />
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.28,
            maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 85%)',
            background: `conic-gradient(from 180deg at 50% 0%, ${BurningBlue}2E, transparent, ${NeonBlue}26, transparent, ${BurningBlue}2E)`
          }}
        />
        {/* Subtle neon grid */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.06,
            background: `linear-gradient(to right, ${NeonBlue} 1px, transparent 1px),
                         linear-gradient(to bottom, ${NeonBlue} 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4" style={{ color: '#FFFFFF', textShadow: '0 0 24px rgba(0,199,255,0.15)' }}>
            Cloknet VPN <span style={{ color: BurningBlue }}>Servers</span>
          </h1>
          <p className="max-w-2xl mx-auto" style={{ color: NeonBlue }}>
            Connect to any of our high-speed servers worldwide for secure and private browsing.
          </p>
          {/* animated underline */}
          <div className="relative w-28 h-[3px] mx-auto mt-5 rounded-full overflow-hidden" style={{ background: `${NeonBlue}26` }}>
            <span
              className="absolute inset-y-0 left-0 w-1/2"
              style={{
                background: `linear-gradient(90deg, ${BurningBlue}, ${NeonBlue})`,
                animation: 'underline 2.2s ease-in-out infinite'
              }}
            />
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            {/* Search (glassy) */}
            <div className="relative w-full md:w-80">
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ background: `${DeepBlue2}CC`, border: `1px solid ${NeonBlue}26`, backdropFilter: 'blur(14px)' }}
              />
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch style={{ color: NeonBlue }} />
                </div>
                <input
                  type="search"
                  placeholder="Search servers..."
                  aria-label="Search servers by country or city"
                  className="bg-transparent text-sm rounded-xl block w-full pl-10 pr-3 py-2.5 focus:outline-none"
                  style={{
                    color: '#FFFFFF',
                    border: '1px solid transparent',
                    caretColor: BurningBlue,
                    boxShadow: 'none'
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px ${BurningBlue}33`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                />
              </div>
            </div>

            {/* Filter (glassy select) */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <FiFilter style={{ color: NeonBlue }} />
              <div className="relative">
                <div
                  className="absolute -inset-0.5 rounded-xl blur-sm"
                  style={{
                    background: `conic-gradient(from 0deg, ${BurningBlue}59, ${NeonBlue}40, ${BurningBlue}59)`,
                    opacity: 0.35
                  }}
                />
                <select
                  className="relative appearance-none text-sm rounded-xl py-2.5 pl-3 pr-10"
                  style={{
                    color: '#FFFFFF',
                    background: `${DeepBlue2}CC`,
                    border: `1px solid ${NeonBlue}26`,
                    backdropFilter: 'blur(14px)',
                    outline: 'none'
                  }}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  aria-label="Filter servers"
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px ${BurningBlue}33`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <option value="all">All Servers</option>
                  <option value="free">Free Servers</option>
                  <option value="premium">Premium Servers</option>
                  <option value="normal">Normal Servers</option>
                </select>
                {/* caret */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#FFFFFF99' }}>
                  ▾
                </span>
              </div>
            </div>
          </div>

          {/* Legend + result count (palette gradients instead of red/green/yellow) */}
          <div
            className="relative rounded-xl p-4"
            style={{
              background: `${DeepBlue2}CC`,
              border: `1px solid ${NeonBlue}26`,
              backdropFilter: 'blur(14px)'
            }}
          >
            <div className="flex flex-wrap items-center justify-between text-sm gap-3">
              <LegendChip
                label="Low load (<50%)"
                gradient={`linear-gradient(90deg, ${NeonBlue}CC, ${BurningBlue}55)`}
              />
              <LegendChip
                label="Medium load (50–80%)"
                gradient={`linear-gradient(90deg, ${NeonBlue}88, ${BurningBlue}88)`}
              />
              <LegendChip
                label="High load (>80%)"
                gradient={`linear-gradient(90deg, ${NeonBlue}55, ${BurningBlue}CC)`}
              />
              <LegendChip
                label="Premium server"
                ring={BurningBlue}
              />
              <div className="hidden md:block" style={{ color: '#FFFFFFCC' }}>
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
              <div
                className="inline-flex items-center justify-center rounded-2xl px-6 py-5"
                style={{
                  background: `${DeepBlue2}CC`,
                  border: `1px solid ${NeonBlue}26`,
                  backdropFilter: 'blur(14px)'
                }}
              >
                <div
                  className="mr-4 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: `${BurningBlue}1A`, color: BurningBlue }}
                >
                  <FiSearch />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold mb-1" style={{ color: '#FFFFFF' }}>No servers found</h3>
                  <p style={{ color: NeonBlue }}>Try adjusting your search or filter criteria</p>
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

/* --- tiny UI helpers --- */
const LegendChip = ({ label, gradient, ring }) => (
  <div className="flex items-center gap-2">
    <span
      className="w-3.5 h-3.5 rounded-full inline-block"
      style={
        ring
          ? { background: `${DeepBlue2}`, border: `2px solid ${ring}` }
          : { background: gradient }
      }
    />
    <span style={{ color: NeonBlue }}>{label}</span>
  </div>
);

export default Servers;
