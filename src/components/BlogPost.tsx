import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from './contentfulClient';
import Spinner from './Spinner';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface BlogPostFields {
    title: string;
    date: string;
    image?: {
        fields: {
            file: {
                url: string;
            };
        };
    };
    content: any; // Adjust this type based on your content structure
}

interface BlogPostEntry {
    fields: BlogPostFields;
}

export default function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPostEntry | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.getEntries({
            content_type: 'blogPost',
            'fields.slug': slug
        })
            .then(response => {
                if (response.items.length > 0) {
                    setPost(response.items[0] as unknown as BlogPostEntry); // Type assertion here
                } else {
                    console.error("Post not found");
                }
            })
            .catch(error => {
                console.error("Error fetching post:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <Spinner />;
    }

    if (!post) {
        return <div>Post not found.</div>;
    }

    return (
        <div className="max-w-[850px] mx-auto p-4">
            <button
                onClick={() => navigate('/blog')}
                className="mb-4 flex items-center px-4 py-2 border-gray-700 bg-gradient-to-tr from-[#A7C6ED] to-[#B9E4C9] dark:bg-gradient-to-tr dark:from-[#2b1a3c] dark:to-[#1b3a4f] rounded-3xl hover:bg-blue-600"
            >
                <svg
                    className="w-5 h-5 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m15 19-7-7 7-7"
                    />
                </svg>
                Back
            </button>

            {post.fields.image && (
                <img
                    src={`https:${post.fields.image.fields.file.url}`}
                    alt={post.fields.title}
                    className="object-cover w-full sm:h-full md:h-[392px]"
                />
            )}
            <h1 className="text-3xl font-bold py-4">{post.fields.title}</h1>
            <p className="opacity-50">{new Date(post.fields.date).toLocaleDateString()}</p>
            <div className="mt-4">
                {documentToReactComponents(post.fields.content)}
            </div>
        </div>
    );
}
