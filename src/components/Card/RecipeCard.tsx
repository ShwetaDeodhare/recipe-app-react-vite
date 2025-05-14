import React, { useState } from "react";
import "./recipe-card.scss";

interface RecipeCardProps {
	image: string;
	title: string;
	description: [];
	id: number;
	difficulty: string; // added difficulty property
	cuisine: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
	image,
	title,
	description,
	id,
	difficulty,
	cuisine,
}) => {
	const [imgLoaded, setImgLoaded] = useState(false);
	return (
		<div
			className="recipe-card flex-grow p-4 mb-10 flex align-center flex-col border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
			key={id}>
			<div className="relative w-full h-48 mb-4 overflow-hidden rounded">
				{/* Skeleton while image is loading */}
				{!imgLoaded && (
					<div className="absolute top-0 left-0 w-full h-full skeleton"></div>
				)}

				<img
					src={image}
					alt={title}
					loading="lazy"
					onLoad={() => setImgLoaded(true)}
					className={`object-cover w-full h-full transition-opacity duration-500 ${
						imgLoaded ? "opacity-100" : "opacity-0"
					}`}
				/>
			</div>
			<div className="recipe-card__content">
				<h3
					className="recipe-card__title text-xl mb-2 font-bold cursor-pointer hover:text-blue-500"
					onClick={() => (window.location.href = `/recipe/${id}`)}>
					{title}
				</h3>
				<p className="text-sm font-medium text-gray-600 mb-4">
					Difficulty: {difficulty}, Cuisine: {cuisine}
				</p>
				<ul className="recipe-card__description">
					{description.map((item) => (
						<li key={item} className="text-base list-decimal list-inside">
							{item}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default RecipeCard;
