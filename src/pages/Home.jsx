import React from 'react';
import HeroSection from '../components/HeroSection';
import { Building2, Users, CheckCircle, TrendingUp } from 'lucide-react';

const Home = () => {
  const features = [
    {
      title: 'Transparent Process',
      description: 'Digital mechanism ensures transparency in beneficiary identification and fund allocation.',
      icon: CheckCircle,
      color: '#0B57A4',
    },
    {
      title: 'Community Empowerment',
      description: 'Direct support to SC communities for education, health, and economic development.',
      icon: Users,
      color: '#2E7D32',
    },
    {
      title: 'Financial Assistance',
      description: 'Grant-in-Aid provided to eligible beneficiaries for various welfare schemes.',
      icon: Building2,
      color: '#1976D2',
    },
    {
      title: 'Progress Tracking',
      description: 'Real-time monitoring and analysis of scheme implementation and impact.',
      icon: TrendingUp,
      color: '#388E3C',
    },
  ];

  return (
    <div>
      <HeroSection />

      {/* About Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            About PM-AJAY GIA Scheme
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            The Pradhan Mantri Anusuchit Jaati Abhyuday Yojana (PM-AJAY) is a comprehensive initiative 
            by the Government of India aimed at the socio-economic upliftment of Scheduled Caste communities. 
            The Grant-in-Aid (GIA) component provides financial support to eligible individuals and 
            organizations working towards education, skill development, healthcare, and economic empowerment 
            of SC communities across the nation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-6 text-center transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className="w-[70px] h-[70px] rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon size={35} style={{ color: feature.color }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Objectives Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Key Objectives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {[
              'Provide financial assistance to SC communities for socio-economic development',
              'Ensure transparent and efficient beneficiary identification process',
              'Facilitate skill development and employment opportunities',
              'Support educational initiatives and scholarship programs',
              'Promote health and sanitation awareness',
              'Enable digital access and financial inclusion',
            ].map((objective, index) => (
              <div
                key={index}
                className="group card p-5 flex items-center gap-4 transition-all duration-300 hover:bg-primary hover:text-white"
              >
                <div
                  className="objective-number min-w-[40px] h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:bg-white group-hover:text-primary"
                >
                  {index + 1}
                </div>
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-white">
                  {objective}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
