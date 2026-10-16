import axios from 'axios';
import type {
    Member,
    CheckIn,
    Payment,
    CreateMemberData,
    CreatePaymentData,
    CheckInData,
    ApiResponse,
    MemberStatus
} from '@/types';

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        return Promise.reject(new Error(message));
    }
);

export const membersApi = {
    getAll: async (status?: MemberStatus) => {
        const params = status ? { status } : {};
        const response = await api.get<ApiResponse<Member[]>>('/members', { params });
        return response.data.data;
    },

    search: async (query: string) => {
        const response = await api.get<ApiResponse<Member[]>>('/members/search', {
            params: { q: query },
        });
        return response.data.data;
    },

    create: async (data: CreateMemberData) => {
        const response = await api.post<ApiResponse<Member>>('/members', data);
        return response.data.data;
    },
};

export const paymentsApi = {
    create: async (data: CreatePaymentData) => {
        const response = await api.post<ApiResponse<Payment & { member: Member }>>('/payments', data);
        return response.data.data;
    },
};

export const checkInApi = {
    checkIn: async (data: CheckInData) => {
        const response = await api.post<ApiResponse<CheckIn>>('/checkin', data);
        return response.data.data;
    },
};

export default api;
