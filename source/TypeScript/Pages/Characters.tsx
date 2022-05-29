import React, { useEffect, useState } from "react";
import { NavBar } from "../Components/NavBar";

type Character = {
    id: number,
    image: string,
    location: {
        name: string,
        url: string
    },
    name: string
}

type Characters = {
    info: {
        count: number,
        next: string,
        pages: number,
        prev: string
    },
    results: Character[]
};

export function Characters(): JSX.Element {
    const [characters, setCharacters] = useState<Characters>({
        info: {
            count: 826,
            next: "",
            pages: 42,
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
    }, [
        characters.info.count,
        characters.info.pages,
    ]);

    return (
        <div>
            <NavBar/>
            <div className={"container"}>
                <div className={"row"}>
                    {characters.results.map((character: Character): JSX.Element => {
                        return (
                            <div className={"col"} key={character.id}>
                                <div className={"card"}>
                                    <img alt={character.image} className={"card-img-top"} src={character.image}/>
                                    <div className={"card-body"}>
                                        <h5 className={"card-title"}>{character.name}</h5>
                                        <p className={"card-text"}>{character.location.name}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
