export interface MonthlyGraphic {
    name: string;
    value: number;
}

export interface GlobalGraphic {
    name: string;
    series: {
        'name': string;
        'value': number;
    }[];
}
