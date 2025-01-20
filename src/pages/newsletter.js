import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function Newsletter() {
  useEffect(() => {
    window.location.href = 'https://didierlopes.beehiiv.com/';
  }, []);

  return null;
}