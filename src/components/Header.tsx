import React, { ReactNode, useState } from "react";
import "../css/header.css";
type Props = {
  children: string;
  rightSide: ReactNode;
};

export default function Header({ children, rightSide }: Props) {
  return (
    <div className="mainLayout">
      <div className="leftLayout">{children}</div>
      <div className="rightLayout">{rightSide}</div>
    </div>
  );
}
