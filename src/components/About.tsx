import { Disclosure } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
}

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
}
const slideImages = [
    {
        url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 1'
    },
    {
        url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
        caption: 'Slide 2'
    },
    {
        url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 3'
    },
];

export default function About() {
    const location = useLocation(); // Get the current location
    const pathname = location.pathname || '/'; // Get the pathname

    return (
        <div className="grid grid-cols-2 justify-between pt-14 gap-8">
            <div className="flex flex-col">
                <h1 className="font-bold text-5xl pb-4">
                    About Me
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

            <div className="flex flex-col">
                <div className="slide-container">
                    <Slide>
                        {slideImages.map((slideImage, index) => (
                            <div key={index}>
                                <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                                    <span style={spanStyle}>{slideImage.caption}</span>
                                </div>
                            </div>
                        ))}
                    </Slide>
                </div>

                <div>

                </div>

            </div>
        </div>
    )
}
