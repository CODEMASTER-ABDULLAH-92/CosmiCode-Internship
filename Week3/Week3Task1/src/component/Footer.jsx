const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-300">
                We provide the best services in the industry with a focus on customer satisfaction.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white transition">About</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-white transition">Services</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <address className="text-gray-300 not-italic">
                123 Main Street<br />
                City, State 12345<br />
                Email: info@example.com<br />
                Phone: (123) 456-7890
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MySite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;