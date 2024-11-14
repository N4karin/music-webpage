import { useEffect, useRef } from 'react';

const YearSection = ({ year, filteredItems, assets, typeColors, isLoading }) => {
    const itemRefs = useRef([]);

    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, filteredItems.length);
    }, [filteredItems]);

    useEffect(() => {
        if (!isLoading) {
            itemRefs.current = itemRefs.current.slice(0, filteredItems.length);
            // Create an Intersection Observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.getAttribute('data-index') * 0.1; // 
                        entry.target.style.transitionDelay = `${delay}s`;
                        entry.target.classList.remove('invisible');
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.style.transitionDelay = '0s';
                        entry.target.classList.remove('visible');
                        entry.target.classList.add('invisible');
                    }
                });
            }, {
                rootMargin: '0px 0px',
                threshold: 0,
            });
            // Observe each item
            itemRefs.current.forEach((ref) => {
                if (ref) observer.observe(ref);
            });

            // Clean up
            return () => {
                if (itemRefs.current) {
                    itemRefs.current.forEach((ref) => {
                        if (ref) observer.unobserve(ref);
                    });
                }
            };
        }
    }, [isLoading, itemRefs.current]); // Add itemRefs.current as a dependency

    return (
        <>
            <h1 className="font-bold text-3xl py-4 px-4">{year}</h1>
            <div className="pl-4">
                <div>
                    {filteredItems.length === 0 ? (
                        <p>No releases</p>

                    ) : (
                        filteredItems.map((item, index) => (
                            <div
                                ref={(el) => (itemRefs.current[index] = el)}
                                className="item invisible group"
                                data-index={index}
                                key={item.id}
                            >
                                {item.fields.image && assets[item.fields.image.sys.id] && (
                                    <div className="relative">
                                        <a href={item.fields.url} target='_blank' rel="noopener noreferrer">
                                            <img
                                                src={assets[item.fields.image.sys.id]}
                                                alt={item.fields.name}
                                                className="image-rendering-smooth object-cover transition-transform duration-200 group-hover:scale-[1.05] ease-in-out w-full h-60 rounded-lg mb-4 border-2 border-[#FFA07A] shadow-md hover:shadow-lg filter contrast-[90%]"
                                            />
                                        </a>
                                        <span className={`absolute top-2 left-2 ${typeColors[item.fields.type] || 'bg-gray-300'} text-black transition-transform duration-200 group-hover:scale-110 ease-in-out text-xs font-bold px-2 py-1 rounded shadow`}>
                                            {item.fields.type}
                                        </span>

                                        {/* Overlay for text information */}
                                        <div className="absolute bottom-0 left-0 w-full flex flex-col justify-end items-start bg-gray-950 bg-opacity-25 backdrop-blur-md border border-white border-opacity-30 opacity-0 transition-opacity duration-200 group-hover:opacity-100 p-2 pt-0 rounded-lg">
                                            <h2 className={`${item.fields.name.length > 13 ? 'text-lg' : 'text-xl'} font-bold text-white`}>
                                                {item.fields.name}
                                            </h2>
                                            <div className="flex items-center space-x-1">
                                                <p className="text-white">{item.fields.description}</p>
                                                {item.fields.collaborators && (
                                                    <span className="text-white">
                                                        {' '}with <a href={item.fields.collaboratorLink} target='_blank' className="text-[#FFA07A]">{item.fields.collaborators}</a>
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-300">
                                                {new Date(item.fields.createDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default YearSection;
