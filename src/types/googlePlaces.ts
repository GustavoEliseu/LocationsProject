export interface PlaceAutocompletePrediction {
    description: string;
    place_id: string;
}

export interface PlaceAutocompleteResponse {
    predictions: PlaceAutocompletePrediction[];
    status: string;
}

export interface PlaceDetailsResponse {
    result: {
        geometry: {
            location: {
                lat: number;
                lng: number;
            };
        };
        name: string;
    };
    status: string;
}