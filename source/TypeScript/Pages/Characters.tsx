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

    const [pageCurrent, setPageCurrent] = useState(0);

    const [pageNext, setPageNext] = useState(0);

    const [pagePrevious, setPagePrevious] = useState(0);

    const [searchParameters] = useSearchParams({
        page: "1",
    });

    useEffect((): void => {
        const page: string = searchParameters.get("page") as string; // IMPROVE: Remove the type casting.
        const pageRegExp: RegExp = /^\d+$/;

        if (pageRegExp.test(page)) {
            const url = `https://rickandmortyapi.com/api/character?page=${page}`;

            window.fetch(url).then((response: Response): Promise<Characters> => {
                return response.json();
            }).then((characters: Characters): void => {
                setCharacters(characters);
                setPageCurrent(parseInt(page));
            });

            window.scrollTo({behavior: "smooth", top: 0});
        } else {
            // TODO: Add some error handling.
        }
    }, [
        searchParameters.get("page"),
    ]);

    useEffect((): void => {
        setPageNext(pageCurrent < characters.info.pages ? pageCurrent + 1 : characters.info.pages);
        setPagePrevious(pageCurrent > 1 ? pageCurrent - 1 : 1);
    }, [
        characters.info.pages,
        pageCurrent,
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
                                    <div className={"card-body d-flex flex-column justify-content-between"}>
                                        <div className="card-description">
                                            <h5 className={"card-title"}>{character.name}</h5>
                                            <h6 className="card-subtitle text-muted">{character.status}</h6>
                                            <p className={"card-text"}>{character.location.name}</p>
                                        </div>
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
                                    <Link className={"page-link"} to={`/characters?page=${pagePrevious}`}>Previous</Link>
                                </li>
                                <li className="page-item">
                                    <Link className={"page-link"} to={`/characters?page=${pageNext}`}>Next</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
