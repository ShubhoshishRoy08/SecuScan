import React from 'react';
import { Shield, User, Settings, HelpCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 mr-2" />
            <span className="font-bold text-xl">SecuScan</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-indigo-600 transition-colors">
              <HelpCircle className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-indigo-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center ml-4">
              <div className="bg-indigo-600 rounded-full p-2">
                <User className="h-5 w-5" />
              </div>
              <span className="ml-2">Account</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;