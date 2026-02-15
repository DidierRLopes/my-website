import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function Newsletter() {
  useEffect(() => {
    window.location.href = 'https://substack.com/@didierrlopes';
  }, []);

  return null;
}
