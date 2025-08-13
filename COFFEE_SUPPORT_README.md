# Coffee Support Integration

Dokumentasi lengkap untuk implementasi sistem support "Buy Me Coffee" dengan payment gateway Indonesia.

## 🚀 Fitur yang Tersedia

- ✅ **Payment Gateway Indonesia**: Midtrans, Xendit, QRIS
- ✅ **Payment International**: PayPal, Stripe
- ✅ **Multiple Support Options**: Single Coffee ($5), Coffee Boost ($15), Coffee + Snack ($25), Custom Amount
- ✅ **Real-time Supporters Display**: Menampilkan supporter terbaru
- ✅ **Dynamic Stats**: Coffee stats yang update real-time
- ✅ **Success/Cancel Pages**: Halaman konfirmasi setelah payment
- ✅ **Mobile Responsive**: Optimized untuk semua device

## 🛠️ Setup Payment Gateway

### 1. Midtrans (Bank Transfer Indonesia)
```bash
# Daftar di https://midtrans.com
# Dapatkan Server Key dan Client Key
MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key
```

### 2. Xendit (E-Wallet Indonesia)
```bash
# Daftar di https://xendit.co
# Dapatkan Secret Key
XENDIT_SECRET_KEY=your_secret_key
```

### 3. Stripe (Credit Card International)
```bash
# Daftar di https://stripe.com
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 4. PayPal (International)
```bash
# Daftar di https://developer.paypal.com
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
```

## 📁 File Structure

```
src/
├── pages/
│   ├── index.tsx                 # Homepage dengan Coffee Support section
│   ├── api/
│   │   └── support/
│   │       ├── create.ts         # API untuk create payment
│   │       └── recent.ts         # API untuk fetch recent supporters
│   └── support/
│       ├── success.tsx           # Halaman success payment
│       └── cancel.tsx            # Halaman cancel payment
└── components/
    └── SupportForm.tsx           # Form component (opsional)
```

## 🎯 Cara Implementasi

### 1. Install Dependencies
```bash
npm install
# atau
pnpm install
```

### 2. Setup Environment Variables
```bash
# Copy file .env.example ke .env.local
cp .env.example .env.local

# Edit .env.local dengan kredensial payment gateway Anda
```

### 3. Konfigurasi Payment Gateway

#### Untuk Production dengan Midtrans:
```typescript
// Uncomment dan konfigurasi di src/pages/api/support/create.ts
const response = await fetch('https://app.midtrans.com/snap/v1/transactions', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Basic ${Buffer.from(process.env.MIDTRANS_SERVER_KEY + ':').toString('base64')}`
  },
  body: JSON.stringify(snapTransaction)
});
```

#### Untuk Development/Testing:
- Kode saat ini akan redirect ke platform seperti Trakteer.id
- Atau gunakan sandbox/test mode dari payment gateway

## 🔧 Customization

### Mengubah Payment Method Default
```typescript
// Di src/pages/index.tsx, line ~207
paymentMethod: 'midtrans', // Ganti dengan 'xendit', 'paypal', 'stripe', dll
```

### Menambah Payment Gateway Baru
1. Tambahkan opsi di `SupportForm.tsx`:
```typescript
<option value="dana">DANA E-Wallet</option>
```

2. Implementasikan di `create.ts`:
```typescript
if (paymentData.paymentMethod === 'dana') {
  return await createDANAPayment(paymentData);
}
```

### Mengubah Currency
```typescript
// Untuk IDR (Rupiah Indonesia)
body: JSON.stringify({
  amount: amount * 15000, // Convert USD to IDR
  currency: 'IDR',
  // ...
})
```

## 📊 Database Integration (Opsional)

Untuk menyimpan data support secara permanen:

```typescript
// Install Prisma atau database ORM pilihan Anda
npm install prisma @prisma/client

// Schema example (Prisma)
model Support {
  id          String   @id @default(cuid())
  name        String?
  email       String?
  amount      Float
  currency    String   @default("USD")
  paymentMethod String
  message     String?
  status      String   @default("pending")
  createdAt   DateTime @default(now())
}
```

## 🚨 Security Notes

1. **Environment Variables**: Jangan commit file `.env.local` ke repository
2. **API Keys**: Gunakan server-side keys, bukan client-side
3. **Validation**: Selalu validasi input dari frontend
4. **HTTPS**: Gunakan HTTPS untuk production
5. **Webhook**: Implement webhook untuk konfirmasi payment yang aman

## 📱 Testing

### Test Payment Gateway
1. **Midtrans Sandbox**: https://simulator.sandbox.midtrans.com
2. **Stripe Test**: Gunakan test card numbers
3. **PayPal Sandbox**: https://developer.paypal.com/tools/sandbox

### Test Flow
1. Klik tombol coffee support
2. Pilih amount dan payment method
3. Redirect ke payment gateway
4. Complete payment
5. Redirect ke success/cancel page

## 🎨 UI Customization

### Colors
```css
/* Ubah warna tema di Tailwind classes */
bg-amber-500  /* Coffee theme */
bg-blue-600   /* Primary actions */
bg-green-500  /* Success states */
```

### Icons
```jsx
// Ganti emoji coffee dengan icon custom
<div className="text-4xl mb-4">☕</div>
// menjadi
<CoffeeIcon className="w-12 h-12 mb-4" />
```

## 📈 Analytics & Monitoring

Tambahkan tracking untuk monitoring:

```typescript
// Google Analytics event
gtag('event', 'coffee_support', {
  currency: 'USD',
  value: amount,
  payment_method: paymentMethod
});

// Console logging
console.log('Support payment:', {
  amount,
  paymentMethod,
  timestamp: new Date().toISOString()
});
```

## 🤝 Support

Jika ada pertanyaan tentang implementasi:
- Create issue di GitHub repository
- Contact: azim@example.com
- Twitter: @azim_dev

## 📝 License

MIT License - Feel free to use and modify!
