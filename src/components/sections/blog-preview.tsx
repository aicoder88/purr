import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function BlogPreview() {
  const blogPosts = [
    {
      title: "7 Hidden Secrets to Banish Litter Box Stink Forever",
      excerpt:
        "Discover top-secret, easy-to-implement litter box smell hacks that actually work! Our experts share their best tips.",
      author: "Drago",
      date: "March 9, 2025",
      image:
        "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=800&q=80",
    },
    {
      title: "Why Your Cat Deserves Better Than Scented Litter",
      excerpt:
        "Learn about the potential health risks of scented litters and why natural alternatives like Purrify are better for your feline friend.",
      author: "Cat Health Team",
      date: "February 15, 2025",
      image:
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",
    },
    {
      title: "The Science Behind Activated Carbon Technology",
      excerpt:
        "Understand how activated carbon works at a molecular level to trap and eliminate odors rather than just masking them.",
      author: "Science Team",
      date: "January 22, 2025",
      image:
        "https://images.unsplash.com/photo-1501820488136-72669149e0d4?w=800&q=80",
    },
  ];

  return (
    <section
      className="py-12 bg-gradient-to-br from-orange-50 to-white"
      id="blog"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FB6A43] font-medium text-sm mb-4">
            Cat Care Tips & Insights
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-4 text-[#43FBB4]">
            From Our Blog
          </h2>
          <p className="text-gray-600 text-lg">
            Tips, tricks, and insights for cat owners who want a fresh-smelling
            home and happy, healthy cats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-[#E0EFC7] transition-all duration-500 hover:shadow-[#E0EFC7]/50 hover:-translate-y-2 group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#43FBB4]/20 to-[#6A43FB]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#43FBB4] to-[#43FBB4]/80 px-3 py-1 rounded-full shadow-md text-xs text-white font-medium">
                  New Post
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-[#6A43FB] group-hover:text-[#6A43FB]/80 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#43FBB4] font-medium">
                    {post.author}
                  </span>
                  <span className="text-gray-500">{post.date}</span>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <a
                  href="#"
                  className="text-[#43FBB4] font-medium flex items-center hover:text-[#43FBB4]/80 transition-colors"
                >
                  Read full article
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-gradient-to-r from-[#43FBB4] to-[#43FBB4]/80 hover:from-[#43FBB4]/90 hover:to-[#43FBB4] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0">
            View All Articles
          </Button>
        </div>
      </Container>
    </section>
  );
}
