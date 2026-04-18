import { FaUserTie, FaRocket, FaHeart, FaNewspaper, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaGithub, FaTwitter, FaLinkedin,FaQuoteLeft  } from "react-icons/fa";
import { useEffect } from "react";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      },[])
    const stats = [
        { id: 1, value: "500+", label: "Blog Posts", icon: FaNewspaper },
        { id: 2, value: "50K+", label: "Monthly Readers", icon: FaUsers },
        { id: 3, value: "3+", label: "Years of Excellence", icon: FaCalendarAlt },
    ];

    const team = [
        {
            id: 1,
            name: "Ali Raza",
            role: "Founder & Editor-in-Chief",
            bio: "Tech enthusiast with 10+ years of experience in software development.",
            icon: FaUserTie,
            social: { twitter: "#", github: "#", linkedin: "#" }
        },
        {
            id: 2,
            name: "Sara Khan",
            role: "Senior Writer",
            bio: "Passionate about AI, ML, and emerging technologies.",
            icon: FaUserTie,
            social: { twitter: "#", github: "#", linkedin: "#" }
        },
        {
            id: 3,
            name: "Ahmed Malik",
            role: "Content Strategist",
            bio: "Helping brands tell their stories through engaging content.",
            icon: FaUserTie,
            social: { twitter: "#", github: "#", linkedin: "#" }
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <div className="inline-block p-4 bg-blue-500/10 rounded-full mb-6">
                    <FaRocket className="text-5xl text-blue-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome to <span className="text-blue-500">Blogger</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Where ideas come to life and knowledge meets inspiration. 
                    We're dedicated to bringing you the best content on technology, 
                    lifestyle, and personal growth.
                </p>
            </div>

            {/* Mission Section */}
            <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                        To empower, educate, and inspire our readers through high-quality, 
                        authentic content that makes a difference in their daily lives.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        We believe in the power of storytelling and its ability to connect, 
                        inform, and transform. Every article is crafted with care and expertise.
                    </p>
                    <div className="flex gap-4 mt-6">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                            <FaHeart /> Our Story
                        </button>
                        <button className="px-6 py-2 border border-blue-600 text-blue-500 rounded-lg hover:bg-blue-600/10 transition flex items-center gap-2">
                            <MdEmail /> Contact Us
                        </button>
                    </div>
                </div>
                <div className="bg-linear-to-brrom-blue-500/20 to-purple-500/20 rounded-2xl p-8 text-center">
                    <FaQuoteLeft className="text-4xl text-blue-500 mx-auto mb-4" />
                    <p className="text-lg italic text-gray-300">
                        "The only way to do great work is to love what you do."
                    </p>
                    <p className="mt-4 text-gray-400">— Steve Jobs</p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
                {stats.map((stat) => (
                    <div key={stat.id} className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
                        <stat.icon className="text-4xl text-blue-500 mx-auto mb-3" />
                        <div className="text-3xl font-bold">{stat.value}</div>
                        <div className="text-gray-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Team Section */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member) => (
                        <div key={member.id} className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
                            <div className="w-24 h-24 mx-auto mb-4 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                <member.icon className="text-3xl text-white" />
                            </div>
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-blue-500 text-sm mb-2">{member.role}</p>
                            <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                            <div className="flex justify-center gap-3">
                                <a href={member.social.twitter} className="text-gray-400 hover:text-blue-500 transition">
                                    <FaTwitter />
                                </a>
                                <a href={member.social.github} className="text-gray-400 hover:text-blue-500 transition">
                                    <FaGithub />
                                </a>
                                <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-500 transition">
                                    <FaLinkedin />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Location & Contact */}
            <div className="text-center p-8 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-2xl">
                <MdLocationOn className="text-3xl text-blue-500 mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Based in Pakistan</h3>
                <p className="text-gray-400 mb-4">
                    Serving readers worldwide from the heart of the tech hub.
                </p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Get in Touch
                </button>
            </div>
        </div>
    );
};

export default About;