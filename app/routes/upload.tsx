import { useState } from 'react';
import FileUploader from '~/components/FileUploader';
import { usePuterStore } from '~/lib/puter';
import Navbar from '../components/Navbar';
import { convertPdfToImage } from '~/lib/pdf2img';
import { generateUUID } from '~/lib/utils';
import { prepareInstructions } from 'constants/index';
import { useNavigate } from 'react-router';
const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const [statusText, setStatusText] = useState('Upload Resume');
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText('Uploading Resume...');
    const uploadFile = await fs.upload([file]);

    if (!uploadFile) return setStatusText('Failed to upload file');
    setStatusText('Converting Resume to Image...');

    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText('Failed to convert PDF to image');

    setStatusText('Uploading Resume Image...');
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText('Failed to upload image');

    setStatusText('Preparing Data...');

    const uuid = generateUUID();
    const metadata = {
      id: uuid,
      companyName,
      jobTitle,
      jobDescription,
      resumePath: uploadFile.path,
      imagePath: uploadedImage.path,
      feedback: '',
    };
    await kv.set(`resume_${uuid}`, JSON.stringify(metadata));
    setStatusText('Analyzing Resume...');

    const feedback = await ai.feedback(
      uploadedImage.path,
      prepareInstructions({ jobTitle, jobDescription })
    );

    if (!feedback) return setStatusText('Failed to analyze resume');

    const feedbackText =
      typeof feedback.message.content === 'string'
        ? feedback.message.content
        : feedback.message.content[0].text;
    metadata.feedback = JSON.parse(feedbackText);
    await kv.set(`resume_${uuid}`, JSON.stringify(metadata));
    setStatusText('Resume Analyzed Successfully!');
    setIsProcessing(false);
    setFile(null);

    console.log(feedback);
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (!form || !file) return;
    const formData = new FormData(form);
    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;
    if (!companyName || !jobTitle || !jobDescription || !file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };
  return (
    <main className="bg-[url('/images/bg-main.svg')]">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Smart feedback for your resume</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="resume-upload"
                className="w-full"
              />
            </>
          ) : (
            <h2>Upload your resume for an ATS score</h2>
          )}

          {!isProcessing && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  id="company-name"
                  name="company-name"
                  placeholder="Company Name"
                  required
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  id="job-title"
                  name="job-title"
                  placeholder="Job Title"
                  required
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={4}
                  id="job-description"
                  name="job-description"
                  placeholder="Job Description"
                  required
                  className="resize-none"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit">
                Upload Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
