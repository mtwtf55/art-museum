import "./NotFoundPlaceholder.scss";

import React from "react";

type NotFoundPlaceholderType = {
  message: string;
};

function NotFoundPlaceholder({ message }: NotFoundPlaceholderType) {
  return (
    <div className="not-found-placeholder">
      <p className="not-found-placeholder__text">{message}</p>
    </div>
  );
}

export default NotFoundPlaceholder;
