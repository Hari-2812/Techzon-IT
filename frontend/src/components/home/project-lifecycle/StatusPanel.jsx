import React from 'react';

const statuses = [
  { name: 'Discovery', status: 'Completed' },
  { name: 'Planning', status: 'Completed' },
  { name: 'UI / UX Design', status: 'Completed' },
  { name: 'Development', status: 'In Progress' },
  { name: 'Testing', status: 'Pending' },
  { name: 'Deployment', status: 'Pending' },
  { name: 'Support', status: 'Upcoming' },
  { name: 'Growth', status: 'Upcoming' }
];

export const StatusPanel = () => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_10px_40px_-15px_rgba(36,18,82,0.08)]">
      <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Project Progress</h3>
      
      <div className="space-y-4">
        {statuses.map((item, i) => {
          let statusColor = "text-muted-foreground";
          let dotColor = "bg-muted";
          
          if (item.status === 'Completed') {
            statusColor = "text-emerald-600";
            dotColor = "bg-emerald-500";
          } else if (item.status === 'In Progress') {
            statusColor = "text-[#FF8A3D]";
            dotColor = "bg-[#FF8A3D] animate-pulse";
          }

          return (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className={`font-medium text-xs ${statusColor}`}>{item.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
