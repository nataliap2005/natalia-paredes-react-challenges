
-- ============================================================
-- CHALLENGE 08 - TASKFLOW
-- Supabase: PostgreSQL, RLS, Realtime y Storage
-- Autora: Natalia Paredes
-- ============================================================


-- ============================================================
-- 1. CREAR TABLA DE TAREAS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.tareas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    titulo TEXT NOT NULL
        CHECK (char_length(trim(titulo)) BETWEEN 1 AND 160),

    completada BOOLEAN NOT NULL DEFAULT FALSE,

    user_id UUID NOT NULL
        DEFAULT auth.uid()
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para consultar las tareas de cada usuario.
CREATE INDEX IF NOT EXISTS tareas_user_fecha_idx
ON public.tareas (user_id, created_at DESC);


-- ============================================================
-- 2. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.tareas ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 3. PERMISOS DE ACCESO A POSTGRESQL
-- ============================================================

-- Permitir que los usuarios autenticados accedan al esquema.
GRANT USAGE ON SCHEMA public TO authenticated;

-- Permitir operaciones CRUD.
-- Las políticas RLS restringirán cada operación al propietario.
GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public.tareas
TO authenticated;

-- Permisos sobre la secuencia del identificador.
GRANT USAGE, SELECT
ON SEQUENCE public.tareas_id_seq
TO authenticated;


-- ============================================================
-- 4. POLÍTICAS RLS PARA LAS TAREAS
-- ============================================================

-- Eliminar políticas anteriores si ya existen.
DROP POLICY IF EXISTS "ver mis tareas" ON public.tareas;
DROP POLICY IF EXISTS "crear mis tareas" ON public.tareas;
DROP POLICY IF EXISTS "editar mis tareas" ON public.tareas;
DROP POLICY IF EXISTS "borrar mis tareas" ON public.tareas;


-- SELECT: consultar únicamente mis propias tareas.
CREATE POLICY "ver mis tareas"
ON public.tareas
FOR SELECT
TO authenticated
USING (
    (SELECT auth.uid()) = user_id
);


-- INSERT: crear tareas asociadas a mi usuario.
CREATE POLICY "crear mis tareas"
ON public.tareas
FOR INSERT
TO authenticated
WITH CHECK (
    (SELECT auth.uid()) = user_id
);


-- UPDATE: modificar únicamente mis propias tareas.
CREATE POLICY "editar mis tareas"
ON public.tareas
FOR UPDATE
TO authenticated
USING (
    (SELECT auth.uid()) = user_id
)
WITH CHECK (
    (SELECT auth.uid()) = user_id
);


-- DELETE: eliminar únicamente mis propias tareas.
CREATE POLICY "borrar mis tareas"
ON public.tareas
FOR DELETE
TO authenticated
USING (
    (SELECT auth.uid()) = user_id
);


-- ============================================================
-- 5. ACTIVAR SUPABASE REALTIME
-- ============================================================

-- Permite recibir actualizaciones de la tabla tareas
-- cuando se crean, editan o eliminan registros.

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
          AND schemaname = 'public'
          AND tablename = 'tareas'
    ) THEN
        ALTER PUBLICATION supabase_realtime
        ADD TABLE public.tareas;
    END IF;
END;
$$;


-- ============================================================
-- 6. CREAR BUCKET PRIVADO PARA AVATARES
-- ============================================================

-- Almacena fotografías capturadas con Capacitor Camera.
-- Tamaño máximo: 5 MB.
-- Formato permitido: JPEG.

INSERT INTO storage.buckets (
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
)
VALUES (
    'avatars',
    'avatars',
    FALSE,
    5242880,
    ARRAY['image/jpeg']
)
ON CONFLICT (id)
DO UPDATE SET
    public = FALSE,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;


-- ============================================================
-- 7. POLÍTICAS DE SEGURIDAD PARA STORAGE
-- ============================================================

-- Cada usuario tendrá su propia carpeta:
--
-- avatars/
--    UID_USUARIO/
--       fotografia.jpg
--
-- Solo el propietario podrá gestionar sus archivos.


-- Eliminar políticas anteriores si existen.
DROP POLICY IF EXISTS "leer mi avatar"
ON storage.objects;

DROP POLICY IF EXISTS "subir mi avatar"
ON storage.objects;

DROP POLICY IF EXISTS "reemplazar mi avatar"
ON storage.objects;

DROP POLICY IF EXISTS "eliminar mi avatar"
ON storage.objects;


-- SELECT: consultar mis fotografías.
CREATE POLICY "leer mi avatar"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] =
        (SELECT auth.uid())::TEXT
);


-- INSERT: subir fotografías a mi carpeta.
CREATE POLICY "subir mi avatar"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] =
        (SELECT auth.uid())::TEXT
);


-- UPDATE: reemplazar mis propias fotografías.
CREATE POLICY "reemplazar mi avatar"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] =
        (SELECT auth.uid())::TEXT
)
WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] =
        (SELECT auth.uid())::TEXT
);


-- DELETE: eliminar mis fotografías.
CREATE POLICY "eliminar mi avatar"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] =
        (SELECT auth.uid())::TEXT
);
