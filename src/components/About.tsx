"use client";
import { Button } from "@headlessui/react";
import { useState } from "react";

export default function About() {

    const [emailSubmitted, setEmailSubmitted] = useState(false)

    const data = [
        { left: 'Software', right: 'Ableton Live, After Effects, Davinci Resolve' },
        { left: 'Gear', right: 'DT990 Pro, JBL LSR308, Arturia Keystep 37' },
        { left: 'Generators', right: 'Serum, DUNE 3, Omnisphere, Keyscape' },
        { left: 'Effects/Mixing', right: 'Pro-Q 3, NANI, OTT, LFOTool, Live Stock Compressor, Valhalla Room/Vintageverb' },
        { left: 'Mastering', right: 'Ozone, Youlean Loudness Met., Tonal Balance 2' },
        { left: 'Samples', right: 'Splice, Break Packs (Think/Amen)' },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email: (e.target as HTMLFormElement).email.value,
            subject: (e.target as HTMLFormElement).subject.value,
            message: (e.target as HTMLFormElement).message.value,
        }

        const JSONdata = JSON.stringify(data);
        const endpoint = "/api/send";

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        };

        console.log("body here is ", JSONdata)

        try {
            const response = await fetch(endpoint, options);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const resData = await response.json();
            console.log('Response data:', resData);

            if (response.status === 200) {
                console.log('Message sent successfully.', resData);
                setEmailSubmitted(true);
            } else {
                console.error('Error:', resData.error);
                alert('Something went wrong, please try again.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Failed to send message. Please check your network connection.');
        }

    };

    return (
        <div className="grid grid-cols-1 justify-between pt-6 gap-4 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
            <div className="flex flex-col">
                <h1 className="font-thin text-5xl pb-4">
                    about
                </h1>

                <div>
                    <p>
                        I'm a mainly electronic music producer making Touhou arrangements, Remixes and Original music. Passionate about the creative process, I also like to try editing my own videos or design related works like this website!
                    </p>

                    <p className="pt-4">
                        Art transcends us and allows us to express things we couldn't otherwise, that's why it's important to nurture and feed your creative soul and allow yourself to be vulnerable. In any case, I am happy you found your way here and hope you enjoy your stay~
                    </p>

                    <h2 className="font-thin text-5xl pt-4 pb-2">
                        selected tools
                    </h2>

                    <div>
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-right p-2">{item.left}</td>
                                        <td className="text-left p-2">{item.right}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div className="grid md:grid-cols-2 pb-4 gap-8 z-10">
                <div>
                    <h1 className="font-thin text-4xl pt-2 pb-4">
                        {"let's talk! :)"}
                    </h1>

                    <p className="prose dark:prose-invert text-justify">
                        I am open for working together with like-minded creatives, be it with illustrators, vocalists, doing remixes and the likes! Don't hesitate to contact me - messages through this form will get directly to me.
                    </p>
                    <p className="prose dark:prose-invert text-justify pt-2">
                        日本語はまだ勉強してるけど、もし一緒に何かのプロジェクトしたかったら気軽に連絡してください！特に歌い手やイラストレーターと働きたい！
                    </p>
                </div>

                <div>
                    <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200 dark:from-indigo-950 to-transparent rounded-full h-80 w-80 z-0 blur-xl absolute translate-x-1/2 -translate-y-10 " />

                    <form className="flex flex-col relative pt-11" onSubmit={handleSubmit}>
                        <label htmlFor="name" typeof="text" className="">
                            Name <span className="text-red-400">*</span>
                        </label>
                        <input type="text" name="name" id="name" required placeholder="John Doe" className="text-black rounded-md border-indigo-500 dark:bg-gray-800 bg-gray-200 dark:text-gray-200 px-2 py-2" />

                        <label htmlFor="email" typeof="email" className="pt-4">
                            E-Mail Address <span className="text-red-400">*</span>
                        </label>
                        <input type="email" name="email" id="email" required placeholder="john.doe@gmail.com" className="text-black rounded-md border-indigo-500 dark:bg-gray-800 bg-gray-200 dark:text-gray-200 px-2 py-2" />

                        <label htmlFor="subject" typeof="text" className="pt-4">
                            Subject <span className="text-red-400">*</span>
                        </label>
                        <input type="text" name="subject" id="subject" required placeholder="Subject" className="text-black rounded-md border-indigo-500 dark:bg-gray-800 bg-gray-200 dark:text-gray-200 px-2 py-2" />

                        <label htmlFor="message" typeof="email" className="pt-4">
                            Message <span className="text-red-400">*</span>
                        </label>
                        <textarea name="message" id="message" className="text-sm px-2 py-2 h-32 text-black rounded-md border-indigo-500 dark:bg-gray-800 bg-gray-200 dark:text-gray-200" placeholder="Let's talk about...">

                        </textarea>

                        <div className="pt-4">

                            <Button className="group text-gray-200 w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-blue-700 to-indigo-500 cursor-pointer" type="submit">
                                Send Message
                            </Button>
                            {
                                emailSubmitted && (
                                    <p className="text-green-600">
                                        Email sent successfully!
                                    </p>
                                )
                            }
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

