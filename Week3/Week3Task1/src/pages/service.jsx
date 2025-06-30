import Button from "../component/Button";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom website development tailored to your business needs.",
      features: ["Responsive Design", "CMS Integration", "E-commerce Solutions", "API Development"]
    },
    {
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces that enhance user experience.",
      features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"]
    },
    {
      title: "Digital Marketing",
      description: "Strategies to grow your online presence and reach more customers.",
      features: ["SEO", "Social Media", "Content Marketing", "PPC Advertising"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Our Services</h1>
      <p className="text-xl mb-12 max-w-3xl">
        We offer a comprehensive range of digital services to help your business succeed online.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="mb-6 space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">Learn More</Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-600 text-white rounded-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8">
            Contact us today to discuss your project and how we can help you achieve your goals.
          </p>
          <Button variant="secondary" className="text-blue-600">Contact Us</Button>
        </div>
      </div>
    </div>
  );
};

export default Services;