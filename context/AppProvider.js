'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

const SAVED_STORAGE_KEY = 'fabrikaaya_saved';
const REQUESTS_STORAGE_KEY = 'fabrikaaya_requests';
const RECENT_STORAGE_KEY = 'fabrikaaya_recent';
const QUIZ_STORAGE_KEY = 'fabrikaaya_quiz';

export function AppProvider({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [requests, setRequests] = useState([]);
  const [recentIds, setRecentIds] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [quickViewItem, setQuickViewItemState] = useState(null);
  const [connectModalData, setConnectModalData] = useState(null); // { designer }

  // Load from localStorage on mount (client only) to avoid hydration mismatch
  useEffect(() => {
    try {
      const savedRaw = localStorage.getItem(SAVED_STORAGE_KEY);
      if (savedRaw) {
        const parsed = JSON.parse(savedRaw);
        if (Array.isArray(parsed)) {
          setSavedIds(parsed);
        }
      }

      const requestsRaw = localStorage.getItem(REQUESTS_STORAGE_KEY);
      if (requestsRaw) {
        const parsedRequests = JSON.parse(requestsRaw);
        if (Array.isArray(parsedRequests)) {
          setRequests(parsedRequests);
        }
      }

      const recentRaw = localStorage.getItem(RECENT_STORAGE_KEY);
      if (recentRaw) {
        const parsedRecent = JSON.parse(recentRaw);
        if (Array.isArray(parsedRecent)) {
          setRecentIds(parsedRecent.slice(0, 6));
        }
      }
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const addRecentItem = useCallback((itemId) => {
    if (!itemId) return;
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== itemId);
      const updated = [itemId, ...filtered].slice(0, 6);
      try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to write recent items to localStorage', e);
      }
      return updated;
    });
  }, []);

  const setQuickViewItem = useCallback(
    (item) => {
      setQuickViewItemState(item);
      if (item && item.id) {
        addRecentItem(item.id);
      }
    },
    [addRecentItem]
  );

  const toggleSave = useCallback((itemId) => {
    setSavedIds((prev) => {
      let next;
      if (prev.includes(itemId)) {
        next = prev.filter((id) => id !== itemId);
      } else {
        next = [...prev, itemId];
      }
      try {
        localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to write saved items to localStorage', e);
      }
      return next;
    });
  }, []);

  const saveAll = useCallback((itemIds) => {
    if (!Array.isArray(itemIds) || itemIds.length === 0) return;
    setSavedIds((prev) => {
      const set = new Set([...prev, ...itemIds]);
      const next = Array.from(set);
      try {
        localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to write saved items to localStorage', e);
      }
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (itemId) => {
      return savedIds.includes(itemId);
    },
    [savedIds]
  );

  const addRequest = useCallback((requestData) => {
    const newReq = {
      id: Date.now().toString(),
      status: 'sent',
      createdAt: new Date().toISOString(),
      ...requestData,
    };

    setRequests((prev) => {
      const updated = [newReq, ...prev];
      try {
        localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to write requests to localStorage', e);
      }
      return updated;
    });

    return newReq;
  }, []);

  const updateRequest = useCallback((requestId, updates) => {
    setRequests((prev) => {
      const updated = prev.map((req) => {
        if (req.id === requestId) {
          return { ...req, ...updates };
        }
        return req;
      });
      try {
        localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update request in localStorage', e);
      }
      return updated;
    });
  }, []);

  const withdrawRequest = useCallback((requestId) => {
    setRequests((prev) => {
      const updated = prev.filter((req) => req.id !== requestId);
      try {
        localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to withdraw request from localStorage', e);
      }
      return updated;
    });
  }, []);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  const hideToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isHydrated,
        savedIds,
        savedCount: savedIds.length,
        isSaved,
        toggleSave,
        saveAll,
        recentIds,
        addRecentItem,
        requests,
        addRequest,
        updateRequest,
        withdrawRequest,
        toastMessage,
        showToast,
        hideToast,
        quickViewItem,
        setQuickViewItem,
        connectModalData,
        setConnectModalData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
