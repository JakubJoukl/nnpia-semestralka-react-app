import { Props } from "ahooks/lib/useControllableValue";
import React from "react";

function SectionWithImage({ children, image }: Props) {
  return (
    <div
      style={{
        padding: "5px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "80%" }}>{children}</div>
      <img src={image} style={{ width: "20%", height: "auto" }} />
    </div>
  );
}

export default SectionWithImage;
