import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function BlogPreview() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        console.log("this is getting bolgs");
        const response = await fetch(
          "/api/blog-posts"
        );
        const data = await response.json();
        console.log("this is the data", data);

        debugger;
        const formattedPosts = data.map((post: any) => ({
          title: post.title.rendered,
          excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ""), // Strip HTML tags
          author: post._embedded?.author?.[0]?.name || "Unknown",
          date: new Date(post.date).toLocaleDateString(),
          image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/800",
          link: post.link,
        }));
        console.log("this is the formatted posts", formattedPosts);
        setBlogPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    }

    fetchBlogPosts();
  }, []);

  return (
    <section
      className="py-12 bg-gradient-to-br from-orange-50 to-white"
      id="blog"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
            Cat Care Tips & Insights
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-4 text-[#03E46A]">
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#03E46A]/20 to-[#5B2EFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#03E46A] to-[#03E46A]/80 px-3 py-1 rounded-full shadow-md text-xs text-white font-medium">
                  New Post
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-[#5B2EFF] group-hover:text-[#5B2EFF]/80 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#03E46A] font-medium">
                    {post.author}
                  </span>
                  <span className="text-gray-500">{post.date}</span>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#03E46A] font-medium flex items-center hover:text-[#03E46A]/80 transition-colors"
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
          <Button
            className="bg-gradient-to-r from-[#03E46A] to-[#03E46A]/80 hover:from-[#03E46A]/90 hover:to-[#03E46A] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            onClick={() =>
              (window.location.href = "/blog")
            }
          >
            View All Articles
          </Button>
        </div>
      </Container>
    </section>
  );
}
