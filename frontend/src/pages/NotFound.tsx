import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <div className="container-x flex min-h-[80vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-5xl md:text-7xl">This page does not exist.</h1>
      <Link to="/" className="btn btn-dark mt-10">Back to home</Link>
    </div>
  );
}
