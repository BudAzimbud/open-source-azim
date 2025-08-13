// Coffee Boost API Integration
// Using Quotable API for motivational quotes

export interface CoffeeBoost {
  id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
}

export interface ZenQuote {
  q: string; // quote
  a: string; // author
  h: string; // html content
}

// Quotable API - Free motivational quotes
export const getMotivationalQuote = async (): Promise<CoffeeBoost> => {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=motivational,success,inspirational&minLength=50');
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching motivational quote:', error);
    // Fallback quote
    return {
      id: 'fallback',
      content: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
      tags: ['motivational', 'success'],
      authorSlug: 'steve-jobs',
      length: 52
    };
  }
};

// ZenQuotes API - Alternative free API
export const getZenQuote = async (): Promise<ZenQuote> => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    if (!response.ok) {
      throw new Error('Failed to fetch zen quote');
    }
    const data = await response.json();
    return data[0]; // API returns array with one quote
  } catch (error) {
    console.error('Error fetching zen quote:', error);
    return {
      q: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
      a: 'Winston Churchill',
      h: 'Success is not final, failure is not fatal: it is the courage to continue that counts.'
    };
  }
};

// Programming-specific quotes for developers
export const getProgrammingQuote = async (): Promise<any> => {
  try {
    const response = await fetch('https://programming-quotes-api.herokuapp.com/quotes/random');
    if (!response.ok) {
      throw new Error('Failed to fetch programming quote');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching programming quote:', error);
    return {
      quote: 'Code is like humor. When you have to explain it, it\'s bad.',
      author: 'Cory House'
    };
  }
};

// Daily motivation with different types
export const getDailyCoffeeBoost = async (type: 'motivational' | 'programming' | 'zen' = 'motivational') => {
  switch (type) {
    case 'motivational':
      return await getMotivationalQuote();
    case 'programming':
      return await getProgrammingQuote();
    case 'zen':
      return await getZenQuote();
    default:
      return await getMotivationalQuote();
  }
};

// Coffee-themed quotes (static backup)
export const coffeeQuotes = [
  {
    id: 'coffee-1',
    content: 'Coffee: because adulting is hard.',
    author: 'Anonymous',
    tags: ['coffee', 'humor'],
    type: 'coffee'
  },
  {
    id: 'coffee-2', 
    content: 'Life happens, coffee helps.',
    author: 'Anonymous',
    tags: ['coffee', 'life'],
    type: 'coffee'
  },
  {
    id: 'coffee-3',
    content: 'But first, coffee.',
    author: 'Anonymous',
    tags: ['coffee', 'morning'],
    type: 'coffee'
  },
  {
    id: 'coffee-4',
    content: 'Coffee is a language in itself.',
    author: 'Jackie Chan',
    tags: ['coffee', 'wisdom'],
    type: 'coffee'
  },
  {
    id: 'coffee-5',
    content: 'I have measured out my life with coffee spoons.',
    author: 'T.S. Eliot',
    tags: ['coffee', 'poetry'],
    type: 'coffee'
  }
];

// Get random coffee quote
export const getRandomCoffeeQuote = () => {
  return coffeeQuotes[Math.floor(Math.random() * coffeeQuotes.length)];
};

// Combined coffee boost function
export const getCoffeeBoost = async (includeAPI: boolean = true) => {
  if (includeAPI) {
    try {
      // Try to get online quote first
      const onlineQuote = await getMotivationalQuote();
      return {
        ...onlineQuote,
        source: 'api',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      // Fallback to local coffee quotes
      const localQuote = getRandomCoffeeQuote();
      return {
        ...localQuote,
        source: 'local',
        timestamp: new Date().toISOString()
      };
    }
  } else {
    // Use local quotes only
    const localQuote = getRandomCoffeeQuote();
    return {
      ...localQuote,
      source: 'local',
      timestamp: new Date().toISOString()
    };
  }
};
