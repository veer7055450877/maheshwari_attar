import { useEffect } from 'react';

type HeadProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  noIndex?: boolean;
};

function upsertMeta(attr: 'name' | 'property', key: string, content?: string) {
  if (!content) return;
  const selector = `${attr}="${key}"`;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${selector}]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export const Head = ({ title, description, url, image, noIndex }: HeadProps) => {
  useEffect(() => {
    const prevTitle = document.title;

    const prevMeta: Array<{ el: HTMLMetaElement | null; attr: string; key: string; prev?: string | null }> = [];

    const track = (attr: 'name' | 'property', key: string) => {
      const selector = `${attr}="${key}"`;
      const el = document.head.querySelector<HTMLMetaElement>(`meta[${selector}]`);
      prevMeta.push({ el: el || null, attr, key, prev: el ? el.getAttribute('content') : null });
    };

    // Track common tags
    track('name', 'description');
    track('property', 'og:title');
    track('property', 'og:description');
    track('property', 'og:type');
    track('property', 'og:url');
    track('property', 'og:image');
    track('name', 'twitter:card');
    track('name', 'robots');

    if (title) document.title = title;
    if (description) upsertMeta('name', 'description', description);
    if (title) upsertMeta('property', 'og:title', title);
    if (description) upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    if (url) upsertMeta('property', 'og:url', url);
    if (image) upsertMeta('property', 'og:image', image);
    upsertMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    if (noIndex) upsertMeta('name', 'robots', 'noindex');

    return () => {
      // restore title
      document.title = prevTitle;

      // restore or remove tracked meta tags
      prevMeta.forEach(({ el, attr, key, prev }) => {
        const selector = `${attr}="${key}"`;
        const current = document.head.querySelector<HTMLMetaElement>(`meta[${selector}]`);
        if (!current) return;
        if (prev == null) {
          // remove created tag
          current.remove();
        } else {
          current.setAttribute('content', prev);
        }
      });
    };
  }, [title, description, url, image, noIndex]);

  return null;
};

export default Head;
