import { useAppStore } from "../store/useAppStore";

export const InspectorPanel = () => {
    const { selectedAppId, selectedNodeId, activeInspectorTab, setActiveInspectorTab, appGraphs, updateNodeData, setIsMobilePanelOpen } = useAppStore();

    const currentGraph = selectedAppId ? appGraphs[selectedAppId] : null;
    const selectedNode = currentGraph?.nodes.find((n) => n.id === selectedNodeId);

    if (!selectedNode) {
        return (
            <div className="h-full flex items-center justify-center p-6 text-center text-neutral-500 text-sm">
                Select a node to inspect its properties.
            </div>
        );
    }

    const handleValueChange = (val: number) => {
        if (selectedAppId && selectedNodeId) {
            updateNodeData(selectedAppId, selectedNodeId, { metricValue: Math.max(0, Math.min(100, val)) });
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#09090b] text-white ">
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                <h3 className="font-semibold text-neutral-100">Service Node</h3>
                <button onClick={() => setIsMobilePanelOpen(false)} className="lg:hidden text-neutral-400">✕</button>
            </div>

            <div className="flex border-b border-r-neutral-800">
                {['Config', 'Runtime'].map((tab) => (
                    <button key={tab} onClick={() => setActiveInspectorTab(tab.toLowerCase())}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-all ${activeInspectorTab === tab.toLowerCase() ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-neutral-500 hover:text-neutral-300'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {activeInspectorTab === 'config' ? (
                    <>
                        <div className="space-y-2">
                            <label className="text-xs text-neutral-400">Status</label>
                            <div className="flex gap-2">
                                {['Success', 'Degraded', 'Error'].map((status) => (
                                    <button key={status} onClick={() => selectedAppId && updateNodeData(selectedAppId, selectedNode.id, { status })}
                                        className={`flex-1 py-1.5 text-xs rounded border ${selectedNode.data.status ? 'bg-neutral-800 border-neutral-600 text-white' : 'bg-transparent border-neutral-800 text-neutral-500'}`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-neutral-400">
                                Node Name
                            </label>
                            <input type="text" value={selectedNode.data.label as string}
                                onChange={(e) => selectedAppId && updateNodeData(selectedAppId, selectedNode.id, { label: e.target.value })}
                                className="w-full bg-[#121214] border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-200 outline-none focus:border-indigo-600"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs text-neutral-400">
                                Usage Metric
                            </label>
                            <div className="flex items-center gap-4">
                                <input type='range' min='0' max='100' value={Number(selectedNode.data.metricValue || 0)}
                                    onChange={(e) => handleValueChange(Number(e.target.value))}
                                    className="flex-1 accent-indigo-500"
                                />
                                <input type="number" min='0' max='100' value={Number(selectedNode.data.metricValue || 0)}
                                    onChange={(e) => handleValueChange(Number(e.target.value))}
                                    className="w-16 bg-[#121214] border border-neutral-800 rounded px-2 py-1 text-center font-mono text-xs outline-none focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-xs text-neutral-500 font-mono">
                        ID:{selectedNode.id} <br />
                        Pos: X {Math.round(selectedNode.position.x)}, Y {Math.round(selectedNode.position.y)}
                    </div>
                )}
            </div>
        </div>
    );
};