import React from "react";
import Header from "./components/Header/Header";
import routes from "./routes/routeConfig";

const App: React.FC = () => {
	return (
		<div className="App">
			<Header />
			{routes}
		</div>
	);
};

export default App;
