import type { NextApiRequest, NextApiResponse } from 'next';

type BlogPost = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  link: string;
};

// Sample blog posts data
const sampleBlogPosts: BlogPost[] = [
  {
    title: "How Activated Carbon Eliminates Cat Litter Odors",
    excerpt: "Learn the science behind how activated carbon effectively eliminates cat litter odors at the molecular level, rather than just masking them.",
    author: "Dr. Feline Expert",
    date: new Date().toLocaleDateString(),
    image: "/carbon_magnified_image.png",
    link: "/blog/activated-carbon-science"
  },
  {
    title: "5 Tips for a Fresher Home with Multiple Cats",
    excerpt: "Living with multiple cats doesn't mean your home has to smell like it. Discover practical tips for maintaining a fresh-smelling home.",
    author: "Cat Care Specialist",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    image: "/three_bags_no_bg.png",
    link: "/blog/fresh-home-multiple-cats"
  },
  {
    title: "Why Traditional Odor Control Products Fall Short",
    excerpt: "Most cat litter odor products only mask smells temporarily. Find out why Purrify's approach is fundamentally different and more effective.",
    author: "Environmental Scientist",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    image: "/micropores_magnified_view.jpeg",
    link: "/blog/beyond-masking-odors"
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogPost[]>
) {
  // Return sample blog posts
  res.status(200).json(sampleBlogPosts);
}