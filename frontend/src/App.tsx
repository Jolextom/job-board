import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Search, MapPin, Calendar, Clock, Settings2, ChevronDown, Bell, User2 } from 'lucide-react';
import JobListing from './components/job-listing';




const queryClient = new QueryClient();
// Company logos as components to maintain consistency


function App() {
  const [selectedRole] = useState('Designer');

  return (
    <QueryClientProvider client={queryClient}>
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
            <JobListing />

          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;