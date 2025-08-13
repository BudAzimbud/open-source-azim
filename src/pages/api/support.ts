import { NextApiRequest, NextApiResponse } from 'next';

// Mock database - dalam production, gunakan database sesungguhnya
interface Support {
  id: string;
  name: string;
  amount: number;
  message?: string;
  email?: string;
  timestamp: string;
  paymentMethod: 'stripe' | 'paypal' | 'other';
  status: 'pending' | 'completed' | 'failed';
}

// Simulasi database in-memory (dalam production gunakan database real)
let supports: Support[] = [
  {
    id: '1',
    name: 'Mike K.',
    amount: 15,
    message: 'Thanks for the React tutorial!',
    email: 'mike@example.com',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    paymentMethod: 'stripe',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Sarah L.',
    amount: 5,
    message: 'Great content, keep it up!',
    email: 'sarah@example.com',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    paymentMethod: 'paypal',
    status: 'completed'
  },
  {
    id: '3',
    name: 'John D.',
    amount: 25,
    message: 'Saved me hours of debugging',
    email: 'john@example.com',
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    paymentMethod: 'stripe',
    status: 'completed'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get recent supporters
      try {
        const recentSupports = supports
          .filter(support => support.status === 'completed')
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 10); // Get last 10 supporters

        const stats = {
          totalSupports: supports.filter(s => s.status === 'completed').length,
          totalAmount: supports
            .filter(s => s.status === 'completed')
            .reduce((sum, s) => sum + s.amount, 0),
          thisMonth: supports
            .filter(s => {
              const supportDate = new Date(s.timestamp);
              const now = new Date();
              return supportDate.getMonth() === now.getMonth() && 
                     supportDate.getFullYear() === now.getFullYear() &&
                     s.status === 'completed';
            }).length
        };

        res.status(200).json({
          success: true,
          data: {
            recentSupports,
            stats
          }
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch supports'
        });
      }
      break;

    case 'POST':
      // Create new support/donation
      try {
        const { name, amount, message, email, paymentMethod } = req.body;

        // Validasi input
        if (!name || !amount || amount < 1) {
          return res.status(400).json({
            success: false,
            error: 'Name and valid amount are required'
          });
        }

        if (!paymentMethod || !['stripe', 'paypal', 'other'].includes(paymentMethod)) {
          return res.status(400).json({
            success: false,
            error: 'Valid payment method is required'
          });
        }

        // Buat support baru
        const newSupport: Support = {
          id: Date.now().toString(),
          name: name.length > 20 ? name.substring(0, 20) + '...' : name,
          amount: parseFloat(amount),
          message: message || '',
          email: email || '',
          timestamp: new Date().toISOString(),
          paymentMethod,
          status: 'pending' // Akan diupdate setelah payment confirmation
        };

        supports.push(newSupport);

        // Simulasi payment processing
        // Dalam production, integrasikan dengan Stripe/PayPal API
        setTimeout(() => {
          const supportIndex = supports.findIndex(s => s.id === newSupport.id);
          if (supportIndex !== -1) {
            supports[supportIndex].status = 'completed';
          }
        }, 2000); // Simulasi 2 detik processing time

        res.status(201).json({
          success: true,
          data: {
            supportId: newSupport.id,
            status: 'pending',
            message: 'Payment is being processed'
          }
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to create support'
        });
      }
      break;

    case 'PUT':
      // Update support status (untuk webhook dari payment gateway)
      try {
        const { supportId, status, transactionId } = req.body;

        const supportIndex = supports.findIndex(s => s.id === supportId);
        if (supportIndex === -1) {
          return res.status(404).json({
            success: false,
            error: 'Support not found'
          });
        }

        supports[supportIndex].status = status;
        
        res.status(200).json({
          success: true,
          data: supports[supportIndex]
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to update support'
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
