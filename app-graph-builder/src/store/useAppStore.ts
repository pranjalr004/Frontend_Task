import { create } from "zustand";
import type { Node, Edge } from "@xyflow/react";

interface AppState{
    selectedAppId:string | null;
    selectedNodeId:string | null;
    isMobilePanelOpen:boolean;
    activeInspectorTab:string;
    appGraphs:Record<string,{nodes:Node[];edges:Edge[]}>;

    setSelectedAppId:(id:string | null)=>void;
    setSelectedNodeId:(id:string | null)=>void;
    setIsMobilePanelOpen:(open:boolean)=>void;
    setActiveInspectorTab:(tab:string)=>void;
    setGraphData:(appId:string,nodes:Node[],edges:Edge[])=>void;
    updateNodeData:(appId:string,nodeId:string,fields:Record<string,any>)=>void;
    deleteNode:(appId:string,nodeId:string)=>void;
}

export const useAppStore=create<AppState>((set)=>({
    selectedAppId:'supertoken-golang',
    selectedNodeId:null,
    isMobilePanelOpen:false,
    activeInspectorTab:'config',
    appGraphs:{},

    setSelectedAppId:(id)=>set({
        selectedAppId:id,selectedNodeId:null,isMobilePanelOpen:false
    }),

    setSelectedNodeId:(id)=>set((state)=>({
        selectedNodeId:id,
        isMobilePanelOpen:id ? true : state.isMobilePanelOpen
    })),

    setIsMobilePanelOpen:(open)=>set({isMobilePanelOpen:open}),
    setActiveInspectorTab:(tab)=>set({activeInspectorTab:tab}),

    setGraphData:(appId,nodes,edges)=>
        set((state)=>({
            appGraphs:{...state.appGraphs,[appId]:{nodes,edges}}
        })),

    updateNodeData:(appId,nodeId,fields)=>
        set((state)=>{
            const currentGraph=state.appGraphs[appId];
            if(!currentGraph) return {};

            const updatedNodes=currentGraph.nodes.map((node)=>
            node.id===nodeId ? {...node,data:{...node.data,...fields}} : node
            );
            
            return {appGraphs:{...state.appGraphs,[appId]:{...currentGraph,nodes:updatedNodes}}};
        }),
    
    deleteNode:(appId,nodeId)=>
        set((state)=>{
            const currentGraph=state.appGraphs[appId];
            if(!currentGraph) return {};

            return {
                selectedNodeId:state.selectedNodeId===nodeId ? null:state.selectedNodeId,
                appGraphs:{
                    ...state.appGraphs,
                    [appId]:{
                        nodes:currentGraph.nodes.filter((n)=>n.id!==nodeId),
                        edges:currentGraph.edges.filter((e)=>e.source!==nodeId && e.target!==nodeId),
                    }
                }
            }
        })
}))