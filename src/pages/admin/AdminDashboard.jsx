import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaNewspaper, FaFolder, FaComments, FaUsers, FaPlus, FaEye } from "react-icons/fa";
import { getAdminPosts } from "../../api/Posts";
import { useGlobalContext } from "../../context/AuthContext";
import useFetchCategories from "../../hooks/UseFetchCategories";
import Loading from "../../components/Loading";


const AdminDashboard = () => {

    const { token } = useGlobalContext();
    const { category } = useFetchCategories();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await getAdminPosts(token, { page: 1, per_page: 100 });
            setPosts(res.data.data);
            setLoading(false);
        };
        fetchPosts();
    }, [token]);

    const stats = [
        { id: 1, name: "Total Posts", value: posts.length, icon: FaNewspaper, color: "text-blue-500", bg: "bg-blue-500/10" },
        { id: 2, name: "Categories", value: category?.length || 0, icon: FaFolder, color: "text-green-500", bg: "bg-green-500/10" },
        { id: 3, name: "Comments", value: "Coming Soon", icon: FaComments, color: "text-yellow-500", bg: "bg-yellow-500/10" },
        { id: 4, name: "Users", value: "Coming Soon", icon: FaUsers, color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    const quickActions = [
        { id: 1, name: "Create New Post", path: "/admin/posts/create", icon: FaPlus, color: "btn-primary" },
        { id: 2, name: "View All Posts", path: "/admin/posts", icon: FaEye, color: "btn-outline" },
    ];

    if (loading) return <Loading/>

    return (
        <div className="p-6">
            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your blog.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.id} className="stat bg-base-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={`${stat.bg} p-3 rounded-full`}>
                                <stat.icon className={`${stat.color} text-2xl`} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-gray-500 text-sm">{stat.name}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {quickActions.map((action) => (
                    <Link key={action.id} to={action.path} className={`btn ${action.color} py-6 text-lg gap-2`}>
                        <action.icon /> {action.name}
                    </Link>
                ))}
            </div>

            {/* Recent Posts */}
            <div className="bg-base-200 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-gray-500">
                                <th>Title</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.slice(0, 5).map((post) => (
                                <tr key={post.id}>
                                    <td className="max-w-xs truncate">{post.title}</td>
                                    <td><span className={`badge ${post.status === 'public' ? 'badge-success' : 'badge-warning'}`}>{post.status}</span></td>
                                    <td>{post.created_at}</td>
                                    <td><Link to={`/admin/posts/edit/${post.slug}`} className="btn btn-xs btn-ghost">Edit</Link></td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr><td colSpan={4} className="text-center text-gray-500 py-8">No posts yet. Create your first post!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;