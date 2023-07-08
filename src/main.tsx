import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import About from "./About";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<App />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
