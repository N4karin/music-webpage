import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect, useRef } from "react";

const columns = [
    {
        title: "original",
        imgSrc: "/latest/latestOriginal.jpg",
        imgAlt: "latestOriginal",
        link: "https://www.youtube.com/watch?v=zaLPtByJEG0",
        description: "空に向かおう feat. KAFU",
        subtext: "(transl. towards the sky)",
        date: "march 2024",
        color: "#6A9BD1"
    },
    {
        title: "remix",
        imgSrc: "/latest/latestRemix.jpg",
        imgAlt: "latestRemix",
<<<<<<< HEAD
        link: "https://www.youtube.com/watch?v=W91ZXLHOKfw",
=======
        link: "https://youtu.be/W91ZXLHOKfw?si=aOjIMWBglSigqs3Y",
>>>>>>> e8e880312629fdfbba41e6dbe709e3e56ae74c73
        description: "陽キャJKに憧れる陰キャJKの歌",
        subtext: "original by 音莉飴",
        date: "november 2024",
        color: "#A4D65E"
    },
    {
        title: "touhou",
        imgSrc: "/latest/latestTouhou.jpg",
        imgAlt: "latestTouhou",
        link: "https://www.youtube.com/watch?v=irn52s9ue68",
        description: "ten days",
        subtext: "10-track Touhou Album",
        date: "may 2025",
        color: "#FFA07A"
    }
];

export default function Home() {
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        AOS.init({ duration: 500, once: true });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0 // Trigger when any part of the element is visible
        });

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            itemRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    return (        
        <div className="flex-col pt-14">
            <div className="font-thin text-5xl pb-16" data-aos="fade-down">
                <p>hi, my name is <span className="underline decoration-1 underline-offset-4">nakarin</span> and i make music!</p>
                <p className="pt-4">here are my latest works:</p>
            </div>

            <div className="grid xl:grid-cols-3 lg:grid-cols-1 2xl:grid-cols-3 justify-evenly md:grid-cols-1 sm:grid-cols-1 gap-4">
                {columns.map((column, index) => {
                    return (
                        <div
                            key={index}
                            ref={(el) => (itemRefs.current[index] = el)}
                            className="flex-col space-y-2 item" // Added 'item' class here
                            data-aos="fade-up"
                            data-aos-delay={index * 200} // Set delay based on index
                        >
                            <div 
                            className="font-thin text-5xl pb-8"
                            style={{ color: column.color }}
                            >
                                <h1>{column.title}</h1>
                            </div>
                            <div
                                className="relative group overflow-hidden w-full h-[250px] rounded-lg border-2 transition-transform duration-200 hover:scale-[1.03]"
                                style={{ borderColor: column.color }} // Use inline style for border color
                            >
                                <a href={column.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
                                    <img
                                        src={column.imgSrc} 
                                        alt={column.imgAlt}
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-in-out w-full h-full"
                                    />
                                </a>
                                <div className="absolute inset-0" />
                            </div>

                            <div>
                                <h2 className="font-bold text-3xl pb-2">{column.description}</h2>
                                {/* <h3 className="font-thin text-md pb-2">{column.subtext}</h3> */}
                                <p className="font-thin pt-4">{column.date}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
