import React from "react";
import "./Header.scss";

const Header: React.FC = () => {
	return (
		<header className="p-3 bg-blue-500 text-white flex justify-between items-center">
			<h4>Recipes</h4>
			<nav>
				<ul className="flex space-x-4">
					<li>
						<a href="/" className="text-white hover:text-white hover:underline">
							Home
						</a>
					</li>
					<li>
						<a
							href="/search"
							className="text-white hover:text-white hover:underline">
							Search
						</a>
					</li>
					<li>
						<a
							href="/add"
							className="text-white hover:text-white hover:underline">
							Add Recipe
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
