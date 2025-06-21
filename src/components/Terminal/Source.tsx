import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

type SourceProps = {
    url: string;
    title: string;
    thumbnail: string;
};

const Source: React.FC<SourceProps> = ({ url, title, thumbnail }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const thumbnailRef = useRef<HTMLAnchorElement>(null);

    const handleMouseEnter = () => {
        if (thumbnailRef.current) {
            const rect = thumbnailRef.current.getBoundingClientRect();
            setTooltipPosition({
                top: rect.top - 10,
                left: rect.left + rect.width / 2,
            });
        }
        setIsHovered(true);
    };

    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        right: '20px',
        top: '-22px',
        width: '60px',
        height: '60px',
    };

    const thumbnailStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        borderRadius: '4px',
        objectFit: 'cover',
        border: '1px solid #ccc',
    };

    const tooltipStyle: React.CSSProperties = {
        visibility: isHovered ? 'visible' : 'hidden',
        position: 'fixed',
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
        transform: 'translate(-50%, -100%)',
        width: '200px',
        backgroundColor: 'black',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '6px',
        padding: '5px 0',
        zIndex: 1000,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
    };

    const tooltipArrowStyle: React.CSSProperties = {
        content: '""',
        position: 'absolute',
        top: '100%',
        left: '50%',
        marginLeft: '-5px',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: 'black transparent transparent transparent',
    };
    
    const Tooltip = () => createPortal(
        <div style={tooltipStyle}>
            {title}
            <div style={tooltipArrowStyle} />
        </div>,
        document.body
    );

    return (
        <div style={containerStyle}>
            <a
                ref={thumbnailRef}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={thumbnail} alt={title} style={thumbnailStyle} />
            </a>
            {isHovered && <Tooltip />}
        </div>
    );
};

export default Source; 