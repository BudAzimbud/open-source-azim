import { useState, useEffect } from 'react';
import { getCoffeeBoost, getDailyCoffeeBoost, getRandomCoffeeQuote } from '../datas/article';

interface CoffeeBoostProps {
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
  showAuthor?: boolean;
  variant?: 'card' | 'banner' | 'minimal';
  type?: 'motivational' | 'programming' | 'zen' | 'coffee';
}

const CoffeeBoost: React.FC<CoffeeBoostProps> = ({
  autoRefresh = false,
  refreshInterval = 30000, // 30 seconds
  showAuthor = true,
  variant = 'card',
  type = 'motivational'
}) => {
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let newQuote;
      if (type === 'coffee') {
        newQuote = getRandomCoffeeQuote();
      } else {
        newQuote = await getDailyCoffeeBoost(type);
      }
      
      setQuote(newQuote);
    } catch (err) {
      setError('Failed to load coffee boost');
      // Fallback to local quote
      const fallbackQuote = getRandomCoffeeQuote();
      setQuote(fallbackQuote);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
    
    if (autoRefresh && refreshInterval > 0) {
      const interval = setInterval(fetchQuote, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, type]);

  const handleRefresh = () => {
    fetchQuote();
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        {variant === 'card' && (
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        )}
        {variant === 'banner' && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-lg">
            <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-white/20 rounded w-1/2"></div>
          </div>
        )}
        {variant === 'minimal' && (
          <div className="text-center">
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto"></div>
          </div>
        )}
      </div>
    );
  }

  if (error && !quote) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600 mb-2">☕ Oops! Coffee machine is broken</p>
        <button 
          onClick={handleRefresh}
          className="text-red-500 hover:text-red-700 underline text-sm"
        >
          Try again
        </button>
      </div>
    );
  }

  const quoteText = quote?.content || quote?.q || quote?.quote || 'Loading...';
  const authorName = quote?.author || quote?.a || 'Unknown';

  // Card variant
  if (variant === 'card') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-2">☕</span>
              <h3 className="text-lg font-semibold text-gray-800">Coffee Boost</h3>
            </div>
            
            <blockquote className="text-gray-700 text-lg leading-relaxed mb-4 italic">
              "{quoteText}"
            </blockquote>
            
            {showAuthor && authorName && (
              <p className="text-gray-600 text-sm font-medium">
                — {authorName}
              </p>
            )}
            
            {quote?.source && (
              <p className="text-xs text-gray-400 mt-2">
                Source: {quote.source === 'api' ? 'Online' : 'Local'}
              </p>
            )}
          </div>
          
          <button
            onClick={handleRefresh}
            className="ml-4 p-2 text-gray-400 hover:text-amber-500 transition-colors duration-200"
            title="Get new quote"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Banner variant
  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-3xl mr-3">☕</span>
            <div>
              <p className="text-lg font-medium">"{quoteText}"</p>
              {showAuthor && authorName && (
                <p className="text-amber-100 text-sm">— {authorName}</p>
              )}
            </div>
          </div>
          
          <button
            onClick={handleRefresh}
            className="p-2 text-white/70 hover:text-white transition-colors duration-200"
            title="Get new quote"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <div className="text-center py-4">
        <div className="flex items-center justify-center mb-2">
          <span className="text-xl mr-2">☕</span>
          <button
            onClick={handleRefresh}
            className="text-gray-400 hover:text-amber-500 transition-colors duration-200"
            title="Get new quote"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-700 italic text-sm mb-1">"{quoteText}"</p>
        
        {showAuthor && authorName && (
          <p className="text-gray-500 text-xs">— {authorName}</p>
        )}
      </div>
    );
  }

  return null;
};

export default CoffeeBoost;
