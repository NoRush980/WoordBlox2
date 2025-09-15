"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setMsg(null);

    const { error } = await supabase.auth.signUp({
      email,
      password: pw,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? window.location.origin + "/login" : undefined,
      },
    });

    setLoading(false);
    setMsg(error ? error.message : "Check je e-mail en klik op de bevestigingslink.");
  }

  return (
    <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:24}}>
      <form onSubmit={onSubmit} style={{maxWidth:420,width:"100%",background:"white",padding:20,borderRadius:16,boxShadow:"0 10px 30px rgba(0,0,0,.1)"}}>
        <h1 style={{fontSize:28,marginBottom:8}}>Registreren</h1>
        <input type="email" required placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)}
               style={{width:"100%",padding:"12px 14px",borderRadius:12,border:"1px solid #cbd5e1",marginBottom:10}}/>
        <input type="password" required placeholder="Wachtwoord" value={pw} onChange={e=>setPw(e.target.value)}
               style={{width:"100%",padding:"12px 14px",borderRadius:12,border:"1px solid #cbd5e1",marginBottom:10}}/>
        <button disabled={loading} style={{width:"100%",padding:"12px 14px",borderRadius:12,background:"#0ea5e9",color:"white",border:"none",fontWeight:800}}>
          {loading ? "Bezig…" : "Account aanmaken"}
        </button>
        {msg && <p style={{marginTop:10}}>{msg}</p>}
      </form>
    </main>
  );
}
