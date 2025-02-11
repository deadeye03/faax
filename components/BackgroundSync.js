// app/components/BackgroundSync.js
'use client'

import { useEffect } from 'react';
import { syncUser } from "../actions/user";

export default function BackgroundSync() {
    console.log("i am backround")
  useEffect(() => {
    const sync = async () => {
      try {
        await syncUser();
      } catch (error) {
        console.error('Error syncing user:', error);
      }
    };

    sync();
  }, []);

  return null;
}