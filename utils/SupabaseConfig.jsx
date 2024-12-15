import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://xrzqfkunmsncxeapnjly.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyenFma3VubXNuY3hlYXBuamx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMjg0NjYsImV4cCI6MjA0OTgwNDQ2Nn0.SNXPv8QWqyGZ6d5hFf8dXl-PbNqU1zVXX3Uf72D_rME')
