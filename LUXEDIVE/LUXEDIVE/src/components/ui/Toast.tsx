import React, { useState, useEffect } from "react";
import { registerToast, type ToastData } from "../../lib/toast";

export default function Toast() {
  const [toastData, setToastData] = useState<ToastData | null>(null);

  useEffect(() => {
    registerToast((data: ToastData) => setToastData(data));
  }, []);

  useEffect(() => {
    if (toastData) {
      const timer = setTimeout(() => {
        setToastData(null);
      }, 2000); // 2 sec
      return () => clearTimeout(timer);
    }
  }, [toastData]);

  if (!toastData) return null;

  return (
    <div className={`custom-toast ${toastData.type}`}>
      {toastData.message}
    </div>
  );
}
