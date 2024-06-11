import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 text-center">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Syon Gallery. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
