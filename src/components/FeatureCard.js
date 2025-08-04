const FeatureCard = ({ icon, title, description, glowColor }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-primary hover-glow transition">
      <div className={`w-12 h-12 rounded-full ${glowColor} bg-opacity-20 flex items-center justify-center mb-4`}>
        <div className={`w-10 h-10 rounded-full ${glowColor} flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-lighttext">{description}</p>
    </div>
  );
};

export default FeatureCard;