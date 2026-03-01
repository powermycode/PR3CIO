import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "../lib/supabase";

WebBrowser.maybeCompleteAuthSession();

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event: string, nextSession: Session | null) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithProvider = async (provider: "google" | "apple") => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "pr3cio://"
      }
    });

    if (error) {
      throw error;
    }

    if (data.url) {
      await WebBrowser.openAuthSessionAsync(data.url, "pr3cio://");
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    session,
    loading,
    signInWithProvider,
    signOut
  };
}
