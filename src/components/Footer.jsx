import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin} from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-base-200 border-t border-base-300 mt-20">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold text-primary mb-4">Blogger</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Sharing knowledge and insights about technology, programming, and web development.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="text-gray-500 hover:text-primary transition">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-primary transition">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-primary transition">
                                <FaGithub size={20} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-primary transition">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-500 hover:text-primary transition">Home</Link></li>
                            <li><Link to="/categories" className="text-gray-500 hover:text-primary transition">Categories</Link></li>
                            <li><Link to="/about" className="text-gray-500 hover:text-primary transition">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-500 hover:text-primary transition">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary transition">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary transition">Cookie Policy</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary transition">Help Center</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
                        <p className="text-gray-500 text-sm mb-3">
                            Subscribe to get latest updates.
                        </p>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                className="input input-sm input-bordered rounded-r-none w-full"
                            />
                            <button className="btn btn-primary btn-sm rounded-l-none">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-base-300 pt-6 text-center text-gray-500 text-sm">
                    <p className="flex items-center justify-center gap-1 flex-wrap">
                        © {currentYear} Blogger. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;