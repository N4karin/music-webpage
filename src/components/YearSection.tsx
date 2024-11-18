import { useEffect, useRef } from 'react';

interface YearSectionProps {
    year: number;
    filteredItems: Array<{
        id: string;
        fields: {
            createDate: string;
            image?: {
                sys: {
                    id: string;
                };
            };
            name: string;
            description: string;
            type: string;
            url: string;
            collaborators?: string;
            collaboratorLink?: string;
        };
    }>;
    assets: Record<string, string>;
    typeColors: Record<string, string>;
    isLoading: boolean;
}

const YearSection: React.FC<YearSectionProps> = ({ year, filteredItems, assets, typeColors, isLoading }) => {
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const yearRef = useRef<HTMLDivElement | null>(null); // Ref for the year element

    const extractColor = (bgColor: string) => {
        const match = bgColor.match(/bg-\[(#\w{6})\]/);
        return match ? match[1] : null; // Return the hex color or null if not found
    };

    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, filteredItems.length);
    }, [filteredItems]);

    useEffect(() => {
        if (!isLoading) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Delay the fade-down effect for the year heading
                        if (yearRef.current) {
                            setTimeout(() => {
                                yearRef.current?.classList.remove('invisible');
                                yearRef.current?.classList.add('visible');
                            }, 100); // Adjust the delay (in milliseconds) as needed
                        }
    
                        // Fade in items
                        const indexAttr = entry.target.getAttribute('data-index');
                        const delay = (indexAttr !== null ? Number(indexAttr) : 0) * 0.1;
                        
                        // Assert entry.target as HTMLElement
                        const targetElement = entry.target as HTMLElement;
                        targetElement.style.transitionDelay = `${delay}s`;
                        targetElement.classList.remove('invisible');
                        targetElement.classList.add('visible');
                    } else {
                        const targetElement = entry.target as HTMLElement;
                        targetElement.style.transitionDelay = '0s';
                        targetElement.classList.remove('visible');
                        targetElement.classList.add('invisible');
                    }
                });
            }, {
                rootMargin: '0px 0px',
                threshold: 0,
            });
    
            // Observe the year element for fade effect
            if (yearRef.current) {
                observer.observe(yearRef.current);
            }
    
            // Observe each item
            itemRefs.current.forEach((ref) => {
                if (ref) observer.observe(ref);
            });
    
            return () => {
                if (yearRef.current) {
                    observer.unobserve(yearRef.current);
                }
                itemRefs.current.forEach((ref) => {
                    if (ref) observer.unobserve(ref);
                });
            };
        }
    }, [isLoading]);

    // Sort filteredItems by createDate in descending order
    const sortedItems = [...filteredItems].sort((a, b) => {
        return new Date(b.fields.createDate).getTime() - new Date(a.fields.createDate).getTime();
    });

    return (
        <>
            <div ref={yearRef} className="fade-up">
                <h1 className="font-bold text-3xl py-4 px-4">{year}</h1>
            </div>
            <div className="pl-4">
                <div>
                    {sortedItems.length === 0 ? (
                        <p>No releases</p>
                    ) : (
                        sortedItems.map((item, index) => (
                            <div
                                ref={(el) => (itemRefs.current[index] = el)}
                                className="item invisible group"
                                data-index={index}
                                key={item.id}
                            >
                                {item.fields.image && assets[item.fields.image.sys.id] && (
                                    <div className="relative">
                                        <a href={item.fields.url} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={assets[item.fields.image.sys.id]}
                                                alt={item.fields.name}
                                                className={`image-rendering-smooth object-cover transition-transform duration-200 group-hover:scale-[1.05] ease-in-out w-full h-60 rounded-lg mb-4 border-2 shadow-md hover:shadow-lg filter contrast-[90%]`}
                                                style={{
                                                    borderColor: extractColor(typeColors[item.fields.type]) || '#FFA07A',
                                                    borderWidth: '2px',
                                                    borderStyle: 'solid'
                                                }}
                                            />
                                        </a>
                                        <span className={`absolute top-2 left-2 ${typeColors[item.fields.type] || 'bg-gray-300'} text-black transition-transform duration-200 group-hover:scale-110 ease-in-out text-xs font-bold px-2 py-1 rounded shadow`}>
                                            {item.fields.type}
                                        </span>

                                        <div className="absolute bottom-0 left-0 w-full flex flex-col justify-end items-start bg-gray-950 bg-opacity-25 backdrop-blur-md border border-white border-opacity-30 opacity-0 transition-opacity duration-200 group-hover:opacity-100 p-2 pt-0 rounded-lg">
                                            <h2 className={`${item.fields.name.length > 13 ? 'text-md' : 'text-lg'} font-bold text-white`}>
                                                {item.fields.name}
                                            </h2>
                                            <div className="flex items-center space-x-1">
                                                <p className="text-white">{item.fields.description}</p>
                                                {item.fields.collaborators && (
                                                    <span className="text-white">
                                                        {' '}with <a href={item.fields.collaboratorLink} target="_blank" className="text-[#FFA07A]">{item.fields.collaborators}</a>
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
