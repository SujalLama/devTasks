import {
  createContext,
  ReactNode,
  useContext,
  
  useState,
} from "react";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";

type ToastConfig = {
  type: "error" | "success" | "info";
  title?: string;
  message: string;
  autoHide?: boolean;
  timeout?: number;
};

type ToastContextType = {
  showToast: (toastConfig: ToastConfig) => void;
  hideToast: () => void;
};
const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  hideToast: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [toastConfig, setToastConfig] = useState<ToastConfig>({
    type: "success",
    title: "",
    message: "",
    autoHide: false,
    timeout: 3000,
  });

  const showToast = (config: ToastConfig) => {
    setToastConfig(config);
    setShow(true);

    if (config.autoHide) {
      setTimeout(() => {
        hideToast();
      }, config.timeout || 3000);
    }
  };

  const hideToast = () => {
    setShow(false);
    setToastConfig({
      type: "success",
      title: "",
      message: "",
      autoHide: false,
      timeout: 3000,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <NotificationGroup
        style={{
          top: 20,
          left: "50%",
          transform: "translate(-50%,  0)",
          alignItems: "flex-start",
          flexWrap: "wrap-reverse",
        }}
      >
        <Fade>
          {show && (
            <Notification type={{ style: toastConfig.type, icon: false }}>
              {toastConfig.title && (
                <h4 style={{ fontWeight: 700 }}>{toastConfig.title}</h4>
              )}
              <span>{toastConfig.message}</span>
            </Notification>
          )}
        </Fade>
      </NotificationGroup>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
