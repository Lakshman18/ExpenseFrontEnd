import { TripSummaryData, TripExpenseDataSet, TripExpenseData } from './TripSummaryData.models'
import { InstallmentData, InstallmentDataSet } from './InstallmentData.models'
import { AuthenticationData } from './Authentication.models'
import { ACTION_STATUS } from '../constants/app.constants'

export interface  TripSummaryStateDto {
    tripList: {
        isLoading: boolean;
        status: ACTION_STATUS | null;
        data: TripSummaryData[];
    },
    deleteTrip: {
        isLoading: boolean;
        status: ACTION_STATUS | null;
    },
    addTrip: {
        isLoading: boolean;
        status: ACTION_STATUS | null;
        data: TripSummaryData
    },
    tripExpenseList: {
        isLoading: boolean;
        status: ACTION_STATUS | null;
        data: TripExpenseDataSet[]
    },
    addTripExpense: {
        isLoading: boolean;
        status: ACTION_STATUS | null;
        data: TripExpenseData
    },
    deleteTripExpense: {
        isLoading: boolean;
        status: ACTION_STATUS | null;
    }
}

export interface  InstallmentStateDto { 
    installmentList: {
        isLoading: boolean;
        status: ACTION_STATUS | null;
        data: InstallmentDataSet[]
    },
    addInstallment: {
        isLoading: boolean;
        status: ACTION_STATUS | null;
        data: InstallmentData
    },
    deleteInstallment: {
        isLoading: boolean;
        status: ACTION_STATUS | null;
    }
}


export interface  AuthenticationStateDto {
    authData: {
        isLoading: boolean;
        status: ACTION_STATUS | null;
        data: AuthenticationData
    }
}


export interface AppStatDto {
    trip: TripSummaryStateDto,
    installment: InstallmentStateDto,
    authentication : AuthenticationStateDto
}
