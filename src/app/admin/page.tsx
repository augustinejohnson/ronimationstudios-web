import { db } from '@/lib/db';

async function getStats() {
    const [posts, team, projects] = await Promise.all([
        db.blogPost.count(),
        db.teamMember.count(),
        db.portfolioItem.count(),
    ]);
    return { posts, team, projects };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold font-display">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Total Blog Posts</h3>
                    <p className="text-4xl font-bold font-mono text-white">{stats.posts}</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Team Members</h3>
                    <p className="text-4xl font-bold font-mono text-white">{stats.team}</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <h3 className="text-gray-400 text-sm font-medium mb-2">Portfolio Projects</h3>
                    <p className="text-4xl font-bold font-mono text-white">{stats.projects}</p>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4 font-display">Welcome Back</h2>
                <p className="text-gray-400">
                    Select a section from the sidebar to manage your content.
                </p>
            </div>
        </div>
    );
}
