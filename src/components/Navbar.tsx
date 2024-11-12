import { Disclosure } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation(); // Get the current location
    const pathname = location.pathname || '/'; // Get the pathname

    return (
        <Disclosure as="nav" className="w-64 2xl:min-w-64 xl:min-w-64 lg:min-w-64 h-full rounded-l-xl border-gray-700 border-r-2">
            {({ open }) => (
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Title Section */}
                    <div className="flex items-center justify-center p-8">
                        <Link to="/">
                            <h1 className="text-2xl font-bold">Nakarin</h1>
                        </Link>
                    </div>

                    {/* Navigation Links Section */}
                    <div className="flex-grow flex flex-col justify-evenly py-4 border-gray-700 border-t-2">
                        <Link to="/home" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm dark:before:bg-[#4C757D] before:bg-[#FFA07A] before:duration-300 hover:before:h-20 hover:before:w-64 text-lg ${pathname === '/home' ? 'text-[#FFA07A] border-[#FFA07A] border-l-4 ' : ''} hover:text-gray-100`}>
                            <span className="relative z-10">Home</span>
                        </Link>
                        <Link to="/works" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#4C757D] before:duration-300 hover:before:h-20 hover:before:w-64 hover:before:opacity-80 text-lg ${pathname === '/works' ? 'dark:text-[#B7C9A8] border-[#B7C9A8] border-l-4 ' : ''} hover:text-gray-100`}>
                            <span className="relative z-10">Works</span>
                        </Link>
                        <Link to="/about" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#4C757D] before:duration-300 hover:before:h-20 hover:before:w-64 hover:before:opacity-80 text-lg ${pathname === '/about' ? 'dark:text-[#B7C9A8] border-[#B7C9A8] border-l-4 ' : ''} hover:text-gray-100`}>
                            <span className="relative z-10">About</span>
                        </Link>
                        <Link to="/connect" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#4C757D] before:duration-300 hover:before:h-20 hover:before:w-64 hover:before:opacity-80 text-lg ${pathname === '/connect' ? 'dark:text-[#B7C9A8] border-[#B7C9A8] border-l-4 ' : ''} hover:text-gray-100`}>
                            <span className="relative z-10">Connect</span>
                        </Link>
                        <Link to="/blog" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#4C757D] before:duration-300 hover:before:h-20 hover:before:w-64 hover:before:opacity-80 text-lg ${pathname === '/blog' ? 'dark:text-[#B7C9A8] border-[#B7C9A8] border-l-4 ' : ''} hover:text-gray-100`}>
                            <span className="relative z-10">Blog</span>
                        </Link>
                    </div>

                    {/* Social Media Section */}
                    <div className="py-4">
                        <div className="font-bold pb-5 text-center">Explore</div>
                        <div className="grid grid-cols-2 gap-2 text-left pl-8">
                            <Link to="https://open.spotify.com/artist/7o1NIFsPdL6tkrvb3uZVqx?si=zse4UKVvTOCxreBuO_p6Bg" className="hover:text-[#FFA07A] transition-all duration-150" target="_blank" rel="noopener noreferrer">
                                <span className="hidden xl:inline 2xl:inline lg:inline">Spotify</span>
                                <span className="inline xl:hidden 2xl:hidden lg:hidden">SP</span>
                            </Link>

                            <Link to="https://www.youtube.com/@Nakarin" className="hover:text-[#FFA07A] transition-all duration-150" target="_blank" rel="noopener noreferrer">
                                <span className="hidden xl:inline 2xl:inline lg:inline">YouTube</span>
                                <span className="inline xl:hidden 2xl:hidden lg:hidden">YT</span>
                            </Link>

                            <Link to="https://nakarin.bandcamp.com/" className="hover:text-[#FFA07A] transition-all duration-150" target="_blank" rel="noopener noreferrer">
                                <span className="hidden xl:inline 2xl:inline lg:inline">Bandcamp</span>
                                <span className="inline xl:hidden 2xl:hidden lg:hidden">BC</span>
                            </Link>

                            <Link to="https://x.com/Nakarinn_" className="hover:text-[#FFA07A] transition-all duration-150" target="_blank" rel="noopener noreferrer">
                                <span className="hidden xl:inline 2xl:inline lg:inline">Twitter</span>
                                <span className="inline xl:hidden 2xl:hidden lg:hidden">X</span>
                            </Link>

                            <Link to="https://soundcloud.com/nakarin" className="hover:text-[#FFA07A] transition-all duration-150" target="_blank" rel="noopener noreferrer">
                                <span className="hidden xl:inline 2xl:inline lg:inline">Soundcloud</span>
                                <span className="inline xl:hidden 2xl:hidden lg:hidden">SC</span>
                            </Link>

                            <Link to="https://linktr.ee/nakarin_" className="hover:text-[#FFA07A] transition-all duration-150" target="_blank" rel="noopener noreferrer">
                                <span className="hidden xl:inline 2xl:inline lg:inline">linktr.ee</span>
                                <span className="inline xl:hidden 2xl:hidden lg:hidden">LT</span>
                            </Link>
                        </div>
                    </div>

                </div>
            )}
        </Disclosure>
    );
}
