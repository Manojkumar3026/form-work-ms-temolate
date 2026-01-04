import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Activity, FileCheck, AlertCircle, Clock } from 'lucide-react';

const data = [
  { name: 'SOPs', released: 42, draft: 8 },
  { name: 'Pol', released: 12, draft: 2 },
  { name: 'Tech', released: 25, draft: 15 },
  { name: 'Risk', released: 18, draft: 5 },
  { name: 'V&V', released: 30, draft: 10 },
];

const StatCard: React.FC<{ title: string; value: string; sub: string; icon: React.ReactNode; color: string }> = ({ title, value, sub, icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
      <p className="text-xs text-slate-400 mt-1">{sub}</p>
    </div>
    <div className={`p-3 rounded-lg ${color} text-white`}>
      {icon}
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-500">Overview of your Quality Management System.</p>
        </div>
        <div className="text-sm text-slate-500">Last synced: Just now</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Overall Compliance" 
          value="87%" 
          sub="+2.4% from last month" 
          icon={<Activity size={20} />} 
          color="bg-blue-600"
        />
        <StatCard 
          title="Released Documents" 
          value="127" 
          sub="15 pending review" 
          icon={<FileCheck size={20} />} 
          color="bg-emerald-500"
        />
        <StatCard 
          title="Open CAPAs" 
          value="3" 
          sub="1 critical priority" 
          icon={<AlertCircle size={20} />} 
          color="bg-amber-500"
        />
        <StatCard 
          title="Pending Tasks" 
          value="12" 
          sub="Due this week" 
          icon={<Clock size={20} />} 
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Document Status Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="released" name="Released" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="draft" name="Draft" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
            <div className="space-y-6">
                {[
                    { user: 'Sarah Connor', action: 'Approved SOP-001', time: '2 hours ago', icon: '✅' },
                    { user: 'Mike Ross', action: 'Commented on TF-XYZ', time: '4 hours ago', icon: '💬' },
                    { user: 'Harvey Specter', action: 'Created NCR-2023-45', time: 'Yesterday', icon: '⚠️' },
                    { user: 'System', action: 'Backup Completed', time: 'Yesterday', icon: '💾' },
                ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-sm">
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-800">{item.action}</p>
                            <p className="text-xs text-slate-500">by {item.user} • {item.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
                View All Activity
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;