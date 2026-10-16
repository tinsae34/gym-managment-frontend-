import { useState } from 'react';
import { toast } from 'sonner';
import { X, User, Phone } from 'lucide-react';
import { membersApi } from '@/lib/api';
import { Member } from '@/types';

interface NewMemberModalProps {
    onClose: () => void;
    onSuccess: (member: Member) => void;
}

export default function NewMemberModal({ onClose, onSuccess }: NewMemberModalProps) {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullName.trim()) {
            toast.error('Full name is required');
            return;
        }

        if (!phoneNumber.trim()) {
            toast.error('Phone number is required');
            return;
        }

        setLoading(true);
        try {
            const newMember = await membersApi.create({
                fullName: fullName.trim(),
                phoneNumber: phoneNumber.trim(),
            });
            onSuccess(newMember);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to create member');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="card p-6 max-w-md w-full">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-50">New Member Registration</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-50 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span>Full Name *</span>
                            </div>
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter full name"
                            className="input"
                            disabled={loading}
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>Phone Number *</span>
                            </div>
                        </label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                            className="input"
                            disabled={loading}
                        />
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
                            className="btn-primary flex-1"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Member'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
