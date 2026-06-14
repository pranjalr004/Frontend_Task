import { type Node, Position } from "@xyflow/react";
import { Handle } from "@xyflow/react";
import type { NodeProps } from "@xyflow/react";

import { useAppStore } from "../store/useAppStore";



export const CustomServiceNode=({id,data,selected}:NodeProps)=>{
    const selectedAppId=useAppStore((state)=>state.selectedAppId);
    const updateNodeData=useAppStore((state)=>state.updateNodeData);

    const statusColors:Record<string,string>={
        Success:'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        Degraded:'bg-amber-500/10 text-amber-400 border-500/30',
        Error:'bg-rose-500/10 text-rose-400 border-rose-500/30',
    };

    const handleMetricTabChange=(type:string)=>{
        if(selectedAppId) updateNodeData(selectedAppId,id,{metricType:type});
    };

    return(
        <div className="`w-[320px] bg-[#0d0d0e] border rounded-xl shadow-2xl p-4 text-white font-sans transition-all ${selected ? 'border-indigo-500 ring-1 ring-indigo-500/50' : 'border-[#222226]'}`}>">
            <Handle type='target' position={Position.Left} className="!bg-neutral-600 !border-none !w-2 !h-2"/>

        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-bold">
                    {String(data.label || 'S').charAt(0)}
                </div>
                <h4 className="text-[14px] font-medium">{data.label as string}</h4>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded">
                ${Number(data.cost || 0).toFixed(2)}/HR
                </span>
            </div>
        </div>
        <div className="flex bg-neutral-900/60 p-1 rounded-lg border border-neutral-800/80 mb-3 text-[11px] font-medium text-neutral-400">
        {['CPU','Memory','Disk','Region'].map((tab)=>(
            <button key={tab} onClick={(e)=>{
                e.stopPropagation(); handleMetricTabChange(tab);
            }}
            className={`flex-1 py-1 rounded-md transition-all ${data.metricType===tab ? 'bg-neutral-800 text-white' : 'hover:text-neutral-200'}`}
            >
                {tab}
            </button>
        ))}
        </div>

        <div className="space-y-2 mb-4">
        <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-rose-500 transition-all" style={{width:`${data.metricValue || 0}%`}}/>
        </div>
        <div className="flex justify-end text-[10px] font-mono text-neutral-400">
        {(Number(data.metricValue || 0)/100).toFixed(2)}
        </div>
        </div>

        <div className="flex items-center justify-between pt-2">
        <div className={`px-2 py-0.5 rounded flex items-center gap-1.5 text-[11px] font-medium border ${statusColors[data.status as string] || statusColors.Success}`}>
            {data.status === 'Error' ? '⚠️' : '✓'}{data.status as string}
        </div>
        <div className="text-amber-500 text-xs font-bold tracking-wider">aws</div>
        </div>

        <Handle type='source' position={Position.Right} className="!bg-neutral-600 !border-none !w-2 !h-2"/>
        </div>
    );
};