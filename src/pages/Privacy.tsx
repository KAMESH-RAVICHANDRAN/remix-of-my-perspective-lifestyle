import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold font-serif mb-8 animate-slide-down">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-8 animate-slide-up stagger-1">
          <p className="text-lg text-muted-foreground">
            Last updated: January 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you create an account, we collect your email address and name. 
              We also collect information about your learning progress, including courses started, 
              lessons completed, and certifications earned.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide and maintain our services</li>
              <li>Track your learning progress</li>
              <li>Issue certificates upon course completion</li>
              <li>Send you updates about new courses (if you opt in)</li>
              <li>Improve our platform based on usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-4">3. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your personal information. 
              Your data is encrypted in transit and at rest. We never sell your personal information 
              to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-4">4. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use essential cookies to keep you logged in and remember your preferences. 
              We do not use tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, correct, or delete your personal data at any time. 
              You can do this through your account settings or by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-serif mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@codecraft.dev" className="text-accent hover:underline">
                privacy@codecraft.dev
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
