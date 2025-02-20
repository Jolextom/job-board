import { useState } from 'react';
import { Search, MapPin, Calendar, Clock, Settings2, ChevronDown, BookmarkPlus, Bell, User2 } from 'lucide-react';

// Company logos as components to maintain consistency
const CompanyLogo = ({ company }: { company: string }) => {
  const logos: Record<string, string> = {
    'Amazon': 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
    'Google': 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    'Dribbble': 'https://upload.wikimedia.org/wikipedia/commons/3/32/Dribbble_logo.svg',
    'Twitter': 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg',
    'Airbnb': 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',
    'Apple': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
  };

  return (
    <img
      src={logos[company]}
      alt={`${company} logo`}
      className="w-6 h-6 object-contain"
    />
  );
};

const JobCard = ({
  company,
  position,
  location,
  date,
  salary,
  tags,
  backgroundColor
}: {
  company: string;
  position: string;
  location: string;
  date: string;
  salary: string;
  tags: string[];
  backgroundColor: string;
}) => (
  <div className={`rounded-xl p-6 ${backgroundColor} mb-4`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="text-sm text-gray-600 mb-1">{date}</div>
        <div className="flex items-center gap-2 mb-2">
          <CompanyLogo company={company} />
          <span className="font-medium">{company}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{position}</h3>
      </div>
      <BookmarkPlus className="w-5 h-5 text-gray-400" />
    </div>

    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 rounded-full bg-white/90 text-sm">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">{location}</div>
        <div className="flex gap-2">
          <span className="font-bold">{salary}</span>
          <button className="px-4 py-1 bg-black text-white rounded-full text-sm">
            Details
          </button>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [selectedRole] = useState('Designer');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="font-bold">LuckyJob</span>
            </div>
            <nav className="flex space-x-6">
              <a href="#" className="border-b-2 border-white">Find job</a>
              <a href="#" className="text-gray-400">Messages</a>
              <a href="#" className="text-gray-400">Hiring</a>
              <a href="#" className="text-gray-400">Community</a>
              <a href="#" className="text-gray-400">FAQ</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>New York, NY</span>
            </div>
            <Settings2 className="w-5 h-5" />
            <Bell className="w-5 h-5" />
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Search Filters */}
      <div className="bg-black text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex space-x-4">
          <div className="flex items-center space-x-2 bg-black/50 px-4 py-2 rounded-full">
            <Search className="w-4 h-4" />
            <span>{selectedRole}</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          <div className="flex items-center space-x-2 bg-black/50 px-4 py-2 rounded-full">
            <MapPin className="w-4 h-4" />
            <span>Work location</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          <div className="flex items-center space-x-2 bg-black/50 px-4 py-2 rounded-full">
            <Calendar className="w-4 h-4" />
            <span>Experience</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          <div className="flex items-center space-x-2 bg-black/50 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4" />
            <span>Per month</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="text-sm">
              Salary range
              <span className="ml-4">$1,200 - $20,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-72">
            <div className="bg-black text-white rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold mb-2">Get Your best profession with LuckyJob</h2>
              <button className="bg-blue-400 text-white px-4 py-2 rounded-full mt-4">
                Learn more
              </button>
            </div>

            <div>
              <h3 className="font-bold mb-4 flex items-center justify-between">
                Filters
                <ChevronDown className="w-4 h-4" />
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm text-gray-500 mb-2">Working schedule</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Full time</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Part time</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Internship</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 mb-2">Employment type</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Full day</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Flexible schedule</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Shift work</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                Recommended jobs
                <span className="ml-2 text-sm bg-gray-200 px-2 py-1 rounded-full">386</span>
              </h2>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500">Sort by:</span>
                <span className="font-medium">Last updated</span>
                <Settings2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-4">
              <JobCard
                company="Amazon"
                position="Senior UI/UX Designer"
                location="San Francisco, CA"
                date="20 May, 2023"
                salary="$250/hr"
                tags={['Part time', 'Senior level', 'Distant', 'Project work']}
                backgroundColor="bg-orange-100"
              />

              <JobCard
                company="Google"
                position="Junior UI/UX Designer"
                location="California, CA"
                date="4 Feb, 2023"
                salary="$150/hr"
                tags={['Full time', 'Junior level', 'Distant', 'Project work', 'Flexible Schedule']}
                backgroundColor="bg-green-100"
              />

              <JobCard
                company="Dribbble"
                position="Senior Motion Designer"
                location="New York, NY"
                date="29 Jan, 2023"
                salary="$260/hr"
                tags={['Part time', 'Senior level', 'Full Day', 'Shift work']}
                backgroundColor="bg-purple-100"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;