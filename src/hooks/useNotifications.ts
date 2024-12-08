import { useEffect } from 'react';

export const useNotifications = () => {
  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        registerNotifications();
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const registerNotifications = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        
        // Schedule notifications
        registration.active?.postMessage({
          type: 'SCHEDULE_NOTIFICATION'
        });

        // Try to register for periodic sync if available
        if ('periodicSync' in registration) {
          const status = await navigator.permissions.query({
            name: 'periodic-background-sync' as PermissionName,
          });

          if (status.state === 'granted') {
            await registration.periodicSync.register('daily-notification', {
              minInterval: 24 * 60 * 60 * 1000, // 24 hours
            });
          }
        }
      } catch (error) {
        console.error('Error registering notifications:', error);
      }
    }
  };

  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        registerNotifications();
      }
    }
  }, []);

  return { requestNotificationPermission };
};