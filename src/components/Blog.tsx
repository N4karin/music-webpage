import { useEffect, useState, useRef } from 'react';
import client from './contentfulClient';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { Entry } from 'contentful';

// Define the structure of your entry
interface BlogPost {
    slug: string; // Changed from any to string
    title: string | undefined;
    summary: string;
    date: string; // Changed from a function to a string
    image?: { // Made image optional
        sys: {
            id: string;
        };
    };
    sys: {
        id: string;
    };
    fields: {
        title: string;
        summary: string;
        date: string;
        slug: string;
        image?: { // Made image optional
            sys: {
                id: string;
            };
        };
    };
}

// Define a more generic type for Contentful entries
type ContentfulEntry<T> = {
    sys: {
        id: string;
    };
    fields: T;
};

// Type guard to check if an entry is a BlogPost
const isBlogPost = (entry: any): entry is ContentfulEntry<BlogPost> => {
    return entry && entry.fields && typeof entry.fields.title === 'string' &&
        typeof entry.fields.summary === 'string' &&
        typeof entry.fields.date === 'string' &&
        typeof entry.fields.slug === 'string' &&
        (entry.fields.image === undefined || (entry.fields.image.sys && typeof entry.fields.image.sys.id === 'string'));
};

export default function Blog() {
    const [items, setItems] = useState<ContentfulEntry<BlogPost>[]>([]);
    const [assets, setAssets] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const [, setVisibleItems] = useState<boolean[]>([]);
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);


    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options).replace(/(\d{1,2}) (\w{3}) (\d{4})/, '$1 $2 $3');
    };

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await client.getEntries({ content_type: 'blogPost' }) as { items: Entry<any>[] }; // Explicitly type the response
                const blogPosts = response.items.filter(isBlogPost) as unknown as ContentfulEntry<BlogPost>[]; // Type assertion after filtering
                setItems(blogPosts); // Now this should be safe

                const assetIds = blogPosts
                    .map(item => item.fields.image?.sys.id) // This returns string | undefined
                    .filter((id): id is string => id !== undefined); // Filter out undefined values

                // Fetch assets if there are any asset IDs
                if (assetIds.length > 0) {
                    const assetResponse = await client.getAssets({ 'sys.id[in]': assetIds });
                    const assetMap: { [key: string]: string } = {};
                    assetResponse.items.forEach(asset => {
                        // Check if asset.fields.file is defined
                        if (asset.fields.file) {
                            assetMap[asset.sys.id] = asset.fields.file.url;
                        } else {
                            console.warn(`Asset ${asset.sys.id} does not have a file.`);
                        }
                    });
                    setAssets(assetMap);
                }
            } catch (error) {
                console.error("Error fetching entries or assets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, []);

    useEffect(() => {
        setVisibleItems(new Array(items.length).fill(false));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number((entry.target as HTMLElement).dataset.index); // Cast to HTMLElement
                    setVisibleItems((prev) => {
                        const newVisibleItems = [...prev];
                        newVisibleItems[index] = true;
                        return newVisibleItems;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0
        });

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        };
    }, [items]);

    if (loading) {
        return (<Spinner />);
    }

    return (
        <div className="flex-col space-y-8 max-w-[750px] items-center mx-auto">
            <div className="font-thin text-5xl p-4 pb-8">blog</div>
            {items.map((item, index) => (
                <Link
                    key={item.sys.id}
                    to={`/blog/${item.fields.slug}`}
                    ref={(el) => (itemRefs.current[index] = el)}
                    data-index={index}
                    className={`grid grid-cols-1 md:grid-cols-2 border-[#6A9BD1] rounded-3xl overflow-hidden gap-4  transition-transform duration-50 hover:scale-[1.01]`}
                >
                    <div className="relative flex justify-center" style={{ height: '200px' }}>
                        {item.fields.image && (
                            <img
                                src={assets[item.fields.image.sys.id]}
                                alt={item.fields.title}
                                className="object-cover w-full sm:h-full md:h-[392px]"
                            />
                        )}
                    </div>

                    <div className="flex-col overflow-auto space-y-4 py-4">
                        <h2 className="text-2xl font-bold">{item.fields.title}</h2>
                        <p>{item.fields.summary}</p>
                        <p className="opacity-50">{formatDate(item.fields.date)}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
