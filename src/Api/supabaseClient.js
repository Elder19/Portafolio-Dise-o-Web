import { createClient } from "@supabase/supabase-js";

// ------------------------------------
// CONFIGURACIÓN DE SUPABASE
// ------------------------------------

// Tu URL del proyecto (correcta)
const supabaseUrl = "https://tfdgohycjzotxvzhywok.supabase.co";

// 🚀 ESTA ES LA ANON LEGACY KEY (la correcta para REST v1)
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmZGdvaHljanpvdHh2emh5d29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1OTE1NzAsImV4cCI6MjA3OTE2NzU3MH0.47hQBxTNM9q_-SkH6YNxUJcpmiDsvUBGJnTbuB5T3cw";

// Crear cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

// ------------------------------------
// GET → OBTENER COMENTARIOS
// ------------------------------------
export async function getComentarios() {
  const { data, error } = await supabase
    .from("Comentarios")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error GET:", error);
    throw error;
  }

  return data;
}

// ------------------------------------
// POST → AGREGAR COMENTARIO
// ------------------------------------
export async function addComentario(nombre, comentario) {
  const { data, error } = await supabase
    .from("Comentarios")
    .insert([{ nombre, comentario }]);

  if (error) {
    console.error("Error POST:", error);
    throw error;
  }

  return data;
}
