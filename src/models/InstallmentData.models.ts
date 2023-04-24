export interface InstallmentData {
    _id: string;
    name: string;
    date: string;
    amount: number;
    isCombined: boolean;
    perPersonAmount: number;
    installmentNo: number;
    paymentMethod:string;
    user:string;
    userName:string;
}

export interface InstallmentDataSet {
    month: string;
    items: InstallmentData[];
}

