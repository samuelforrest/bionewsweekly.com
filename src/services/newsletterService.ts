import { supabase } from '@/integrations/supabase/client'

export interface NewsletterSubscription {
  email: string
  name?: string | null
  subscribed_at?: string
  is_active?: boolean
}

export class NewsletterService {
  static async subscribe(email: string): Promise<{ success: boolean; message: string; error?: string }> {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return {
          success: false,
          message: 'Please enter a valid email address',
          error: 'Invalid email format'
        }
      }

      // Check if email already exists
      const { data: existingSubscriber, error: checkError } = await supabase
        .from('newsletter_subscribers')
        .select('email, is_active')
        .eq('email', email.toLowerCase())
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is expected for new emails
        console.error('Error checking existing subscriber:', checkError)
        return {
          success: false,
          message: 'Something went wrong. Please try again.',
          error: 'Database error'
        }
      }

      if (existingSubscriber) {
        if (existingSubscriber.is_active) {
          return {
            success: true,
            message: 'You are already subscribed to our newsletter!'
          }
        } else {
          // Reactivate subscription
          const { error: updateError } = await supabase
            .from('newsletter_subscribers')
            .update({
              is_active: true,
              subscribed_at: new Date().toISOString()
            })
            .eq('email', email.toLowerCase())

          if (updateError) {
            console.error('Error reactivating subscription:', updateError)
            return {
              success: false,
              message: 'Something went wrong. Please try again.',
              error: 'Failed to reactivate subscription'
            }
          }

          return {
            success: true,
            message: 'Welcome back! Your subscription has been reactivated.'
          }
        }
      }

      // Create new subscription
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email.toLowerCase(),
          is_active: true,
          subscribed_at: new Date().toISOString()
        })

      if (insertError) {
        console.error('Error creating subscription:', insertError)
        return {
          success: false,
          message: 'Something went wrong. Please try again.',
          error: 'Failed to create subscription'
        }
      }

      return {
        success: true,
        message: 'Thanks for subscribing! You\'ll receive our weekly newsletter.'
      }
    } catch (error) {
      console.error('Unexpected error in newsletter subscription:', error)
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
        error: 'Unexpected error'
      }
    }
  }

  static async unsubscribe(email: string): Promise<{ success: boolean; message: string; error?: string }> {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({
          is_active: false
        })
        .eq('email', email.toLowerCase())
        .eq('is_active', true)

      if (error) {
        console.error('Error unsubscribing:', error)
        return {
          success: false,
          message: 'Something went wrong. Please try again.',
          error: 'Failed to unsubscribe'
        }
      }

      return {
        success: true,
        message: 'You have been successfully unsubscribed.'
      }
    } catch (error) {
      console.error('Unexpected error in newsletter unsubscription:', error)
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
        error: 'Unexpected error'
      }
    }
  }

  static async getSubscriberCount(): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)

      if (error) {
        console.error('Error getting subscriber count:', error)
        return 0
      }

      return count || 0
    } catch (error) {
      console.error('Unexpected error getting subscriber count:', error)
      return 0
    }
  }
}
