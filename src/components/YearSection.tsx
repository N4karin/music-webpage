const YearSection = ({ year, filteredItems, assets, typeColors }) => {
    return (
        <>
            <h1 className="pl-4 pt-4 font-bold text-3xl">{year}</h1>
            <div className="pl-2">
                <div>
                    {filteredItems.length === 0 ? (
                        <p>No releases</p>

                    ) : (
                        filteredItems.map((item) => (
                            <div key={item.sys.id} className="relative group p-2 rounded-lg overflow-hidden transition-shadow duration-200">
                                {item.fields.image && assets[item.fields.image.sys.id] && (
                                    <div className="relative">
                                        <a href={item.fields.url} target='_blank' rel="noopener noreferrer">
                                            <img
                                                src={assets[item.fields.image.sys.id]}
                                                alt={item.fields.name}
                                                className="object-cover transition-transform duration-200 group-hover:scale-105 ease-in-out w-full h-60 rounded-lg mb-4 border-2 border-[#FFA07A]"
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
                                                        {' '}with <a href={item.fields.collaboratorLink} className="text-[#FFA07A]">{item.fields.collaborators}</a>
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
