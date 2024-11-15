import React, { useEffect, useState, useRef } from 'react';
import client from './contentfulClient';
import Spinner from './Spinner'; // Import the Spinner component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Blog() {
    const [items, setItems] = useState([]);
    const [assets, setAssets] = useState({});
    const [loading, setLoading] = useState(true);
    const [visibleItems, setVisibleItems] = useState([]);
    const itemRefs = useRef([]);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options).replace(/(\d{1,2}) (\w{3}) (\d{4})/, '$1 $2 $3');
    };

    useEffect(() => {
        client.getEntries({ content_type: 'blogPost' })
            .then((response) => {
                console.log("Fetched entries:", response);
                setItems(response.items);
                const assetIds = response.items.map(item => item.fields.image?.sys.id).filter(Boolean);
                if (assetIds.length > 0) {
                    client.getAssets({ 'sys.id[in]': assetIds.join(',') })
                        .then(assetResponse => {
                            const assetMap = {};
                            assetResponse.items.forEach(asset => {
                                assetMap[asset.sys.id] = asset.fields.file.url;
                            });
                            setAssets(assetMap);
                        })
                        .catch(error => {
                            console.error("Error fetching assets:", error);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                } else {
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching entries:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setVisibleItems(new Array(items.length).fill(false));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.dataset.index);
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

        const timeoutId = setTimeout(() => {
            itemRefs.current.forEach((ref) => {
                if (ref) observer.observe(ref);
            });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            itemRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [items]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="flex-col space-y-8 max-w-[750px] items-center mx-auto">
            <div className="font-thin text-5xl p-4 pb-8">blog</div>
            {items.map((item, index) => (
                <Link
                    key={item.sys.id}
                    to={`/blog/${item.fields.slug}`} // Adjust this path based on your routing setup
                    ref={(el) => (itemRefs.current[index] = el)}
                    data-index={index}
                    className={`grid grid-cols-1 md:grid-cols-2 border-2 border-[#6A9BD1] rounded-3xl overflow-hidden gap-4 fade-in ${visibleItems[index] ? 'visible' : ''} transition-transform duration-50 hover:scale-[1.01]`}
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
