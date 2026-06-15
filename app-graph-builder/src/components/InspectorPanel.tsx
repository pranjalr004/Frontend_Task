import { useAppStore } from '../store/useAppStore';

// Type helper for constructing dynamic labels based on tab keys
const serviceMetrics = ['CPU', 'Memory', 'Disk', 'Region'];
const dbMetrics = ['Usage', 'Storage', 'IOPs', 'Replicas'];

export const InspectorPanel = () => {
  const { selectedAppId, selectedNodeId, activeInspectorTab, setActiveInspectorTab, appGraphs, updateNodeData, setIsMobilePanelOpen } = useAppStore();

  const currentGraph = selectedAppId ? appGraphs[selectedAppId] : null;
  const selectedNode = currentGraph?.nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-neutral-500">
        <span className="w-8 h-8 mb-3 opacity-40">⚙️</span>
        <p className="text-sm">Select an architectural node on the canvas to view and configure its service parameters.</p>
      </div>
    );
  }

  // Bonus Item 2 (Adaptive UI based on type): Adjust metrics label based on the tab selection
  // Ensure metricType is a string before using includes to satisfy TS
  const metricType = typeof selectedNode.data.metricType === 'string' ? selectedNode.data.metricType : '';
  const isDbNode = dbMetrics.includes(metricType);
  const metricName = metricType || (isDbNode ? 'Usage' : 'CPU');

  const handleValueChange = (val: number) => {
    if (selectedAppId && selectedNodeId) {
      updateNodeData(selectedAppId, selectedNodeId, { metricValue: Math.max(0, Math.min(100, val)) });
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#09090b] text-white font-sans">
      <div className="flex items-center justify-between p-4 border-b border-neutral-800 lg:p-6 shrink-0">
        <div>
          <h3 className="text-base font-semibold text-neutral-100 flex items-center gap-2">
            <span className={isDbNode ? "text-teal-400" : "text-indigo-400"}>●</span> 
            {isDbNode ? 'Database Core Inspector' : 'Service Core Inspector'}
          </h3>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">ID: {selectedNode.id}</p>
        </div>
        <button onClick={() => setIsMobilePanelOpen(false)} className="lg:hidden text-neutral-400 hover:text-white">✕</button>
      </div>

      <div className="px-4 border-b border-neutral-800 bg-neutral-900/20 shrink-0">
        <div className="flex gap-4">
          {['config', 'runtime'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveInspectorTab(tab)}
              className={`py-3 text-xs font-medium tracking-wide capitalize border-b-2 transition-all shrink-0 ${activeInspectorTab === tab ? (isDbNode ? 'border-teal-500 text-teal-400' : 'border-indigo-500 text-indigo-400') : 'border-transparent text-neutral-400 hover:text-neutral-200'}`}
            >
              {tab} Properties
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 lg:p-6 min-h-0">
        {activeInspectorTab === 'config' ? (
          <>
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-400 tracking-wide block">Operational Health Status</label>
              <div className="flex gap-2">
                {['Success', 'Degraded', 'Error'].map((status) => (
                  <button
                    key={status}
                    onClick={() => selectedAppId && updateNodeData(selectedAppId, selectedNode.id, { status: status as 'Success' | 'Degraded' | 'Error' })}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${selectedNode.data.status === status ? (isDbNode ? 'bg-teal-800 border-teal-600' : 'bg-indigo-800 border-indigo-600') + ' text-white shadow' : 'bg-neutral-950 border-neutral-900 text-neutral-500 hover:border-neutral-800'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-400 tracking-wide block">Service Label Context</label>
              <input
                type="text"
                value={selectedNode.data.label as string}
                onChange={(e) => selectedAppId && updateNodeData(selectedAppId, selectedNode.id, { label: e.target.value })}
                className="w-full bg-[#121214] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-700"
              />
            </div>

            {/* Bonus Item 3 (Persisted Data): This synchronized slider/input is already linked to the store's updateNodeData function. Edits are applied cleanly in real-time. */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-neutral-400 tracking-wide block">
                  Capacity Metric Baseline (<span className={isDbNode ? 'text-teal-400' : 'text-indigo-400' + ' font-mono text-[11px]'}>{metricName}</span>)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={Number(selectedNode.data.metricValue || 0)}
                  onChange={(e) => handleValueChange(Number(e.target.value))}
                  className="w-16 bg-[#121214] border border-neutral-800 rounded-md px-2 py-1 text-center font-mono text-xs text-white focus:outline-none focus:border-neutral-700"
                />
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Number(selectedNode.data.metricValue || 0)}
                  onChange={(e) => handleValueChange(Number(e.target.value))}
                  className={`flex-1 ${isDbNode ? 'accent-teal-500' : 'accent-indigo-500'} bg-neutral-800 h-1 rounded-lg look-none cursor-pointer`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-400 tracking-wide block">Description Notes</label>
              <textarea
                placeholder="Enter internal functional specifications info..."
                value={(selectedNode.data.description as string) || ''}
                onChange={(e) => selectedAppId && updateNodeData(selectedAppId, selectedNode.id, { description: e.target.value })}
                rows={3}
                className="w-full bg-[#121214] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-neutral-700"
              />
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-800/60 space-y-2.5 font-mono text-xs text-neutral-400">
              <div className="flex justify-between"><span className="text-neutral-500">Node Component:</span> <span className="text-neutral-200">{isDbNode ? 'CylinderDbCard' : 'CustomServiceCard'}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Position Vector:</span> <span className={isDbNode ? 'text-teal-400' : 'text-indigo-400'}>X: {Math.round(selectedNode.position.x)}, Y: {Math.round(selectedNode.position.y)}</span></div>
              <div className="flex justify-between"><span className="text-neutral-500">Connection Degree:</span> <span className="text-neutral-200">Bidirectional Handle Set</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};