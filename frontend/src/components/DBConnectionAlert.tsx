import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Database, AlertTriangle, Terminal, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DBConnectionAlert() {
  const { dbError, clearDbError } = useAuth();

  if (!dbError) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-red-100 overflow-hidden"
        >
          {/* Accent Header */}
          <div className="bg-red-50 p-6 flex items-start gap-4 border-b border-red-100">
            <div className="p-3 bg-red-100 text-red-600 rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900">Database Connection Required</h3>
              <p className="text-xs text-red-600 font-medium mt-0.5">MongoDB Atlas is disconnected or not configured</p>
            </div>
            <button 
              onClick={clearDbError}
              className="p-1 hover:bg-red-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed text-left">
              Our secure finance stack requires a direct connection to a MongoDB database. Currently, the server is failing to resolve the database path or has encountered a connection timeout.
            </p>

            {/* Error logs terminal */}
            <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-xs flex gap-2 overflow-x-auto text-left leading-normal">
              <Terminal className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-red-400 font-bold">Error:</span> {dbError}
              </div>
            </div>

            {/* Steps to resolve */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold text-gray-950 uppercase tracking-widest text-left">How to Resolve:</h4>
              <ol className="text-xs text-gray-600 space-y-2 list-decimal list-inside text-left leading-relaxed">
                <li>
                  Make sure you have specified a valid <code className="bg-gray-100 text-blue-600 px-1.5 py-0.5 rounded font-mono font-medium">MONGODB_URI</code> environment variable inside your backend settings or <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">backend/.env</code> file.
                </li>
                <li>
                  If you are using MongoDB Atlas, check your **IP Access List** settings under **Network Access** in the Atlas console. Ensure it is set to allow access from any IP address (<code className="bg-gray-100 px-1 py-0.5 rounded font-mono">0.0.0.0/0</code>) for hosting compatibility.
                </li>
                <li>
                  Double-check your credentials (username/password) embedded in the MONGODB_URI connection string.
                </li>
              </ol>
            </div>
          </div>

          {/* Action buttons */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
            <a 
              href="https://www.mongodb.com/cloud/atlas" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              MongoDB Atlas Console
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="flex gap-2">
              <button
                onClick={clearDbError}
                className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
              >
                Close Warning
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-150"
              >
                Retry Connection
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
