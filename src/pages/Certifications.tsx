import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CertificationCard from "@/components/courses/CertificationCard";
import CertificateShowcase from "@/components/certificate/CertificateShowcase";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  slug: string;
  description: string;
}

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .order("created_at");

      if (error) {
        console.error("Error fetching certifications:", error);
      } else {
        setCertifications(data || []);
      }
      
      setLoading(false);
    };

    fetchCertifications();
  }, []);

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight animate-slide-down">
            Earn Certifications
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up stagger-1">
            Complete course tracks and earn certificates to validate your skills and showcase your achievements
          </p>
        </div>

        {/* Certifications Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : certifications.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No certifications available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={cert.id} className={`animate-slide-up stagger-${Math.min(index + 1, 6)}`}>
                <CertificationCard
                  id={cert.id}
                  title={cert.title}
                  slug={cert.slug}
                  description={cert.description}
                />
              </div>
            ))}
          </div>
        )}

        {/* Certificate Showcase */}
        <CertificateShowcase />

        {/* Info Section */}
        <section className="mt-20 rounded-[2rem] bg-card border border-border/50 p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">How Certifications Work</h2>
            <p className="text-muted-foreground mb-8">
              Each certification represents mastery of a specific skill area. Complete all the required courses 
              within a certification track to earn your certificate.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <div className="bg-background rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <h3 className="font-bold mb-2">Choose a Track</h3>
                <p className="text-sm text-muted-foreground">
                  Select a certification that matches your learning goals
                </p>
              </div>
              <div className="bg-background rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <h3 className="font-bold mb-2">Complete Courses</h3>
                <p className="text-sm text-muted-foreground">
                  Work through all required courses at your own pace
                </p>
              </div>
              <div className="bg-background rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                  3
                </div>
                <h3 className="font-bold mb-2">Earn Certificate</h3>
                <p className="text-sm text-muted-foreground">
                  Get your verified certificate to share with employers
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Certifications;
