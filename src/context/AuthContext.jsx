import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('secretshows_user');
    const storedBookings = localStorage.getItem('secretshows_bookings');
    const storedSaved = localStorage.getItem('secretshows_saved');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
    if (storedSaved) {
      setSavedEvents(JSON.parse(storedSaved));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const mockUser = {
      id: 'user-1',
      email,
      name: email.split('@')[0],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop',
      joinedDate: new Date().toISOString(),
      city: 'New York',
    };

    setUser(mockUser);
    localStorage.setItem('secretshows_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const signup = async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const mockUser = {
      id: 'user-' + Date.now(),
      email,
      name,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop',
      joinedDate: new Date().toISOString(),
      city: 'New York',
    };

    setUser(mockUser);
    localStorage.setItem('secretshows_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('secretshows_user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('secretshows_user', JSON.stringify(updatedUser));
  };

  const bookEvent = (eventId, tickets = 1) => {
    const booking = {
      id: 'booking-' + Date.now(),
      eventId,
      tickets,
      bookedAt: new Date().toISOString(),
      status: 'confirmed',
    };
    const newBookings = [...bookings, booking];
    setBookings(newBookings);
    localStorage.setItem('secretshows_bookings', JSON.stringify(newBookings));
    return booking;
  };

  const cancelBooking = (bookingId) => {
    const newBookings = bookings.filter(b => b.id !== bookingId);
    setBookings(newBookings);
    localStorage.setItem('secretshows_bookings', JSON.stringify(newBookings));
  };

  const toggleSaveEvent = (eventId) => {
    let newSaved;
    if (savedEvents.includes(eventId)) {
      newSaved = savedEvents.filter(id => id !== eventId);
    } else {
      newSaved = [...savedEvents, eventId];
    }
    setSavedEvents(newSaved);
    localStorage.setItem('secretshows_saved', JSON.stringify(newSaved));
  };

  const isEventSaved = (eventId) => savedEvents.includes(eventId);
  const isEventBooked = (eventId) => bookings.some(b => b.eventId === eventId);
  const getBookingForEvent = (eventId) => bookings.find(b => b.eventId === eventId);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    bookings,
    savedEvents,
    login,
    signup,
    logout,
    updateProfile,
    bookEvent,
    cancelBooking,
    toggleSaveEvent,
    isEventSaved,
    isEventBooked,
    getBookingForEvent,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
