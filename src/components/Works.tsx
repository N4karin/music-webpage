import { useEffect, useState } from 'react';
import client from './contentfulClient';
import YearSection from './YearSection';
import Spinner from './Spinner';
import AOS from 'aos';
import "aos/dist/aos.css";
import { Entry, EntrySys } from 'contentful';

// Define the fields structure for MusicWork
interface MusicWorkFields {
    createDate: string;
    image?: {
        sys: {
            id: string;
        };
    };
    name: string;
    type: string;
    collaboratorLink?: string;
    collaborators?: string;
    description: string;
    url: string;
}

// Extend the Entry type with MusicWorkFields and include contentTypeId
interface MusicWorkEntry extends Entry<MusicWorkFields> {
    sys: EntrySys & { // Extend EntrySys to include all required properties
        contentType: {
            sys: {
                id: string; // This is the contentTypeId
            };
        };
    };
    fields: MusicWorkFields;
}

// Use the new interface in your component
const Works = () => {
    const [items, setItems] = useState<MusicWorkEntry[]>([]);
    const [assets, setAssets] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.getEntries<MusicWorkEntry>({
            content_type: 'musicWork',
            order: ['-sys.createdAt'],
        })
        .then((response) => {
            console.log("Fetched entries:", response);
            setItems(response.items as MusicWorkEntry[]); // Cast response.items to MusicWorkEntry[]

            const assetIds = response.items
                .map(item => item.fields.image?.sys.id)
                .filter((id): id is string => id !== undefined);

            if (assetIds.length > 0) {
                client.getAssets({ 'sys.id[in]': assetIds })
                    .then(assetResponse => {
                        const assetMap: { [key: string]: string } = {};
                        assetResponse.items.forEach(asset => {
                            if (asset.fields.file) {
                                assetMap[asset.sys.id] = asset.fields.file.url;
                            } else {
                                console.warn(`Asset with id ${asset.sys.id} does not have a file field.`);
                            }
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
        AOS.init({ duration: 750, once: true });
    }, []);

    const filterItemsByYear = (items: MusicWorkEntry[], year: number) => {
        return items
            .filter(item => {
                const fields = item.fields;
                const createDate = fields.createDate ? new Date(fields.createDate) : null;
                return createDate && createDate.getFullYear() === year;
            })
            .map(item => ({
                id: item.sys.id,
                fields: item.fields
            }));
    };

    const typeColors = {
        Remix: 'bg-[#a4d65e]',
        Original: 'bg-[#6a9bd1]',
        Touhou: 'bg-[#f8c8a1]',
    };

    const years = Array.from({ length: 10 }, (_, i) => 2024 - i);
    const filteredItemsByYear = years.map(year => ({
        year,
        filteredItems: filterItemsByYear(items, year),
    }));

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
            <div className="font-thin text-5xl p-4" data-aos="fade-right">works</div>
            <div className="works-grid" data-aos="fade-up">
                {filteredItemsByYear
                    .filter(({ filteredItems }) => filteredItems.length > 0)
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
