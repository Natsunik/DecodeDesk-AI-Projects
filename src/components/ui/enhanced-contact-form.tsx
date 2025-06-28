import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '../Card';
import { Button } from '../Button';
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
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface EnhancedContactFormProps {
  onBack?: () => void;
}

// Brand color palette
const brandColors = {
  primary: '#8B5CF6', // Purple-500
  secondary: '#EC4899', // Pink-500
  accent: '#3B82F6', // Blue-500
  success: '#10B981', // Green-500
  warning: '#F59E0B', // Yellow-500
  error: '#EF4444' // Red-500
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const cardHoverVariants = {
  rest: { 
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const inputFocusVariants = {
  rest: { 
    scale: 1,
    borderColor: "rgba(107, 114, 128, 0.5)"
  },
  focus: { 
    scale: 1.01,
    borderColor: brandColors.primary,
    boxShadow: `0 0 0 3px ${brandColors.primary}20`,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

const buttonVariants = {
  rest: { 
    scale: 1,
    background: `linear-gradient(to right, ${brandColors.primary}, ${brandColors.secondary})`
  },
  hover: { 
    scale: 1.05,
    background: `linear-gradient(to right, ${brandColors.primary}dd, ${brandColors.secondary}dd)`,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export function EnhancedContactForm({ onBack }: EnhancedContactFormProps) {
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          category: 'general',
          message: '',
          priority: 'medium'
        });
      }, 3000);
      
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
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
      action: () => window.open('mailto:support@decodedesk.com', '_blank'),
      color: brandColors.primary
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 9 AM - 6 PM EST',
      action: () => toast.info('Live chat will be available soon!'),
      color: brandColors.secondary
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us directly',
      contact: '+1 (555) 123-4567',
      action: () => window.open('tel:+15551234567', '_blank'),
      color: brandColors.accent
    }
  ];

  const supportCategories = [
    {
      icon: HelpCircle,
      title: 'General Support',
      description: 'Questions about using DecodeDesk',
      value: 'general',
      color: brandColors.primary
    },
    {
      icon: Bug,
      title: 'Bug Report',
      description: 'Report technical issues',
      value: 'bug',
      color: brandColors.error
    },
    {
      icon: Lightbulb,
      title: 'Feature Request',
      description: 'Suggest new features',
      value: 'feature',
      color: brandColors.warning
    },
    {
      icon: Users,
      title: 'Sales Inquiry',
      description: 'Questions about plans and pricing',
      value: 'sales',
      color: brandColors.success
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Data security questions',
      value: 'security',
      color: brandColors.accent
    },
    {
      icon: Zap,
      title: 'API & Integration',
      description: 'Technical integration help',
      value: 'api',
      color: brandColors.secondary
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-black"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(255,255,255,0))]" />
      
      {/* Header */}
      <motion.header 
        variants={itemVariants}
        className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                <span className="font-bold text-lg">🧠</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">DecodeDesk</h1>
                <p className="text-sm text-gray-300">Contact Support</p>
              </div>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack || (() => window.location.href = '/')}
              className="h-10 rounded-full border border-gray-600 px-6 text-sm font-medium text-white hover:bg-white/10 transition-colors duration-300"
            >
              Back to Home
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions about DecodeDesk? Need help with your account? 
            We're here to help you decode corporate speak with confidence.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div 
          variants={itemVariants}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onClick={method.action}
              className="cursor-pointer"
            >
              <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50 hover:border-purple-500/50 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{ background: `linear-gradient(135deg, ${method.color}, ${method.color}dd)` }}
                  >
                    <method.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{method.description}</p>
                  <p className="font-medium" style={{ color: method.color }}>{method.contact}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
              <CardHeader>
                <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
                <p className="text-white/90">Fill out the form below and we'll get back to you as soon as possible.</p>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                        style={{ backgroundColor: `${brandColors.success}20`, border: `2px solid ${brandColors.success}` }}
                      >
                        <CheckCircle className="w-10 h-10" style={{ color: brandColors.success }} />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-white/80">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <motion.div
                          variants={inputFocusVariants}
                          animate={focusedField === 'name' ? 'focus' : 'rest'}
                        >
                          <label className="block text-sm font-medium text-white/90 mb-2">
                            Full Name *
                          </label>
                          <motion.input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            whileFocus={{ scale: 1.01 }}
                            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                            placeholder="Enter your full name"
                          />
                        </motion.div>
                        
                        <motion.div
                          variants={inputFocusVariants}
                          animate={focusedField === 'email' ? 'focus' : 'rest'}
                        >
                          <label className="block text-sm font-medium text-white/90 mb-2">
                            Email Address *
                          </label>
                          <motion.input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            whileFocus={{ scale: 1.01 }}
                            className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                            placeholder="Enter your email"
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        variants={inputFocusVariants}
                        animate={focusedField === 'company' ? 'focus' : 'rest'}
                      >
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Company (Optional)
                        </label>
                        <motion.input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                          whileFocus={{ scale: 1.01 }}
                          className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                          placeholder="Your company name"
                        />
                      </motion.div>

                      <motion.div
                        variants={inputFocusVariants}
                        animate={focusedField === 'category' ? 'focus' : 'rest'}
                      >
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Category *
                        </label>
                        <motion.select
                          required
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          onFocus={() => setFocusedField('category')}
                          onBlur={() => setFocusedField(null)}
                          whileFocus={{ scale: 1.01 }}
                          className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        >
                          {supportCategories.map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.title}
                            </option>
                          ))}
                        </motion.select>
                      </motion.div>

                      <motion.div
                        variants={inputFocusVariants}
                        animate={focusedField === 'subject' ? 'focus' : 'rest'}
                      >
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Subject *
                        </label>
                        <motion.input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          whileFocus={{ scale: 1.01 }}
                          className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                          placeholder="Brief description of your inquiry"
                        />
                      </motion.div>

                      <motion.div
                        variants={inputFocusVariants}
                        animate={focusedField === 'message' ? 'focus' : 'rest'}
                      >
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Message *
                        </label>
                        <motion.textarea
                          required
                          rows={6}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          whileFocus={{ scale: 1.01 }}
                          className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20 resize-none transition-all duration-300"
                          placeholder="Please provide as much detail as possible about your inquiry..."
                        />
                      </motion.div>

                      <motion.button
                        type="submit"
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        disabled={loading}
                        className="w-full px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center"
                      >
                        {loading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        {loading ? 'Sending...' : 'Send Message'}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Support Categories & Info */}
          <div className="space-y-8">
            {/* Support Categories */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
                <CardHeader>
                  <h3 className="text-xl font-bold text-white">Support Categories</h3>
                  <p className="text-white/90">Choose the category that best describes your inquiry</p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {supportCategories.map((category, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-300 cursor-pointer"
                        onClick={() => handleInputChange('category', category.value)}
                      >
                        <div className="flex-shrink-0">
                          <category.icon className="w-5 h-5 mt-1" style={{ color: category.color }} />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{category.title}</h4>
                          <p className="text-sm text-white/70">{category.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Response Times */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
                <CardHeader>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" style={{ color: brandColors.primary }} />
                    Response Times
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'General Support', time: '24-48 hours', color: brandColors.primary },
                      { type: 'Pro Plan Support', time: '12-24 hours', color: brandColors.secondary },
                      { type: 'Enterprise Support', time: '2-4 hours', color: brandColors.accent },
                      { type: 'Critical Issues', time: '1 hour', color: brandColors.error }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex justify-between items-center"
                      >
                        <span className="text-white/90">{item.type}</span>
                        <span className="font-medium" style={{ color: item.color }}>{item.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}