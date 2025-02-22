import { Settings2, BookmarkPlus } from 'lucide-react';
import { useJobs } from "../hooks/useJobs";

const JobListing = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error
    } = useJobs();

    if (isLoading) return <p>Loading jobs...</p>;
    if (error) return <p>Error loading jobs</p>;

    const jobList = data?.pages.flatMap(page => page.data.jobs) || [];
    const totalJobs = data?.pages[0]?.data.totalJobs || 0;


    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                    Recommended jobs
                    <span className="ml-2 text-sm bg-gray-200 px-2 py-1 rounded-full">{totalJobs}</span>
                </h2>
                <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-500">Sort by:</span>
                    <span className="font-medium">Last updated</span>
                    <Settings2 className="w-4 h-4" />
                </div>
            </div>

            <div className="space-y-4">
                {jobList.map((job) => (
                    <JobCard
                        key={job.id}
                        company="Amazon"
                        position={job.title}
                        location="San Francisco, CA"
                        date="20 May, 2023"
                        salary={job.budget}
                        tags={['Part time', 'Senior level', 'Distant', 'Project work']}
                        backgroundColor="bg-orange-100"
                    />
                ))}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-4 py-2 bg-black text-white rounded-lg"
                    >
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                    </button>
                </div>
            )}
        </div>
    );
};




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

export default JobListing


