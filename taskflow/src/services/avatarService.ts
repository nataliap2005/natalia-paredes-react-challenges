import { supabase } from '../lib/supabase';
// El bucket es privado. Cada usuario guarda su avatar dentro de su propia carpeta.
export function avatarPath(uid: string) {
  return `${uid}/avatar.jpg`;
}
export async function uploadAvatar(uid: string, content: Blob) {
  const { error } = await supabase.storage
    .from('avatars')
    .upload(avatarPath(uid), content, { upsert: true, contentType: 'image/jpeg' });
  if (error) throw error;
}
export async function getAvatarUrl(uid: string) {
  const { data, error } = await supabase.storage.from('avatars').createSignedUrl(avatarPath(uid), 3600);
  if (error) {
    if (/not found|object not found/i.test(error.message)) return null;
    throw error;
  }
  return data.signedUrl;
}
