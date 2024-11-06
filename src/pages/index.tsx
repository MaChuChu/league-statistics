import { SearchIcon } from "@/component/svgIcons";
import Image from "next/image";
import { useEffect, useState } from "react";

// Define the types of a champion object based on the API structure
interface ChampionImage {
    full: string; // Full image filename
}

interface Champion {
    id: string;
    name: string;
    lore: string;
    image: ChampionImage; // Add the image property
}

interface ChampionApiResponse {
    data: Record<string, Champion>; // Map of champion IDs to champion data
}

export default function Home() {
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const [championList, setChampionList] = useState<Champion[]>([]); // State for all champions
    const [championName, setChampionName] = useState(""); // State for selected champion name
    const [championImage, setChampionImage] = useState(""); // State for selected champion image
    const [championLore, setChampionLore] = useState(""); // State for selected champion lore

    // Fetch all champions when the component mounts
    useEffect(() => {
        async function fetchChampions() {
            const version = '14.21.1'; // Specify the patch version
            const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`; // API to get all champions

            try {
                const response = await fetch(url);
                const data: ChampionApiResponse = await response.json(); // Type the response

                // Set the champion list from the fetched data
                const championData: Champion[] = Object.values(data.data).map(champion => ({
                    ...champion,
                }));
                setChampionList(championData);
            } catch (error) {
                console.error('Error fetching champions:', error);
            }
        }

        fetchChampions();
    }, []);

    // Fetch a specific champion's detailed data when a champion is clicked
    async function getChampionData(champion: string) {
        const version = '14.21.1'; // Specify the patch version
        const targetChampion = champion;

        const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${targetChampion}.json`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Extract the relevant champion data
            const championData = data.data[targetChampion];
            setChampionName(championData.name);
            setChampionImage(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${targetChampion}_0.jpg`);
            setChampionLore(championData.lore);
        } catch (error) {
            console.error('Error fetching champion data:', error);
        }
    }

    // Handle user input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Handle search icon click
    const handleSearchClick = () => {
        if (searchTerm) {
            getChampionData(searchTerm);
        }
    };

    return (
        <main>
            <div className="top-container">
                <h1>League Champion's</h1>

                <div className="search-container">
                    <input
                        name="search"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Search for a champion"
                    />
                    <button className="search-button" onClick={handleSearchClick}>
                        <SearchIcon color="white" />
                    </button>
                </div>
            </div>

            <div className="information-container">
                {/* Display all the champions in legends-container */}
                <div className="legends-container">
                    <ol>
                        {championList.map((champion) => (
                            <li key={champion.id} onClick={() => getChampionData(champion.id)}>
                                <Image
                                    src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/champion/${champion.image.full}`}
                                    alt={champion.name}
                                    width={80}
                                    height={80}
                                />
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Selected champion data */}
                <div className="champion-container">
                    {championImage && (
                        <Image
                            src={championImage ? championImage : "/placeholder.webp"}
                            width={250}
                            height={350}
                            alt={`Picture of ${championName}`}
                            unoptimized={true}
                        />
                    )}

                    <div className="champion-text-container">
                        <h1>{championName ? championName : "Click a champion to view details"}</h1>

                        <p>{championLore ? championLore : "Select a champion to see their lore..."}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
