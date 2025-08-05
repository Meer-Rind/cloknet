const FeatureCard = ({ icon, title, description, glowColor }) => {
  return (
    <div className="bg-[#0A0F1C] bg-opacity-60 border border-[#1F2937] hover:border-[#00E5FF] rounded-2xl p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-neon backdrop-blur-md">
      
      <div className="flex items-center justify-center mb-4">
        <div className={`w-14 h-14 rounded-full ${glowColor} bg-opacity-20 flex items-center justify-center`}>
          <div className={`w-10 h-10 rounded-full ${glowColor} flex items-center justify-center text-white text-xl`}>
            {icon}
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white text-center mb-2 tracking-wide">
        {title}
      </h3>
      <p className="text-lighttext text-center text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
