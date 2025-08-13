import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function SupportCancel() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    // Countdown untuk redirect ke home
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50">
      <Navigation />
      
      <div className="container mx-auto px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Cancel Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="text-6xl mb-4">😔</div>
          </div>

          {/* Cancel Message */}
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Payment Dibatalkan
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Tidak apa-apa! Dukungan Anda dalam bentuk apapun sudah sangat berarti. 
            Ada banyak cara lain untuk mendukung karya saya.
          </p>

          {/* Alternative Support Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-3">🐦</div>
              <h4 className="font-semibold text-gray-900 mb-2">Share Konten</h4>
              <p className="text-gray-600 text-sm mb-4">
                Bantu sebarkan artikel atau tutorial yang bermanfaat ke media sosial
              </p>
              <button 
                onClick={() => window.open('https://twitter.com/intent/tweet?text=Check out this amazing tutorial by @azim_dev 🚀&url=https://azim.dev', '_blank')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Tweet Sekarang
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-3">⭐</div>
              <h4 className="font-semibold text-gray-900 mb-2">Star di GitHub</h4>
              <p className="text-gray-600 text-sm mb-4">
                Berikan star pada repository yang Anda gunakan dan bermanfaat
              </p>
              <button 
                onClick={() => window.open('https://github.com/BudAzimbud', '_blank')}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Visit GitHub
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-3">💬</div>
              <h4 className="font-semibold text-gray-900 mb-2">Feedback</h4>
              <p className="text-gray-600 text-sm mb-4">
                Kasih saran konten apa yang ingin Anda baca selanjutnya
              </p>
              <button 
                onClick={() => router.push('/#contact')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Kirim Feedback
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-3">💼</div>
              <h4 className="font-semibold text-gray-900 mb-2">Hire Me</h4>
              <p className="text-gray-600 text-sm mb-4">
                Cara terbaik mendukung adalah bekerja sama dalam proyek
              </p>
              <button 
                onClick={() => router.push('/#contact')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Let's Work Together
              </button>
            </div>
          </div>

          {/* Try Again */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-8 text-white mb-8">
            <h3 className="text-2xl font-semibold mb-4">
              Ingin Coba Lagi? ☕
            </h3>
            <p className="text-amber-100 mb-6">
              Jika ada masalah teknis atau ingin mencoba metode pembayaran lain
            </p>
            <button 
              onClick={() => router.push('/#coffee')}
              className="bg-white text-orange-600 px-8 py-3 rounded-xl font-medium hover:bg-orange-50 transition-colors"
            >
              Coba Support Lagi
            </button>
          </div>

          {/* Stats to Show Impact */}
          <div className="bg-white/80 p-6 rounded-2xl mb-8">
            <h4 className="font-semibold text-gray-900 mb-4">
              Dampak Dukungan Community (Tanpa Anda pun Amazing! 🚀)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-light text-blue-600">342</div>
                <div className="text-gray-600 text-sm">Articles Published</div>
              </div>
              <div>
                <div className="text-2xl font-light text-green-600">47</div>
                <div className="text-gray-600 text-sm">Open Source Projects</div>
              </div>
              <div>
                <div className="text-2xl font-light text-purple-600">1,284</div>
                <div className="text-gray-600 text-sm">Developers Helped</div>
              </div>
              <div>
                <div className="text-2xl font-light text-orange-600">23</div>
                <div className="text-gray-600 text-sm">Code Reviews</div>
              </div>
            </div>
          </div>

          {/* Redirect Notice */}
          <div className="bg-white/60 p-6 rounded-2xl">
            <p className="text-gray-600 mb-4">
              Terima kasih sudah mengunjungi halaman ini! Dukungan dalam bentuk apapun sangat berarti.
            </p>
            <p className="text-gray-600 mb-4">
              Anda akan otomatis kembali ke halaman utama dalam <span className="font-semibold text-blue-600">{countdown}</span> detik
            </p>
            <button 
              onClick={() => router.push('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              Kembali ke Home Sekarang
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
