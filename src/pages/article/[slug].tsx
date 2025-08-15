import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CommentSection from '@/components/CommentSection';
import articleData from '@/datas/article';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

// Types
interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    id: number;
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  updatedAt?: string | null;
  readTime: string;
  category: string;
  categoryColor: string;
  tags: string[];
  image: string;
  stats: {
    likes: number;
    views: number;
    comments: number;
  };
  related: number[];
}

interface RelatedArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  readTime: string;
  image: string;
}

interface ArticleDetailProps {
  article: Article;
  relatedArticles: RelatedArticle[];
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

// Get static paths for pre-rendering
export const getStaticPaths: GetStaticPaths = async () => {
  // Get all article slugs from the data
  const paths = articleData.articles.map((article) => ({
    params: { slug: article.slug },
  }));

  return {
    paths,
    fallback: false, // Return 404 for paths not returned by getStaticPaths
  };
};

// Get static props for the page
export const getStaticProps: GetStaticProps<ArticleDetailProps, Params> = async ({ params }) => {
  // Find the current article by slug
  const article = articleData.articles.find(article => article.slug === params?.slug);
  
  if (!article) {
    return {
      notFound: true, // Return 404 page if article not found
    };
  }

  // Get related articles based on the related array
  const relatedArticles = article.related.map(id => {
    const relatedArticle = articleData.articles.find(a => a.id === id);
    if (!relatedArticle) return null;
    
    return {
      id: relatedArticle.id,
      slug: relatedArticle.slug,
      title: relatedArticle.title,
      excerpt: relatedArticle.excerpt,
      category: relatedArticle.category,
      categoryColor: relatedArticle.categoryColor,
      readTime: relatedArticle.readTime,
      image: relatedArticle.image,
    };
  }).filter(Boolean) as RelatedArticle[];

  return {
    props: {
      article,
      relatedArticles,
    },
  };
};

export default function ArticleDetail({ article, relatedArticles }: ArticleDetailProps) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(article.stats.likes);

  const handleLike = () => {
    setLiked(!liked);
    setCurrentLikes(liked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copy URL
      navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    }
  };

  // Get category color based on categoryColor
  const getCategoryColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-700';
      case 'purple':
        return 'bg-purple-100 text-purple-700';
      case 'orange':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Article Header */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span>→</span>
              <Link href="/article" className="hover:text-blue-600">Articles</Link>
              <span>→</span>
              <span className="text-gray-900">{article.category}</span>
            </nav>

            {/* Article Meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColorClasses(article.categoryColor)}`}>
                {article.category}
              </span>
              <span className="text-gray-500 text-sm">{article.publishedAt}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">{article.readTime} read</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">by {article.author.name}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {article.excerpt}
            </p>

            {/* Article Actions */}
            <div className="flex items-center justify-between py-6 border-y border-gray-200">
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    liked 
                      ? 'bg-red-50 text-red-600 border-2 border-red-200' 
                      : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                  }`}
                >
                  <svg className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{currentLikes}</span>
                </button>

                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    bookmarked 
                      ? 'bg-blue-50 text-blue-600 border-2 border-blue-200' 
                      : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                  }`}
                >
                  <svg className="w-5 h-5" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Bookmark
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{article.stats.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{article.stats.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* Featured Image */}
            <div className="relative h-64 md:h-96 bg-gradient-to-br from-blue-500 to-purple-600">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {/* In a real app, you'd use a markdown parser like react-markdown */}
                <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
                  {article.content}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/article?tag=${tag}`}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Author Info */}
        <div className="max-w-4xl mx-auto px-6 pb-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 relative rounded-full overflow-hidden">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">About {article.author.name}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {article.author.bio}
                </p>
                <div className="flex gap-4 mt-4">
                  <Link href="/about" className="text-blue-600 hover:text-blue-700 font-medium">
                    View Profile →
                  </Link>
                  <Link href="/article" className="text-blue-600 hover:text-blue-700 font-medium">
                    More Articles →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedArticles.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                  <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryColorClasses(article.categoryColor)}`}>
                      {article.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mb-2 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {article.excerpt}
                    </p>
                    <div className="text-xs text-gray-500">
                      {article.readTime} read
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <CommentSection workspaceId={`article-${article.id}`} />
        </div>
      </div>

      <Footer />
    </>
  );
}
