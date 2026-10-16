export type MemberStatus = 'ACTIVE' | 'EXPIRED' | 'FROZEN';

export interface Member {
    id: string;
    fullName: string;
    phoneNumber: string;
    qrCodeToken: string;
    status: MemberStatus;
    membershipStartDate: string;
    membershipExpiryDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface CheckIn {
    id: string;
    memberId: string;
    checkInTime: string;
    member: Member;
}

export interface Payment {
    id: string;
    memberId: string;
    amount: number;
    paymentMethod: 'CASH';
    paymentDate: string;
}

export interface CreateMemberData {
    fullName: string;
    phoneNumber: string;
}

export interface CreatePaymentData {
    memberId: string;
    amount: number;
    paymentMethod: 'CASH';
}

export interface CheckInData {
    qrCodeToken: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface ApiError {
    success: false;
    message: string;
    error?: string;
}
