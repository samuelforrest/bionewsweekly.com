
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Bell, Calendar } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const subscribe = async () => {
    setStatus('loading')
    setError(null)

    const res = await fetch('api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (res.ok) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
      setError(data.error || 'Subscription failed')
    }
  }
  return (
    <section className="py-24 bg-gray-900">
      <div className="container px-4 mx-auto">
        <Card className="max-w-4xl mx-auto shadow-2xl bg-gray-750 border border-white">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Stay Updated with <span className="gradient-text">BioNewsWeekly</span>
                </h2>
                <p className="text-xl max-w-2xl mx-auto text-white">
                  Get the latest biology news, student insights, and exclusive content delivered to your inbox every week.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 my-12">
                <div className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-bio-blue-100 dark:bg-bio-blue-900/30 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-bio-blue-600 dark:text-bio-blue-400" />
                  </div>
                  <h3 className="font-semibold gradient-text">Weekly Digest</h3>
                  <p className="text-sm text-white">Fresh articles every Friday</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-bio-teal-100 dark:bg-bio-teal-900/30 rounded-full flex items-center justify-center">
                    <Bell className="h-6 w-6 text-bio-teal-600 dark:text-bio-teal-400" />
                  </div>
                  <h3 className="font-semibold gradient-text">Breaking News</h3>
                  <p className="text-sm text-white">Important discoveries first</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-bio-green-100 dark:bg-bio-green-900/30 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-bio-green-600 dark:text-bio-green-400" />
                  </div>
                  <h3 className="font-semibold gradient-text">Student Exclusive</h3>
                  <p className="text-sm text-white">Study tips and exam help</p>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 h-12 text-center sm:text-left border border-white text-white placeholder:text-white rounded-xl text-lg px-8"
                  />
                  <Button
                    className="bg-lime-600 hover:bg-lime-400 transition-all duration-300 text-lg px-8 h-12 text-white rounded-xl"
                    onClick={subscribe}
                    disabled={status === 'loading'}
                  >
                    <span className="text-white">
                      {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
                    </span>
                  </Button>
                </div>
                {status === 'success' && (
                  <p className="text-sm text-green-400 mt-3">🎉 Thanks! Check your inbox to confirm.</p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-red-400 mt-3">❌ {error}</p>
                )}
                <p className="text-xs text-white mt-3">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
