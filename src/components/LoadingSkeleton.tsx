
import { Skeleton } from "@/components/ui/skeleton";

export const CategoryCardSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-32 w-full rounded-lg" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-2/3 mx-auto" />
      <Skeleton className="h-3 w-1/2 mx-auto" />
    </div>
  </div>
);

export const ArticleCardSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-48 w-full rounded-lg" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
    <div className="container mx-auto px-4 text-center">
      <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-white/10" />
      <Skeleton className="h-8 w-1/2 mx-auto mb-8 bg-white/10" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center">
            <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4 bg-white/10" />
            <Skeleton className="h-8 w-16 mx-auto mb-2 bg-white/10" />
            <Skeleton className="h-4 w-24 mx-auto bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
