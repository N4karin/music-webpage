import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect } from "react";

const columns = [
    {
        title: "original",
        imgSrc: "/latest/latestOriginal.jpg",
        imgAlt: "latestOriginal",
        link: "https://www.youtube.com/watch?v=zaLPtByJEG0",
        description: "空に向かおう feat. KAFU (transl. towards the sky)",
        date: "march 2024",
        color: "#6A9BD1"
    },
    {
        title: "remix",
        imgSrc: "/latest/latestRemix.jpg",
        imgAlt: "latestRemix",
        link: "https://www.youtube.com",
        description: "陽キャJKに憧れる陰キャJKの歌 (original by 音莉飴)",
        date: "november 2024",
        color: "#A4D65E"
    },
    {
        title: "touhou",
        imgSrc: "/latest/latestTouhou.jpg",
        imgAlt: "latestTouhou",
        link: "https://c102-meditations.netlify.app/",
        description: "Meditations (4-Track EP with Kurin T)",
        date: "august 2023",
        color: "#FFA07A"
    }
];

export default function Home() {
    useEffect(() => {
        AOS.init({ duration: 1500, once: true });
    }, []);

    return (        
        <div className="flex-col pt-20">
            <div className="font-thin text-3xl pb-8">
                <p>hi, my name is nakarin and i make music!</p>
                <p className="pt-2">here are my latest works:</p>
            </div>

            <div className="grid xl:grid-cols-3 lg:grid-cols-1 2xl:grid-cols-3 justify-evenly md:grid-cols-1 sm:grid-cols-1 gap-4">
                {columns.map((column, index) => {
                    return (
                        <div
                            key={index}
                            className="flex-col space-y-2"
                            data-aos="fade-up"
                            data-aos-delay={index * 400} // Set delay based on index
                        >
                            <div className="font-thin text-5xl pb-8">
                                <h1>{column.title}</h1>
                            </div>
                            <div
                                className="relative group overflow-hidden w-full h-[250px] rounded-lg border-2 transition-transform duration-200 hover:scale-105"
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
                                <p className="font-thin pt-4">{column.date}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
