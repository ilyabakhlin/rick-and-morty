import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { NavBar } from "../Components/NavBar";

type Character = {
    id: number,
    image: string,
    location: {
        name: string,
        url: string
    },
    name: string,
    status: string
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
            count: 0,
            next: "",
            pages: 0,
            prev: "",
        },
        results: [],
    });

    const [searchParameters] = useSearchParams({
        page: "1",
    });

    useEffect((): void => {
        window.fetch(`https://rickandmortyapi.com/api/character?page=${searchParameters.get("page")}`).then((response: Response): Promise<Characters> => {
            return response.json();
        }).then((characters: Characters): void => {
            setCharacters(characters);
        });

        window.scrollTo({behavior: "smooth", top: 0});
    }, [
        searchParameters.get("page"),
    ]);

    return (
        <div>
            <NavBar/>
            <div className={"container"}>
                <div className={"g-4 mb-4 mt-0 row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-5"}>
                    {characters.results.map((character: Character): JSX.Element => {
                        return (
                            <div className={"col"} key={character.id}>
                                <div className={"card h-100"}>
                                    <img alt={character.image} className={"card-img-top"} src={character.image}/>
                                    <div className={"d-flex flex-column card-body justify-content-between"}>
                                        <div className="card-description">
                                            <h5 className={"card-title"}>{character.name}</h5>
                                            <h6 className="card-subtitle text-muted">{character.status}</h6>
                                            <p className={"card-text"}>{character.location.name}</p></div>
                                        <div className="card-button d-grid d-block mt-2">
                                            <Link className={"btn btn btn-primary"} to={`/characters/${character.id}`}>View</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <Link className={"page-link"} to={`/characters?page=2`}>Previous</Link>
                                </li>
                                <li className="page-item">
                                    <Link className={"page-link"} to={`/characters?page=3`}>Next</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
