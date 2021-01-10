import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { mount } from "auth/AuthApp";

export default ({ onSignIn }) => {
  const ref = useRef(null);

  const {
    push,
    location: { pathname },
    listen,
  } = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref?.current, {
      initialPath: pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        if (pathname !== nextPathname) {
          push(nextPathname);
        }
      },
      onSignIn,
    });
    listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
