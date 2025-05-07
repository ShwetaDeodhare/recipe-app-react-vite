import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import RecipeCard from "../../components/Card/RecipeCard";

interface Recipe {
	image: string;
	name: string;
	instructions: any;
	difficulty: string;
	cuisine: string;
	id: number;
	title: string;
	description: string;
}

const RecipeSearch: React.FC = () => {
	// State for storing the search query and recipe results
	const [query, setQuery] = useState<string>("");
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	// Function to handle the search query change
	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	// Function to fetch recipes from the API
	const fetchRecipes = async () => {
		if (!query) return; // Don't search if the query is empty

		setLoading(true);
		setError("");
		try {
			const response = await axios.get(
				`https://dummyjson.com/recipes/search?q=${query}`
			);
			setRecipes(response.data.recipes); // Update the recipes state with search results
		} catch (err) {
			setError("Error fetching recipes, please try again.");
		}
		setLoading(false);
	};

	// Function to handle form submit (search)
	const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetchRecipes();
	};

	return (
		<div>
			<h1>Recipe Search</h1>
			<form onSubmit={handleSearchSubmit}>
				<input
					type="text"
					value={query}
					onChange={handleSearchChange}
					placeholder="Search for a recipe"
				/>
				<button type="submit" disabled={loading}>
					{loading ? "Searching..." : "Search"}
				</button>
			</form>

			{recipes.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{recipes.map((recipe) => (
						<RecipeCard
							key={recipe.id}
							image={recipe.image}
							title={recipe.name}
							description={recipe.instructions}
							id={recipe.id}
							difficulty={recipe.difficulty}
							cuisine={recipe.cuisine}
						/>
					))}
				</div>
			) : (
				<p>No recipes found</p>
			)}
		</div>
	);
};

export default RecipeSearch;
