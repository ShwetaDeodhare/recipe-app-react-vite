import { useEffect, useState } from "react";

export interface Task {
	id: number;
	title: string;
	isCompleted: boolean;
}

const Create: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [debouncedValue, setDebouncedValue] = useState("");
	const [taskTitle, setTaskTitle] = useState("");
	const [editingId, setEditingId] = useState<number | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(taskTitle); // This simulates an API call or heavy computation
		}, 500); // 500ms debounce delay

		return () => clearTimeout(timer); // Cleanup on every new keystroke
	}, [taskTitle]);

	const handleAddTask = () => {
		if (debouncedValue.trim() === "") return;

		if (editingId !== null) {
			setTasks((prevTask) =>
				prevTask.map((task) => {
					if (task.id === editingId) {
						return { ...task, title: debouncedValue };
					}
					return task;
				})
			);
			setEditingId(null); // Exit edit mode
		} else {
			const addTask: Task = {
				id: Math.floor(Math.random() * 1000000),
				title: debouncedValue,
				isCompleted: false,
			};

			setTasks((prev) => [...prev, addTask]);
		}
		setTaskTitle("");
	};

	const handleEdit = (task: Task) => {
		setTaskTitle(task.title); // Prefill input
		setEditingId(task.id); // Remember which task is being edited
	};

	const handleDelete = (taskId: number) => {
		console.log("taskId", taskId);
		const keptItems = tasks.filter((task) => task.id !== taskId);
		setTasks(keptItems);

		if (editingId === taskId) {
			setTaskTitle(""); // Clear input if the deleted task was being edited
			setEditingId(null); // Exit edit mode
		}
	};

	console.log("tasks", tasks);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Create</h1>
			<div>
				<input
					type="text"
					className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={taskTitle}
					onChange={(e) => setTaskTitle(e.target.value)}
					placeholder="Enter task title"
				/>
				<button
					className="mt-2 bg-blue-500 text-white rounded-lg p-2 w-auto cursor-pointer hover:bg-blue-600 transition duration-300"
					onClick={() => handleAddTask()}>
					{editingId ? "Update" : "Add"} Task
				</button>
			</div>
			<ul className="mt-4">
				{tasks.map((task) => (
					<li
						key={task.id}
						className="flex items-center justify-between p-2 border-b">
						<span>{task.title}</span>
						<div>
							<span
								onClick={() => handleEdit(task)}
								className="mx-2 inline-block cursor-pointer p-2 rounded bg-gray-200 hover:bg-gray-300">
								Edit
							</span>
							<span
								onClick={() => handleDelete(task.id)}
								// onClick={() =>
								//   setTasks((prev) =>
								//     prev.filter((t) => t.id !== task.id)
								//   )
								// }
								className="ml-2 inline-block cursor-pointer p-2 rounded bg-red-200 hover:bg-red-300">
								Delete
							</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Create;
