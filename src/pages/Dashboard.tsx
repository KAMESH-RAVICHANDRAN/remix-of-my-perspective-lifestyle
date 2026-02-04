import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/courses/CourseCard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp,
  ArrowRight
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: string;
  estimated_hours: number;
}

interface Progress {
  lesson_id: string;
  completed: boolean;
  lessons: {
    course_id: string;
  };
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    coursesStarted: 0,
    lessonsCompleted: 0,
    totalHours: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      setLoading(true);

      // Fetch all courses
      const { data: coursesData } = await supabase
        .from("courses")
        .select("*")
        .eq("is_published", true)
        .order("order_index");

      setCourses(coursesData || []);

      // Fetch user progress with lesson info
      const { data: progressData } = await supabase
        .from("user_progress")
        .select(`
          lesson_id,
          completed,
          lessons (
            course_id
          )
        `)
        .eq("user_id", user.id);

      setProgress(progressData as Progress[] || []);

      // Calculate stats
      const completedLessons = (progressData || []).filter((p: any) => p.completed).length;
      const courseIds = new Set((progressData || []).map((p: any) => p.lessons?.course_id));
      
      setStats({
        coursesStarted: courseIds.size,
        lessonsCompleted: completedLessons,
        totalHours: Math.round(completedLessons * 0.25), // Rough estimate
      });

      setLoading(false);
    };

    fetchDashboardData();
  }, [user]);

  // Get courses in progress (have started but not completed)
  const getCoursesInProgress = () => {
    const courseProgress: Record<string, { total: number; completed: number }> = {};
    
    progress.forEach(p => {
      const courseId = p.lessons?.course_id;
      if (courseId) {
        if (!courseProgress[courseId]) {
          courseProgress[courseId] = { total: 0, completed: 0 };
        }
        courseProgress[courseId].total++;
        if (p.completed) {
          courseProgress[courseId].completed++;
        }
      }
    });

    return courses.filter(course => {
      const cp = courseProgress[course.id];
      return cp && cp.completed > 0 && cp.completed < cp.total;
    }).map(course => ({
      ...course,
      progress: courseProgress[course.id] 
        ? (courseProgress[course.id].completed / courseProgress[course.id].total) * 100 
        : 0
    }));
  };

  const coursesInProgress = getCoursesInProgress();

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground">
            Continue your learning journey where you left off
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold">{stats.coursesStarted}</div>
            <div className="text-sm text-muted-foreground">Courses Started</div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold">{stats.lessonsCompleted}</div>
            <div className="text-sm text-muted-foreground">Lessons Completed</div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold">{stats.totalHours}h</div>
            <div className="text-sm text-muted-foreground">Learning Time</div>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border/50">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-muted-foreground">Certificates</div>
          </div>
        </div>

        {/* Continue Learning */}
        {coursesInProgress.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-serif">Continue Learning</h2>
              <Link 
                to="/courses" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesInProgress.slice(0, 3).map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  slug={course.slug}
                  description={course.description}
                  category={course.category}
                  difficulty={course.difficulty}
                  estimatedHours={course.estimated_hours}
                  progress={course.progress}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recommended Courses */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-serif">
              {coursesInProgress.length > 0 ? "Explore More Courses" : "Start Your Journey"}
            </h2>
            <Link 
              to="/courses" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {courses.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-2xl border border-border/50">
              <p className="text-muted-foreground mb-4">No courses available yet.</p>
              <Button asChild className="rounded-full">
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 6).map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  slug={course.slug}
                  description={course.description}
                  category={course.category}
                  difficulty={course.difficulty}
                  estimatedHours={course.estimated_hours}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
