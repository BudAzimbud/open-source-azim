import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import articleData from '@/datas/article';


interface QuestionVote {
  id: number;
  question: string;
  description: string;
  votes: number;
  userVoted: boolean;
  category: string;
  submittedBy: string;
  submittedAt: string;
}

// Sample questions data
const sampleQuestions: QuestionVote[] = [
  {
    id: 1,
    question: "Bagaimana cara setup development environment yang optimal untuk full-stack developer?",
    description: "Ingin tahu tools, extensions, dan konfigurasi terbaik untuk produktivitas maksimal dalam coding.",
    votes: 247,
    userVoted: false,
    category: "Development",
    submittedBy: "devloper123",
    submittedAt: "2024-01-10"
  },
  {
    id: 2,
    question: "Tips memilih mechanical keyboard yang tepat untuk programmer",
    description: "Panduan lengkap memilih switch, layout, dan fitur keyboard untuk coding daily.",
    votes: 189,
    userVoted: true,
    category: "Hardware",
    submittedBy: "keyboardlover",
    submittedAt: "2024-01-08"
  },
  {
    id: 3,
    question: "Perbandingan framework JavaScript terbaru 2024",
    description: "Analisis mendalam React vs Vue vs Svelte vs Angular untuk project modern.",
    votes: 156,
    userVoted: false,
    category: "Technology",
    submittedBy: "frontendpro",
    submittedAt: "2024-01-05"
  }
];

export default function ArticlesPage() {
  // Example: Mapping workspaceList for display or linking
  // You can use this array in your component as needed
  // Example: Show workspace titles in a list
  // const workspaceTitles = workspaceList.map(ws => ws.title);
  const [questions, setQuestions] = useState(sampleQuestions);
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    description: '',
    category: 'Development'
  });

  // Extract categories from article data
  const categories = ['All', ...new Set(articleData.categories.map(cat => cat.name))];

  // Handle vote
  const handleVote = (questionId: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, votes: q.userVoted ? q.votes - 1 : q.votes + 1, userVoted: !q.userVoted }
        : q
    ));
  };

  // Submit new question
  const handleSubmitQuestion = () => {
    if (!newQuestion.question.trim() || !newQuestion.description.trim()) return;

    const newQ: QuestionVote = {
      id: Math.max(...questions.map(q => q.id)) + 1,
      question: newQuestion.question,
      description: newQuestion.description,
      votes: 1,
      userVoted: true,
      category: newQuestion.category,
      submittedBy: 'anonymous',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setQuestions([newQ, ...questions]);
    setNewQuestion({ question: '', description: '', category: 'Development' });
    setShowVoteForm(false);
  };

  // Filter articles from article data
  const filteredArticles = selectedCategory === 'All' 
    ? articleData.articles 
    : articleData.articles.filter(article => article.category === selectedCategory);

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.stats.views - a.stats.views;
      case 'liked':
        return b.stats.likes - a.stats.likes;
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  // Helper function to get category color
  const getCategoryColor = (categoryName: string): string => {
    const category = articleData.categories.find(cat => cat.name === categoryName);
    return category ? category.color : 'blue';
  };

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Articles & Knowledge Base
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Deep dives into development, technology, and productivity. 
                Plus, vote for topics you'd like to see covered next!
              </p>
            </div>
          </div>
        </div>

        {/* Question Voting Section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">📝 Request Article Topics</h2>
                  <p className="text-blue-100">
                    Vote for questions you want answered, or submit your own!
                  </p>
                </div>
                <button
                  onClick={() => setShowVoteForm(true)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                >
                  + Suggest Topic
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                {questions.map((question) => (
                  <div key={question.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex gap-6">
                      {/* Vote Button */}
                      <div className="flex flex-col items-center min-w-[80px]">
                        <button
                          onClick={() => handleVote(question.id)}
                          className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                            question.userVoted
                              ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                              : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                          }`}
                        >
                          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 4L14.5 9.5L20 10L15.5 14L16.5 20L12 17L7.5 20L8.5 14L4 10L9.5 9.5L12 4Z"/>
                          </svg>
                          <span className="font-bold text-lg">{question.votes}</span>
                          <span className="text-xs">votes</span>
                        </button>
                      </div>

                      {/* Question Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              question.category === 'Development' ? 'bg-green-100 text-green-700' :
                              question.category === 'Hardware' ? 'bg-purple-100 text-purple-700' :
                              question.category === 'Technology' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {question.category}
                            </span>
                            <span className="text-sm text-gray-500">
                              by {question.submittedBy} • {question.submittedAt}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {question.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {question.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="liked">Most Liked</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                {/* Article Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={600}
                      height={300}
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      article.categoryColor === 'green' ? 'bg-green-500/80 text-white' :
                      article.categoryColor === 'purple' ? 'bg-purple-500/80 text-white' :
                      article.categoryColor === 'orange' ? 'bg-orange-500/80 text-white' :
                      'bg-blue-500/80 text-white'
                    }`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span>{article.readTime} read</span>
                    <span>•</span>
                    <span>by {article.author.name}</span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                    {article.title}
                  </h2>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Article Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{article.stats.likes}</span>
                      </div>
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

                    <Link
                      href={`/article/${article.slug}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="max-w-7xl mx-auto px-6 pb-12 text-center">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
            Load More Articles
          </button>
        </div>
      </div>

      {/* Submit Question Modal */}
      {showVoteForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">💡 Suggest Article Topic</h2>
                <button
                  onClick={() => setShowVoteForm(false)}
                  className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question/Topic <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="What would you like to learn about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newQuestion.description}
                    onChange={(e) => setNewQuestion({...newQuestion, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    rows={4}
                    placeholder="Provide more details about what you'd like to see covered..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion({...newQuestion, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  >
                    {articleData.categories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleSubmitQuestion}
                  disabled={!newQuestion.question.trim() || !newQuestion.description.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                >
                  Submit Question
                </button>
                <button
                  onClick={() => {
                    setShowVoteForm(false);
                    setNewQuestion({ question: '', description: '', category: 'Development' });
                  }}
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-6 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
