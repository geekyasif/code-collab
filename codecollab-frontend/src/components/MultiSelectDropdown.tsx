import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

const MultiSelectDropdown: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const options: Option[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Add more options as needed
  ];

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="relative z-10 block p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
        onClick={handleToggleDropdown}
      >
        {selectedOptions.length === 0
          ? 'Select options'
          : selectedOptions.join(', ')}
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <label
              key={option.value}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={handleOptionChange}
                className="mr-2 leading-tight"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
