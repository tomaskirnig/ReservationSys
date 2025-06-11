import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="d-flex flex-column" style={{ height: '100vh' }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link href="/" className="navbar-brand"><span style={{color:"#ed1c24"}}>Res</span><span style={{color:"#152a75"}}>ervat</span><span style={{color:"#0083ca"}}>ion</span></Link>
            <div className="d-flex">
              <Link href="/see-lesson" className="nav-link mx-2">See My Lessons</Link>
            </div>
          </div>
        </nav>
        <main className="container mt-4" style={{height:"100%"}}>{children}</main>
      </body>
    </html>
  );
}


// Idance colors: red #ed1c24, lightblue #0083ca, darkblue #152a75