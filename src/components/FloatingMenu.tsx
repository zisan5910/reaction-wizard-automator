import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  MessageSquare,
  Calendar,
  Loader2,
  X,
  Mail,
} from 'lucide-react';
import { format } from 'date-fns';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      (inputRef.current as any).focus();
    }
  };

  const sendMessage = async () => {
    setIsLoading(true);
    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert('Message sent!');
    setMessage('');
    setScheduledTime('');
    setIsOpen(false);
  };

  const scheduleMessage = async () => {
    setIsLoading(true);
    // Simulate scheduling message
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert(`Message scheduled for ${scheduledTime}!`);
    setMessage('');
    setScheduledTime('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl p-4 w-80 flex flex-col gap-2">
          <textarea
            ref={inputRef}
            className="border rounded p-2 flex-grow focus:outline-none"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="datetime-local"
            className="border rounded p-2 focus:outline-none"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              onClick={sendMessage}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Now
                </>
              )}
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              onClick={scheduleMessage}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </>
              )}
            </button>
          </div>
        </div>
      )}
      <button
        className={`bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen ? 'rotate-45' : ''
        }`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className="h-8 w-8" />
        ) : (
          <MessageSquare className="h-8 w-8" />
        )}
      </button>
    </div>
  );
};

export default FloatingMenu;
