import "./Popup.css"
import {useEffect, useState} from "react";

export function Popup({message, severity}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isVisible && (<div className={`popup ${isVisible ? "popup_visible" : ""} ${severity === "Error" ? "popup_type_error" : ""}
      `}>
        <div className="popup__content">
          <p
            className={`popup__message ${severity === "Error" ? "popup__message_type_error" : "popup__message_type_success"}`}>
            {message}</p>
        </div>
      </div>)}
    </>
  );
}