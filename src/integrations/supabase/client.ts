// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yabsdlzvbmbcfcjuhpdm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhYnNkbHp2Ym1iY2ZjanVocGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyOTQwNzksImV4cCI6MjA2NDg3MDA3OX0.Pp4J3UxmJZ4R5cX_Eu_vshm5psCldC5pjFC3Hs011LA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);