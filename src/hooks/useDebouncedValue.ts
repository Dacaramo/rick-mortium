import { useEffect, useState } from 'react';

export const useDebouncedValue = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>('');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
