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
            className={`card p-6 ${showAnimation
                    ? isExpired
                        ? 'animate-shake border-red-500'
                        : 'animate-pulse-success border-success-500'
                    : ''
                }`}
            style={
                showAnimation && !isExpired
                    ? { boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }
                    : showAnimation
                        ? { boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)' }
                        : undefined
            }
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-50 mb-2">{member.fullName}</h3>
                    <div className="flex items-center space-x-2 text-slate-300">
                        <Phone className="h-4 w-4" />
                        <span>{member.phoneNumber}</span>
                    </div>
                </div>
                <StatusBadge status={member.status} className="text-lg px-4 py-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-slate-300">
                    <Calendar className="h-4 w-4" />
                    <div>
                        <p className="text-xs text-slate-400">Start Date</p>
                        <p className="text-sm font-medium">{formatDate(member.membershipStartDate)}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                    <Clock className="h-4 w-4" />
                    <div>
                        <p className="text-xs text-slate-400">Expiry Date</p>
                        <p className={`text-sm font-medium ${isExpired ? 'text-red-400' : ''}`}>
                            {formatDate(member.membershipExpiryDate)}
                        </p>
                    </div>
                </div>
            </div>

            {!isExpired && daysLeft <= 7 && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4">
                    <p className="text-amber-400 text-sm font-medium">
                        ⚠️ Membership expires in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
                    </p>
                </div>
            )}

            {isExpired && onRenew && (
                <button
                    onClick={onRenew}
                    className="w-full btn-success text-lg py-3 mt-2"
                >
                    💰 Accept Payment & Renew Membership
                </button>
            )}
        </div>
    );
}
