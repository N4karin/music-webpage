import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation(); // Get the current location
    const pathname = location.pathname || '/'; // Get the pathname

    return (
        <Disclosure as="nav" className="w-32 2xl:min-w-52 xl:min-w-52 lg:min-w-52 h-full rounded-l-xl dark:border-gray-700 border-[#B9E4C9] border-r-2">
            {({ open, close }) => (
                <>
                    <div className="flex flex-col h-full overflow-y-auto">
                        {/* Title Section */}
                        <div className="flex items-center justify-center p-8">
                            <Link to="/">
                                <h1 className="text-2xl font-bold">nakarin</h1>
                            </Link>
                        </div>

                        {/* Navigation Links Section */}
                        <div className="flex-grow flex flex-col justify-evenly py-4 border-[#B9E4C9]">
                            <Link to="/home" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm dark:before:bg-[#FFA07A] before:bg-[#FFA07A] before:duration-300 hover:before:h-20 hover:before:w-64 text-lg ${pathname === '/home' ? 'text-[#FFA07A] border-[#FFA07A] border-l-4 ' : ''} hover:text-gray-100`}>
                                <span className="relative z-10">home</span>
                            </Link>
                            <Link to="/works" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#FFA07A] before:duration-300 hover:before:h-20 hover:before:w-64 hover:before:opacity-80 text-lg ${pathname === '/works' ? 'text-[#FFA07A] border-[#FFA07A] border-l-4 ' : ''} hover:text-gray-100`}>
                                <span className="relative z-10">works</span>
                            </Link>
                            <Link to="/about" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#FFA07A] before:duration-300 hover:before:h-20 hover:before:w-64 hover:before:opacity-80 text-lg ${pathname === '/about' ? 'text-[#FFA07A] border-[#FFA07A] border-l-4 ' : ''} hover:text-gray-100`}>
                                <span className="relative z-10">about</span>
                            </Link>
                            {/* <Link to="/connect" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#FFA07A] before:duration-300 hover:before:h-20 hover:before:w-64 hover:before:opacity-80 text-lg ${pathname === '/connect' ? 'text-[#FFA07A] border-[#FFA07A] border-l-4 ' : ''} hover:text-gray-100`}>
                            <span className="relative z-10">Connect</span>
                        </Link> */}
                            <Link to="/blog" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#FFA07A] before:duration-300 hover:before:h-20 hover:before:w-64 hover:before:opacity-80 text-lg ${pathname === '/blog' ? 'text-[#FFA07A] border-[#FFA07A] border-l-4 ' : ''} hover:text-gray-100`}>
                                <span className="relative z-10">blog</span>
                            </Link>
                        </div>

                        {/* Social Media Section */}
                        <div className="py-4">
                            <div className="font-bold pb-5 text-center"></div>
                            <div className="grid grid-cols-2 gap-4 text-left pl-6">
                                <Link to="https://open.spotify.com/artist/7o1NIFsPdL6tkrvb3uZVqx?si=zse4UKVvTOCxreBuO_p6Bg" className="hover:text-[#FFA07A] transition-all duration-150" target="_blank" rel="noopener noreferrer">
                                    <span className="hidden xl:inline 2xl:inline lg:inline">spotify</span>
                                    <span className="inline xl:hidden 2xl:hidden lg:hidden">sp</span>
                                </Link>

                                <Link to="https://www.youtube.com/@Nakarin" className="hover:text-[#FFA07A] transition-all duration-150" target="_blank" rel="noopener noreferrer">
                                    <span className="hidden xl:inline 2xl:inline lg:inline">youtube</span>
                                    <span className="inline xl:hidden 2xl:hidden lg:hidden">yt</span>
                                </Link>

                                <Link to="https://nakarin.bandcamp.com/" className="hover:text-[#FFA07A] transition-all duration-150" target="_blank" rel="noopener noreferrer">
                                    <span className="hidden xl:inline 2xl:inline lg:inline">bandcamp</span>
                                    <span className="inline xl:hidden 2xl:hidden lg:hidden">bc</span>
                                </Link>

                                <Link to="https://x.com/Nakarinn_" className="hover:text-[#FFA07A] transition-all duration-150" target="_blank" rel="noopener noreferrer">
                                    <span className="hidden xl:inline 2xl:inline lg:inline">twitter</span>
                                    <span className="inline xl:hidden 2xl:hidden lg:hidden">x</span>
                                </Link>

                                <Link to="https://soundcloud.com/nakarin" className="hover:text-[#FFA07A] transition-all duration-150" target="_blank" rel="noopener noreferrer">
                                    <span className="hidden xl:inline 2xl:inline lg:inline">soundcloud</span>
                                    <span className="inline xl:hidden 2xl:hidden lg:hidden">sc</span>
                                </Link>

                                <Link to="https://linktr.ee/nakarin_" className="hover:text-[#FFA07A] transition-all duration-150" target="_blank" rel="noopener noreferrer">
                                    <span className="hidden xl:inline 2xl:inline lg:inline">linktr.ee</span>
                                    <span className="inline xl:hidden 2xl:hidden lg:hidden">lt</span>
                                </Link>
                            </div>
                        </div>



                    </div>
                    <DisclosurePanel className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {["home", "works", "about", "blog"].map((section) => (
                                <a
                                    key={section}
                                    href={`/${section}`}
                                    className={`${pathname === `#${section}` ?
                                        'bg-indigo-100 border-indigo-500 text-indigo-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800'
                                        : 'hover:text-black border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 dark:hover:text-white block pl-3 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-base font-medium dark:text-white'
                                        }`}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1) || 'Home'}
                                </a>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
