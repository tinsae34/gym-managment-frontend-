import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Search, Clock, CheckCircle2 } from 'lucide-react';
import { checkInApi, membersApi } from '@/lib/api';
import { Member, CheckIn } from '@/types';
import MemberCard from '@/components/MemberCard';
import PaymentModal from '@/components/PaymentModal';
import { formatTime } from '@/utils/dateUtils';

export default function CheckInScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [member, setMember] = useState<Member | null>(null);
    const [recentCheckIns, setRecentCheckIns] = useState<CheckIn[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [member]);

    const handleSearch = async (query: string) => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const results = await membersApi.search(query);
            if (results.length > 0) {
                setMember(results[0]);
                setShowAnimation(true);
                setTimeout(() => setShowAnimation(false), 1000);

                if (results[0].status !== 'EXPIRED') {
                    await handleCheckIn(results[0].qrCodeToken);
                }
            } else {
                toast.error('Member not found');
                setMember(null);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Search failed');
            setMember(null);
        } finally {
            setLoading(false);
            setSearchQuery('');
        }
    };

    const handleCheckIn = async (token: string) => {
        try {
            const checkIn = await checkInApi.checkIn({ qrCodeToken: token });
            setRecentCheckIns((prev) => [checkIn, ...prev.slice(0, 9)]);
            toast.success(`✓ ${checkIn.member.fullName} checked in successfully`);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Check-in failed');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(searchQuery);
        }
    };

    const handlePaymentSuccess = (updatedMember: Member) => {
        setMember(updatedMember);
        setShowPaymentModal(false);
        toast.success('Payment recorded! Membership renewed for 30 days');
        handleCheckIn(updatedMember.qrCodeToken);
    };

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="card-strong p-6 bg-white">
                <h2 className="text-2xl font-bold text-black mb-4">Quick Check-In</h2>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Scan QR code or type phone number..."
                        className="input pl-12 text-lg h-14"
                        disabled={loading}
                        autoFocus
                    />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    Use barcode scanner or type manually, press Enter to search
                </p>
            </div>

            {/* Member Result */}
            {member && (
                <MemberCard
                    member={member}
                    showAnimation={showAnimation}
                    onRenew={() => setShowPaymentModal(true)}
                />
            )}

            {/* Recent Check-Ins */}
            <div className="card-strong p-6 bg-white">
                <div className="flex items-center space-x-2 mb-4">
                    <Clock className="h-5 w-5 text-black" />
                    <h3 className="text-xl font-bold text-black">Today's Check-Ins</h3>
                </div>

                {recentCheckIns.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No check-ins yet today</p>
                ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {recentCheckIns.map((checkIn) => (
                            <div
                                key={checkIn.id}
                                className="flex items-center justify-between p-4 border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <CheckCircle2 className="h-5 w-5 text-black" />
                                    <div>
                                        <p className="font-medium text-black">{checkIn.member.fullName}</p>
                                        <p className="text-sm text-gray-500">{checkIn.member.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-black">
                                        {formatTime(checkIn.checkInTime)}
                                    </p>
                                    <p className="text-xs text-gray-400">Today</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            {member && showPaymentModal && (
                <PaymentModal
                    member={member}
                    onClose={() => setShowPaymentModal(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
}
