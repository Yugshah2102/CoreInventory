import { getStatusColor } from '@/data/mockData';

export default function StatusBadge({ status }: { status: string }) {
  const colorClass = getStatusColor(status);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass} capitalize`}>
      {status.replace('_', ' ')}
    </span>
  );
}
