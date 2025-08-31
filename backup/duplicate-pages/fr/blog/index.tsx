import { NextPage } from "next";
import Head from "next/head";
import { Container } from "@/components/ui/container";
import { SITE_NAME } from "@/lib/constants";
import { useTranslation } from "@/lib/translation-context";
import { sampleBlogPosts } from "@/data/blog-posts";
import Link from "next/link";
import NextImage from "../../../components/NextImage";

const BlogPage: NextPage = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Head>
        <title>Blog | {SITE_NAME}</title>
        <meta name="description" content="Conseils, astuces et informations pour les propriétaires de chats qui souhaitent une maison fraîche et des chats heureux et en bonne santé." />
        <link rel="canonical" href="https://purrify.ca/fr/blog" />
        <link rel="alternate" hrefLang="fr" href="https://purrify.ca/fr/blog" />
        <link rel="alternate" hrefLang="en" href="https://purrify.ca/blog" />
      </Head>
      
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.blogSection.catCareTips}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{t.blogSection.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleBlogPosts.map((post) => (
              <div key={post.link} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-48">
                  <NextImage
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  {/* New post badge removed as it's not in the BlogPost type */}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                    <Link href={post.link} className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:text-indigo-300">
                      {t.blogSection.readFullArticle}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default BlogPage;
