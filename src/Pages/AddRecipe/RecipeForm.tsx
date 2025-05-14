// src/components/Form/RecipeForm.tsx
import React from "react";

interface RecipeFormProps {
	formData: any;
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleArrayChange: (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
		field: keyof typeof formData
	) => void;
	addArrayField: (field: keyof typeof formData) => void;
	handleSubmit: (e: React.FormEvent) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
	formData,
	handleChange,
	handleArrayChange,
	addArrayField,
	handleSubmit,
}) => {
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block mb-1 font-medium">Name</label>
				<input
					className="border border-gray-300 rounded-lg p-2 w-full"
					name="name"
					placeholder="Name"
					value={formData.name}
					onChange={handleChange}
				/>
			</div>

			{/* Ingredients */}
			<div>
				<label className="block mb-1 font-medium">Ingredients</label>
				{formData.ingredients.map((item: string, idx: number) => (
					<input
						key={idx}
						className="mb-2 border border-gray-300 rounded-lg p-2 w-full"
						value={item}
						placeholder={`Ingredient ${idx + 1}`}
						onChange={(e) => handleArrayChange(e, idx, "ingredients")}
					/>
				))}
				<button type="button" className="text-blue-600" onClick={() => addArrayField("ingredients")}>
					+ Ingredient
				</button>
			</div>

			{/* Instructions */}
			<div>
				<label className="block mb-1 font-medium">Instructions</label>
				{formData.instructions.map((step: string, idx: number) => (
					<input
						key={idx}
						className="mb-2 border border-gray-300 rounded-lg p-2 w-full"
						value={step}
						placeholder={`Step ${idx + 1}`}
						onChange={(e) => handleArrayChange(e, idx, "instructions")}
					/>
				))}
				<button type="button" className="text-blue-600" onClick={() => addArrayField("instructions")}>
					+ Step
				</button>
			</div>

			{/* Other fields */}
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

			{/* Tags */}
			<div>
				<label className="block mb-1 font-medium">Tags</label>
				{formData.tags.map((tag: string, idx: number) => (
					<input
						key={idx}
						className="mb-2 border border-gray-300 rounded-lg p-2 w-full"
						value={tag}
						placeholder={`Tag ${idx + 1}`}
						onChange={(e) => handleArrayChange(e, idx, "tags")}
					/>
				))}
				<button type="button" className="text-blue-600" onClick={() => addArrayField("tags")}>
					+ Tag
				</button>
			</div>

			{/* Meal Type */}
			<div>
				<label className="block mb-1 font-medium">Meal Type</label>
				{formData.mealType.map((type: string, idx: number) => (
					<input
						key={idx}
						className="mb-2 border border-gray-300 rounded-lg p-2 w-full"
						value={type}
						placeholder={`Meal Type ${idx + 1}`}
						onChange={(e) => handleArrayChange(e, idx, "mealType")}
					/>
				))}
				<button type="button" className="text-blue-600" onClick={() => addArrayField("mealType")}>
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
	);
};

export default RecipeForm;
