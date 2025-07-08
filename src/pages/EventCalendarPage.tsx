import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isSameDay, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import 'react-day-picker/dist/style.css';

const EventCalendarPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('/events.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
      })
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Could not load events.');
        setLoading(false);
      });
  }, []);

  // Parse event dates and create a map of dates to events
  const eventsByDate = events.reduce((acc, event) => {
    try {
      const eventDate = parseISO(event.date);
      const dateKey = format(eventDate, 'yyyy-MM-dd');
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);
      
      // If there's an end date, add events for all days in the range
      if (event.endDate) {
        const endDate = parseISO(event.endDate);
        const daysInRange = eachDayOfInterval({ start: eventDate, end: endDate });
        daysInRange.forEach(day => {
          const dayKey = format(day, 'yyyy-MM-dd');
          if (!acc[dayKey]) acc[dayKey] = [];
          if (!acc[dayKey].find(e => e.id === event.id)) {
            acc[dayKey].push(event);
          }
        });
      }
    } catch (err) {
      console.warn('Invalid date for event:', event.title, event.date);
    }
    return acc;
  }, {} as Record<string, any[]>);

  // Get events for selected date
  const selectedDateEvents = selectedDate 
    ? eventsByDate[format(selectedDate, 'yyyy-MM-dd')] || []
    : [];

  // Custom day renderer to show event indicators
  const DayContent = ({ date, displayMonth }: { date: Date; displayMonth: Date }) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const dayEvents = eventsByDate[dateKey] || [];
    const hasEvents = dayEvents.length > 0;
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <span className={hasEvents ? 'font-bold text-lime-600' : ''}>
          {date.getDate()}
        </span>
        {hasEvents && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-1">
              {dayEvents.slice(0, 3).map((_, idx) => (
                <div 
                  key={idx} 
                  className="w-1 h-1 bg-lime-500 rounded-full"
                />
              ))}
              {dayEvents.length > 3 && (
                <div className="w-1 h-1 bg-lime-300 rounded-full" />
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow p-10 my-10 mx-4">
          <div className="text-center text-gray-500 py-10">Loading calendar...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow p-10 my-10 mx-4">
          <div className="text-center text-red-500 py-10">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow p-10 my-10 mx-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Events Calendar</h1>
        </div>
        <hr className="mb-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              components={{
                DayContent
              }}
              className="w-full"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-gray-500 rounded-md w-8 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-lime-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-lime-100 rounded-md",
                day_selected: "bg-lime-500 text-white hover:bg-lime-600 focus:bg-lime-500",
                day_today: "bg-lime-100 text-lime-900",
                day_outside: "text-gray-400 opacity-50",
                day_disabled: "text-gray-400 opacity-50",
                day_range_middle: "aria-selected:bg-lime-100 aria-selected:text-lime-900",
                day_hidden: "invisible",
              }}
            />
          </div>
          
          {/* Events for selected date */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">
                {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
              </h3>
              
              {selectedDateEvents.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                  No events on this date
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="bg-white rounded-lg p-4 shadow-sm border cursor-pointer hover:shadow-md transition"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      <div className="font-semibold text-lg mb-2">{event.title}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        {format(parseISO(event.date), 'h:mm a')}
                        {event.endDate && ` - ${format(parseISO(event.endDate), 'h:mm a')}`}
                      </div>
                      {event.location && (
                        <div className="text-sm text-gray-500 mb-1">
                          📍 {event.location}
                        </div>
                      )}
                      {event.cost && (
                        <div className="text-sm text-gray-500">
                          💰 {event.cost}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendarPage; 