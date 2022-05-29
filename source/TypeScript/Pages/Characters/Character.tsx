import React, { useEffect, useState } from "react";
import { Params, useParams } from "react-router";
import { Location } from "../../Components/Character/Location";
import { Origin } from "../../Components/Character/Origin";
import { NavBar } from "../../Components/NavBar";

type Character = {
    gender: string,
    id: number,
    image: string,
    location: {
        name: string,
        url: string,
    },
    name: string,
    origin: {
        name: string,
        url: string
    },
    species: string,
    status: string,
    type: string
}

export function Character(): JSX.Element {
    const [character, setCharacter] = useState<Character>({
        gender: "",
        id: 0,
        image: "",
        location: {
            name: "",
            url: "",
        },
        name: "",
        origin: {
            name: "",
            url: "",
        },
        species: "",
        status: "",
        type: "",
    });

    const params: Params = useParams();

    useEffect((): void => {
        const characterIdRegExp = /^\d+$/;

        if (typeof params.id === "string" && characterIdRegExp.test(params.id)) {
            window.fetch(`https://rickandmortyapi.com/api/character/${params.id}`).then((response: Response): Promise<Character> => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            }).then((character: Character): void => {
                setCharacter(character);
            }).catch((error: Error): void => {
                window.console.error(error.message);
            });
        }
    }, [
        params.id,
    ]);

    return (
        <div>
            <NavBar/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>{character.name}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <img alt={character.image} className={"img-thumbnail"} src={character.image}/>
                    </div>
                    <div className="col">
                        <h3>Information</h3>
                        <ul>
                            <li><strong>Name:</strong> {character.name}</li>
                            <li><strong>Species:</strong> {character.species}</li>
                            <li><strong>Gender:</strong> {character.gender}</li>
                            <li><strong>Type:</strong> {character.type ? character.type : "unknown"}</li>
                            <li><strong>Status:</strong> {character.status}</li>
                            <li><strong>Origin:</strong> {character.origin.name}</li>
                        </ul>
                    </div>
                </div>
                <Origin name={character.origin.name} url={character.origin.url}/>
                <Location name={character.location.name} url={character.location.url}/>
            </div>
        </div>
    );
}
