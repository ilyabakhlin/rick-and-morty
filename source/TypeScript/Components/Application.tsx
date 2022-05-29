import React, { useEffect, useState } from "react";

type Character = {
    id: number,
    name: string
}

type Characters = {
    info: {
        count: number,
        next: string
        pages: number,
        prev: string,
    },
    results: Character[]
}

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
        window.fetch("https://rickandmortyapi.com/api/character").then((response: Response): Promise<Characters> => {
            return response.json();
        }).then((characters: Characters): void => {
            setCharacters(characters);
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
