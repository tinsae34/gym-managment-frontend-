import { MemberStatus } from '@/types';
import { cn } from '@/utils/cn';

interface StatusBadgeProps {
    status: MemberStatus;
    className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
    const variants: Record<MemberStatus, string> = {
        ACTIVE: 'badge-active',
        EXPIRED: 'badge-expired',
        FROZEN: 'badge-frozen',
    };

    return (
        <span className={cn('badge', variants[status], className)}>
            {status}
        </span>
    );
}
