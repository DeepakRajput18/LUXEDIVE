import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

const WORKER_URL = 'http://localhost:3001/worker-status';
const POLL_INTERVAL = 10000; // 10 seconds

const WorkerStatus: React.FC = () => {
  const [status, setStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [lastCheck, setLastCheck] = useState<string | null>(null);

  const checkStatus = async () => {
    try {
      const response = await fetch(WORKER_URL);
      if (response.ok) {
        setStatus('online');
        setLastCheck(new Date().toLocaleTimeString());
      } else {
        setStatus('offline');
      }
    } catch (error) {
      setStatus('offline');
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        {status === 'checking' && (
          <Activity className="w-3 h-3 text-gray-500 animate-pulse" />
        )}
        {status === 'online' && (
          <CheckCircle2 className="w-3 h-3 text-green-500" />
        )}
        {status === 'offline' && (
          <AlertCircle className="w-3 h-3 text-red-500" />
        )}
        
        <span className={`text-[10px] font-bold uppercase tracking-wider ${
          status === 'online' ? 'text-green-500' : 
          status === 'offline' ? 'text-red-500' : 'text-gray-500'
        }`}>
          Worker {status === 'online' ? 'Running' : status === 'offline' ? 'Offline' : 'Checking...'}
        </span>
      </div>

      {status === 'online' && lastCheck && (
        <span className="text-[9px] text-gray-600 border-l border-white/10 pl-2">
          Last seen: {lastCheck}
        </span>
      )}
    </div>
  );
};

export default WorkerStatus;
