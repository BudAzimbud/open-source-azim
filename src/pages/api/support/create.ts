import { NextApiRequest, NextApiResponse } from 'next';

// Interface untuk request body
interface SupportRequest {
  amount: number;
  type: string;
  currency: string;
  paymentMethod?: string;
  name?: string;
  email?: string;
  message?: string;
}

// Interface untuk response
interface SupportResponse {
  success: boolean;
  paymentUrl?: string;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SupportResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { amount, type, currency, paymentMethod, name, email, message }: SupportRequest = req.body;

    // Validasi input
    if (!amount || amount < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount. Minimum $1 required.'
      });
    }

    if (!type || !currency) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.'
      });
    }

    // Simulasi integrasi dengan payment gateway
    // Di sini Anda bisa mengintegrasikan dengan:
    // - Midtrans (Indonesia)
    // - Xendit (Indonesia) 
    // - PayPal
    // - Stripe
    // - QRIS
    // - atau payment gateway lainnya

    // Contoh dengan PayPal (akan perlu konfigurasi PayPal SDK)
    const paymentData = {
      amount: amount,
      currency: currency,
      description: getPaymentDescription(type),
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/support/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/support/cancel`,
      paymentMethod: paymentMethod || 'midtrans',
      customerInfo: {
        name: name || 'Anonymous',
        email: email || '',
        message: message || ''
      }
    };

    // Simulasi create payment URL
    // Ganti dengan implementasi payment gateway yang sebenarnya
    const paymentUrl = await createPaymentUrl(paymentData);

    // Log untuk tracking (opsional)
    console.log('Support payment created with Trakteer API:', {
      amount,
      type,
      currency,
      paymentMethod,
      timestamp: new Date().toISOString(),
      customerInfo: paymentData.customerInfo
    });

    return res.status(200).json({
      success: true,
      paymentUrl: paymentUrl
    });

  } catch (error) {
    console.error('Error creating support payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

function getPaymentDescription(type: string): string {
  switch (type) {
    case 'single-coffee':
      return 'Buy Azim a Single Coffee ☕';
    case 'coffee-boost':
      return 'Buy Azim a Coffee Boost ☕☕☕';
    case 'coffee-snack':
      return 'Buy Azim Coffee + Snack ☕🍰';
    case 'custom':
      return 'Custom Support for Azim ☕';
    default:
      return 'Support Azim\'s Work ☕';
  }
}

async function createPaymentUrl(paymentData: any): Promise<string> {
  // Simulasi payment URL generation
  // Di implementasi nyata, ini akan memanggil API payment gateway
  
  // Untuk Indonesia - Midtrans
  if (paymentData.paymentMethod === 'midtrans') {
    // Implementasi Midtrans
    return await createMidtransPayment(paymentData);
  }
  
  // QRIS Indonesia
  if (paymentData.paymentMethod === 'qris') {
    // Implementasi QRIS via Midtrans atau Xendit
    return await createQRISPayment(paymentData);
  }
  
  // E-Wallet Indonesia via Xendit
  if (paymentData.paymentMethod === 'xendit') {
    return await createXenditPayment(paymentData);
  }
  
  // PayPal untuk international
  if (paymentData.paymentMethod === 'paypal') {
    return await createPayPalPayment(paymentData);
  }
  
  // Stripe untuk credit card
  if (paymentData.paymentMethod === 'stripe') {
    return await createStripePayment(paymentData);
  }
  
  // Default fallback - Trakteer.id (platform donasi Indonesia yang reliable)
  return `https://trakteer.id/devazim/tip?open=true&quantity=${paymentData.amount}`;
}

// Implementasi Trakteer.id untuk Indonesia
async function createMidtransPayment(paymentData: any): Promise<string> {
  const trakteerApiKey = process.env.TRAKTEER_API_KEY;
  
  if (!trakteerApiKey) {
    // Fallback jika tidak ada API key
    return `https://trakteer.id/devazim/tip?open=true&quantity=${paymentData.amount}`;
  }

  try {
    // Implementasi Trakteer API
    const trakteerData = {
      type: 'tip',
      quantity: paymentData.amount,
      message: paymentData.description || `Coffee support: $${paymentData.amount}`,
      supporter_name: paymentData.customerInfo?.name || 'Anonymous',
      supporter_email: paymentData.customerInfo?.email || ''
    };

    // Panggil Trakteer API untuk create tip
    const response = await fetch('https://api.trakteer.id/v1/tip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${trakteerApiKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(trakteerData)
    });

    if (response.ok) {
      const result = await response.json();
      // Return URL pembayaran dari Trakteer
      return result.payment_url || result.url || `https://trakteer.id/devazim/tip?quantity=${paymentData.amount}`;
    } else {
      console.error('Trakteer API error:', await response.text());
      // Fallback ke URL langsung
      return `https://trakteer.id/devazim/tip?open=true&quantity=${paymentData.amount}`;
    }

  } catch (error) {
    console.error('Trakteer API error:', error);
    // Fallback ke URL langsung Trakteer
    return `https://trakteer.id/devazim/tip?open=true&quantity=${paymentData.amount}`;
  }
}

// Implementasi QRIS Payment via Trakteer
async function createQRISPayment(paymentData: any): Promise<string> {
  const trakteerApiKey = process.env.TRAKTEER_API_KEY;
  
  if (!trakteerApiKey) {
    return `https://trakteer.id/devazim/tip?open=true&quantity=${paymentData.amount}&method=qris`;
  }

  try {
    // Trakteer API untuk QRIS
    const trakteerData = {
      type: 'tip',
      quantity: paymentData.amount,
      message: `QRIS Payment: ${paymentData.description}`,
      supporter_name: paymentData.customerInfo?.name || 'Anonymous',
      supporter_email: paymentData.customerInfo?.email || '',
      payment_method: 'qris'
    };

    const response = await fetch('https://api.trakteer.id/v1/tip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${trakteerApiKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(trakteerData)
    });

    if (response.ok) {
      const result = await response.json();
      return result.payment_url || result.url || `https://trakteer.id/devazim/tip?quantity=${paymentData.amount}`;
    } else {
      // Fallback
      return `https://trakteer.id/devazim/tip?open=true&quantity=${paymentData.amount}&method=qris`;
    }
  } catch (error) {
    console.error('Trakteer QRIS API error:', error);
    return `https://trakteer.id/devazim/tip?open=true&quantity=${paymentData.amount}&method=qris`;
  }
}

// Implementasi Xendit untuk E-Wallet Indonesia
async function createXenditPayment(paymentData: any): Promise<string> {
  // Redirect ke Trakteer yang support OVO, GoPay, Dana, ShopeePay
  return `https://trakteer.id/devazim/tip?open=true&quantity=${paymentData.amount}&method=ewallet`;
}

// Implementasi PayPal
async function createPayPalPayment(paymentData: any): Promise<string> {
  // Ko-fi support PayPal dan lebih reliable
  return `https://ko-fi.com/azim/${paymentData.amount}`;
}

// Implementasi Stripe
async function createStripePayment(paymentData: any): Promise<string> {
  // Buy Me A Coffee support credit card via Stripe
  return `https://www.buymeacoffee.com/azim?amount=${paymentData.amount}`;
}
