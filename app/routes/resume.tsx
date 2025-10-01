import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import ATS from '~/components/Ats';
import Details from '~/components/Details';
import Summary from '~/components/Summary';
import { usePuterStore } from '~/lib/puter';

export const meta = () => {
  return [
    { title: 'ResumeRx - Review' },
    { name: 'description', content: 'detailed overview of your resume' },
  ];
};

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate('/auth?next=/resume/' + id);
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResume = async (resumeId: string) => {
      const resume = await kv.get(`resume_${resumeId}`);
      if (!resume) return;

      const resumeData: Resume = JSON.parse(resume);

      const resumeBlob = await fs.read(resumeData.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      const resumeUrl = URL.createObjectURL(pdfBlob);

      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(resumeData.imagePath);
      if (!imageBlob) return;

      const imgBlob = new Blob([imageBlob], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(imgBlob);
      setImageUrl(imageUrl);

      setFeedback(resumeData.feedback);

      console.log(resumeData);
    };
    if (!id) return;
    loadResume(id);
  }, [id]);
  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back To Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-100vh sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%]">
              <a href="">
                <img
                  src={imageUrl}
                  className="w-full h-full object contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>

        <section className="feedback-section">
          <h2 className="text-4xl font-bold !text-black mb-6">
            {feedback ? 'Resume Feedback' : 'Loading Feedback...'}
          </h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000 overflow-y-auto h-[90vh] pr-4">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full" />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
