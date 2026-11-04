import React, { createContext, useContext, useState } from 'react';

export interface SelectedBookingItem {
  type: 'service' | 'package';
  id: string;
  title: string;
  price?: string;
  tagline?: string;
}

interface BookingContextType {
  selectedItem: SelectedBookingItem | null;
  selectItem: (item: SelectedBookingItem) => void;
  clearSelection: () => void;
  selectAndScrollToBooking: (item: SelectedBookingItem) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<SelectedBookingItem | null>(null);

  const selectItem = (item: SelectedBookingItem) => {
    setSelectedItem(item);
  };

  const clearSelection = () => {
    setSelectedItem(null);
  };

  const selectAndScrollToBooking = (item: SelectedBookingItem) => {
    setSelectedItem(item);

    // Give state a tick to register, then smooth scroll to the booking/contact anchor
    setTimeout(() => {
      const el = document.getElementById('contact') || document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedItem,
        selectItem,
        clearSelection,
        selectAndScrollToBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export function useBooking(): BookingContextType {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

