import React, { useState } from "react";
import RecipeCard from "../../components/Card/RecipeCard";

const AddRecipe = () => {
	const initialState = {
		name: "",
		ingredients: [""],
		instructions: [""],
		prepTimeMinutes: "15",
		cookTimeMinutes: "15",
		servings: "4",
		difficulty: "Easy",
		cuisine: "Indian",
		caloriesPerServing: "40",
		tags: ["Dosa", "Breakfast"],
		userId: "2",
		image: "https://cdn.dummyjson.com/recipe-images/28.webp",
		rating: "4",
		reviewCount: "20",
		mealType: ["Lunch"],
	};

	const [formData, setFormData] = useState(initialState);
	interface Recipe {
		id: number;
		image: string;
		name: string;
		instructions: [];
		difficulty: string;
		cuisine: string;
		// Add other fields as necessary
	}

	const [submittedRecipe, setSubmittedRecipe] = useState<Recipe | null>(null);
	// const [submittedRecipes, setSubmittedRecipes] = useState<Recipe[]>([]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleArrayChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
		field: keyof typeof formData
	) => {
		const newArr = [...(formData[field] as string[])];
		newArr[index] = e.target.value;
		setFormData((prev) => ({
			...prev,
			[field]: newArr,
		}));
	};

	const addArrayField = (field: keyof typeof formData) => {
		setFormData((prev) => ({
			...prev,
			[field]: [...prev[field], ""],
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const parsedData = {
			...formData,
			prepTimeMinutes: Number(formData.prepTimeMinutes),
			cookTimeMinutes: Number(formData.cookTimeMinutes),
			servings: Number(formData.servings),
			caloriesPerServing: Number(formData.caloriesPerServing),
			userId: Number(formData.userId),
			rating: parseFloat(formData.rating),
			reviewCount: Number(formData.reviewCount),
		};

		console.log(parsedData);

		// Optional: POST request
		fetch("https://dummyjson.com/recipes/add", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(parsedData),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setSubmittedRecipe(data);
			});
		setFormData(initialState);
	};

	console.log("Submitted Recipe:", submittedRecipe);

	return (
		<div className="container mx-auto px-4 py-6">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1 font-medium">Name</label>
					<input
						className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
						name="name"
						placeholder="Name"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label className="block mb-1 font-medium">Ingredients</label>
					{formData.ingredients.map((item, idx) => (
						<input
							key={idx}
							className="mb-2 border border-gray-300 rounded-lg p-2 w-full"
							value={item}
							placeholder={`Ingredient ${idx + 1}`}
							onChange={(e) => handleArrayChange(e, idx, "ingredients")}
						/>
					))}
					<button
						type="button"
						className="text-blue-600"
						onClick={() => addArrayField("ingredients")}>
						+ Ingredient
					</button>
				</div>

				<div>
					<label className="block mb-1 font-medium">Instructions</label>
					{formData.instructions.map((step, idx) => (
						<input
							key={idx}
							className="mb-2 border border-gray-300 rounded-lg p-2 w-full"
							placeholder={`Step ${idx + 1}`}
							value={step}
							onChange={(e) => handleArrayChange(e, idx, "instructions")}
						/>
					))}
					<button
						type="button"
						className="text-blue-600"
						onClick={() => addArrayField("instructions")}>
						+ Step
					</button>
				</div>

				{[
					{ name: "prepTimeMinutes", label: "Prep Time (minutes)" },
					{ name: "cookTimeMinutes", label: "Cook Time (minutes)" },
					{ name: "servings", label: "Servings" },
					{ name: "difficulty", label: "Difficulty" },
					{ name: "cuisine", label: "Cuisine" },
					{ name: "caloriesPerServing", label: "Calories Per Serving" },
					{ name: "userId", label: "User ID" },
					{ name: "image", label: "Image URL" },
					{ name: "rating", label: "Rating" },
					{ name: "reviewCount", label: "Review Count" },
				].map(({ name, label }) => (
					<div key={name}>
						<label className="block mb-1 font-medium">{label}</label>
						<input
							name={name}
							placeholder={label}
							className="border border-gray-300 rounded-lg p-2 w-full"
							value={formData[name]}
							onChange={handleChange}
						/>
					</div>
				))}

				<div>
					<label className="block mb-1 font-medium">Tags</label>
					{formData.tags.map((tag, idx) => (
						<input
							key={idx}
							className="mb-2 border border-gray-300 rounded-lg p-2 w-full"
							value={tag}
							placeholder={`Tag ${idx + 1}`}
							onChange={(e) => handleArrayChange(e, idx, "tags")}
						/>
					))}
					<button
						type="button"
						className="text-blue-600"
						onClick={() => addArrayField("tags")}>
						+ Tag
					</button>
				</div>

				<div>
					<label className="block mb-1 font-medium">Meal Type</label>
					{formData.mealType.map((type, idx) => (
						<input
							key={idx}
							className="mb-2 border border-gray-300 rounded-lg p-2 w-full"
							value={type}
							placeholder={`Meal Type ${idx + 1}`}
							onChange={(e) => handleArrayChange(e, idx, "mealType")}
						/>
					))}
					<button
						type="button"
						className="text-blue-600"
						onClick={() => addArrayField("mealType")}>
						+ Meal Type
					</button>
				</div>

				<div>
					<button
						type="submit"
						className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
						Submit Recipe
					</button>
				</div>
			</form>
			{submittedRecipe && (
				<div className="mt-8 p-4 border rounded-lg bg-gray-50">
					<h2 className="text-lg font-semibold mb-2">Submitted Recipe:</h2>
					<RecipeCard
						key={submittedRecipe.id}
						image={submittedRecipe.image}
						title={submittedRecipe.name}
						description={submittedRecipe.instructions}
						id={submittedRecipe.id}
						difficulty={submittedRecipe.difficulty}
						cuisine={submittedRecipe.cuisine}
					/>
				</div>
			)}
		</div>
	);
};

export default AddRecipe;
