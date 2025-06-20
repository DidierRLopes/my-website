import { type FC, useState, useEffect, useCallback } from 'react';
import Select, { type MultiValue } from 'react-select';
import { trackEvent } from '../../lib/analytics';
import { useColorMode } from '@docusaurus/theme-common';

interface Option {
  value: string;
  label: string;
}

interface GraphControlsProps {
  allTags: string[];
  onSearch: (query: string) => void;
  onTagFilterChange: (tags: string[]) => void;
  onDateRangeChange: (range: [Date | null, Date | null]) => void;
  showTopics: boolean;
  onToggleTopics: () => void;
}

export const GraphControls: FC<GraphControlsProps> = ({
  allTags,
  onSearch,
  onTagFilterChange,
  onDateRangeChange,
  showTopics,
  onToggleTopics,
}) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  const handleDateChange = useCallback(() => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    onDateRangeChange([start, end]);
    if (start || end) {
      trackEvent('filter_date', `${startDate} to ${endDate}`);
    }
  }, [startDate, endDate, onDateRangeChange]);

  useEffect(() => {
    handleDateChange();
  }, [handleDateChange]);

  const tagOptions: Option[] = allTags.map(tag => ({ value: tag, label: tag }));

  const handleTagChange = (selectedOptions: MultiValue<Option>) => {
    const selectedTags = selectedOptions ? selectedOptions.map(option => option.value) : [];
    onTagFilterChange(selectedTags);
    if (selectedTags.length > 0) {
      trackEvent('filter_tag', selectedTags.join(','));
    }
  };

  const styles = {
    dateInput: {
      backgroundColor: isDarkTheme ? '#2D3748' : '#F7FAFC',
      color: isDarkTheme ? 'white' : 'black',
      border: `1px solid ${isDarkTheme ? '#4A5568' : '#E2E8F0'}`,
      padding: '0.5rem',
      borderRadius: '4px',
    },
    pillButton: {
      padding: '0.5rem 1rem',
      border: `1px solid ${showTopics ? '#66CCFF' : '#4A5568'}`,
      backgroundColor: showTopics ? '#66CCFF' : 'transparent',
      color: showTopics ? '#1A202C' : (isDarkTheme ? '#E2E8F0' : '#A0AEC0'),
      borderRadius: '9999px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.2s ease-in-out',
    },
    searchInput: {
      padding: '0.5rem',
      flexGrow: 1,
      backgroundColor: isDarkTheme ? '#2D3748' : '#F7FAFC',
      border: `1px solid ${isDarkTheme ? '#4A5568' : '#E2E8F0'}`,
      borderRadius: '4px',
      color: isDarkTheme ? 'white' : 'black',
    },
    select: {
      container: (base) => ({ ...base, position: 'relative', zIndex: 10 }),
      control: (base) => ({ ...base, backgroundColor: isDarkTheme ? '#2D3748' : '#F7FAFC', borderColor: isDarkTheme ? '#4A5568' : '#E2E8F0' }),
      input: (base) => ({...base, color: isDarkTheme ? '#E2E8F0' : '#1A202C'}),
      menu: (base) => ({ ...base, backgroundColor: '#2D3748' }),
      multiValue: (base) => ({ ...base, backgroundColor: '#4A5568' }),
      multiValueLabel: (base) => ({ ...base, color: 'white' }),
      option: (base, { isFocused }) => ({ ...base, backgroundColor: isFocused ? '#4A5568' : '#2D3748' }),
    }
  };
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem', width: '100%' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={styles.dateInput} />
        <span style={{color: '#A0AEC0'}}>-</span>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={styles.dateInput} />
        <div style={{flexGrow: 1}}>
            <Select
              isMulti
              options={tagOptions}
              onChange={handleTagChange}
              placeholder="Filter by tags..."
              styles={styles.select}
            />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={onToggleTopics}
          style={styles.pillButton}
        >
          Topics
        </button>
        <input
          type="search"
          placeholder="Search..."
          onChange={(e) => {
            const q = e.target.value;
            onSearch(q);
            if (q.trim().length > 0) trackEvent('search', q);
          }}
          style={styles.searchInput}
        />
      </div>
    </div>
  );
}; 