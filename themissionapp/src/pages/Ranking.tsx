import {useEffect,useState} from 'react';import {IonList,IonItem,IonLabel,IonBadge,IonText} from '@ionic/react';import PageShell from '../components/PageShell';import {subscribeRanking,type RankingEntry} from '../services/rankingService';import {useAuth} from '../contexts/AuthContext';
export default function Ranking(){const {user}=useAuth();const [rows,setRows]=useState<RankingEntry[]>([]),[error,setError]=useState('');
 useEffect(()=>subscribeRanking(setRows,e=>setError(e.message)),[]);
 return <PageShell title="Ranking"><h2>Top 5 participantes</h2><p>Puntuaciones reales de usuarios registrados. No se generan participantes ficticios.</p>
 <IonList inset>{rows.map((entry,i)=><IonItem key={entry.uid} color={entry.uid===user?.uid?'light':undefined}><IonBadge slot="start" color={i===0?'warning':'medium'}>#{i+1}</IonBadge><IonLabel><h2>{entry.displayName||'Participante'}{entry.uid===user?.uid?' (Tú)':''}</h2></IonLabel><IonBadge slot="end">{entry.points||0} pts</IonBadge></IonItem>)}</IonList>
 {!rows.length&&<p>Sin participantes todavía. Registra usuarios para ver el ranking.</p>}
 {rows.length<5&&<p className="hint">Hay {rows.length} participante(s). El top 5 se completará cuando haya cinco cuentas reales.</p>}
 {user&&!rows.some(item=>item.uid===user.uid)&&<p className="hint">Tu cuenta no está entre los primeros cinco lugares.</p>}
 {error&&<IonText color="danger"><p>{error}</p></IonText>}</PageShell>;
}
