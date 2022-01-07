import React, { useEffect } from "react";
import { BrowserHistory } from "history";

interface MicroFrontendProps {
  name: string;
  host: string | undefined;
  history: BrowserHistory;
}

const MicroFrontend = ({ name, host, history }: MicroFrontendProps) => {
  useEffect(() => {
    const scriptId: string = `micro-frontend-script-${name}`;
    const renderMicroFrontend = () => {
      (window as { [key: string]: any })[`render${name}`](
        `${name}-container`,
        history
      );
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    if (host === undefined) {
      console.warn(`Micro frontend app - ${name} cannot be found`);
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const script = document.createElement("script");
        script.id = scriptId;
        script.crossOrigin = "";
        script.src = `${host}${manifest.files["main.js"]}`;
        script.onload = () => {
          renderMicroFrontend();
        };
        document.head.appendChild(script);
      });

    return () => {
      (window as { [key: string]: any })[`unmount${name}`] &&
        (window as { [key: string]: any })[`unmount${name}`](
          `${name}-container`
        );
    };
  });

  return <main id={`${name}-container`} />;
};

MicroFrontend.defaultProps = {
  window,
  document,
};

export default MicroFrontend;
