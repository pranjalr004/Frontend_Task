import React from "react";
import { Position,type NodeProps, Handle} from "@xyflow/react";
import { useAppStore } from "../../store/useAppStore";

export const DbNode=({id,data,selected}:NodeProps)=>{
    const selectedAppId=useAppStore((state)=>state.selectedAppId);
    const updateNodeData=useAppStore((state)=>state.updateNodeData);

    const statusColors:Record<string,string>={
        Success:'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        Degraded:'bg-amber-500/10 text-amber-400 border-amber-500/30',
        Error:'bg-rose-500/10 text-rose-400 border-rose-500/30',
    };

    const handleMetricTabChange=(type:string)=>{
        if(selectedAppId){
            updateNodeData(selectedAppId,id,{metricType:type});
        }
    };

    return (
        <div className={`w-[280px] bg-[#0d0d0e] border rounded-t-lg rounded-b-xl shadow-2xl p-4 text-white font-sans transition-all duration-200 ${selected ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-[#222226]'}`}>
            <Handle type='target' position={Position.Left} className="!bg-neutral-600 !w-2 !h-2"/>

        {/* Cylindrical Accent Top matching image_11.png */}
        <div className="absolute -top-1.5 left-0 w-full h-3 bg-[#0d0d0e] border-t border-l border-r border-[#222226] rounded-t-full z-10">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[85%] h-[1px] bg-neutral-900"/>
        </div>

        <div className="flex items-center justify-between mb-4 mt-2 relative z-20">
            <div className="flex items-center gap-2.5">
                {/* Cylindrical icon placeholder with teal hint */}
                <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-sm font-semibold text-teal-400">
                {data.label ? String(data.label).charAt(0): 'D'}
                </div>
                <h4 className="text-[14px] font-medium text-neutral-200">{data.label as string}</h4>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-medium tracking-tight bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded border border-teal-500/20">
                </span>
            <button className="text-neutral-500 hover:text-neutral-300">⚙️</button>
            </div>
        </div>

        <div className="fllex bg-neutral-900/60 p-0.5 rounded-lg border border-neutral-800/80 mb-3 text-[11px] font-medium text-neutral-400 relative z-20">
        {['Usage','Storage','IOPs','Replicas'].map((tab)=>(
            <button key={tab} onClick={(e)=>{e.stopPropagation(); handleMetricTabChange(tab);}}
            className={`flex-1 py-1 rounded-md transition-all ${data.metricType===tab ? 'bg-neutral-800 text-teal-300 shadow' : 'hover:text-neutral-200'}`}
            >
                {tab}
            </button>
        ))}
        </div>

            <div className="space-y-2 mb-4 relative z-20">
                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 via-emerald-500 via-amber-400 to-rose-500 transition-all duration-150" style={{width:`${data.metricValue || 0}%`}}
                    />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                    <span>{String(data.metricType)} Usage Level</span>
                    <span className="text-white font-medium">{Number(data.metricValue) || 0}%</span>
                </div>
            </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
            <div className={`px-2 py-0.5 rounded-full text-[11px] font-medium border flex items-center gap-1.5 ${statusColors[data.status as string] || statusColors.Success}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current"/>
                {data.status as string}
            </div>
            <div className="text-amber-500 text-xs font-bold tracking-wider opacity-60">aws</div>
        </div>
        <Handle type='source' position={Position.Right} className="!bg-neutral-600 !w-2 !h-2"/>
        </div>
    );
};