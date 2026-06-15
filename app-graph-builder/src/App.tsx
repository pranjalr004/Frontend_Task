import { useMemo, useCallback, useEffect } from "react";
import '@xyflow/react/dist/style.css';
import { Background, BackgroundVariant, ReactFlow, type OnNodesChange } from "@xyflow/react";

import { useAppStore } from "./store/useAppStore";
import { useAppsQuery, useGraphQuery } from "./api/mockApi";
import { CustomServiceNode } from "./components/CustomServiceNode";
import { InspectorPanel } from "./components/InspectorPanel";

const nodeTypes = { serviceNode: CustomServiceNode };

export default function App() {
  const { selectedAppId, setSelectedAppId, selectedNodeId, setSelectedNodeId, isMobilePanelOpen, setIsMobilePanelOpen, appGraphs, deleteNode } = useAppStore();

  const { data: apps, isLoading: loadingApps } = useAppsQuery();
  const { isLoading: loadingGraph } = useGraphQuery(selectedAppId);

  const activeGraph = useMemo(() => {
    return selectedAppId ? appGraphs[selectedAppId] || { nodes: [], edges: [] } : { nodes: [], edges: [] };
  }, [selectedAppId, appGraphs]);

  const onNodesChange = useCallback<OnNodesChange>((changes) => {
    if (!selectedAppId || !appGraphs[selectedAppId]) return;
    changes.forEach((change) => {
      if (change.type === 'select') setSelectedNodeId(change.selected ? change.id : null);
    });
  }, [selectedAppId, appGraphs, setSelectedNodeId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedAppId && selectedNodeId) {
        if (document.activeElement?.tagName === 'INPUT') return;
        deleteNode(selectedAppId, selectedNodeId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAppId, selectedNodeId, deleteNode]);

  const activeAppObj = apps?.find((a) => a.id === selectedAppId);

  return (
    <div className="h-screen w-screen flex bg-[#09090b] text-white overflow-hidden">
      {/* LEFT RAIL */}
      <aside className="w-[64px] bg-[#09090b] border-r border-neutral-900 flex flex-col items-center py-4 justify-between z-20">
        <div className="flex flex-col items-center gap-6 w-full">

          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center font-bold text-black text-xl">
            ◩
          </div>
          {['💡', '🦣', '🟥', '🍃', '🐳', '🎛️'].map((emoji, i) => (
            <button key={i} className="text-xl opacity-50 hover:opacity-100">
              {emoji}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* TOP BAR */}
        <header className="h-16 border-b border-neutral-900 px-6 flex items-center justify-between bg-[#09090b] z-10">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm">
              <span>💡</span>
              <span>{activeAppObj?.name || 'Loading...'}</span>
              <span className="text-neutral-500 ml-2">▼</span>
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-[#09090b] border border-neutral-800 rounded-lg shadow-xl opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all z-50">
              {loadingApps ? <div className="p-3 text-xs text-neutral-500">Loading Apps...</div> : apps?.map((app) => (
                <button key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-neutral-900 text-neutral-300 hover:text-white">
                  <span>{app.icon}</span>{app.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button className="p-2 border border-neutral-800 rounded-md hover:bg-neutral-900">🔗</button>
            <button className="p-2 border border-neutral-800 rounded-md hover:bg-neutral-900">🌙</button>
          </div>
        </header>

        {/* CANVAS */}
        <main className="flex-1 relative bg-[#0e0e11]">
          {
            loadingGraph && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#09090b]/80">
                <span className="text-sm text-neutral-400">Loading graph topology...</span>
              </div>
            )}
          <ReactFlow nodes={activeGraph.nodes} edges={activeGraph.edges} onNodesChange={onNodesChange} nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }}>
            <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#3f3f46" />
          </ReactFlow>
        </main>

        {/* RIGHT PANEL (Desktop) */}
        <aside className="hidden lg:block w-[340px] border-l border-neutral-900 bg-[#09090b] absolute right-0 top-0 h-full z-20">
          <InspectorPanel />
        </aside>

        {/* SLIDE-OVER DRAWER (Mobile) */}
        <div className={`fixed inset-0 z-50 lg:hidden transition-opacity ${isMobilePanelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobilePanelOpen(false)} />
          <div className={`absolute bottom-0 right-0 w-full sm:w-[340px] h-[80vh] sm:h-full bg-[#09090b] border-t sm:border-t-0 sm:border-l border-neutral-900 transition-transform duration-300 ${isMobilePanelOpen ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-x-full'}`}>
            <InspectorPanel />
          </div>
        </div>
      </div>
    </div>
  )
}