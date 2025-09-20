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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchBlogPosts() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/blog-posts?limit=2");
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts (status ${response.status})`);
        }
        const data = await response.json();
        if (isMounted) setBlogPosts(data);
      } catch (err) {
        // Fallback to static posts to avoid UI gaps
        try {
          const { sampleBlogPosts } = await import("@/data/blog-posts");
          if (isMounted) setBlogPosts(sampleBlogPosts.slice(0, 2));
        } catch (_) {
          // As a final fallback, provide minimal static content
          if (isMounted)
            setBlogPosts([
              {
                title: "How Activated Carbon Eliminates Litter Odors",
                excerpt:
                  "Quick overview of why activated carbon outperforms baking soda for litter box odor control.",
                author: "Purrify Team",
                date: new Date().toISOString().split("T")[0],
                image: "/optimized/60g.webp",
                link: "/blog/activated-carbon-litter-additive-benefits",
              },
              {
                title: "Using Deodorizers with Kittens: Best Practices",
                excerpt:
                  "Vet-informed guidance for introducing odor control safely in homes with young cats.",
                author: "Dr. Emily Rodriguez, DVM",
                date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
                image: "/optimized/20g.webp",
                link: "/blog/using-deodorizers-with-kittens",
              },
            ]);
        }
        // Reduce console noise in production
        console.debug("Blog posts fetch failed; using fallback content.", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchBlogPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className="py-12 bg-gradient-to-br from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
      id="blog"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
            {t.blogSection.catCareTips}
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-4 text-[#03E46A] dark:text-[#3694FF]">
            {t.blogSection.fromOurBlog}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg dark:text-gray-300">
            {t.blogSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading && blogPosts.length === 0 && (
            <>
              {[0, 1].map((i) => (
                <div
                  key={`skeleton-${i}`}
                  className="animate-pulse bg-white dark:bg-gray-800/80 rounded-2xl overflow-hidden shadow-xl border border-[#E0EFC7] dark:border-gray-700"
                >
                  <div className="w-full h-[200px] sm:h-[250px] bg-gray-200 dark:bg-gray-700" />
                  <div className="p-4 sm:p-6 space-y-3">
                    <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="flex justify-between pt-2">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {blogPosts.map((post, index) => (
            <div
              key={post.link || `blog-post-${index}`}
              className="bg-white dark:bg-gray-800/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-[#E0EFC7] dark:border-gray-700 transition-all duration-500 hover:shadow-[#E0EFC7]/50 dark:hover:shadow-[#5B2EFF]/30 hover:-translate-y-2 group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#03E46A]/20 to-[#5B2EFF]/20 dark:from-[#5B2EFF]/30 dark:to-[#03E46A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-full h-[200px] sm:h-[250px]">
                  <NextImage
                    src={post.image}
                    alt={`Featured image for blog post: ${post.title} - Purrify cat litter knowledge`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className={`w-full h-full ${post.image.includes('carbon_magnified') ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-110`}
                    priority={index === 0}
                    quality={85}
                  />
                </div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-[#03E46A] to-[#5B2EFF] dark:from-[#5B2EFF] dark:to-[#03E46A] px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-md text-xs text-white dark:text-gray-100 font-medium">
                  {t.blogSection.newPost}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-[#5B2EFF] group-hover:text-[#5B2EFF]/80 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#03E46A] font-medium">
                    {post.author}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{post.date}</span>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <Link
                  href={`/blog/${post.link.split('/').pop()}`}
                  className="text-[#03E46A] dark:text-[#5B2EFF] font-medium flex items-center hover:text-[#03E46A]/80 dark:hover:text-[#5B2EFF]/80 transition-colors"
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
            asChild
            className="bg-gradient-to-r from-[#03E46A] to-[#5B2EFF] dark:from-[#5B2EFF] dark:to-[#03E46A] hover:from-[#03E46A]/90 hover:to-[#5B2EFF] dark:hover:from-[#5B2EFF]/90 dark:hover:to-[#03E46A] text-white dark:text-gray-100 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          >
            <Link href="/blog">
              {t.blogSection.viewAllArticles}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
