import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../Card';
import { Button } from '../Button';
import { BoltBadge } from './bolt-badge';
import { Footer } from './footer';
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  HelpCircle,
  Bug,
  Lightbulb,
  Users,
  Shield,
  Zap
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ContactPageProps {
  onBack?: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'medium'
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@decodedesk.com',
      action: () => window.open('mailto:support@decodedesk.com', '_blank')
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 9 AM - 6 PM EST',
      action: () => toast.info('Live chat will be available soon!')
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us directly',
      contact: '+1 (555) 123-4567',
      action: () => window.open('tel:+15551234567', '_blank')
    }
  ];

  const supportCategories = [
    {
      icon: HelpCircle,
      title: 'General Support',
      description: 'Questions about using DecodeDesk',
      value: 'general'
    },
    {
      icon: Bug,
      title: 'Bug Report',
      description: 'Report technical issues',
      value: 'bug'
    },
    {
      icon: Lightbulb,
      title: 'Feature Request',
      description: 'Suggest new features',
      value: 'feature'
    },
    {
      icon: Users,
      title: 'Sales Inquiry',
      description: 'Questions about plans and pricing',
      value: 'sales'
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Data security questions',
      value: 'security'
    },
    {
      icon: Zap,
      title: 'API & Integration',
      description: 'Technical integration help',
      value: 'api'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Bolt.new Badge - Fixed Position */}
      <BoltBadge />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      
      {/* Header - Matching Landing Page Design */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
              <span className="font-bold">🧠</span>
            </div>
            <span className="ml-2 text-xl font-bold text-white">DecodeDesk</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#about" className="text-sm text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing</a>
              <span className="text-sm text-white font-medium">Contact us</span>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={onBack || (() => window.location.href = '/')}
                className="h-10 rounded-full border border-gray-600 px-6 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Back to Home
              </button>
              <button 
                onClick={() => window.location.href = '/pricing'}
                className="h-10 rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-white/90 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={onBack || (() => window.location.href = '/')}
              className="h-10 rounded-full bg-white px-4 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions about DecodeDesk? Need help with your account? 
            We're here to help you decode corporate speak with confidence.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50 hover:border-purple-500/50 transition-colors cursor-pointer" onClick={method.action}>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-white/80 text-sm mb-3">{method.description}</p>
                <p className="text-purple-400 font-medium">{method.contact}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
            <CardHeader>
              <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
              <p className="text-white/90">Fill out the form below and we'll get back to you as soon as possible.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
                  >
                    <option value="general">General Support</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="security">Security & Privacy</option>
                    <option value="api">API & Integration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
                  >
                    <option value="low">Low - General question</option>
                    <option value="medium">Medium - Need assistance</option>
                    <option value="high">High - Urgent issue</option>
                    <option value="critical">Critical - Service down</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20 resize-none"
                    placeholder="Please provide as much detail as possible about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Support Categories & Info */}
          <div className="space-y-8">
            {/* Support Categories */}
            <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
              <CardHeader>
                <h3 className="text-xl font-bold text-white">Support Categories</h3>
                <p className="text-white/90">Choose the category that best describes your inquiry</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {supportCategories.map((category, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
                      <div className="flex-shrink-0">
                        <category.icon className="w-5 h-5 text-purple-400 mt-1" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{category.title}</h4>
                        <p className="text-sm text-white/70">{category.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
              <CardHeader>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  Response Times
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">General Support</span>
                    <span className="text-purple-400 font-medium">24-48 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Pro Plan Support</span>
                    <span className="text-purple-400 font-medium">12-24 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Enterprise Support</span>
                    <span className="text-purple-400 font-medium">2-4 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Critical Issues</span>
                    <span className="text-red-400 font-medium">1 hour</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Info */}
            <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
              <CardHeader>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  Our Office
                </h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-medium">DecodeDesk HQ</p>
                    <p className="text-white/80">123 Innovation Drive</p>
                    <p className="text-white/80">San Francisco, CA 94105</p>
                    <p className="text-white/80">United States</p>
                  </div>
                  <div className="pt-3 border-t border-gray-600/30">
                    <p className="text-white/90 text-sm">
                      <strong>Business Hours:</strong><br />
                      Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                      Saturday: 10:00 AM - 4:00 PM PST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}