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
        width: '100%', 
        height: '60vh',
        minHeight: '450px',
        maxHeight: '600px',
        position: 'relative',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '0.5rem',
      }}>
        <iframe
          src="https://substack.com/@didierrlopes"
          width="100%"
          height="100%"
          style={{
            border: 'none',
            backgroundColor: 'white',
          }}
          title="Newsletter Subscription"
          loading="lazy"
          scrolling="yes"
        />
      </div>
    </Modal>
  );
}