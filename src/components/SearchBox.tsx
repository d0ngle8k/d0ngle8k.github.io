import { useMemo, useState } from 'react';
import type { Post } from '../data/posts';
import type { Project } from '../data/projects';

type Props = { posts: Post[]; projects: Project[] };

type Result = { type: 'post' | 'project'; title: string; excerpt: string; tags: string[] };

export function SearchBox({ posts, projects }: Props) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Result[];
    const haystack: Result[] = [
      ...posts.map((p) => ({ type: 'post' as const, title: p.title, excerpt: p.excerpt, tags: p.tags })),
      ...projects.map((p) => ({
        type: 'project' as const,
        title: p.title,
        excerpt: p.summary,
        tags: p.tags
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
      <div className="card flex items-center gap-3 px-4 py-3">
        <span className="text-secondary">🔍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="w-full bg-transparent text-primary placeholder:text-secondary focus:outline-none"
        />
      </div>

      <div className="space-y-3 text-sm text-secondary">
        <div>
          {results.length === 0 && query && 'No results yet…'}
          {!query && 'Type to search posts and projects'}
          {query && results.length > 0 && `Found ${results.length} result(s)`}
        </div>
        <div className="space-y-3">
          {results.map((item, idx) => (
            <article key={`${item.title}-${idx}`} className="card p-4">
              <div className="flex items-center justify-between text-xs text-secondary">
                <span className="uppercase tracking-[0.2em]">{item.type}</span>
                <span>→</span>
              </div>
              <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
              <p className="text-secondary text-sm">{item.excerpt}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-secondary">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
