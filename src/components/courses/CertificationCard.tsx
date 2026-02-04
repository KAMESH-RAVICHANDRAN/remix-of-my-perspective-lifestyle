import { Link } from "react-router-dom";
import { Award, BookOpen, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CertificationCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  courseCount?: number;
  progress?: number;
  earned?: boolean;
}

const CertificationCard = ({
  title,
  slug,
  description,
  courseCount = 0,
  progress,
  earned = false,
}: CertificationCardProps) => {
  return (
    <Link 
      to={`/certifications/${slug}`} 
      className="block group"
    >
      <article className={`bg-card rounded-2xl p-6 h-full border card-hover ${
        earned 
          ? 'border-accent bg-accent/5' 
          : 'border-border/50'
      }`}>
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
          earned 
            ? 'bg-accent text-accent-foreground' 
            : 'bg-muted'
        }`}>
          <Award className="w-7 h-7" />
        </div>

        {/* Status Badge */}
        {earned && (
          <Badge className="mb-3 bg-accent text-accent-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            Earned
          </Badge>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {courseCount > 0 && (
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{courseCount} courses</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {progress !== undefined && progress > 0 && !earned && (
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

export default CertificationCard;
