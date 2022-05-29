import React, { useEffect, useState } from "react";

type Location = {
    dimension: string,
    name: string,
    residents: string[],
    type: string,
};

type Properties = {
    name: string,
    url: string
};

export function Location(properties: Properties): JSX.Element {
    const [location, setLocation] = useState<Location>({
        dimension: "",
        name: "",
        residents: [],
        type: "",
    });

    useEffect((): void => {
        if (properties.url) {
            window.fetch(properties.url).then((response: Response): Promise<Location> => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            }).then((location: Location): void => {
                setLocation(location);
            });
        }
    }, [
        properties.name,
        properties.url,
    ]);

    return (
        <div className={"col"}>
            <h3>Location</h3>
            <ul>
                <li><strong>Name:</strong> {location.name}</li>
                <li><strong>Type:</strong> {location.type}</li>
                <li><strong>Dimension:</strong> {location.dimension}</li>
            </ul>
        </div>
    );
}
