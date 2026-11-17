import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import PageHeader from '../components/PageHeader';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <>
      <PageHeader eyebrow="404" title="This page does not exist." />
      <div className="container-x py-20 text-center">
        <Link to="/" className="btn btn-dark">Back to home</Link>
      </div>
    </>
  );
}
