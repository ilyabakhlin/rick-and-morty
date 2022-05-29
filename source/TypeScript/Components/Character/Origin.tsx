import React, { useEffect, useState } from "react";

type Origin = {
    dimension: string,
    name: string,
    type: string
}

type Properties = {
    name: string,
    url: string
}

export function Origin(properties: Properties): JSX.Element {
    const [origin, setOrigin] = useState<Origin>({
        dimension: "",
        name: "",
        type: "",
    });

    useEffect((): void => {
        if (properties.url) {
            window.fetch(properties.url).then((response: Response): Promise<Origin> => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            }).then((origin: Origin): void => {
                setOrigin(origin);
            }).catch((error: Error): void => {
                window.console.error(error.message);
            });
        }
    }, [
        properties.name,
        properties.url,
    ]);

    return (
        <div className={"col"}>
            <h3>Origin</h3>
            <ul>
                <li><strong>Name:</strong> {origin.name}</li>
                <li><strong>Type:</strong> {origin.type}</li>
                <li><strong>Dimension:</strong> {origin.dimension}</li>
            </ul>
        </div>
    );
}
