import { useMemo, useState } from 'react';
import type { Post } from '../data/posts';

type Props = { posts: Post[] };

export function BlogFilters({ posts }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((p) => p.tags.forEach((t) => map.set(t, (map.get(t) ?? 0) + 1)));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const visible = selectedTag ? posts.filter((p) => p.tags.includes(selectedTag)) : posts;

  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr]">
      <aside className="card p-4 space-y-3 h-fit">
        <div className="text-xs uppercase tracking-[0.3em] text-secondary">Filter</div>
        <div className="flex flex-col gap-2 text-sm">
          {tags.map(([tag, count]) => (
            <button
              key={tag}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left transition ${
                selectedTag === tag
                  ? 'border-white/30 bg-white/10 text-white'
                  : 'border-white/10 bg-transparent text-secondary hover:border-white/20'
              }`}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              <span>{tag}</span>
              <span className="text-xs">{count}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-secondary">
          <span>
            Showing {visible.length} of {posts.length} posts
          </span>
          {selectedTag && (
            <button className="underline" onClick={() => setSelectedTag(null)}>
              Clear filter
            </button>
          )}
        </div>
        <div className="space-y-4">
          {visible.map((post, index) => (
            <article 
              key={post.slug} 
              className="card p-4 transition-all duration-300 hover:border-white/30 hover:shadow-lg hover:-translate-y-1 cursor-pointer group"
              style={{
                animation: `fadeInUp 0.4s ease-out ${index * 0.08}s both`
              }}
            >
              <div className="text-xs text-secondary">{new Date(post.date).toDateString()}</div>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold group-hover:text-white transition-colors">{post.title}</h3>
                <span className="text-secondary group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className="text-secondary text-sm">{post.excerpt}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-secondary">
                {post.tags.map((tag) => (
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
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
