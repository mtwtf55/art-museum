import "./NotFoundPlaceholder.scss";

import React from "react";

type NotFoundPlaceholderType = {
  message: string;
};

export function NotFoundPlaceholder({ message }: NotFoundPlaceholderType) {
  return (
    <div className="not-found-placeholder" data-testid="not-found-placeholder">
      <h2 className="not-found-placeholder__text">{message}</h2>
    </div>
  );
}
