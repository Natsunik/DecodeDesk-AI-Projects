import React, { useState } from 'react';
import { EnhancedDashboard } from './enhanced-dashboard';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  return <EnhancedDashboard user={user} onLogout={onLogout} />;
}