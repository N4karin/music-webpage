export default function Home() {
    return (        
        <div className="flex-col">
            <div className="font-thin text-3xl pb-12">
                <p>Hi, my name is Nakarin and I make music!</p>
                <p className="pt-2">Here are my latest works:</p>
            </div>

            <div className="grid xl:grid-cols-3 lg:grid-cols-1 2xl:grid-cols-3 justify-evenly md:grid-cols-1 sm:grid-cols-1 gap-16">
                {/* Column for Original */}
                <div className="flex-col space-y-2">
                    <div className="font-thin text-5xl pb-8">
                        <h1>Original</h1>
                    </div>
                    <div className="relative group overflow-hidden w-full h-[250px] rounded-lg border-2 dark:border-[#1b3a4f] border-[#B9E4C9] transition-transform duration-200 hover:scale-105">
                        <a href="https://www.youtube.com/watch?v=zaLPtByJEG0" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
                            <img
                                src="/latest/latestOriginal.jpg" // Adjust the path as needed
                                alt="latestOriginal"
                                className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-in-out w-full h-full"
                            />
                        </a>
                        <div className="absolute inset-0" />
                    </div>

                    <div>
                        <h2 className="font-bold text-3xl pb-2">空に向かおう <span className="font-normal">feat. KAFU </span></h2>
                        <p className="italic">(transl. Towards the sky)</p>
                        <p className="font-thin pt-4">March 2024</p>
                    </div>
                </div>

                {/* Column for Remix */}
                <div className="flex-col space-y-2">
                    <div className="font-thin text-5xl pb-8">
                        <h1>Remix</h1>
                    </div>

                    {/* <div className="relative group overflow-hidden w-full h-[200px] rounded-lg border-2 dark:border-[#1b3a4f] border-[#B9E4C9] transition-transform duration-200 hover:scale-105">
                        <img
                            src="/latest/latestRemix.png" // Adjust the path as needed
                            alt="latestRemix"
                            className=" object-cover transition-transform duration-1000 group-hover:scale-110 ease-in-out w-full h-full"
                        />
                        <div className="absolute inset-0" />
                    </div> */}


                    <div className="relative group overflow-hidden w-full h-[250px] rounded-lg border-2 dark:border-[#1b3a4f] border-[#B9E4C9] transition-transform duration-200 hover:scale-105">
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
                            <img
                                src="/latest/latestRemix.png" // Adjust the path as needed
                                alt="latestRemix"
                                className="object-cover object-top transition-transform duration-1000 group-hover:scale-110 ease-in-out w-full h-full"
                            />
                        </a>
                        <div className="absolute inset-0" />
                    </div>

                    <div>
                        <h2 className="font-bold text-3xl pb-2">陽キャJKに憧れる陰キャJKの歌</h2>
                        <p>Original by 音莉飴</p>
                        <p className="font-thin pt-4">November 2024</p>
                    </div>
                </div>

                {/* Column for Touhou */}
                <div className="flex-col space-y-2">
                    <div className="font-thin text-5xl pb-8">
                        <h1>Touhou</h1>
                    </div>
                    <div className="relative group overflow-hidden w-full h-[250px] rounded-lg border-2 dark:border-[#1b3a4f] border-[#B9E4C9] transition-transform duration-200 hover:scale-105">
                        <a href="https://c102-meditations.netlify.app/" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
                            <img
                                src="/latest/latestTouhou.png" // Adjust the path as needed
                                alt="latestTouhou"
                                className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-in-out w-full h-full"
                            />
                        </a>
                        <div className="absolute inset-0" />
                    </div>

                    <div>
                        <h2 className="font-bold text-3xl pb-2">Meditations</h2>
                        <p>4-Track EP with <a href="https://www.youtube.com/@kurint8350" target="_blank" className="text-[#FFA07A]">Kurin T</a></p>
                        <p className="font-thin pt-4">August 2023</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
