import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function Newsletter() {
  useEffect(() => {
    window.location.href = 'https://devreluni.substack.com/subscribe';
  }, []);

  return null;
}
