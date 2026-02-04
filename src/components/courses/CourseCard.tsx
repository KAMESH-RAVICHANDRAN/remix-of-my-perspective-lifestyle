import { Link } from "react-router-dom";
import { Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedHours: number;
  lessonCount?: number;
  progress?: number;
}

const categoryColors: Record<string, string> = {
  html: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  css: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  javascript: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const CourseCard = ({
  title,
  slug,
  description,
  category,
  difficulty,
  estimatedHours,
  lessonCount = 0,
  progress,
}: CourseCardProps) => {
  return (
    <Link 
      to={`/courses/${slug}`} 
      className="block group"
    >
      <article className="bg-card rounded-2xl p-6 h-full border border-border/50 card-hover">
        {/* Category Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
          category === 'html' ? 'bg-orange-100 dark:bg-orange-900/30' :
          category === 'css' ? 'bg-blue-100 dark:bg-blue-900/30' :
          'bg-yellow-100 dark:bg-yellow-900/30'
        }`}>
          <span className="text-2xl font-bold">
            {category === 'html' ? '📄' : category === 'css' ? '🎨' : '⚡'}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className={categoryColors[category]}>
            {category.toUpperCase()}
          </Badge>
          <Badge variant="secondary" className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{estimatedHours}h</span>
          </div>
          {lessonCount > 0 && (
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{lessonCount} lessons</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {progress !== undefined && progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </article>
    </Link>
  );
};

export default CourseCard;
