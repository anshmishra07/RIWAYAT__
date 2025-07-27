import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AddEventForm from '../components/AddEventForm';
import AddStoryForm from '../components/AddStoryForm';
import AddDestinationForm from '../components/AddDestinationForm';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center py-12 text-lg text-gray-600">Please log in to access the dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div><AddEventForm /></div>
          <div><AddStoryForm /></div>
          <div><AddDestinationForm /></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 