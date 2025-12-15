import { useMemo, useState } from 'react';
import type { Post } from '../data/posts';
import type { Project } from '../data/projects';

type Props = { posts: Post[]; projects: Project[] };

type Result = { 
  type: 'post' | 'project'
  title: string
  excerpt: string
  tags: string[]
  slug: string
  url: string
};

export function SearchBox({ posts, projects }: Props) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Result[];
    const haystack: Result[] = [
      ...posts.map((p) => ({ 
        type: 'post' as const, 
        title: p.title, 
        excerpt: p.excerpt, 
        tags: p.tags,
        slug: p.slug,
        url: `/blog/${p.slug}`
      })),
      ...projects.map((p) => ({
        type: 'project' as const,
        title: p.title,
        excerpt: p.summary,
        tags: p.tags,
        slug: p.slug,
        url: `/projects/${p.slug}`
      }))
    ];
    return haystack.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [posts, projects, query]);

  return (
    <div className="space-y-6">
      <div className="card flex items-center gap-3 px-4 py-3 sm:px-4 sm:py-3">
        <span className="text-secondary text-lg sm:text-xl">🔍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="w-full bg-transparent text-primary placeholder:text-secondary focus:outline-none text-sm sm:text-base"
          autoFocus
        />
      </div>

      <div className="space-y-3 text-sm sm:text-base text-secondary">
        <div>
          {results.length === 0 && query && 'No results yet…'}
          {!query && 'Type to search posts and projects'}
          {query && results.length > 0 && `Found ${results.length} result(s)`}
        </div>
        <div className="space-y-3">
          {results.map((item, idx) => (
            <a 
              key={`${item.title}-${idx}`} 
              href={item.url}
              className="block card p-3 sm:p-4 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-98"
            >
              <div className="flex items-center justify-between text-xs sm:text-xs text-secondary mb-2">
                <span className="uppercase tracking-[0.2em] font-medium">{item.type}</span>
                <span className="text-lg">→</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-primary line-clamp-2">{item.title}</h3>
              <p className="text-secondary text-xs sm:text-sm mt-1 line-clamp-2">{item.excerpt}</p>
              <div className="mt-2 flex flex-wrap gap-1 sm:gap-2 text-[10px] sm:text-[11px] text-secondary">
                {item.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 sm:py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
