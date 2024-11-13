"use client";
import { Button } from "@headlessui/react";
import { useState } from "react";

export default function About() {

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
                    about
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
                        I am open for working together with like-minded creatives, be it with illustrators, vocalists, doing remixes and the likes! Don't hesitate to contact me, messages through this form will get directly to me.
                    </p>
                    <p className="prose dark:prose-invert text-justify pt-2">
                        日本語はまだ勉強してるけど、もし一緒に何かのプロジェクトしたかったら気軽に連絡してください！特に歌い手やイラストレーターと働きたい！
                    </p>
                </div>

                <div>
                    <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200 dark:from-indigo-950 to-transparent rounded-full h-80 w-80 z-0 blur-xl absolute translate-x-1/2 -translate-y-10 " />
                    <form className="flex flex-col gap-0 relative" onSubmit={handleSubmit}>
                        <label htmlFor="name" typeof="text" className="">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="name" id="name" required placeholder="John Doe" className="text-black rounded-md border-indigo-500 dark:bg-gray-200" />

                        <label htmlFor="email" typeof="email" className="pt-4">
                            E-Mail Address <span className="text-red-500">*</span>
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
