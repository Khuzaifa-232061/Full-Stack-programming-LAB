import './globals.css';
import { AuthProvider } from '../lib/AuthContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'HLApp – Healthcare Management System',
  description: 'Book appointments, manage treatments, and stay healthy.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: { fontFamily: 'DM Sans, sans-serif', fontSize: '14px', borderRadius: '10px' },
              success: { iconTheme: { primary: '#06d6a0', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ef476f', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
