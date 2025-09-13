export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <header className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-muted-foreground">Last updated: August 1, 2024</p>
      </header>

      <div className="prose max-w-none text-foreground/80 leading-relaxed">
        <p>Welcome to SITR. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>

        <h2 className="font-headline text-2xl mt-8 mb-4">1. Information We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul>
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
          <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
        </ul>

        <h2 className="font-headline text-2xl mt-8 mb-4">2. How We Use Your Personal Data</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul>
          <li>To process and deliver your order including managing payments, fees and charges.</li>
          <li>To manage our relationship with you which will include notifying you about changes to our terms or privacy policy.</li>
          <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
        </ul>

        <h2 className="font-headline text-2xl mt-8 mb-4">3. Data Security</h2>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>

        <h2 className="font-headline text-2xl mt-8 mb-4">4. Your Legal Rights</h2>
        <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to request access, correction, erasure, or transfer of your personal data.</p>
        <p>This is a template and not legal advice. You should consult with a legal professional to ensure your privacy policy is compliant with all applicable laws and regulations.</p>

      </div>
    </div>
  );
}
