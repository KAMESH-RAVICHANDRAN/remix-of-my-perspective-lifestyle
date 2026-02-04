import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type Category = "all" | "html" | "css" | "javascript";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: string;
  estimated_hours: number;
}

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  const activeCategory = (searchParams.get("category") as Category) || "all";

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      let query = supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .order("order_index");

      if (activeCategory !== "all") {
        query = query.eq("category", activeCategory);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data || []);
      }
      setLoading(false);
    };

    fetchCourses();
  }, [activeCategory]);

  const categories: { value: Category; label: string }[] = [
    { value: "all", label: "All Courses" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "javascript", label: "JavaScript" },
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight animate-slide-down">
            Explore Courses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up stagger-1">
            From HTML basics to advanced JavaScript, find the perfect course to level up your skills
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 animate-slide-up stagger-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? "default" : "secondary"}
              className="rounded-full"
              onClick={() => {
                if (cat.value === "all") {
                  setSearchParams({});
                } else {
                  setSearchParams({ category: cat.value });
                }
              }}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No courses found.</p>
            <Button asChild className="mt-4 rounded-full">
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div key={course.id} className={`animate-slide-up stagger-${Math.min(index + 1, 6)}`}>
                <CourseCard
                  id={course.id}
                  title={course.title}
                  slug={course.slug}
                  description={course.description}
                  category={course.category}
                  difficulty={course.difficulty}
                  estimatedHours={course.estimated_hours}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
