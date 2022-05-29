import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { NavBar } from "../Components/NavBar";

type Episode = {
    air_date: string,
    characters: string[]
    episode: string
    id: number,
    name: string,
}

type Episodes = {
    info: {
        count: number
        next: string,
        pages: number,
        previous: string,
    },
    results: Episode[],
}

export function Episodes(): JSX.Element {
    const [episodes, setEpisodes] = useState<Episodes>({
        info: {
            count: 0,
            next: "",
            pages: 0,
            previous: "",
        },
        results: [],
    });

    const [searchParameters] = useSearchParams({
        page: "1",
    });

    useEffect((): void => {
        const url = "https://rickandmortyapi.com/api/episode";
        window.fetch(url).then((response: Response): Promise<Episodes> => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        }).then((episodes: Episodes): void => {
            setEpisodes(episodes);
        });
    }, [
        searchParameters.get("page"),
    ]);

    return (
        <div>
            <NavBar/>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col"}>
                        <ul>
                            {episodes.results.map((episode: Episode): JSX.Element => {
                                return (
                                    <li key={episode.id}>{episode.name}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
