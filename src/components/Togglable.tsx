import { useState, useImperativeHandle, forwardRef } from "react";

type TogglableProps = {
  buttonLabel: string;
  // ref: React.Ref<any>;
  children: React.ReactNode;
  text?: string;
};

export type TogglableRef = {
  toggleVisibility: () => void;
};

const Togglable = (props: TogglableProps, ref: React.Ref<TogglableRef>) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        {props?.text && props.text}{" "}
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        {props?.text && props.text}{" "}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default forwardRef(Togglable);
