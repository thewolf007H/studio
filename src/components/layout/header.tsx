import { GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <GraduationCap className="h-8 w-8 mr-2 text-primary" />
          <span className="text-2xl font-bold font-headline text-primary">LinguaMeet</span>
        </div>
        {/* Navigation items can be added here if needed */}
      </div>
    </header>
  );
}
