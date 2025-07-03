import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3'

const supabaseUrl = 'https://dhxvfcxawoubuqkxrumi.supabase.co'
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required')
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const mentorEmails = [
  'mentor1@torc.community',
  'mentor2@torc.community',
  'mentor3@torc.community',
  'mentor4@torc.community',
  'mentor5@torc.community'
]

Deno.serve(async (req) => {
  try {
    const results = []
    
    for (const email of mentorEmails) {
      // Create the user account
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: 'mentor2025',
        email_confirm: true,
        user_metadata: {
          role: 'mentor'
        }
      })

      if (authError) {
        console.error(`Failed to create mentor account for ${email}:`, authError)
        results.push({ email, success: false, error: authError.message })
        continue
      }

      // Update the profile to set role as mentor and mark onboarding step
      if (authUser.user) {
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .update({
            role: 'mentor',
            onboarding_step: 'account-setup'
          })
          .eq('user_id', authUser.user.id)

        if (profileError) {
          console.error(`Failed to update profile for ${email}:`, profileError)
          results.push({ email, success: false, error: profileError.message })
        } else {
          results.push({ email, success: true, userId: authUser.user.id })
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      results,
      message: `Created ${results.filter(r => r.success).length} mentor accounts`
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('Error creating mentor accounts:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })
  }
})