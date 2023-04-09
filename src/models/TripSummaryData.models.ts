export interface TripSummaryData {
    _id: string;
    name: string;
    fromDate: string;
    toDate: string;
    budget: number;
}

export interface TripExpenseData {
    _id: string;
    date: string;
    description: string;
    amount: number;
    trip:string;
}

export interface TripExpenseDataSet {
    date: string;
    items: TripExpenseData[];
}