import React, { useState } from 'react';
import {
  Search,
  BookMarked,
  MapPin,
  Building,
  Clock,
  IndianRupee,
  Sparkles,
  Award,
  BarChartHorizontal,
} from 'lucide-react';

// --- Reusable Components ---

// Card for displaying an available course
const CourseCard = ({ course }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
    <div className="p-6 flex-grow">
      <div className="flex justify-between items-start mb-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
          {course.sector}
        </span>
        {course.isNew && (
           <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
             <Sparkles size={14} /> New
           </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.name}</h3>

      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mt-4">
        <div className="flex items-center gap-3">
          <Building size={16} className="text-gray-400" />
          <span>Training Partner: <span className="font-semibold">{course.partner}</span></span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-gray-400" />
          <span>Location: <span className="font-semibold">{course.location}</span></span>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-gray-400" />
          <span>Duration: <span className="font-semibold">{course.duration}</span></span>
        </div>
        <div className="flex items-center gap-3">
          <IndianRupee size={16} className="text-gray-400" />
          <span>Stipend: <span className="font-semibold text-green-600">{course.stipend}</span></span>
        </div>
      </div>
    </div>
    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
       <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
         Learn More & Apply
       </button>
    </div>
  </div>
);

// Card for displaying an enrolled course with progress
const MyCourseProgressCard = ({ course }) => {
  const isCompleted = course.status === 'Completed';
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex justify-between items-start">
           <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.courseName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Partner: {course.partner}</p>
           </div>
           <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
             {course.status}
           </span>
        </div>
        <div className="mt-6">
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Your Progress</p>
                <p className="text-sm font-bold text-indigo-600">{course.progress}%</p>
            </div>
            <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 transition-all duration-1000 ease-out" style={{ width: `${course.progress}%` }}/>
            </div>
        </div>
        {isCompleted && (
            <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all">
                <Award size={18} /> Download Certificate
            </button>
        )}
    </div>
  )
};

// --- Main Beneficiary Skill Page Component ---
const SkillDevelopment = () => {
  const [activeTab, setActiveTab] = useState('find'); // 'find' or 'my_courses'
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');

  // --- Mock Data for a beneficiary ---
  const myCoursesData = [
    { id: 1, courseName: 'General Duty Assistant', partner: 'Apollo MedSkills', progress: 100, status: 'Completed', certificateLink: '#' },
    { id: 2, courseName: 'Data Entry Operator', partner: 'Skill India Mission', progress: 65, status: 'In Progress' },
  ];

  const availableCoursesData = [
    { id: 1, name: 'Full Stack Web Development', sector: 'IT & ITeS', partner: 'NIIT Foundation', location: 'Jaipur, Rajasthan', duration: '6 Months', stipend: '₹2,000/month', isNew: true },
    { id: 2, name: 'Masonry & Tiling', sector: 'Construction', partner: 'L&T CSTI', location: 'Kota, Rajasthan', duration: '3 Months', stipend: '₹1,500/month', isNew: false },
    { id: 3, name: 'Retail Sales Associate', sector: 'Retail', partner: 'TRRAIN', location: 'Online / Remote', duration: '2 Months', stipend: 'N/A', isNew: false },
    { id: 4, name: 'Phlebotomy Technician', sector: 'Healthcare', partner: 'VIVO Healthcare', location: 'Jodhpur, Rajasthan', duration: '4 Months', stipend: '₹1,500/month', isNew: true },
    { id: 5, name: 'Solar Panel Technician', sector: 'Green Energy', partner: 'Skill Council for Green Jobs', location: 'Bikaner, Rajasthan', duration: '3 Months', stipend: '₹1,800/month', isNew: true },
    { id: 6, name: 'Organic Farming Practitioner', sector: 'Agriculture', partner: 'ASC India', location: 'Udaipur, Rajasthan', duration: '2 Months', stipend: '₹1,000/month', isNew: false },
  ];

  const filteredCourses = availableCoursesData.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || course.partner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'All' || course.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-screen-xl">
        {/* Page Header */}
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Skill Development Opportunities
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Welcome, Priya Sharma! Track your progress and find new courses to build your future.
            </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center border-b border-gray-200 dark:border-gray-700 mb-8">
          <button onClick={() => setActiveTab('find')} className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${activeTab === 'find' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>Find New Courses</button>
          <button onClick={() => setActiveTab('my_courses')} className={`px-6 py-3 text-lg font-semibold transition-colors duration-200 ${activeTab === 'my_courses' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>My Enrolled Courses</button>
        </div>

        {/* Content based on Active Tab */}
        <div>
          {/* FIND NEW COURSES VIEW */}
          {activeTab === 'find' && (
            <div>
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="Search by course or partner..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="input-field pl-10" />
                </div>
                <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)} className="input-field">
                  <option value="All">All Sectors</option>
                  {[...new Set(availableCoursesData.map(c => c.sector))].map(sector => <option key={sector} value={sector}>{sector}</option>)}
                </select>
              </div>

              {/* Course Grid */}
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map(course => <CourseCard key={course.id} course={course} />)}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">No Courses Found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          )}

          {/* MY ENROLLED COURSES VIEW */}
          {activeTab === 'my_courses' && (
            <div>
               <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Your Learning Journey</h2>
               {myCoursesData.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {myCoursesData.map(course => <MyCourseProgressCard key={course.id} course={course} />)}
                  </div>
               ) : (
                <div className="text-center py-16">
                  <BookMarked className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">You are not enrolled in any courses yet.</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Start your journey by finding a new course!</p>
                  <button onClick={() => setActiveTab('find')} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all">Find a Course</button>
                </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillDevelopment;