export const templates: {
  id: string;
  label: string;
  imageUrl: string;
  intialContent: string;
}[] = [
  {
    id: 'blank',
    label: 'Blank Document',
    imageUrl: '/blank-document.svg',
    intialContent: '',
  },
  {
    id: 'resume',
    label: 'Resume',
    imageUrl: '/resume.svg',
    intialContent: `<h1>Resume</h1>
    <section>
      <h2>Contact Information</h2>
      <p><strong>Name:</strong> [Your Name]</p>
      <p><strong>Email:</strong> [Your Email]</p>
      <p><strong>Phone:</strong> [Your Phone Number]</p>
      <p><strong>Address:</strong> [Your Address]</p>
    </section>
    <section>
      <h2>Professional Summary</h2>
      <p>[A brief summary of your skills, experience, and career goals]</p>
    </section>
    <section>
      <h2>Work Experience</h2>
      <h3>[Job Title] - [Company Name]</h3>
      <p><strong>Dates:</strong> [Start Date] - [End Date]</p>
      <ul>
        <li>[Key responsibility or achievement]</li>
        <li>[Key responsibility or achievement]</li>
        <li>[Key responsibility or achievement]</li>
      </ul>
      <h3>[Job Title] - [Company Name]</h3>
      <p><strong>Dates:</strong> [Start Date] - [End Date]</p>
      <ul>
        <li>[Key responsibility or achievement]</li>
        <li>[Key responsibility or achievement]</li>
        <li>[Key responsibility or achievement]</li>
      </ul>
    </section>
    <section>
      <h2>Education</h2>
      <h3>[Degree] - [Institution Name]</h3>
      <p><strong>Dates:</strong> [Start Date] - [End Date]</p>
      <p>[Relevant coursework or achievements]</p>
    </section>
    <section>
      <h2>Skills</h2>
      <ul>
        <li>[Skill 1]</li>
        <li>[Skill 2]</li>
        <li>[Skill 3]</li>
        <li>[Skill 4]</li>
      </ul>
    </section>
    <section>
      <h2>Certifications</h2>
      <ul>
        <li>[Certification Name] - [Issuing Organization]</li>
        <li>[Certification Name] - [Issuing Organization]</li>
      </ul>
    </section>
    <section>
      <h2>Projects</h2>
      <h3>[Project Name]</h3>
      <p><strong>Description:</strong> [Brief description of the project]</p>
      <p><strong>Role:</strong> [Your role in the project]</p>
      <p><strong>Technologies:</strong> [Technologies or tools used]</p>
    </section>`,
  },
  {
    id: 'cover-letter',
    label: 'Cover Letter',
    imageUrl: '/cover-letter.svg',
    intialContent: `<h1>Cover Letter</h1>
<p>Dear [Recipient's Name],</p>
<p>[Your introduction and purpose]</p>
<p>Sincerely,</p>
<p>[Your Name]</p>`,
  },
  {
    id: 'business-letter',
    label: 'Business Letter',
    imageUrl: '/business-letter.svg',
    intialContent: `<h1>Business Letter</h1>
<p>[Your Address]</p>
<p>[Date]</p>
<p>[Recipient's Address]</p>
<p>Dear [Recipient's Name],</p>
<p>[Your message]</p>
<p>Sincerely,</p>
<p>[Your Name]</p>`,
  },
  {
    id: 'letter',
    label: 'Letter',
    imageUrl: '/letter.svg',
    intialContent: `<h1>Letter</h1>
<p>Dear [Recipient's Name],</p>
<p>[Your message]</p>
<p>Sincerely,</p>
<p>[Your Name]</p>`,
  },
  {
    id: 'project-proposal',
    label: 'Project Proposal',
    imageUrl: '/project-proposal.svg',
    intialContent: `<h1>Project Proposal</h1>
<p><strong>Project Title:</strong> [Title]</p>
<p><strong>Objective:</strong> [Objective]</p>
<p><strong>Description:</strong> [Description of the project]</p>
<p><strong>Timeline:</strong> [Timeline]</p>`,
  },
  {
    id: 'software-proposal',
    label: 'Software Proposal',
    imageUrl: '/software-proposal.svg',
    intialContent: `<h1>Software Proposal</h1>
<p><strong>Project Title:</strong> [Title]</p>
<p><strong>Overview:</strong> [Overview of the software]</p>
<p><strong>Features:</strong> 
<ul>
  <li>[Feature 1]</li>
  <li>[Feature 2]</li>
  <li>[Feature 3]</li>
</ul>
</p>
<p><strong>Timeline:</strong> [Timeline]</p>`,
  },
];
