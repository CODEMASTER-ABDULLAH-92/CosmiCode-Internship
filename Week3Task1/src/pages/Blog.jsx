import Card from "../component/Button";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    excerpt: "Learn the basics of React and how to create your first application.",
    date: "May 15, 2023",
    category: "Development",
    imageUrl: "https://via.placeholder.com/600x400"
  },
  {
    id: 2,
    title: "Tailwind CSS Best Practices",
    excerpt: "Discover how to use Tailwind CSS efficiently in your projects.",
    date: "April 28, 2023",
    category: "Design",
    imageUrl: "https://via.placeholder.com/600x400"
  },
  {
    id: 3,
    title: "Optimizing Website Performance",
    excerpt: "Tips and tricks to make your website load faster and perform better.",
    date: "March 10, 2023",
    category: "Performance",
    imageUrl: "https://via.placeholder.com/600x400"
  },
  {
    id: 4,
    title: "The Future of Web Development",
    excerpt: "Exploring emerging trends and technologies in web development.",
    date: "February 22, 2023",
    category: "Trends",
    imageUrl: "https://via.placeholder.com/600x400"
  }
];

const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
      <p className="text-xl mb-12 max-w-3xl">
        Latest articles and insights about web development, design, and digital trends.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogPosts.map(post => (
          <Card 
            key={post.id}
            title={post.title}
            description={post.excerpt}
            imageUrl={post.imageUrl}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{post.date}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <a 
                href={`/blog/${post.id}`} 
                className="text-blue-600 font-medium hover:text-blue-800 transition"
              >
                Read More →
              </a>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Load More Articles
        </button>
      </div>
    </div>
  );
};

export default Blog;