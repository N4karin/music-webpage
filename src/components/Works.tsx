import React, { useEffect, useState } from 'react';
import client from './contentfulClient';
import YearSection from './YearSection';

const Works = () => {
    const [items, setItems] = useState([]);
    const [assets, setAssets] = useState({}); // Store assets by ID

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
                        });
                }
            })
            .catch((error) => {
                console.error("Error fetching entries:", error);
            });
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

    return (
        <div className="works-grid">
            {filteredItemsByYear.map(({ year, filteredItems }) => (
                <div key={year} className="year-section">
                    <YearSection year={year} filteredItems={filteredItems} assets={assets} typeColors={typeColors} />
                </div>
            ))}
        </div>
    );
};

export default Works;
