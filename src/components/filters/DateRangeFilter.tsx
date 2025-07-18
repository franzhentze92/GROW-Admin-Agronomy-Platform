import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DateRangeFilterProps = {
  onRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  className?: string;
  initialDateRange?: { from: Date | undefined; to: Date | undefined };
};

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  onRangeChange,
  className,
  initialDateRange,
}) => {
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>(initialDateRange || {
    from: undefined,
    to: undefined,
  });

  const handleSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDate(range);
    onRangeChange(range);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;