import React, { useEffect, useState } from 'react';
import client from './contentfulClient';
import YearSection from './YearSection';
import Spinner from './Spinner'; // Import the Spinner component
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const Works = () => {
    const [items, setItems] = useState([]);
    const [assets, setAssets] = useState({}); // Store assets by ID
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch entries
        client.getEntries({ content_type: 'musicWork' })
            .then((response) => {
                console.log("Fetched entries:", response);
                setItems(response.items);
                // Fetch assets
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
                            setLoading(false); // Set loading to false after fetching assets
                        });
                } else {
                    setLoading(false); // Set loading to false if no assets to fetch
                }
            })
            .catch((error) => {
                console.error("Error fetching entries:", error);
                setLoading(false); // Set loading to false on error
            });
    }, []);

    useEffect(() => {
        AOS.init({ duration: 750, once: true });
    }, []);

    const filterItemsByYear = (items, year) => {
        return items.filter(item => {
            const createDate = item.fields.createDate ? new Date(item.fields.createDate) : null;
            return createDate && createDate.getFullYear() === year;
        });
    };

    const typeColors = {
        Remix: 'bg-[#a4d65e]',
        Original: 'bg-[#6a9bd1]',
        Touhou: 'bg-[#f8c8a1]',
    };

    // Create an array of years from 2015 to 2024
    const years = Array.from({ length: 10 }, (_, i) => 2024 - i);
    const filteredItemsByYear = years.map(year => ({
        year,
        filteredItems: filterItemsByYear(items, year),
    }));

    if (loading) {
        return <Spinner />; // Show spinner while loading
    }

    return (
        <div>
            <div className="font-thin text-5xl p-4" data-aos="fade-down">works</div>
            <div className="works-grid" data-aos="fade-up">
                {filteredItemsByYear
                    .filter(({ filteredItems }) => filteredItems.length > 0) // Filter out years with no items
                    .map(({ year, filteredItems }) => (
                        <div key={year} className="year-section">
                            <YearSection year={year} filteredItems={filteredItems} assets={assets} typeColors={typeColors} isLoading={loading} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Works;
