import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function SupportSuccess() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navigation />
      
      <div className="container mx-auto px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-6xl mb-4">☕</div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            Terima Kasih! 🙏
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Support Anda sangat berarti untuk saya! Dengan bantuan Anda, saya bisa terus membuat konten yang bermanfaat dan mengembangkan proyek-proyek open source.
          </p>

          {/* Coffee Animation */}
          <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <div className="text-4xl mb-4 animate-bounce">☕</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Kopi Sedang Diseduh...
            </h3>
            <p className="text-gray-600">
              Payment Anda sedang diproses. Anda akan menerima konfirmasi melalui email jika sudah memasukkan alamat email.
            </p>
          </div>

          {/* What's Next */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/80 p-6 rounded-2xl">
              <div className="text-3xl mb-3">📝</div>
              <h4 className="font-semibold text-gray-900 mb-2">Konten Baru</h4>
              <p className="text-gray-600 text-sm">
                Dukungan Anda akan membantu saya membuat artikel dan tutorial yang lebih berkualitas
              </p>
            </div>
            
            <div className="bg-white/80 p-6 rounded-2xl">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="font-semibold text-gray-900 mb-2">Proyek Open Source</h4>
              <p className="text-gray-600 text-sm">
                Lebih banyak tools dan library gratis yang bisa digunakan oleh developer lain
              </p>
            </div>
          </div>

          {/* Social Share */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Bantu Sebarkan ke Developer Lain! 
            </h3>
            <p className="text-blue-100 mb-6">
              Jika konten saya bermanfaat, share ke teman-teman developer lainnya
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => window.open('https://twitter.com/intent/tweet?text=Just supported @azim_dev for his amazing content! Check out his tutorials 🚀&url=https://azim.dev', '_blank')}
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-colors"
              >
                Share di Twitter 🐦
              </button>
              <button 
                onClick={() => window.open('https://www.linkedin.com/sharing/share-offsite/?url=https://azim.dev', '_blank')}
                className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-colors"
              >
                Share di LinkedIn 💼
              </button>
            </div>
          </div>

          {/* Redirect Notice */}
          <div className="bg-white/60 p-6 rounded-2xl">
            <p className="text-gray-600">
              Anda akan otomatis kembali ke halaman utama dalam <span className="font-semibold text-blue-600">{countdown}</span> detik
            </p>
            <button 
              onClick={() => router.push('/')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
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
