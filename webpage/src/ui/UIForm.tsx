import React, { createContext, useEffect, useState } from "react";

type Props = {
  id: string;
  children: Array<JSX.Element> | JSX.Element;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, payload: object) => void;
  style?: React.CSSProperties;
  payloadInitValue?: any;
};

interface IUIFormContext {
  payload: Map<string, any>;
  requiredItems: Array<String>;
  isSubmitAttempted: boolean;
  setPayload: React.Dispatch<React.SetStateAction<any>>;
  setRequiredItems: React.Dispatch<React.SetStateAction<any>>;
}

export const UIFormContext = createContext(
  null as unknown as IUIFormContext | null
);

const UIForm = ({ id, children, style, payloadInitValue, onSubmit }: Props) => {
  const [payload, setPayload] = useState<Map<string, any>>(
    new Map<string, any>()
  );
  const [requiredItems, setRequiredItems] = useState(new Array<string>());
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  useEffect(() => {
    setPayload(payloadInitValue);
  }, []);
  return (
    <UIFormContext.Provider
      value={{
        payload,
        requiredItems,
        isSubmitAttempted,
        setPayload,
        setRequiredItems,
      }}
    >
      <form
        id={id}
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitAttempted(true);
          let isSubmit: boolean = true;
          requiredItems.forEach((requiredItem: string) => {
            if (!payload.hasOwnProperty(requiredItem)) {
              isSubmit = false;
            }
          });
          if (isSubmit) {
            onSubmit(e, payload);
          }
        }}
        style={style}
      >
        {children}
      </form>
    </UIFormContext.Provider>
  );
};

export default UIForm;
