import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "@/lib/translation-context";
import dynamic from "next/dynamic";

// Dynamically import NextImage to reduce initial bundle size
const NextImage = dynamic(() => import("../../../components/NextImage"), {
  ssr: true,
});

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  link: string;
}

export function BlogPreview() {
  const { t } = useTranslation();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch(
          "/api/blog-posts?limit=2"
        );
        const data = await response.json();
        setBlogPosts(data);
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
            {t.blogSection.catCareTips}
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-4 text-[#03E46A]">
            {t.blogSection.fromOurBlog}
          </h2>
          <p className="text-gray-600 text-lg">
            {t.blogSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-[#E0EFC7] transition-all duration-500 hover:shadow-[#E0EFC7]/50 hover:-translate-y-2 group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#03E46A]/20 to-[#5B2EFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-full h-[200px] sm:h-[250px]">
                  <NextImage
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className={`w-full h-full ${post.image.includes('carbon_magnified') ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-110`}
                    priority={index === 0}
                    quality={85}
                  />
                </div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-[#03E46A] to-[#03E46A]/80 px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-md text-xs text-white font-medium">
                  {t.blogSection.newPost}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-[#5B2EFF] group-hover:text-[#5B2EFF]/80 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#03E46A] font-medium">
                    {post.author}
                  </span>
                  <span className="text-gray-500">{post.date}</span>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <Link
                  href={post.link}
                  className="text-[#03E46A] font-medium flex items-center hover:text-[#03E46A]/80 transition-colors"
                >
                  {t.blogSection.readFullArticle}
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
                </Link>
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
            {t.blogSection.viewAllArticles}
          </Button>
        </div>
      </Container>
    </section>
  );
}
