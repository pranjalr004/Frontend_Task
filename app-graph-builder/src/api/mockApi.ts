import { useQuery } from "@tanstack/react-query";
import type { Node, Edge } from "@xyflow/react";
import { useAppStore } from "../store/useAppStore";
import { useEffect } from "react";

const MOCK_APPS=[
    {id:'supertokens-golang',name:'supertokens-golang',icon:'💡'},
    {id:'supetokens-java',name:'supertokens-java',icon:'⚙️'},
    {id:'supertokens-python',name:'supertokens-python',icon:'🚀'},
];

const INITIAL_GRAPHS:Record<string,{nodes:Node[];edges:Edge[]}>={
    'supertokens-golang':{
        nodes:[
            { id: 'postgres', type: 'serviceNode', position: { x: 500, y: 150 }, data: { label: 'Postgres', status: 'Success', cost: 0.03, metricType: 'CPU', metricValue: 20 } },
      { id: 'redis', type: 'serviceNode', position: { x: 200, y: 400 }, data: { label: 'Redis', status: 'Error', cost: 0.03, metricType: 'CPU', metricValue: 85 } },
      { id: 'mongodb', type: 'serviceNode', position: { x: 550, y: 450 }, data: { label: 'MongoDB', status: 'Error', cost: 0.03, metricType: 'Memory', metricValue: 45 } },
    ],
    edges:[
        { id: 'e1-2', source: 'postgres', target: 'redis', animated: true, style: { stroke: '#4b5563' } },
      { id: 'e2-3', source: 'redis', target: 'mongodb', style: { stroke: '#4b5563' } },
    ]
    }
};

const delay=(ms:number)=>new Promise((res)=>setTimeout(res,ms));

export const useAppsQuery=()=>{
    return useQuery({
        queryKey:['apps'],
        queryFn:async()=>{
            await delay(500);
            return MOCK_APPS;
        }
    });
};

export const useGraphQuery=(appId:string | null)=>{
    const {setGraphData,appGraphs}=useAppStore();

    const query=useQuery({
        queryKey:['graph',appId],
        queryFn:async()=>{
            await delay(600);
            return INITIAL_GRAPHS[appId || ''] || {nodes:[],edges:[]};
        },
        enabled:!!appId && !appGraphs[appId],
    });

    useEffect(()=>{
        if(query.data && appId && !appGraphs[appId]){
            setGraphData(appId,query.data.nodes,query.data.edges);
        }
    },[query.data,appId,setGraphData,appGraphs])

    return query;
}