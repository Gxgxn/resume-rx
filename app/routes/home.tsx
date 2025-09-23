import { resumes } from 'constants/index';
import type { Route } from './+types/home';
import Navbar from '~/components/Navbar';
import ResumeCard from '~/components/ResumeCard';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ResumeRx' },
    { name: 'description', content: 'Welcome to ResumeRx!' },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')]">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-8">
          <h1>Track Applications. Manage Resumes. Get Hired.</h1>
          <h2>ResumeRx &mdash; Your Career Tracker Made Simple</h2>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
