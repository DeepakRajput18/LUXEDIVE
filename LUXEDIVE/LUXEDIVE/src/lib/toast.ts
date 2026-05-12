export type ToastType = "warning" | "error" | "success" | "info";

export interface ToastData {
  message: string;
  type: ToastType;
}

let showToast: ((data: ToastData) => void) | null = null;

export const registerToast = (fn: (data: ToastData) => void) => {
  showToast = fn;
};

export const toast = Object.assign(
  (message: string, type: ToastType = "warning") => {
    if (showToast) showToast({ message, type });
  },
  {
    success: (message: string) => { if (showToast) showToast({ message, type: 'success' }); },
    error:   (message: string) => { if (showToast) showToast({ message, type: 'error' }); },
    warning: (message: string) => { if (showToast) showToast({ message, type: 'warning' }); },
    info:    (message: string) => { if (showToast) showToast({ message, type: 'info' }); }
  }
);
