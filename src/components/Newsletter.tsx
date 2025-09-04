
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Bell, Calendar, CheckCircle, AlertCircle, Sparkles } from 'lucide-react'
import { NewsletterService } from '@/services/newsletterService'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const subscribe = async () => {
    if (!email.trim()) {
      setStatus('error')
      setError('Please enter your email address')
      return
    }
    
    setStatus('loading')
    setError(null)

    try {
      const result = await NewsletterService.subscribe(email.trim())

      if (result.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setError(result.error || result.message || 'Subscription failed')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="newsletter" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-green-500/5 to-emerald-500/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="container px-6 mx-auto relative z-10">
        <Card className="max-w-5xl mx-auto bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-12 md:p-16">
            <div className="text-center space-y-10">
              {/* Header with icon */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    Stay Updated with{' '}
                    <span className="bg-gradient-to-r from-primary via-green-500 to-emerald-500 bg-clip-text text-transparent">
                      BioNewsWeekly
                    </span>
                  </h2>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 my-16">
                {[
                  {
                    icon: Calendar,
                    title: "Weekly Digest",
                    description: "Fresh articles every Friday",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: Bell,
                    title: "Breaking News",
                    description: "Important discoveries first",
                    gradient: "from-primary to-green-500"
                  },
                  {
                    icon: Mail,
                    title: "Student Exclusive",
                    description: "Study tips and exam help",
                    gradient: "from-emerald-500 to-teal-500"
                  }
                ].map((feature, index) => (
                  <div key={index} className="group text-center space-y-4 p-6 rounded-2xl hover:bg-card/30 transition-all duration-300">
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground font-medium">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 p-2 bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg">
                  <Input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 border-0 bg-transparent text-center sm:text-left placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 rounded-xl text-lg px-6 py-4"
                  />
                  <Button
                    className="bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white border-0 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={subscribe}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Subscribing...
                      </div>
                    ) : (
                      'Subscribe Now'
                    )}
                  </Button>
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="flex items-center justify-center gap-2 mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-600 font-medium"> Welcome to BioNewsWeekly! You'll receive our weekly newsletter.</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center justify-center gap-2 mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-600 font-medium"> {error}</p>
                  </div>
                )}

                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  No spam, unsubscribe anytime. We respect your privacy and will never share your information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
