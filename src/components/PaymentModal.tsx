import { useState } from 'react';
import { toast } from 'sonner';
import { X, DollarSign, CreditCard } from 'lucide-react';
import { paymentsApi } from '@/lib/api';
import { Member } from '@/types';

interface PaymentModalProps {
    member: Member;
    onClose: () => void;
    onSuccess: (member: Member) => void;
}

export default function PaymentModal({ member, onClose, onSuccess }: PaymentModalProps) {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const paymentAmount = parseFloat(amount);
        if (isNaN(paymentAmount) || paymentAmount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        setLoading(true);
        try {
            const result = await paymentsApi.create({
                memberId: member.id,
                amount: paymentAmount,
                paymentMethod: 'CASH',
            });
            onSuccess(result.member);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Payment failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="card-strong p-6 max-w-md w-full bg-white">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-black">Record Payment</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Member Info */}
                <div className="bg-gray-100 border border-gray-300 rounded p-4 mb-6">
                    <p className="text-xs text-gray-500 mb-1">Member</p>
                    <p className="text-lg font-semibold text-black">{member.fullName}</p>
                    <p className="text-sm text-gray-600">{member.phoneNumber}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            <div className="flex items-center space-x-2">
                                <DollarSign className="h-4 w-4" />
                                <span>Payment Amount *</span>
                            </div>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="input text-2xl font-bold"
                            disabled={loading}
                            autoFocus
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Membership will be extended by 30 days
                        </p>
                    </div>

                    <div className="bg-gray-50 border border-black rounded p-3">
                        <div className="flex items-center space-x-2 text-black">
                            <CreditCard className="h-5 w-5" />
                            <span className="font-medium text-sm">Payment Method: CASH</span>
                        </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary flex-1"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-success flex-1"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Record Payment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
