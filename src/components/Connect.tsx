"use client";
import { Button } from "@headlessui/react";
import { useState } from "react";

export default function Connect() {

    const [emailSubmitted, setEmailSubmitted] = useState(false)


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email: (e.target as HTMLFormElement).email.value,
            subject: (e.target as HTMLFormElement).subject.value,
            message: (e.target as HTMLFormElement).message.value,
        };

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
        <div className="grid grid-cols-1 justify-between pt-14 gap-8 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
            <div className="flex flex-col">
                <h1 className="font-bold text-5xl pb-4">
                    connect
                </h1>

                <div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet ex erat. Maecenas sed arcu vel odio accumsan facilisis vel ut ex. Nunc ac malesuada enim, et hendrerit diam. Duis euismod mattis elit vel mollis. Sed viverra ultrices sapien. Cras rhoncus enim nec nisi tempor tincidunt. Sed sit amet libero quam. Etiam at est ut arcu pretium luctus quis ac quam. Maecenas rhoncus dui diam, accumsan pretium magna scelerisque sit amet. Ut eget dui cursus, efficitur lacus a, pharetra eros. Donec sed sapien in nisi posuere viverra.
                    </p>

                    <p className="pt-8">
                        Morbi eleifend porta arcu eu accumsan. Aliquam in risus sit amet eros tempus ultricies. Nullam eu fringilla quam, et rutrum quam. Praesent malesuada ac nunc quis efficitur. In hac habitasse platea dictumst. Ut accumsan eu dui et consectetur. Quisque posuere egestas orci a hendrerit. Etiam vel blandit lacus, ut imperdiet neque. Donec tincidunt id mauris ac vestibulum.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 pb-4 gap-8 z-10">
                <div>
                    <h1 className="font-medium text-xl pb-4">
                        {"Let's talk! :)"}
                    </h1>

                    <p className="prose dark:prose-invert text-justify">
                        I am currently looking for new career opportunities, my inbox is always open.
                        Whether you want to say hi or have a question, I will try my best to get back to you!
                    </p>

                    <div className="flex space-x-5 pt-6">
                        <a href="https://github.com/N4karin" target="_blank">
                            <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                className="w-8 h-8 text-indigo-500 hover:text-indigo-600"
                            >
                                <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/nakarin-srijumrat/" target="_blank">
                            <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                className="w-8 h-8 text-indigo-500 hover:text-indigo-600"
                            >
                                <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1168.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div>
                    <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200 dark:from-indigo-950 to-transparent rounded-full h-80 w-80 z-0 blur-xl absolute translate-x-1/2 -translate-y-10 " />
                    <form className="flex flex-col gap-0 relative" onSubmit={handleSubmit}>
                        <label htmlFor="name" typeof="text" className="">
                            Your Name <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="name" id="name" required placeholder="John Doe" className="text-black rounded-md border-indigo-500 dark:bg-gray-200" />

                        <label htmlFor="email" typeof="email" className="pt-4">
                            Your E-Mail Address <span className="text-red-500">*</span>
                        </label>
                        <input type="email" name="email" id="email" required placeholder="john.doe@gmail.com" className="text-black rounded-md border-indigo-500 dark:bg-gray-200" />

                        <label htmlFor="subject" typeof="text" className="pt-4">
                            Subject <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="subject" id="subject" required placeholder="Subject" className="text-black rounded-md border-indigo-500 dark:bg-gray-200" />

                        <label htmlFor="message" typeof="email" className="pt-4">
                            Message <span className="text-red-500">*</span>
                        </label>
                        <textarea name="message" id="message" className="h-32 text-black rounded-md border-indigo-500 dark:bg-gray-200" placeholder="Let's talk about...">

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
