import React from 'react'

const LoadingIndicator = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-transparent">
        <p className="ml-4 text-lg font-serif text-white uppercase tracking-widest">Ralph</p>
      <div className="w-16 h-16 border-t-4 border-gray-500 rounded-full animate-spin"></div>
      <p className="ml-4 text-lg font-serif text-white uppercase tracking-widest">Lauren...</p>
    </div>
  );
}

export default LoadingIndicator
