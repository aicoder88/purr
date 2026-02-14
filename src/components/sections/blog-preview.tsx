import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { getTranslation } from '@/translations';
import { ContentStore } from '@/lib/blog/content-store';
import { isValidLocale, type Locale } from '@/i18n/config';

type PreviewPost = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  imageAlt: string;
  link: string;
};

async function getPreviewPosts(locale: Locale, limit: number): Promise<PreviewPost[]> {
  const store = new ContentStore();
  const posts = await store.getAllPosts(locale, false);

  return posts.slice(0, limit).map((post) => {
    const date = post.publishDate?.includes('T')
      ? post.publishDate.split('T')[0]
      : post.publishDate;

    return {
      title: post.title,
      excerpt: post.excerpt,
      author: post.author?.name || 'Purrify Team',
      date,
      image: post.featuredImage.url,
      imageAlt: post.featuredImage.alt || post.title,
      link: `/${locale}/blog/${post.slug}`,
    };
  });
}

export async function BlogPreview({ locale }: { locale: string }) {
  const resolvedLocale: Locale = isValidLocale(locale) ? locale : 'en';
  const t = getTranslation(resolvedLocale);

  let blogPosts = await getPreviewPosts(resolvedLocale, 3);
  if (blogPosts.length === 0 && resolvedLocale !== 'en') {
    blogPosts = await getPreviewPosts('en', 3);
  }

  return (
    <section
      className="py-12 bg-gradient-to-br from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
      id="blog"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#E0EFC7] dark:bg-[#5B2EFF]/30 rounded-full text-[#FF3131] dark:text-[#E0EFC7] font-medium text-sm mb-4">
            {t.blogSection.catCareTips}
          </div>
          <h2 className="font-heading text-5xl font-bold tracking-tight mb-4 text-[#03E46A] dark:text-[#3694FF]">
            {t.blogSection.fromOurBlog}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t.blogSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              key={post.link}
              href={post.link}
              prefetch={false}
              className="block bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-[#E0EFC7] dark:border-gray-700 transition-all duration-500 hover:shadow-[#E0EFC7]/50 dark:hover:shadow-[#5B2EFF]/30 hover:-translate-y-2 group cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#03E46A]/20 to-[#5B2EFF]/20 dark:from-[#5B2EFF]/30 dark:to-[#03E46A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-full h-[200px] sm:h-[250px]">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={index === 0}
                    quality={75}
                  />
                </div>
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-[#03E46A] to-[#5B2EFF] dark:from-[#5B2EFF] dark:to-[#03E46A] px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-md text-xs text-white dark:text-gray-100 font-medium">
                  {t.blogSection.newPost}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-heading font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-[#5B2EFF] group-hover:text-[#5B2EFF]/80 transition-colors">
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
                <div className="text-[#03E46A] dark:text-[#5B2EFF] font-medium flex items-center hover:text-[#03E46A]/80 dark:hover:text-[#5B2EFF]/80 transition-colors">
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
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            asChild
            className="bg-gradient-to-r from-[#03E46A] to-[#5B2EFF] dark:from-[#5B2EFF] dark:to-[#03E46A] hover:from-[#03E46A]/90 hover:to-[#5B2EFF] dark:hover:from-[#5B2EFF]/90 dark:hover:to-[#03E46A] text-white dark:text-gray-100 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          >
            <Link href={`/${resolvedLocale}/blog`} prefetch={false}>
              {t.blogSection.viewAllArticles}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
