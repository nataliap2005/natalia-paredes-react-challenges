export type MissionId = 'photo' | 'movement' | 'stillness';
export type MissionStatus = Record<MissionId, boolean>;
export type Progress = { points: number; missions: MissionStatus; updatedAt?: number };
export type Profile = { displayName: string; email: string; points: number; updatedAt?: number };
export const MISSION_POINTS: Record<MissionId, number> = { photo: 40, movement: 40, stillness: 40 };
export const initialProgress = (): Progress => ({ points: 0, missions: {photo:false,movement:false,stillness:false} });
export const missionDefinitions = [
  {id:'photo' as const,title:'Evidencia fotográfica',description:'Captura y guarda una fotografía con la cámara.',icon:'camera-outline'},
  {id:'movement' as const,title:'Movimiento real',description:'Aléjate 50 metros de tu posición inicial.',icon:'navigate-outline'},
  {id:'stillness' as const,title:'Permanencia activa',description:'Permanece 10 segundos quieto y recibe una vibración.',icon:'hand-left-outline'},
];
