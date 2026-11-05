import { supabase } from '../lib/supabase';
import type { Task } from '../types/task';

export async function fetchTasks(userId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tareas')
    .select('id,titulo,completada,user_id,created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Task[];
}
export async function createTask(titulo: string, userId: string) {
  const { error } = await supabase.from('tareas').insert({ titulo: titulo.trim(), user_id: userId });
  if (error) throw error;
}
export async function editTask(id: number, titulo: string, userId: string) {
  const { error } = await supabase.from('tareas').update({ titulo: titulo.trim() }).eq('id', id).eq('user_id', userId);
  if (error) throw error;
}
export async function toggleTask(id: number, completed: boolean, userId: string) {
  const { error } = await supabase.from('tareas').update({ completada: completed }).eq('id', id).eq('user_id', userId);
  if (error) throw error;
}
export async function removeTask(id: number, userId: string) {
  const { error } = await supabase.from('tareas').delete().eq('id', id).eq('user_id', userId);
  if (error) throw error;
}
