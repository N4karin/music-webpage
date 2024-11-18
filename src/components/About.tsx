"use client";
import { Button } from "@headlessui/react";
import { useState, useEffect, useRef } from "react";
import '../styles/globals.css';

export default function About() {
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [visibleItems, setVisibleItems] = useState(new Array(5).fill(false)); // Adjust the size based on your content
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const data = [
        { left: 'Software', right: 'Ableton Live, After Effects, Davinci Resolve' },
        { left: 'Gear', right: 'DT990 Pro, JBL LSR308, Arturia Keystep 37' },
        { left: 'Generators', right: 'Serum, DUNE 3, Omnisphere, Keyscape' },
        { left: 'Effects/Mixing', right: 'Pro-Q 3, NANI, OTT, LFOTool, Live Stock Compressor, Valhalla Room/Vintageverb' },
        { left: 'Mastering', right: 'Ozone, Youlean Loudness Met., Tonal Balance 2' },
        { left: 'Samples', right: 'Splice, Break Packs (Think/Amen)' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number((entry.target as HTMLElement).dataset.index);
                    setVisibleItems((prev) => {
                        const newVisibleItems = [...prev];
                        newVisibleItems[index] = true;
                        return newVisibleItems;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
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

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = {
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value,
        };
    
        const JSONdata = JSON.stringify(formData);
        const endpoint = "/api/send"; // Use the relative path for Vercel
    
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        };
    
        try {
            const response = await fetch(endpoint, options);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            await response.json();
            if (response.status === 200) {
                setEmailSubmitted(true);
            } else {
                alert('Something went wrong, please try again.');
            }
        } catch (error) {
            console.log(error);
            alert('Failed to send message. Please check your network connection.');
        }
    };
    

    return (
        <div className="flex-col space-y-8 max-w-[1600px] items-center mx-auto">
            <div className="max-w-[1600px] grid grid-cols-1 justify-between pt-6 gap-4 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
                <div
                    ref={(el) => (itemRefs.current[0] = el)}
                    data-index={0}
                    className={`flex flex-col fade-in ${visibleItems[0] ? 'visible' : ''}`}
                >
                    <h1 className="font-thin text-5xl pb-4">about</h1>
                    <div>
                        <p>
                            I'm a mainly electronic music producer making Touhou arrangements, Remixes and Original music. Passionate about the creative process, I also like to try editing my own videos or design related works like this website!
                        </p>
                        <p className="pt-4">
                            Art transcends us and allows us to express things we couldn't otherwise, that's why it's important to nurture and feed your creative soul and allow yourself to be vulnerable. In any case, I am happy you found your way here and hope you enjoy your stay~
                        </p>
                        <h2 className="font-thin text-5xl pb-2 fade-in" data-index={1}>tools</h2>
                        <div>
                        <h1 className="font-thin text-5xl pb-4">tools</h1>
                            <table className="min-w-full">
                                <thead>
                                    <tr></tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr
                                            key={index}
                                            ref={(el) => (itemRefs.current[index + 2] = el)}
                                            data-index={index + 2}
                                            className={`fade-in ${visibleItems[index + 2] ? 'visible' : ''}`}
                                        >
                                            <td className="text-right p-2">{item.left}</td>
                                            <td className="text-left p-2">{item.right}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-1 pb-4 gap-8 z-10">
                    <div
                        ref={(el) => (itemRefs.current[data.length + 2] = el)}
                        data-index={data.length + 2}
                        className={`fade-in ${visibleItems[data.length + 2] ? 'visible' : ''}`}
                    >
                        <h1 className="font-thin text-4xl pt-2 pb-4">{"let's talk! :)"}</h1>
                        <p className="prose dark:prose-invert text-justify">
                            I am open for working together with like-minded creatives, be it with illustrators, vocalists, doing remixes and the likes! Don't hesitate to contact me - messages through this form will get directly to me.
                        </p>
                        <p className="prose dark:prose-invert text-justify pt-2">
                            日本語はまだ勉強してるけど、もし一緒に何かのプロジェクトしたかったら気軽に連絡してください！特に歌い手やイラストレーターと働きたい！
                        </p>
                    </div>

                    <div
                        ref={(el) => (itemRefs.current[data.length + 3] = el)}
                        data-index={data.length + 3}
                        className={`fade-in ${visibleItems[data.length + 3] ? 'visible' : ''}`}
                    >
                        <form className="flex flex-col relative pt-4" onSubmit={handleSubmit}>
                            <label htmlFor="name">Name <span className="text-red-400">*</span></label>
                            <input type="text" name="name" id="name" required placeholder="John Doe" className="text-black rounded-md border-indigo-500 dark:bg-gray-800 bg-gray-200 dark:text-gray-200 px-2 py-2 w-[320px]" />

                            <label htmlFor="email" className="pt-4">E-Mail Address <span className="text-red-400">*</span></label>
                            <input type="email" name="email" id="email" required placeholder="john.doe@gmail.com" className="text-black rounded-md border-indigo-500 dark:bg-gray-800 bg-gray-200 dark:text-gray-200 px-2 py-2 w-[320px]" />

                            <label htmlFor="subject" className="pt-4">Subject <span className="text-red-400">*</span></label>
                            <input type="text" name="subject" id="subject" required placeholder="Subject" className="text-black rounded-md border-indigo-500 dark:bg-gray-800 bg-gray-200 dark:text-gray-200 px-2 py-2 w-[320px]" />

                            <label htmlFor="message" className="pt-4">Message <span className="text-red-400">*</span></label>
                            <textarea name="message" id="message" className="text-sm px-2 py-2 h-32 text-black rounded-md border-indigo-500 dark:bg-gray-800 bg-gray-200 dark:text-gray-200" placeholder="Let's talk about..."></textarea>

                            <div className="pt-4">
                                <Button className="group text-gray-200 w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-blue-700 to-indigo-500 cursor-pointer" type="submit">
                                    Send Message
                                </Button>
                                {emailSubmitted && (
                                    <p className="text-green-600">Email sent successfully!</p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
