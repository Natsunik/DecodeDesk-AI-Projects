import React, { useState } from 'react';
import { EnhancedDashboardAnimations } from './enhanced-dashboard-animations';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  return <EnhancedDashboardAnimations user={user} onLogout={onLogout} />;
}