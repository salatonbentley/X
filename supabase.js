import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nlytnsaesfpzdspnsdgv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5seXRuc2Flc2ZwemRzcG5zZGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDQ2ODYsImV4cCI6MjA2MzkyMDY4Nn0.vUGU4KF3h9ayEbeaQC1V6A7jvBRI6jyDApugBCKTGPY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);