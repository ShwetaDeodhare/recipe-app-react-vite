import React, { useEffect, useState } from "react";
import RecipeCard from "../Card/RecipeCard";
import axios from "axios";
import ReactPaginate from "react-paginate";
import InfiniteScroll from "react-infinite-scroll-component";

interface Recipe {
	difficulty: any;
	id: number;
	name: string;
	instructions: [];
	image: string;
	cuisine: string;
}

const Recipe: React.FC = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [filteredCuisine, setFilteredCuisine] = useState<string>("All");
	const [cuisines, setCuisines] = useState<string[]>([]);
	const [filteredDifficulty, setFilteredDifficulty] = useState<string>("All");
	const [difficulties, setDifficulties] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [infiniteData, setInfiniteData] = useState<Recipe[]>([]);
	const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);

	const itemsPerPage = 6;

	// Fetch recipes from the API
	useEffect(() => {
		const fetchRecipes = async () => {
			setLoading(true); // start loading

			try {
				const response = await axios.get("https://dummyjson.com/recipes");
				const data = response.data;
				const recipeData = data.recipes as Recipe[];

				setRecipes(recipeData);

				const cuisineList = recipeData.map((r) => r.cuisine);
				const uniqueCuisines = Array.from(new Set(cuisineList));

				console.log("recipeData:", recipeData);

				setCuisines(uniqueCuisines);
				const difficultyList = recipeData.map((r) => r.difficulty);
				const uniqueDifficulties = Array.from(new Set(difficultyList));

				console.log("Unique Difficulties:", uniqueDifficulties);
				setDifficulties(uniqueDifficulties);
			} catch (error) {
				console.error("Error fetching recipes:", error);
			} finally {
				setLoading(false); // stop loading regardless of success or error
			}
		};

		fetchRecipes();
	}, []);

	useEffect(() => {
		console.log("Updated cuisines state:", cuisines);
	}, [cuisines, difficulties]);

	const filteredRecipes = recipes.filter((recipe) => {
		const cuisineMatch =
			filteredCuisine === "All" || recipe.cuisine === filteredCuisine;
		const difficultyMatch =
			filteredDifficulty === "All" || recipe.difficulty === filteredDifficulty;
		return cuisineMatch && difficultyMatch;
	});

	// Pagination logic
	const pageCount = Math.ceil(filteredRecipes.length / itemsPerPage);
	const offset = currentPage * itemsPerPage;
	const currentItems = filteredRecipes.slice(offset, offset + itemsPerPage);

	// Infinite scroll logic
	useEffect(() => {
		if (useInfiniteScroll) {
			setInfiniteData(filteredRecipes.slice(0, itemsPerPage));
		}
	}, [filteredCuisine, recipes, useInfiniteScroll]);

	const fetchMoreData = () => {
		const nextItems = filteredRecipes.slice(
			infiniteData.length,
			infiniteData.length + itemsPerPage
		);
		setInfiniteData((prev) => [...prev, ...nextItems]);
	};

	const handlePageClick = (event: { selected: number }) => {
		setCurrentPage(event.selected);
	};

	return (
		<div className="p-4">
			{loading || (recipes.length === 0 && cuisines.length === 0) ? (
				<div className="flex justify-center items-center h-80">
					<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
				</div>
			) : (
				<>
					<div className="flex flex-row justify-between items-center mb-4 px-4">
						<h1 className="mb-5 mr-10">Recipes</h1>
						<div className="flex items-center justify-between">
							<div className="px-3">
								<span className="mr-2">Difficulty:</span>
								<select
									name="difficulty"
									id="difficulties"
									value={filteredDifficulty}
									onChange={(e) => setFilteredDifficulty(e.target.value)}
									className="border p-2 rounded">
									<option value="All">All</option>
									{difficulties.map((difficulty) => (
										<option key={difficulty} value={difficulty}>
											{difficulty}
										</option>
									))}
								</select>
							</div>
							<div className="flex items-center mr-3">
								<input
									type="checkbox"
									id="toggleScroll"
									checked={useInfiniteScroll}
									onChange={() => {
										setUseInfiniteScroll(!useInfiniteScroll);
										setCurrentPage(0); // reset pagination if switching
									}}
									className="mr-2"
								/>
								<label htmlFor="toggleScroll">Use Infinite Scroll</label>
							</div>
							<div>
								<label className="mr-4" htmlFor="cuisines">
									filter by cuisine
								</label>
								<select
									name="cuisine"
									id="cuisines"
									value={filteredCuisine}
									onChange={(e) => setFilteredCuisine(e.target.value)}
									className="border p-2 rounded">
									<option value="All">All</option>
									{cuisines.map((cuisine) => (
										<option key={cuisine} value={cuisine}>
											{cuisine}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
					{useInfiniteScroll ? (
						<InfiniteScroll
							dataLength={infiniteData.length}
							next={fetchMoreData}
							hasMore={infiniteData.length < filteredRecipes.length}
							loader={<h4 className="text-center my-4">Loading...</h4>}
							endMessage={
								<p className="text-center my-4">No more recipes 🎉</p>
							}>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{infiniteData.map((recipe) => (
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
						</InfiniteScroll>
					) : (
						<>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								{currentItems.map((recipe) => (
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

							<div className="mt-6 flex justify-center">
								<ReactPaginate
									previousLabel={"← Previous"}
									nextLabel={"Next →"}
									pageCount={pageCount}
									onPageChange={handlePageClick}
									containerClassName={"flex gap-2"}
									pageClassName={"border px-3 py-1 rounded cursor-pointer"}
									activeClassName={"bg-blue-500 text-white active-page"}
									previousClassName={"px-3 py-1 border rounded"}
									nextClassName={"px-3 py-1 border rounded"}
									disabledClassName={"opacity-50"}
									forcePage={currentPage}
								/>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Recipe;
