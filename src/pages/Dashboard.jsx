import React, { useState } from 'react';
import { Search, User, Building2, CheckCircle, MessageSquare, RefreshCw, Eye, X, Phone, Mail, MapPin, Calendar, FileText, CreditCard } from 'lucide-react';
import OverviewCard from '../components/OverviewCard';
import { cn } from '../utils/cn';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const overviewData = [
    {
      title: 'Total Beneficiaries',
      value: '45,678',
      icon: User,
      color: '#0B57A4',
      subtitle: '+12% from last month',
    },
    {
      title: 'Pending Verifications',
      value: '1,234',
      icon: MessageSquare,
      color: '#F59E0B',
      subtitle: 'Requires action',
    },
    {
      title: 'Funds Disbursed',
      value: '₹124.5 Cr',
      icon: Building2,
      color: '#2E7D32',
      subtitle: 'Current fiscal year',
    },
    {
      title: 'Grievances Resolved',
      value: '98.5%',
      icon: CheckCircle,
      color: '#1976D2',
      subtitle: '2,456 of 2,493',
    },
  ];

  const recentActivities = [
    {
      id: 'BEN-2024-001',
      name: 'Rajesh Kumar',
      district: 'Delhi',
      status: 'Approved',
      amount: '₹50,000',
      date: '2024-10-08',
      type: 'Education',
      fullDetails: {
        fullName: 'Rajesh Kumar Singh',
        dob: '15/06/1995',
        gender: 'Male',
        aadhaar: 'XXXX-XXXX-4521',
        mobile: '+91 98765-43210',
        email: 'rajesh.kumar@email.com',
        photograph: 'https://via.placeholder.com/150',
        address: 'House No. 45, Sector 12, Rohini, Delhi - 110085',
        caste: 'Scheduled Caste',
        income: '₹1,80,000/year',
        bankAccount: 'SBI - XXXX4521',
        ifsc: 'SBIN0001234'
      }
    },
    {
      id: 'BEN-2024-002',
      name: 'Priya Sharma',
      district: 'Mumbai',
      status: 'Pending',
      amount: '₹75,000',
      date: '2024-10-09',
      type: 'Skill Development',
      fullDetails: {
        fullName: 'Priya Sharma',
        dob: '22/03/1998',
        gender: 'Female',
        aadhaar: 'XXXX-XXXX-7823',
        mobile: '+91 87654-32109',
        email: 'priya.sharma@email.com',
        photograph: 'https://via.placeholder.com/150',
        address: 'Flat 302, Andheri West, Mumbai - 400053',
        caste: 'Scheduled Caste',
        income: '₹2,20,000/year',
        bankAccount: 'HDFC - XXXX7823',
        ifsc: 'HDFC0001234'
      }
    },
    {
      id: 'BEN-2024-003',
      name: 'Amit Patel',
      district: 'Ahmedabad',
      status: 'Approved',
      amount: '₹60,000',
      date: '2024-10-10',
      type: 'Healthcare',
      fullDetails: {
        fullName: 'Amit Ramesh Patel',
        dob: '10/11/1992',
        gender: 'Male',
        aadhaar: 'XXXX-XXXX-9012',
        mobile: '+91 76543-21098',
        email: 'amit.patel@email.com',
        photograph: 'https://via.placeholder.com/150',
        address: 'B-12, Satellite Road, Ahmedabad - 380015',
        caste: 'Scheduled Caste',
        income: '₹1,95,000/year',
        bankAccount: 'ICICI - XXXX9012',
        ifsc: 'ICIC0001234'
      }
    },
    {
      id: 'BEN-2024-004',
      name: 'Sunita Devi',
      district: 'Patna',
      status: 'Under Review',
      amount: '₹45,000',
      date: '2024-10-10',
      type: 'Business',
      fullDetails: {
        fullName: 'Sunita Devi',
        dob: '05/08/1990',
        gender: 'Female',
        aadhaar: 'XXXX-XXXX-3456',
        mobile: '+91 65432-10987',
        email: 'sunita.devi@email.com',
        photograph: 'https://via.placeholder.com/150',
        address: 'Ward No. 15, Kankarbagh, Patna - 800020',
        caste: 'Scheduled Caste',
        income: '₹1,50,000/year',
        bankAccount: 'PNB - XXXX3456',
        ifsc: 'PUNB0012340'
      }
    },
    {
      id: 'BEN-2024-005',
      name: 'Rahul Singh',
      district: 'Lucknow',
      status: 'Approved',
      amount: '₹55,000',
      date: '2024-10-11',
      type: 'Education',
      fullDetails: {
        fullName: 'Rahul Singh Chauhan',
        dob: '18/12/1996',
        gender: 'Male',
        aadhaar: 'XXXX-XXXX-6789',
        mobile: '+91 54321-09876',
        email: 'rahul.singh@email.com',
        photograph: 'https://via.placeholder.com/150',
        address: 'Gomti Nagar, Lucknow - 226010',
        caste: 'Scheduled Caste',
        income: '₹2,00,000/year',
        bankAccount: 'BOB - XXXX6789',
        ifsc: 'BARB0123456'
      }
    },
    {
      id: 'BEN-2024-006',
      name: 'Kavita Rani',
      district: 'Jaipur',
      status: 'Rejected',
      amount: '₹40,000',
      date: '2024-10-11',
      type: 'Housing',
      fullDetails: {
        fullName: 'Kavita Rani Meena',
        dob: '28/09/1994',
        gender: 'Female',
        aadhaar: 'XXXX-XXXX-2345',
        mobile: '+91 43210-98765',
        email: 'kavita.rani@email.com',
        photograph: 'https://via.placeholder.com/150',
        address: 'Malviya Nagar, Jaipur - 302017',
        caste: 'Scheduled Caste',
        income: '₹2,50,000/year',
        bankAccount: 'Axis - XXXX2345',
        ifsc: 'UTIB0001234'
      }
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const handleViewDetails = (activity) => {
    setSelectedBeneficiary(activity);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBeneficiary(null);
  };

  const filteredActivities = recentActivities.filter((activity) => {
    const matchesSearch =
      activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.district.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor beneficiary registrations, verifications, and fund disbursements
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewData.map((data, index) => (
            <OverviewCard key={index} {...data} />
          ))}
        </div>

        {/* Recent Activities Section */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <button
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all hover:rotate-180 duration-500"
              aria-label="refresh"
            >
              <RefreshCw size={24} />
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID, or district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Activity Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Beneficiary ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredActivities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {activity.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {activity.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {activity.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {activity.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400">
                      {activity.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {activity.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        getStatusColor(activity.status)
                      )}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleViewDetails(activity)}
                        className="p-1 text-primary hover:bg-primary/10 rounded transition-colors"
                        aria-label="view details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No activities found matching your search criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Beneficiary Profile Modal */}
      {showModal && selectedBeneficiary && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-xl">
              <div>
                <h2 className="text-2xl font-bold">Beneficiary Profile</h2>
                <p className="text-blue-200 text-sm mt-1">
                  ID: {selectedBeneficiary.id}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Profile Information Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Photograph */}
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-600 mb-4 shadow-lg">
                    <img
                      src={selectedBeneficiary.fullDetails.photograph}
                      alt={selectedBeneficiary.fullDetails.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                    {selectedBeneficiary.fullDetails.fullName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {selectedBeneficiary.type} Beneficiary
                  </p>
                </div>

                {/* Personal Details */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-blue-600 pb-2">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                          Date of Birth
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedBeneficiary.fullDetails.dob}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <User className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                          Gender
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedBeneficiary.fullDetails.gender}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <CreditCard className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                          Aadhaar Number
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedBeneficiary.fullDetails.aadhaar}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                          Caste Category
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedBeneficiary.fullDetails.caste}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-blue-600 pb-2">
                  Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        Mobile Number
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedBeneficiary.fullDetails.mobile}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        Email ID
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white break-all">
                        {selectedBeneficiary.fullDetails.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg md:col-span-2 lg:col-span-1">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        Address
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedBeneficiary.fullDetails.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-blue-600 pb-2">
                  Financial Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        Annual Income
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedBeneficiary.fullDetails.income}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        Bank Account
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedBeneficiary.fullDetails.bankAccount}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        IFSC Code
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedBeneficiary.fullDetails.ifsc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scheme Status */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4 rounded-lg border border-blue-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                      Scheme Type
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {selectedBeneficiary.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                      Benefit Amount
                    </p>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400">
                      {selectedBeneficiary.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                      Application Date
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {selectedBeneficiary.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">
                      Status
                    </p>
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold",
                      getStatusColor(selectedBeneficiary.status)
                    )}>
                      {selectedBeneficiary.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-b-xl border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
