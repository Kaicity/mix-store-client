'use client';

import type { Products } from '@/types/product';
import { Autocomplete, AutocompleteItem, Avatar } from '@heroui/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: (value: string) => void;
  suggestions?: Products; // danh sách gợi ý
}

const SearchBar = ({ search, setSearch, handleSearch, suggestions = [] }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(search);

  const filtered = suggestions.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={(value) => {
        setInputValue(value);
        setSearch(value);
      }}
      onSelectionChange={(value) => {
        if (value) {
          setSearch(String(value));
          handleSearch(String(value));
        }
      }}
      defaultItems={filtered.map((item) => ({ label: item, value: item }))}
      aria-label="Search products"
      placeholder="Bạn đang tìm gì..."
      startContent={<Search className="w-4 h-4 text-gray-400" />}
      variant="faded"
      radius="lg"
      onKeyDown={(e) => e.key === 'Enter' && handleSearch(inputValue)}
      popoverProps={{
        classNames: {
          content: 'bg-white shadow-lg rounded-lg border border-gray-100',
        },
      }}
    >
      {filtered.map((item) => (
        <AutocompleteItem key={item.id} textValue={item.name}>
          <div className="flex items-start gap-2">
            {/* Hình ảnh sản phẩm */}
            <Avatar
              src={item.images[item.colors[0]]}
              alt={item.name}
              radius="md"
              className="w-16 h-16 object-cover flex-shrink-0"
            />

            {/* Tên & Giá */}
            <div className="flex flex-col gap-1">
              <span className="truncate font-medium text-gray-800">{item.name}</span>
              <span className="text-xs text-red-500">{item.price.toLocaleString('vi-VN')}₫</span>
            </div>
          </div>
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default SearchBar;
