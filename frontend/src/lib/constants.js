export const COLUMNS = [
  {
    id: 'todo',
    label: 'To Do',
    description: 'Tasks waiting to be started',
    topBar: 'bg-[#0c66e4]',
    header: 'text-[#0c66e4]',
    badge: 'bg-[#deebff] text-[#0c66e4]',
    cardAccent: 'border-l-[#0c66e4]',
    cardHover: 'hover:border-[#0c66e4]/50',
    ring: 'ring-[#0c66e4]/30',
    btn: 'bg-[#0c66e4] hover:bg-[#0055cc]',
  },
  {
    id: 'in_progress',
    label: 'In Progress',
    description: 'Tasks currently being worked on',
    topBar: 'bg-[#c25100]',
    header: 'text-[#c25100]',
    badge: 'bg-[#fff3e0] text-[#c25100]',
    cardAccent: 'border-l-[#c25100]',
    cardHover: 'hover:border-[#c25100]/50',
    ring: 'ring-[#c25100]/30',
    btn: 'bg-[#c25100] hover:bg-[#a84400]',
  },
  {
    id: 'done',
    label: 'Done',
    description: 'Completed tasks',
    topBar: 'bg-[#1f845a]',
    header: 'text-[#1f845a]',
    badge: 'bg-[#dcfff1] text-[#1f845a]',
    cardAccent: 'border-l-[#1f845a]',
    cardHover: 'hover:border-[#1f845a]/50',
    ring: 'ring-[#1f845a]/30',
    btn: 'bg-[#1f845a] hover:bg-[#186b47]',
  },
];

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000';

export const formatCardDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
