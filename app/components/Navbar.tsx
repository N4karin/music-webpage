"use client"

import { Disclosure } from "@headlessui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {

    let pathname = usePathname() || '/'

    return (
        <Disclosure as="nav" className="w-64 text-gray-300 h-full rounded-l-xl border-gray-700 border-r-2">
            {({ open }) => (
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Title Section */}
                    <div className="flex items-center justify-center p-8">
                        <Link href="/">
                            <h1 className="text-2xl font-bold">
                                Nakarin
                            </h1>
                        </Link>
                    </div>

                    {/* Navigation Links Section */}
                    <div className="flex-grow flex flex-col justify-evenly py-4 border-gray-700 border-y-2">
                        <Link href="/home" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#4C757D] before:duration-300 hover:before:h-20 hover:before:w-64 text-lg hover:before:opacity-80 ${pathname === '/home' ? 'text-[#B7C9A8] border-[#B7C9A8] border-l-4 ' : 'text-white'}`}>
                            <span className="relative z-10">Home</span>
                        </Link>
                        <Link href="/works" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#4C757D] before:duration-300 hover:before:h-20 hover:before:w-64 hover:before:opacity-80 text-lg ${pathname === '/works' ? 'text-[#B7C9A8] border-[#B7C9A8] border-l-4 ' : 'text-white'}`}>
                            <span className="relative z-10">Works</span>
                        </Link>
                        <Link href="/about" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#4C757D] before:duration-300 hover:before:h-20 hover:before:w-64 hover:before:opacity-80 text-lg ${pathname === '/about' ? 'text-[#B7C9A8] border-[#B7C9A8] border-l-4 ' : 'text-white'}`}>
                            <span className="relative z-10">About</span>
                        </Link>
                        <Link href="/connect" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#4C757D] before:duration-300 hover:before:h-20 hover:before:w-64 hover:before:opacity-80 text-lg ${pathname === '/connect' ? 'text-[#B7C9A8] border-[#B7C9A8] border-l-4 ' : 'text-white'}`}>
                            <span className="relative z-10">Connect</span>
                        </Link>
                        <Link href="/blog" className={`flex items-center justify-center relative h-12 overflow-hidden transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-[#4C757D] before:duration-300 hover:before:h-20 hover:before:w-64 hover:before:opacity-80 text-lg ${pathname === '/blog' ? 'text-[#B7C9A8] border-[#B7C9A8] border-l-4 ' : 'text-white'}`}>
                            <span className="relative z-10">Blog</span>
                        </Link>
                        
                    </div>

                    {/* Social Media Section */}
                    <div className="py-4">
                        <div className="font-bold pb-5 text-center">
                            Explore
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 text-left pl-8">
                            <Link href="https://open.spotify.com/artist/7o1NIFsPdL6tkrvb3uZVqx?si=zse4UKVvTOCxreBuO_p6Bg" className="hover:text-[#FFA07A] transition-all duration-150">Spotify</Link>
                            <Link href="https://www.youtube.com/@Nakarin" className="hover:text-[#FFA07A] transition-all duration-150">YouTube</Link>
                            <Link href="https://nakarin.bandcamp.com/" className="hover:text-[#FFA07A] transition-all duration-150">Bandcamp</Link>
                            <Link href="https://x.com/Nakarinn_" className="hover:text-[#FFA07A] transition-all duration-150">Twitter</Link>
                            <Link href="https://soundcloud.com/nakarin" className="hover:text-[#FFA07A] transition-all duration-150">Soundcloud</Link>
                            <Link href="https://linktr.ee/nakarin_" className="hover:text-[#FFA07A] transition-all duration-150">linktr.ee</Link>
                        </div>
                    </div>
                </div>
            )}
        </Disclosure>
    )
}
