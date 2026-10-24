import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Search, Plus, DollarSign, QrCode } from 'lucide-react';
import { membersApi } from '@/lib/api';
import { Member, MemberStatus } from '@/types';
import StatusBadge from '@/components/StatusBadge';
import NewMemberModal from '@/components/NewMemberModal';
import PaymentModal from '@/components/PaymentModal';
import QRCodeModal from '@/components/QRCodeModal';
import { formatDate } from '@/utils/dateUtils';

type FilterTab = 'ALL' | MemberStatus;

export default function MembersScreen() {
    const [members, setMembers] = useState<Member[]>([]);
    const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
    const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [showNewMemberModal, setShowNewMemberModal] = useState(false);
    const [selectedMemberForPayment, setSelectedMemberForPayment] = useState<Member | null>(null);
    const [selectedMemberForQR, setSelectedMemberForQR] = useState<Member | null>(null);

    useEffect(() => {
        loadMembers();
    }, [activeFilter]);

    useEffect(() => {
        filterMembers();
    }, [members, searchQuery]);

    const loadMembers = async () => {
        setLoading(true);
        try {
            const status = activeFilter === 'ALL' ? undefined : activeFilter;
            const data = await membersApi.getAll(status);
            setMembers(data);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to load members');
        } finally {
            setLoading(false);
        }
    };

    const filterMembers = () => {
        let filtered = members;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (m) =>
                    m.fullName.toLowerCase().includes(query) ||
                    m.phoneNumber.includes(query)
            );
        }

        setFilteredMembers(filtered);
    };

    const handleMemberCreated = (newMember: Member) => {
        setMembers((prev) => [newMember, ...prev]);
        setShowNewMemberModal(false);
        toast.success(`Member ${newMember.fullName} created successfully!`);
    };

    const handlePaymentSuccess = (updatedMember: Member) => {
        setMembers((prev) =>
            prev.map((m) => (m.id === updatedMember.id ? updatedMember : m))
        );
        setSelectedMemberForPayment(null);
        toast.success('Payment recorded successfully!');
    };

    const filterTabs: { label: string; value: FilterTab }[] = [
        { label: 'All Members', value: 'ALL' },
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Expired', value: 'EXPIRED' },
        { label: 'Frozen', value: 'FROZEN' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-slate-50">Member Management</h2>
                <button
                    onClick={() => setShowNewMemberModal(true)}
                    className="btn-primary flex items-center space-x-2"
                >
                    <Plus className="h-5 w-5" />
                    <span>New Member</span>
                </button>
            </div>

            {/* Filters & Search */}
            <div className="card p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Filter Tabs */}
                    <div className="flex space-x-2">
                        {filterTabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveFilter(tab.value)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === tab.value
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name or phone..."
                            className="input pl-10 h-10"
                        />
                    </div>
                </div>
            </div>

            {/* Members Table */}
            <div className="card overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                        <p className="text-slate-400 mt-4">Loading members...</p>
                    </div>
                ) : filteredMembers.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-slate-400">No members found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-700/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Member
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Start Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Expiry Date
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {filteredMembers.map((member) => (
                                    <tr
                                        key={member.id}
                                        className="hover:bg-slate-700/30 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-slate-50">{member.fullName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                                            {member.phoneNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={member.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                                            {formatDate(member.startDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={
                                                    member.status === 'EXPIRED'
                                                        ? 'text-red-400'
                                                        : 'text-slate-300'
                                                }
                                            >
                                                {formatDate(member.membershipExpiryDate)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => setSelectedMemberForPayment(member)}
                                                    className="btn-success py-1 px-3 text-sm flex items-center space-x-1"
                                                >
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>Payment</span>
                                                </button>
                                                <button
                                                    onClick={() => setSelectedMemberForQR(member)}
                                                    className="btn-secondary py-1 px-3 text-sm flex items-center space-x-1"
                                                >
                                                    <QrCode className="h-4 w-4" />
                                                    <span>QR Code</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showNewMemberModal && (
                <NewMemberModal
                    onClose={() => setShowNewMemberModal(false)}
                    onSuccess={handleMemberCreated}
                />
            )}

            {selectedMemberForPayment && (
                <PaymentModal
                    member={selectedMemberForPayment}
                    onClose={() => setSelectedMemberForPayment(null)}
                    onSuccess={handlePaymentSuccess}
                />
            )}

            {selectedMemberForQR && (
                <QRCodeModal
                    member={selectedMemberForQR}
                    onClose={() => setSelectedMemberForQR(null)}
                />
            )}
        </div>
    );
}
