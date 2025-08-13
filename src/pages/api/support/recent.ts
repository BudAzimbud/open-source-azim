import { NextApiRequest, NextApiResponse } from 'next';

// Interface untuk supporter data
interface Supporter {
  name?: string;
  initials: string;
  testimonial?: string;
  amount: number;
  date: string;
}

// Interface untuk support stats
interface SupportStats {
  totalCoffees: number;
  allNighters: number;
  bugsFixed: number;
  coffeeShops: number;
}

// Interface untuk response
interface RecentSupportersResponse {
  success: boolean;
  supporters: Supporter[];
  stats: SupportStats;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecentSupportersResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      supporters: [],
      stats: {
        totalCoffees: 0,
        allNighters: 0,
        bugsFixed: 0,
        coffeeShops: 0
      },
      message: 'Method not allowed' 
    });
  }

  try {
    // Simulasi data recent supporters
    // Dalam production, ini akan diambil dari database
    const mockSupporters: Supporter[] = [
      {
        name: "Michael Kurniawan",
        initials: "MK",
        testimonial: "Thanks for the React tutorial! Saved me hours of debugging 🙏",
        amount: 15,
        date: "2025-08-12"
      },
      {
        name: "Sarah Lestari",
        initials: "SL",
        testimonial: "Your Next.js guide was exactly what I needed!",
        amount: 25,
        date: "2025-08-11"
      },
      {
        name: "John Doe",
        initials: "JD",
        testimonial: "Keep up the great work!",
        amount: 5,
        date: "2025-08-10"
      },
      {
        name: "Ahmad Rahman",
        initials: "AR",
        testimonial: "Excellent content as always 👍",
        amount: 15,
        date: "2025-08-09"
      },
      {
        name: "Lisa Chen",
        initials: "LC",
        testimonial: "Your TypeScript article helped me land a job!",
        amount: 50,
        date: "2025-08-08"
      },
      {
        initials: "DS",
        amount: 10,
        date: "2025-08-07"
      },
      {
        name: "Budi Santoso",
        initials: "BS",
        testimonial: "Simple and clear explanations. Love it!",
        amount: 15,
        date: "2025-08-06"
      }
    ];

    // Mock stats - dalam production akan dihitung dari database
    const mockStats: SupportStats = {
      totalCoffees: 387, // Updated dengan data baru
      allNighters: 52,
      bugsFixed: 1347,
      coffeeShops: 28
    };

    // Dalam production, Anda bisa:
    // 1. Query database untuk recent supporters
    // 2. Calculate stats dari database
    // 3. Cache hasil untuk performance
    // 4. Filter data sensitive sebelum return

    // Log untuk monitoring (opsional)
    console.log('Recent supporters fetched:', {
      count: mockSupporters.length,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      supporters: mockSupporters,
      stats: mockStats
    });

  } catch (error) {
    console.error('Error fetching recent supporters:', error);
    
    // Return fallback data jika error
    return res.status(500).json({
      success: false,
      supporters: [
        {
          name: "Michael K.",
          initials: "MK",
          testimonial: "Thanks for the tutorial!",
          amount: 15,
          date: "2025-08-12"
        }
      ],
      stats: {
        totalCoffees: 342,
        allNighters: 47,
        bugsFixed: 1284,
        coffeeShops: 23
      },
      message: 'Error fetching data, showing cached results'
    });
  }
}
