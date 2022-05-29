import React, { useEffect, useState } from "react";

type Character = {
    id: number,
    name: string
}

type Characters = {
    info: Information,
    results: Character[]
}

type Information = {
    count: number,
    next: string
    pages: number,
    prev: string,
};

export function Application(): JSX.Element {
    const [characters, setCharacters] = useState<Characters>({
        info: {
            count: 0,
            next: "",
            pages: 0,
            prev: "",
        },
        results: [],
    });

    useEffect((): void => {
        window.fetch("https://rickandmortyapi.com/api/character").then((response): Promise<Characters> => {
            return response.json();
        }).then((json: Characters): void => {
            setCharacters(json);
        });
    }, []);

    return (
        <ul>
            {
                characters.results.map((character: Character): JSX.Element => {
                    return (
                        <li key={character.id}>
                            <p>{character.name}</p>
                        </li>
                    );
                })
            }
        </ul>
    );
}
