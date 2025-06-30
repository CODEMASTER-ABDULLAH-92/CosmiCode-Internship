const Card = ({ title, description, imageUrl, className = '' }) => {
    return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-48 object-contain"
          />
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
  };
  
  export default Card;