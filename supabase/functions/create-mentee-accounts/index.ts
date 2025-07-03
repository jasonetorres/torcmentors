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

const menteeEmails = [
  'martina.berns@ingenieria.uner.edu.ar',
  'pranshuraj65536+torc@gmail.com',
  'jagrut.pratik@gmail.com',
  'danmndes@gmail.com',
  'philipminielly@gmail.com',
  'johnsonolaolu@gmail.com',
  'adetomiwaabdul@gmail.com',
  'vishalpawarr.git@gmail.com',
  'kiriaditi15@gmail.com',
  'jsprogramming.123@gmail.com',
  'gauravkalita.nlp@gmail.com',
  'umreutkarsh@gmail.com',
  'menyagah27@gmail.com',
  'hast.job@gmail.com',
  'teyenike1@gmail.com',
  'isaacscheff@gmail.com',
  'cjmooredev@gmail.com',
  'anjukaranji@gmail.com',
  'shittuidris45@gmail.com',
  'dassandrew3@gmail.com',
  'kpctyn@gmail.com',
  'enver.francisco@gmail.com',
  'mohhasbias@gmail.com',
  'tarsis1477@gmail.com',
  'olawalekareemdev@gmail.com',
  'merytpeters@gmail.com',
  'davonnejv@gmail.com',
  'luke.floden@gmail.com',
  'walterfurrer@proton.me',
  'michaeljohnraymond@gmail.com',
  'kelly.m.hill2115@gmail.com',
  'Luckyjoseph1996@gmail.com',
  'saiddetz@gmail.com',
  'ranhindavibhashana@gmail.com',
  'menezes.ecd@gmail.com',
  'brandon.hamilton.dev@gmail.com',
  'bryanfinesw@gmail.com',
  'mmebit@icloud.com',
  'cmelendezgp@gmail.com'
]

Deno.serve(async (req) => {
  try {
    const results = []
    
    for (const email of menteeEmails) {
      // Create the user account
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: 'mentee2025',
        email_confirm: true,
        user_metadata: {
          role: 'mentee'
        }
      })

      if (authError) {
        console.error(`Failed to create mentee account for ${email}:`, authError)
        results.push({ email, success: false, error: authError.message })
        continue
      }

      // Update the profile to set role as mentee and mark onboarding step
      if (authUser.user) {
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .update({
            role: 'mentee',
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
      message: `Created ${results.filter(r => r.success).length} mentee accounts`
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })

  } catch (error) {
    console.error('Error creating mentee accounts:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })
  }
})