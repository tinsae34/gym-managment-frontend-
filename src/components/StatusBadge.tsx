interface StatusBadgeProps {
    status: 'ACTIVE' | 'EXPIRED' | 'FROZEN';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const getStatusClasses = () => {
        switch (status) {
            case 'ACTIVE':
                return 'bg-black text-white';
            case 'EXPIRED':
                return 'bg-gray-400 text-white';
            case 'FROZEN':
                return 'bg-gray-600 text-white';
            default:
                return 'bg-gray-300 text-black';
        }
    };

    return (
        <span className={`inline-block px-3 py-1 text-xs font-medium uppercase tracking-wide ${getStatusClasses()}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
