import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden gradient-bg">
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <div className="text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
                Empowering SC Communities through Targeted GIA Support
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-95 drop-shadow max-w-3xl leading-relaxed">
                The PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana) Grant-in-Aid component 
                provides financial assistance to Scheduled Caste communities for their socio-economic 
                development. This digital portal ensures transparent, efficient, and targeted 
                identification of beneficiaries for inclusive growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary text-lg font-semibold rounded-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                >
                  Apply as Beneficiary
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Login as Enumerator
                </button>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Admin Portal
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:col-span-4">
            <div className="flex items-center justify-center h-full">
              <div className="w-70 h-70 rounded-full bg-white/15 backdrop-blur-lg flex items-center justify-center shadow-2xl animate-float">
                <h2 className="text-5xl font-bold text-white text-center drop-shadow-lg">
                  PM-AJAY
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
