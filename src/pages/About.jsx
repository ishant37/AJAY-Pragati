import React, { useState } from 'react';
import { ChevronDown, CheckCircle, Info, User, FileText, Building2 } from 'lucide-react';
import { cn } from '../utils/cn';

const About = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const faqs = [
    {
      question: 'What is PM-AJAY GIA Scheme?',
      answer:
        'PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana) Grant-in-Aid is a central government scheme designed to provide financial assistance to Scheduled Caste communities for their socio-economic development. It aims to promote education, skill development, healthcare, and economic empowerment.',
    },
    {
      question: 'Who is eligible for the scheme?',
      answer:
        'Individuals belonging to Scheduled Caste communities, as recognized by the Government of India, are eligible. Beneficiaries must provide valid caste certificates, income proof, and fulfill specific criteria based on the category of assistance they are applying for (education, healthcare, business, etc.).',
    },
    {
      question: 'How can I apply for the scheme?',
      answer:
        'You can apply through this digital portal by clicking on "Apply as Beneficiary" on the home page. You will need to register with your Aadhaar number, upload required documents, and complete the application form. Enumerators are also available at local offices to assist with the application process.',
    },
    {
      question: 'What documents are required for application?',
      answer:
        'Required documents include: Valid Caste Certificate (SC), Aadhaar Card, Income Certificate, Bank Account Details, Passport Size Photograph, and specific documents based on the category (e.g., admission letter for education, medical reports for healthcare).',
    },
    {
      question: 'How long does the verification process take?',
      answer:
        'The verification process typically takes 15-30 days from the date of application submission. You can track your application status through the dashboard using your application ID. Notifications will be sent via SMS and email at each stage of the process.',
    },
    {
      question: 'How is the fund disbursed?',
      answer:
        'Once your application is approved, funds are directly transferred to your registered bank account through Direct Benefit Transfer (DBT). You will receive a notification with transaction details. Typically, disbursal happens within 7-10 working days after approval.',
    },
  ];

  const eligibilityCriteria = [
    'Must belong to Scheduled Caste community with valid caste certificate',
    'Annual family income should be below ₹2.5 lakhs (varies by state)',
    'Valid Aadhaar card linked to mobile number',
    'Bank account with active status',
    'Age criteria: 18-45 years (may vary based on scheme component)',
    'No previous criminal record or financial default',
  ];

  const benefits = [
    {
      title: 'Education Support',
      description: 'Scholarships, tuition fees, and educational material assistance',
      icon: FileText,
    },
    {
      title: 'Skill Development',
      description: 'Free vocational training and placement assistance programs',
      icon: User,
    },
    {
      title: 'Healthcare Benefits',
      description: 'Medical expense coverage and health insurance support',
      icon: Info,
    },
    {
      title: 'Financial Aid',
      description: 'Business loans, housing assistance, and livelihood support',
      icon: Building2,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            About PM-AJAY GIA Scheme
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive information about the scheme, eligibility, and benefits
          </p>
        </div>

        {/* Scheme Overview */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Scheme Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The Pradhan Mantri Anusuchit Jaati Abhyuday Yojana (PM-AJAY) is an umbrella scheme
            launched by the Ministry of Social Justice and Empowerment, Government of India. The
            Grant-in-Aid (GIA) component focuses on providing direct financial support to individuals
            and organizations working for the welfare of Scheduled Caste communities.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The scheme aims to bridge the socio-economic gap by offering targeted assistance in areas
            such as education, skill development, healthcare, housing, and livelihood generation. This
            digital portal ensures transparency, efficiency, and ease of access in beneficiary
            identification and fund disbursement.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            With a mission to empower every eligible individual from the SC community, PM-AJAY GIA
            represents the government's commitment to inclusive development and social justice.
          </p>
        </div>

        {/* Benefits Section */}
        <h2 className="text-2xl font-semibold mb-6 text-primary">
          Key Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card p-6 flex gap-4 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <benefit.icon className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Eligibility Criteria */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Eligibility Criteria
          </h2>
          <ul className="space-y-4">
            {eligibilityCriteria.map((criteria, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {criteria}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQs Section */}
        <h2 className="text-2xl font-semibold mb-6 text-primary">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 mb-8">
          {faqs.map((faq, index) => (
            <div key={index} className="card overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-base font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200",
                    openAccordion === index && "rotate-180"
                  )}
                />
              </button>
              {openAccordion === index && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="card p-8 bg-gradient-to-br from-primary to-secondary text-white">
          <h2 className="text-2xl font-semibold mb-4">
            Need Help?
          </h2>
          <p className="mb-6 opacity-90">
            For any queries or assistance, please contact:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold mb-1">Helpline Number:</p>
              <p className="opacity-90">1800-XXX-XXXX (Toll-Free)</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Email:</p>
              <p className="opacity-90">support@pmajaygia.gov.in</p>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold mb-1">Office Hours:</p>
              <p className="opacity-90">Monday - Friday: 9:00 AM - 6:00 PM (IST)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
