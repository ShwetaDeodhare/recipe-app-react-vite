import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface RecipeDetail {
	id: number;
	name: string;
	image: string;
	instructions: string[];
	ingredients: string[];
	prepTimeMinutes: number;
	cookTimeMinutes: number;
	servings: number;
	difficulty: string;
	cuisine: string;
	caloriesPerServing: number;
	rating: number;
	reviewCount: number;
	mealType: string[];
}

const RecipeDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
	const [loading, setLoading] = useState(true);
	const [imgLoaded, setImgLoaded] = useState(false);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
				setRecipe(response.data);
			} catch (error) {
				console.error("Error fetching recipe:", error);
			} finally {
				setLoading(false);
			}
		};

		if (id) fetchRecipe();
	}, [id]);

	if (loading) return <div className="p-6 text-center">Loading...</div>;
	if (!recipe) return <div className="p-6 text-center">Recipe not found</div>;

	return (
		<div className="flex justify-center mt-10 px-4">
			<div className="max-w-4xl mx-auto p-6">
				<div className="relative h-72 sm:h-96 rounded-lg overflow-hidden mb-6 shadow-md">
					{!imgLoaded && (
						<div className="absolute top-0 left-0 w-full h-full skeleton bg-gray-200"></div>
					)}
					<img
						src={recipe.image}
						alt={recipe.name}
						onLoad={() => setImgLoaded(true)}
						className={`w-full h-full object-cover transition-opacity duration-700 ${
							imgLoaded ? "opacity-100" : "opacity-0"
						}`}
					/>
				</div>

				<h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
				<p className="text-gray-600 text-sm mb-4 italic">
					{recipe.cuisine} cuisine • {recipe.mealType.join(", ")}
				</p>

				<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-6">
					<p>
						<strong>Prep:</strong> {recipe.prepTimeMinutes} mins
					</p>
					<p>
						<strong>Cook:</strong> {recipe.cookTimeMinutes} mins
					</p>
					<p>
						<strong>Servings:</strong> {recipe.servings}
					</p>
					<p>
						<strong>Difficulty:</strong> {recipe.difficulty}
					</p>
					<p>
						<strong>Calories:</strong> {recipe.caloriesPerServing}
					</p>
					<p>
						<strong>Rating:</strong> ⭐ {recipe.rating} ({recipe.reviewCount}{" "}
						reviews)
					</p>
				</div>

				<h2 className="text-xl font-semibold mb-2">Ingredients</h2>
				<ul className="list-disc list-inside mb-6 text-gray-800">
					{recipe.ingredients.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>

				<h2 className="text-xl font-semibold mb-2">Instructions</h2>
				<ol className="list-decimal list-inside space-y-2 text-gray-800">
					{recipe.instructions.map((step, index) => (
						<li key={index}>{step}</li>
					))}
				</ol>
			</div>
		</div>
	);
};

export default RecipeDetail;
