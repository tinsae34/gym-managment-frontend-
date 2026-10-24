import { Member } from '@/types';
import { Phone, Calendar, Clock } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDate, getDaysUntilExpiry } from '@/utils/dateUtils';

interface MemberCardProps {
    member: Member;
    showAnimation?: boolean;
    onRenew?: () => void;
}

export default function MemberCard({ member, showAnimation, onRenew }: MemberCardProps) {
    const daysLeft = getDaysUntilExpiry(member.membershipExpiryDate);
    const isExpired = member.status === 'EXPIRED';

    return (
        <div
            className={`card p-6 border-2 ${
                isExpired ? 'border-black bg-gray-50' : 'border-black bg-white'
            } ${showAnimation ? 'animate-pulse' : ''}`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black mb-2">{member.fullName}</h3>
                    <div className="flex items-center space-x-2 text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{member.phoneNumber}</span>
                    </div>
                </div>
                <StatusBadge status={member.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-700">
                    <Calendar className="h-4 w-4 text-black" />
                    <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="text-sm font-medium text-black">{formatDate(member.membershipStartDate)}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                    <Clock className="h-4 w-4 text-black" />
                    <div>
                        <p className="text-xs text-gray-500">Expiry Date</p>
                        <p className={`text-sm font-medium ${isExpired ? 'text-black underline font-semibold' : 'text-black'}`}>
                            {formatDate(member.membershipExpiryDate)}
                        </p>
                    </div>
                </div>
            </div>

            {!isExpired && daysLeft <= 7 && (
                <div className="bg-gray-100 border border-black p-3 mb-4">
                    <p className="text-black text-sm font-medium">
                        Notice: Membership expires in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
                    </p>
                </div>
            )}

            {isExpired && onRenew && (
                <button
                    onClick={onRenew}
                    className="w-full btn-primary text-base py-3 mt-2"
                >
                    Accept Payment & Renew Membership
                </button>
            )}
        </div>
    );
}
