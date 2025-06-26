import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../Card';
import { Button } from '../Button';
import { User, Mail, Phone, Camera, Lock, Save } from 'lucide-react';
import toast from 'react-hot-toast';

interface SettingsPageProps {
  user: any;
  onSave?: (data: any) => void;
}

export function SettingsPage({ user, onSave }: SettingsPageProps) {
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Validate passwords if changing
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          toast.error('New passwords do not match');
          return;
        }
        if (formData.newPassword.length < 6) {
          toast.error('Password must be at least 6 characters');
          return;
        }
        if (!formData.currentPassword) {
          toast.error('Current password is required to change password');
          return;
        }
      }

      // Validate phone number if provided
      if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
        toast.error('Please enter a valid phone number');
        return;
      }

      // Here you would typically call Supabase to update the user
      // For now, we'll just show success
      onSave?.(formData);
      toast.success('Profile updated successfully!');
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically upload to Supabase Storage
      // For now, we'll create a local URL
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      toast.success('Avatar uploaded! Click Save to apply changes.');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/90 backdrop-blur-sm border-gray-600/50">
        <CardHeader>
          <h2 className="text-2xl font-bold text-white">Account Settings</h2>
          <p className="text-white/90">Manage your account preferences and security</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-white" />
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Profile Picture</h3>
              <p className="text-sm text-white/70">Upload a new avatar for your account</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
                placeholder="Enter your email"
              />
              <p className="text-xs text-white/60 mt-1">
                Changing your email will require verification
              </p>
            </div>
          </div>

          {/* Password Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Current Password</label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="Enter current password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">New Password</label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="Enter new password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600/50 rounded-lg text-white/90 placeholder-white/50 focus:border-purple-500/70 focus:ring-2 focus:ring-purple-500/20"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            <p className="text-xs text-white/60">
              Leave password fields empty if you don't want to change your password
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-gray-600/30">
            <Button
              onClick={handleSave}
              loading={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}