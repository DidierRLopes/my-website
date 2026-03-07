import React, { useState, useEffect } from 'react';
import Modal from './General/Modal';

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Don't show modal on mobile
    if (isMobile) {
      return;
    }
    
    const hasSeenModal = localStorage.getItem('newsletter-modal-shown');
    
    if (hasSeenModal === 'true') {
      return;
    }

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage > 30 && !hasScrolled && !isMobile) {
        setHasScrolled(true);
        setIsOpen(true);
        localStorage.setItem('newsletter-modal-shown', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled, isMobile]);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Don't render modal at all on mobile
  if (isMobile) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div style={{
        padding: '2.5rem 2rem',
        textAlign: 'center',
        fontFamily: 'var(--mission-font-family)',
        color: 'var(--mission-text-color)',
      }}>
        <div style={{
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          marginBottom: '12px',
          color: 'var(--ds-gray-medium)',
        }}>
          Newsletter
        </div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '12px',
        }}>
          Stay in the loop
        </h2>
        <p style={{
          fontSize: '1rem',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
          color: 'var(--ds-gray-medium)',
        }}>
          Get updates on AI, open source, startups and finance.
        </p>
        <a
          href="https://substack.com/@didierrlopes"
          target="_blank"
          rel="noopener noreferrer"
          className="mission-button"
          style={{
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            padding: '12px 24px',
            fontSize: '14px',
          }}
        >
          Subscribe on Substack
          <span style={{ marginLeft: '6px' }}>»</span>
        </a>
      </div>
    </Modal>
  );
}