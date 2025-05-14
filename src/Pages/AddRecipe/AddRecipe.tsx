import React, { useState } from "react";
import RecipeCard from "../../components/Card/RecipeCard";
import RecipeForm from "./RecipeForm";

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
	const [submittedRecipes, setSubmittedRecipes] = useState<any[]>([]);
	const [editMode, setEditMode] = useState(false);
	const [editId, setEditId] = useState<number | null>(null);


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

		if (editMode && editId !== null) {
			const updatedRecipes = submittedRecipes.map((recipe) =>
				recipe.id === editId ? { ...recipe, ...parsedData, id: editId } : recipe
			);
			setSubmittedRecipes(updatedRecipes);
			setEditMode(false);
			setEditId(null);
		} else{
			fetch("https://dummyjson.com/recipes/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(parsedData),
			})
				.then((res) => res.json())
				.then((data) => {
					setSubmittedRecipes((prev) => [...prev, data]);
				});
		}

		setFormData(initialState);
	};

	const handleEdit = (recipe: Recipes) => {
		setFormData({
			...recipe,
			prepTimeMinutes: Number(recipe.prepTimeMinutes),
			cookTimeMinutes: Number(recipe.cookTimeMinutes),
			servings: Number(recipe.servings),
			caloriesPerServing: Number(recipe.caloriesPerServing),
			userId: Number(recipe.userId),
			rating: parseFloat(recipe.rating),
			reviewCount: Number(recipe.reviewCount),
		})
		setEditMode(true);
		setEditId(recipe.id);

	}

	return (
		<div className="container mx-auto px-4 py-6">
			<RecipeForm
				formData={formData}
				handleChange={handleChange}
				handleArrayChange={handleArrayChange}
				addArrayField={addArrayField}
				handleSubmit={handleSubmit}
			/>

			{submittedRecipes.length > 0 && (
				<div className="mt-8 p-4 border rounded-lg bg-gray-50">
					<h2 className="text-lg font-semibold mb-2">Submitted Recipes:</h2>
					{submittedRecipes.map((recipe) => (
						<div className="flex justify-between">
							<RecipeCard
							key={recipe.id}
							image={recipe.image}
							title={recipe.name}
							description={recipe.instructions}
							id={recipe.id}
							difficulty={recipe.difficulty}
							cuisine={recipe.cuisine}
						/>
						<button
							className="text-yellow-600 underline ml-2"
							onClick={() => handleEdit(recipe)}
						>
							Edit
						</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default AddRecipe;
