import "./globals.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link href="/" className="navbar-brand">Reservation</Link>
            <div className="d-flex">
              <Link href="/add-lesson" className="nav-link mx-2">Add Lesson</Link>
              <Link href="/see-lessons" className="nav-link mx-2">See My Lessons</Link>
            </div>
          </div>
        </nav>
        <main className="container mt-4">{children}</main>
      </body>
    </html>
  );
}