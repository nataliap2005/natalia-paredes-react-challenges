import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { fetchTasks } from '../services/taskService';
import type { Task } from '../types/task';

export function useTasks(userId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    if (!userId) {
      setTasks([]);
      setLoading(false);
      return;
    }
    try {
      const records = await fetchTasks(userId);
      setTasks(records);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    setLoading(true);
    void refresh();
    if (!userId) return;
    // RLS protege los registros y el canal refresca la lista ante cambios externos.
    const channel = supabase
      .channel(`tareas-${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tareas' }, () => {
        void refresh();
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [userId, refresh]);
  return { tasks, loading, error, refresh };
}
