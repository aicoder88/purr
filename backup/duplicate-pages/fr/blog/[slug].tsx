import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import { Container } from "@/components/ui/container";
import { SITE_NAME } from "@/lib/constants";
import { useTranslation } from "@/lib/translation-context";
import { getBlogPostContent, sampleBlogPosts, BlogPost } from "@/data/blog-posts";
import NextImage from "../../../components/NextImage";
import Link from "next/link";

interface BlogPostPageProps {
  post: BlogPost;
  content: string;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post, content }) => {
  const { t } = useTranslation();
  
  return (
    <>
      <Head>
        <title>{post.title} | Blog | {SITE_NAME}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://purrify.ca${post.link}`} />
        <link rel="alternate" hrefLang="fr" href={`https://purrify.ca/fr${post.link}`} />
        <link rel="alternate" hrefLang="en" href={`https://purrify.ca${post.link}`} />
      </Head>
      
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link href="/fr/blog" className="text-indigo-600 dark:text-indigo-400 dark:text-indigo-400 hover:text-indigo-800 dark:text-indigo-200 dark:text-indigo-300 mb-6 inline-block">
              &larr; Retour aux articles
            </Link>
            
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center text-gray-600 dark:text-gray-300 dark:text-gray-300 mb-8">
              <span>Par {post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>
            
            <div className="relative h-80 mb-8">
              <NextImage
                src={post.image}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold mb-4">Partagez cet article</h3>
              <div className="flex space-x-4">
                <a href={`https://twitter.com/intent/tweet?url=https://purrify.ca${post.link}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:text-blue-400 dark:text-blue-400">
                  Twitter
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=https://purrify.ca${post.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:text-blue-200 dark:text-blue-200">
                  Facebook
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https://purrify.ca${post.link}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`} target="_blank" rel="noopener noreferrer" className="text-blue-800 dark:text-blue-200 hover:text-blue-900 dark:text-blue-100">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = sampleBlogPosts.map((post) => ({
    params: { slug: post.link.split('/').pop() },
  }));
  
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = sampleBlogPosts.find((p) => p.link.split('/').pop() === slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }
  
  const content = getBlogPostContent();
  
  return {
    props: {
      post,
      content,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default BlogPostPage;