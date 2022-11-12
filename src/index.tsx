import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { loadServer, DevTools } from "jira-dev-tool";
import "antd/dist/antd.less";
import { AppProviders } from "context";
import { ErrorBoundary } from "components/error-boundary";
import { ErrorFullPafe } from "components/lib";

loadServer(() => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <ErrorBoundary fallbackRender={ErrorFullPafe}>
        <AppProviders>
          <DevTools />
          <App />
        </AppProviders>
      </ErrorBoundary>
    </React.StrictMode>
  );
});
