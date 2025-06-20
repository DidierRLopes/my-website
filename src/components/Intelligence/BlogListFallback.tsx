import type { FC } from 'react';
import type { EnrichedBlogItem } from '../../types/blog';

interface Props {
  items: EnrichedBlogItem[];
}

const BlogListFallback: FC<Props> = ({ items }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item) => (
        <li key={item.id} style={{ marginBottom: '1.5rem' }}>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#63B3ED', fontSize: '1.1rem', fontWeight: 500 }}
          >
            {item.title}
          </a>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#A0AEC0' }}>
            {item.summary}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default BlogListFallback; 