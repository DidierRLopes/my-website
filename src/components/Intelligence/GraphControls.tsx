import type { FC } from 'react';
import Select, { type MultiValue } from 'react-select';
import { trackEvent } from '../../lib/analytics';

interface Option {
  value: string;
  label: string;
}

interface GraphControlsProps {
  allTags: string[];
  onSearch: (query: string) => void;
  onTagFilterChange: (tags: string[]) => void;
  onDateRangeChange: (range: [Date | null, Date | null]) => void;
  showThoughts: boolean;
  showTopics: boolean;
  onToggleThoughts: () => void;
  onToggleTopics: () => void;
}

export const GraphControls: FC<GraphControlsProps> = ({
  allTags,
  onSearch,
  onTagFilterChange,
  onDateRangeChange,
  showThoughts,
  showTopics,
  onToggleThoughts,
  onToggleTopics,
}) => {
  const tagOptions: Option[] = allTags.map(tag => ({ value: tag, label: tag }));

  const handleTagChange = (selectedOptions: MultiValue<Option>) => {
    const selectedTags = selectedOptions ? selectedOptions.map(option => option.value) : [];
    onTagFilterChange(selectedTags);
    if (selectedTags.length > 0) {
      trackEvent('filter_tag', selectedTags.join(','));
    }
  };
    
  return (
    <div style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#E2E8F0' }}>
        <input type="checkbox" checked={showThoughts} onChange={onToggleThoughts} /> Thoughts
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#E2E8F0' }}>
        <input type="checkbox" checked={showTopics} onChange={onToggleTopics} /> Topics
      </label>
      <input
        type="search"
        placeholder="Search posts..."
        onChange={(e) => {
          const q = e.target.value;
          onSearch(q);
          if (q.trim().length > 0) trackEvent('search', q);
        }}
        style={{ padding: '0.5rem', minWidth: '200px', background: '#2D3748', border: '1px solid #4A5568', borderRadius: '4px', color: 'white' }}
      />
      <Select
        isMulti
        options={tagOptions}
        onChange={handleTagChange}
        placeholder="Filter by tags..."
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: '#2D3748', // gray-800
            borderColor: '#4A5568', // gray-600
            minWidth: '250px',
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: '#2D3748',
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: '#4A5568',
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: 'white',
          }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? '#4A5568' : '#2D3748',
          }),
        }}
      />
      {/* Placeholder for Date Range Filter */}
    </div>
  );
}; 