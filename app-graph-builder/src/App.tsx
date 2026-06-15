import { useMemo,useCallback,useEffect } from "react";
import { ReactFlow,Background,BackgroundVariant,type Node,type OnNodesChange,useReactFlow,ReactFlowProvider } from "@xyflow/react";
import '@xyflow/react/dist/style.css';

import { useAppStore } from "./store/useAppStore";
import { useAppsQuery,useGraphQuery } from "./api/mockApi";
import { ServiceNode } from "./components/nodes/ServiceNode";
import { DbNode } from "./components/nodes/DbNode";
import { InspectorPanel } from "./components/InspectorPanel";
import type { ServiceNodeData, DbNodeData } from "./store/useAppStore";

// Register both node types matching Bonus Item 2 (Service vs DB Styles)

const nodeType={
  serviceNode:ServiceNode,
  dbNode:DbNode
};

function AppFlow(){
  const {selectedAppId,setSelectedAppId,selectedNodeId,setSelectedNodeId,isMobilePanelOpen,setIsMobilePanelOpen,appGraphs,deleteNode,setGraphData}=useAppStore();
  const {fitView}=useReactFlow();

  const{data:apps,isLoading:loadingApps,isError:errorApps}=useAppsQuery();
  const{isLoading:loadingGraph,isError:errorGraph}=useGraphQuery(selectedAppId);

  const activeGraph=useMemo(()=>{
    return selectedAppId ? appGraphs[selectedAppId] || {nodes:[],edges:[]}:{nodes:[],edges:[]};
  },[selectedAppId,appGraphs]);

  const onNodesChange=useCallback<OnNodesChange>((changes)=>{
    if(!selectedAppId || !appGraphs[selectedAppId]) return;
    changes.forEach((change)=>{
      if(change.type==='select'){
        setSelectedNodeId(change.selected? change.id : null);
      }
    });
  },[selectedAppId,appGraphs,setSelectedNodeId]);

  useEffect(()=>{
    const handleKeyDown=(e:KeyboardEvent)=>{
      // Prevent Shortcut interference while typing in forms
      if(document.activeElement?.tagName==='INPUT' || document.activeElement?.tagName==='TEXTAREA') return;

      if(e.key==='f'){
        fitView({padding:0.2});
      }
      else if(e.key==='p'){
        setIsMobilePanelOpen(!isMobilePanelOpen);
      } else if((e.key==='Delete' || e.key==='Backspace') && selectedAppId && selectedNodeId){
        deleteNode(selectedAppId,selectedNodeId)
      }
    };
    window.addEventListener('keydown',handleKeyDown);
    return()=>window.removeEventListener('keydown',handleKeyDown);
  },[fitView,isMobilePanelOpen,setIsMobilePanelOpen,selectedAppId,selectedNodeId,deleteNode]);

  // Bonus Item 1(Add node): Generic Function to construct and add dynamic nodes to the current store graph state. Construct styles matching the image
  const handleAddNode=(type:'serviceNode' | 'dbNode')=>{
    if(!selectedAppId) return;

    const newNodeId=Date.now().toString();
    const isService=type==='serviceNode';

    const baseNode:Node={
      id:newNodeId,
      type:type,
      // Add node at the current center view of the ReactFlow Canvas
      position:{x:(Math.random()-0.5) * 400,y:(Math.random()-0.5) * 300},
      data:{}
    };

    if(isService){
      baseNode.data={label:`Service ${newNodeId.slice(-4)}`,status:'Success',cost:0.03,metricType:'CPU',metricValue:30} as ServiceNodeData;
    }else{
      baseNode.data={label:`Database ${newNodeId.slice(-4)}`,status:'Success',cost:0.05,metricType:'Usage',metricValue:15} as DbNodeData;
    }

    const currentGraph=appGraphs[selectedAppId] || {nodes:[],edges:[]};
    const updatedNodes=[...currentGraph.nodes,baseNode];

    setGraphData(selectedAppId,updatedNodes,currentGraph.edges);

    // Automatically select the new node for immediate configuration
    setTimeout(()=>setSelectedNodeId(newNodeId),50);
  };

  const activeAppObj=apps?.find((a)=>a.id === selectedAppId);

  return(
    <div className="h-screen w-screen flex bg-[#09090b] text-white select-none overflow-hidden font-sans">
      {/* LEFT RAIL */}
      <aside className="w-[64px] bg-[#09090b] border-r border-neutral-900 flex flex-col items-center py-4 justify-between shrink-0">
        <div className="flex flex-col items-center gap-6 w-full">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold tracking-tighter text-white text-base shadow-lg shadow-indigo-500/20">A</div>
        <div className="w-8 h-[1px] bg-neutral-900"/>
        {['📁', '🦣', '🟥', '🍃', '🐳', '🎛️'].map((emoji,index)=>(
          <button key={index} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${index===0 ? 'bg-neutral-900/80 text-white':'text-neutral-500 hover:bg-neutral-900/40 hover:text-neutral-300'}`}>
            <span className="text-sm grayscale-[30%]">{emoji}</span>
          </button>
        ))}
        </div>
        <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs text-neutral-400 hover:bg-neutral-700 cursor-pointer">U</div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* TOP BAR */}
        <header className="h-16 border-b bg-neutral-900 px-6 flex items-center justify-between bg-[#09090b]/80 backdrop-blur-md z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-sm font-medium hover:bg-neutral-800 transition-all">
              <span className="text-neutral-400">💡</span>
              <span className="tracking-wide text-neutral-200">{activeAppObj?.name || 'Loading Architecture...'}</span>
              <span className="text-neutral-500 text-xs ml-1">▼</span>
            </button>
            <div className="absolute left-0 mt-1.5 w-56 bg-neutral-950 border border-e-neutral-900 rounded-xl shadow-2xl opacity-0 scale-95 pointer-events-none group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:pointer-events-auto transition-all duration-150 p-1.5 z-50">
            {loadingApps ? <div className="text-xs to-neutral-500 p-2 font-mono">Querying options...</div> :
            apps?.map((app)=>(
              <button key={app.id} onClick={()=>setSelectedAppId(app.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg text-left transition-all ${selectedAppId === app.id ? 'bg-indigo-600 text-white font-medium' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'}`}
              >
                <span>{app.icon}</span><span className="truncate">{app.name}</span>
              </button>
            ))}
            </div>
          </div>
        </div>
          
        <div className="flex items-center gap-3">
          {/* Bonus Item 1 (Add Node): Buttons implemented in header for constructing Service and DB nodes */}
          <button onClick={()=>handleAddNode('serviceNode')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-indigo-900/40 border-indigo-500/30 text-indigo-200 hover:bg-indigo-800/60"
            >
              + Service Node
          </button>
            <button onClick={()=>handleAddNode('dbNode')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-teal-900/40 border-teal-500/30 text-teal-200 hover:bg-teal-800/60"
              >
                + DB Node
            </button>
            <div className="h-4 w-[1px] bg-neutral-900 mx-1"/>
            <div className="flex gap-1.5">
              <button className="text-neutral-500 hover:text-white p-1 text-sm opacity-50 hover:opacity-100 transition">🌙</button>
            </div>
        </div>
        </header>

        {/* Workspaceiddle PLATFORM: ReactFlow Canvas */}
        <main className="flex-1 min-h-0 w-full relative bg-[#09090b]">
          {loadingGraph ? (
            <div className="absolute inset-0 z-40 bg-[#09090b]/60 backdrop-blur-xs flex items-center justify-center text-neutral-400">
              Loading topology...
            </div>
          ): (errorApps || errorGraph) ? (
            <div className="absolute inset-0 z-40 bg-[#09090b] flex flex-col items-center justify-center p-6 text-center text-neutral-500">Lookup Error</div>
          ): null}

        <ReactFlow
          nodes={activeGraph.nodes}
          edges={activeGraph.edges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeType}
          fitView
          className="w-full h-full"
          proOptions={{hideAttribution:true}}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#222226"/>
          </ReactFlow>
        </main>

        {/* Desktop Inspector Panel */}
        <aside className="hidden lg:block w-[360px] border-l border-neutral-900 bg-[#09090b] h-full absolute right-0 top-0 z-20 shadow-2xl">
          <InspectorPanel/>
        </aside>

        {/* Mobile Slide-Over Bottom Sheet */}
        <div className={`fixed inset-0 z-50 lg:hidden pointer-events-none transition-all duration-500 ${isMobilePanelOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-black/60 pointer-events-auto backdrop-blur-xl" onClick={()=>setIsMobilePanelOpen(false)}/>
          <div className={`absolute bottom-0 right-0 w-full sm:max-w-[400px] h-[80vh sm:h-full bg-[#09090b] border-t sm:border-t-0 sm:border-l border-r-neutral-900 pointer-events-auto transform transition-transform duration-300 ease-out flex flex-col ${isMobilePanelOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            <InspectorPanel/>
          </div>
        </div>

      </div>
    </div>
  );
}

// Wrap with Provider for useReactfflow hook access in AppFlow
export default function App(){
  return (
    <ReactFlowProvider>
      <AppFlow/>
    </ReactFlowProvider>
  )
}