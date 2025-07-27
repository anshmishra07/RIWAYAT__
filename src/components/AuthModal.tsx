import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, X, Globe } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<'visitor' | 'contributor' | 'artist'>('visitor');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative border border-orange-200 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-orange-600 transition-colors"
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isSignUp ? 'Join Riwayat' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600">
            {isSignUp ? 'Be part of preserving India\'s cultural heritage' : 'Continue your cultural journey'}
          </p>
        </div>

        {isSignUp && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Join as:</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setUserType('visitor')}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  userType === 'visitor'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 text-gray-600 hover:border-orange-300'
                }`}
              >
                Visitor
              </button>
            <button
                onClick={() => setUserType('contributor')}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  userType === 'contributor'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 text-gray-600 hover:border-orange-300'
              }`}
            >
                Contributor
            </button>
            <button
                onClick={() => setUserType('artist')}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  userType === 'artist'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 text-gray-600 hover:border-orange-300'
              }`}
            >
                Artist
            </button>
            </div>
          </div>
        )}

        <form className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-orange-600 hover:text-orange-700 transition-colors font-medium"
          >
            {isSignUp ? 'Already have an account? Sign in' : 'New here? Join Riwayat'}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;