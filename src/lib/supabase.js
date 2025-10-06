import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zfwqnouufkdkfswmbhmq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmd3Fub3V1Zmtka2Zzd21iaG1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3MjgxODUsImV4cCI6MjA3NTMwNDE4NX0.5pvnIX4nW5NVSj5XJe-aG0wtfR_sjpG3v437PeaH0Vc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
