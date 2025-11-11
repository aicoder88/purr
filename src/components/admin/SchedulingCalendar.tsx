import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/types/blog';

interface SchedulingCalendarProps {
  posts: BlogPost[];
  onPostClick?: (post: BlogPost) => void;
}

export default function SchedulingCalendar({ posts, onPostClick }: SchedulingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const scheduledPosts = posts.filter(
    post => post.status === 'scheduled' && post.scheduledDate
  );

  const getPostsForDate = (date: Date): BlogPost[] => {
    return scheduledPosts.filter(post => {
      if (!post.scheduledDate) return false;
      const postDate = new Date(post.scheduledDate);
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add padding days from previous month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add padding days from next month
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Scheduled Posts</span>
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={previousMonth}
            className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            ←
          </button>
          <span className="text-lg font-medium">{monthName}</span>
          <button
            onClick={nextMonth}
            className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            →
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => {
          const postsForDay = getPostsForDate(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday =
            day.getDate() === new Date().getDate() &&
            day.getMonth() === new Date().getMonth() &&
            day.getFullYear() === new Date().getFullYear();

          return (
            <div
              key={index}
              className={`min-h-[80px] p-2 border border-gray-200 dark:border-gray-700 rounded ${
                !isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900' : ''
              } ${isToday ? 'ring-2 ring-purple-500' : ''}`}
            >
              <div
                className={`text-sm font-medium mb-1 ${
                  !isCurrentMonth
                    ? 'text-gray-400 dark:text-gray-600'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                {day.getDate()}
              </div>

              {postsForDay.length > 0 && (
                <div className="space-y-1">
                  {postsForDay.map(post => (
                    <button
                      key={post.id}
                      onClick={() => onPostClick?.(post)}
                      className="w-full text-left px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                      title={post.title}
                    >
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{formatTime(post.scheduledDate!)}</span>
                      </div>
                      <div className="truncate font-medium">{post.title}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded ring-2 ring-purple-500"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-purple-100 dark:bg-purple-900/30"></div>
            <span>Scheduled post</span>
          </div>
        </div>
        <div>
          {scheduledPosts.length} post{scheduledPosts.length !== 1 ? 's' : ''} scheduled
        </div>
      </div>
    </div>
  );
}
