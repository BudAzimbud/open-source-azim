import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CommentSection from '@/components/CommentSection';

// Sample article data (in real app, this would come from API/database)
const sampleArticle = {
  id: 1,
  title: "Complete Guide to Building Modern React Applications",
  excerpt: "Learn how to build scalable and maintainable React applications using the latest best practices and tools.",
  content: `
# Complete Guide to Building Modern React Applications

React has evolved significantly since its introduction, and building modern React applications requires understanding not just the framework itself, but the entire ecosystem that surrounds it. In this comprehensive guide, we'll explore the best practices, tools, and patterns that will help you build scalable and maintainable React applications.

## Table of Contents

1. [Setting Up Your Development Environment](#setup)
2. [Project Structure and Organization](#structure)
3. [State Management Strategies](#state)
4. [Performance Optimization](#performance)
5. [Testing Your Applications](#testing)
6. [Deployment and Production](#deployment)

## Setting Up Your Development Environment {#setup}

The foundation of any great React application starts with a well-configured development environment. Here's what you need to know:

### Essential Tools

- **Node.js** (v18 or later)
- **VS Code** with React extensions
- **ESLint** and **Prettier** for code quality
- **Git** for version control

### Creating a New Project

\`\`\`bash
# Using Vite (recommended for new projects)
npm create vite@latest my-react-app -- --template react-ts

# Using Create React App (stable but slower)
npx create-react-app my-react-app --template typescript
\`\`\`

## Project Structure and Organization {#structure}

A well-organized project structure is crucial for maintainability. Here's a recommended approach:

\`\`\`
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Input, etc.)
│   └── features/        # Feature-specific components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── services/            # API calls and external services
├── types/               # TypeScript type definitions
└── styles/              # Global styles and themes
\`\`\`

### Component Organization

Keep your components focused and single-purpose. Each component should:

- Have a clear, descriptive name
- Be responsible for one specific piece of functionality
- Accept props that make it reusable
- Include proper TypeScript types

## State Management Strategies {#state}

Choosing the right state management solution depends on your application's complexity:

### Local State (useState, useReducer)

For simple, component-local state:

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

### Context API

For sharing state across multiple components:

\`\`\`jsx
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <YourApp />
    </ThemeContext.Provider>
  );
}
\`\`\`

### External State Management

For complex applications, consider:

- **Zustand** - Simple and lightweight
- **Redux Toolkit** - Powerful but with more boilerplate
- **Jotai** - Atomic state management

## Performance Optimization {#performance}

React applications can become slow without proper optimization. Here are key strategies:

### Code Splitting

Use dynamic imports to split your code:

\`\`\`jsx
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### Memoization

Use React.memo and useMemo strategically:

\`\`\`jsx
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveOperation(item));
  }, [data]);
  
  return <div>{/* render processed data */}</div>;
});
\`\`\`

## Testing Your Applications {#testing}

A robust testing strategy includes:

### Unit Tests

Test individual components and functions:

\`\`\`jsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
\`\`\`

### Integration Tests

Test how components work together:

\`\`\`jsx
test('user can submit form', async () => {
  render(<ContactForm />);
  
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: 'John Doe' }
  });
  
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  await waitFor(() => {
    expect(screen.getByText(/success/i)).toBeInTheDocument();
  });
});
\`\`\`

## Deployment and Production {#deployment}

### Build Optimization

Before deploying, ensure your build is optimized:

\`\`\`bash
npm run build
npm run preview  # Test the production build locally
\`\`\`

### Deployment Options

- **Vercel** - Excellent for React apps with zero config
- **Netlify** - Great for static sites with continuous deployment
- **AWS S3 + CloudFront** - For more control over infrastructure

### Environment Variables

Use environment variables for configuration:

\`\`\`bash
# .env.production
VITE_API_URL=https://api.production.com
VITE_ANALYTICS_ID=your-analytics-id
\`\`\`

## Conclusion

Building modern React applications requires more than just knowing React syntax. By following these best practices for project structure, state management, performance, testing, and deployment, you'll be well-equipped to build applications that are not only functional but also maintainable and scalable.

Remember that the React ecosystem is constantly evolving, so stay updated with the latest developments and don't be afraid to refactor your code as new patterns and tools emerge.

## What's Next?

Now that you have a solid foundation, consider exploring:

- **Next.js** for server-side rendering and full-stack applications
- **React Query** for advanced data fetching and caching
- **Storybook** for component development and documentation
- **React Hook Form** for efficient form handling

Happy coding! 🚀
  `,
  author: "Azim",
  publishedAt: "2024-01-15",
  readTime: "8 min",
  category: "Development",
  tags: ["React", "JavaScript", "Frontend"],
  image: "/api/placeholder/800/400",
  likes: 45,
  views: 1200,
  comments: 8
};

const relatedArticles = [
  {
    id: 2,
    title: "TypeScript Best Practices for Large Applications",
    excerpt: "Advanced TypeScript patterns and practices for building maintainable large-scale applications.",
    category: "Development",
    readTime: "10 min",
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    title: "My 2024 Productivity Setup: Tools and Workflows",
    excerpt: "A deep dive into the tools, apps, and workflows that help me stay productive.",
    category: "Productivity",
    readTime: "6 min",
    image: "/api/placeholder/300/200"
  }
];

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(sampleArticle.likes);

  const handleLike = () => {
    setLiked(!liked);
    setCurrentLikes(liked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: sampleArticle.title,
          text: sampleArticle.excerpt,
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
              <span className="text-gray-900">{sampleArticle.category}</span>
            </nav>

            {/* Article Meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                sampleArticle.category === 'Development' ? 'bg-green-100 text-green-700' :
                sampleArticle.category === 'Hardware' ? 'bg-purple-100 text-purple-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {sampleArticle.category}
              </span>
              <span className="text-gray-500 text-sm">{sampleArticle.publishedAt}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">{sampleArticle.readTime} read</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">by {sampleArticle.author}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {sampleArticle.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {sampleArticle.excerpt}
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
                  <span>{sampleArticle.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{sampleArticle.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* Featured Image */}
            {sampleArticle.image && (
              <div className="relative h-64 md:h-96 bg-gradient-to-br from-blue-500 to-purple-600">
                <Image
                  src={sampleArticle.image}
                  alt={sampleArticle.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Article Body */}
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {/* In a real app, you'd use a markdown parser like react-markdown */}
                <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
                  {sampleArticle.content}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {sampleArticle.tags.map((tag) => (
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
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">About {sampleArticle.author}</h3>
                <p className="text-gray-600 leading-relaxed">
                  Passionate developer and tech enthusiast. I love sharing knowledge about modern web development, 
                  productivity tools, and everything in between. Follow me for more insights!
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
              <Link key={article.id} href={`/article/${article.id}`}>
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
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      article.category === 'Development' ? 'bg-green-100 text-green-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
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
          <CommentSection workspaceId={`article-${id}`} />
        </div>
      </div>

      <Footer />
    </>
  );
}
