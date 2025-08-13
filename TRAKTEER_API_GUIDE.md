# Trakteer.id API Integration Guide

## Setup Trakteer.id API

### 1. Dapatkan API Key
- Login ke [Trakteer.id](https://trakteer.id)
- Masuk ke Dashboard Creator
- Buka menu "API & Developer"
- Copy API Key Anda: `trapi-4lCo6kl10uGCR0g9lVWE4grk`

### 2. Konfigurasi Environment
```bash
# Tambahkan ke .env.local
TRAKTEER_API_KEY=trapi-4lCo6kl10uGCR0g9lVWE4grk
```

### 3. API Endpoints Trakteer

#### Create Tip
```javascript
POST https://api.trakteer.id/v1/tip
Headers:
  Content-Type: application/json
  Authorization: Bearer trapi-4lCo6kl10uGCR0g9lVWE4grk
  Accept: application/json

Body:
{
  "type": "tip",
  "quantity": 5,
  "message": "Thanks for the tutorial!",
  "supporter_name": "John Doe",
  "supporter_email": "john@example.com",
  "payment_method": "qris" // optional: qris, gopay, ovo, dana
}

Response:
{
  "status": "success",
  "data": {
    "tip_id": "tip_123456",
    "payment_url": "https://trakteer.id/devazim/pay/tip_123456",
    "amount": 5,
    "currency": "USD"
  }
}
```

#### Get Tips List
```javascript
GET https://api.trakteer.id/v1/tips
Headers:
  Authorization: Bearer trapi-4lCo6kl10uGCR0g9lVWE4grk
  Accept: application/json

Response:
{
  "status": "success",
  "data": {
    "tips": [
      {
        "id": "tip_123456",
        "amount": 5,
        "message": "Thanks!",
        "supporter_name": "John Doe",
        "created_at": "2025-08-13T10:30:00Z",
        "status": "paid"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 1,
      "total_items": 1
    }
  }
}
```

## Implementation Notes

### 1. Payment Methods yang Didukung
- QRIS (Universal QR Code)
- GoPay
- OVO
- DANA
- ShopeePay
- Bank Transfer
- Virtual Account

### 2. Currency
- Trakteer menggunakan USD untuk international
- Otomatis convert ke IDR untuk pembayaran lokal

### 3. Webhook (Optional)
Setup webhook untuk receive payment notifications:
```javascript
POST https://your-app.com/api/webhook/trakteer
Headers:
  X-Trakteer-Signature: sha256_signature

Body:
{
  "event": "tip.paid",
  "data": {
    "tip_id": "tip_123456",
    "amount": 5,
    "supporter_name": "John Doe",
    "message": "Thanks!",
    "paid_at": "2025-08-13T10:35:00Z"
  }
}
```

### 4. Error Handling
- Selalu sediakan fallback URL jika API gagal
- Log error untuk debugging
- Tampilkan pesan error yang user-friendly

### 5. Testing
- Gunakan sandbox mode untuk development
- Test dengan amount kecil untuk production
- Verify webhook dengan test transactions

## Security Best Practices

1. **API Key Protection**
   - Jangan commit API key ke repository
   - Gunakan environment variables
   - Rotate API key secara berkala

2. **Input Validation**
   - Validate amount (minimum $1)
   - Sanitize user input
   - Check payment method validity

3. **Rate Limiting**
   - Implement rate limiting untuk API calls
   - Monitor unusual activity
   - Set reasonable timeout

## Monitoring & Analytics

### Payment Success Rate
```javascript
const successRate = (successfulPayments / totalAttempts) * 100;
console.log(`Payment success rate: ${successRate}%`);
```

### Popular Payment Methods
```javascript
const paymentStats = {
  qris: 45,
  gopay: 25,
  ovo: 15,
  bank_transfer: 15
};
```

## Troubleshooting

### Common Issues
1. **API Key tidak valid**: Periksa format dan expiry
2. **Payment URL tidak terbuka**: Check browser popup blocker
3. **Amount validation error**: Pastikan minimum $1
4. **Network timeout**: Implement retry mechanism

### Debug Tips
```javascript
// Enable debug logging
console.log('Trakteer API Request:', {
  url: 'https://api.trakteer.id/v1/tip',
  headers: headers,
  body: JSON.stringify(data)
});
```

## Support
- Trakteer Support: support@trakteer.id
- API Documentation: https://docs.trakteer.id
- Developer Community: https://discord.gg/trakteer
