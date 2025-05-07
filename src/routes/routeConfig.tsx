import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipe from "../components/Recipe/Recipe";
import RecipeDetail from "../components/Recipe/RecipeDetail";
import RecipeSearch from "../Pages/RecipeSearch/RecipeSearch";
import AddRecipe from "../Pages/AddRecipe/AddRecipe";
import Create from "../Pages/Temp/Create";

const routes = (
	<Router>
		<Routes>
			<Route path="/" element={<Recipe />} />
			<Route path="/recipe/:id" element={<RecipeDetail />} />
			<Route path="/search" element={<RecipeSearch />} />
			<Route path="/add" element={<AddRecipe />} />
			<Route path="/temp" element={<Create />} />
		</Routes>
	</Router>
);

export default routes;
