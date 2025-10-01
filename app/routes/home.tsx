import type { Route } from './+types/home';
import Navbar from '~/components/Navbar';
import ResumeCard from '~/components/ResumeCard';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { usePuterStore } from '~/lib/puter';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ResumeRx' },
    { name: 'description', content: 'Welcome to ResumeRx!' },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list('resume_*', true)) as KVItem[];
      const parsedResumes = resumes.map(
        (item) => JSON.parse(item.value) as Resume
      );
      console.log(parsedResumes);
      setResumes(parsedResumes);
      setLoadingResumes(false);
    };
    if (auth.isAuthenticated) {
      loadResumes();
    }
  }, [auth.isAuthenticated, kv]);

  return (
    <main className="bg-[url('/images/bg-main.svg')]">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-8">
          <h1>Track Applications. Manage Resumes. Get Hired.</h1>
          {!loadingResumes && resumes.length === 0 ? (
            <h2>Upload your resume to get started</h2>
          ) : (
            <h2>ResumeRx &mdash; Your Career Tracker Made Simple</h2>
          )}
        </div>
        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link
              to="/upload"
              className="primary-button w-fit text-xl font-semibold"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
