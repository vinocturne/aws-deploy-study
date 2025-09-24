import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root")!;

const app = (
	<StrictMode>
		<HelmetProvider>
			<App />
		</HelmetProvider>
	</StrictMode>
);

// React Snap을 위한 hydration 처리
if (rootElement.hasChildNodes()) {
	// react-snap으로 미리 렌더링된 HTML이 있는 경우 hydrate
	hydrateRoot(rootElement, app);
} else {
	// 일반적인 경우 render
	createRoot(rootElement).render(app);
}
