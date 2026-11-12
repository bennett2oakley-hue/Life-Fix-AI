import "react-native-url-polyfill/auto";import AsyncStorage from "@react-native-async-storage/async-storage";import {createClient} from "@supabase/supabase-js";
// For Snack, replace these placeholders with this app's Supabase URL + publishable key.
// Local Expo builds can use EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
const url=process.env.EXPO_PUBLIC_SUPABASE_URL??"https://YOUR_PROJECT.supabase.co";const publishableKey=process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY??"YOUR_SUPABASE_PUBLISHABLE_KEY";export const supabase=createClient(url,publishableKey,{auth:{storage:AsyncStorage,autoRefreshToken:true,persistSession:true,detectSessionInUrl:false}});
