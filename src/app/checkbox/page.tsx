'use client';

import { useEffect, useState } from 'react';

type Node = {
	id: string;
	label: string;
	children?: Node[];
	checked?: boolean;
};

const treeData: Node[] = [
	{
		id: 'fruits',
		label: 'Fruits',
		children: [
			{ id: 'apple', label: 'Apple' },
			{ id: 'banana', label: 'Banana' },
			{
				id: 'citrus',
				label: 'Citrus',
				children: [
					{ id: 'orange', label: 'Orange' },
					{ id: 'lemon', label: 'Lemon' },
				],
			},
		],
	},
];

function initData(nodes: Node[]): Node[] {
	return nodes.map((node: Node) => {
		if (node.children) {
			return {
				...node,
				checked: false,
				children: initData(node.children),
			};
		}
		return {
			checked: false,
			...node,
		};
	});
}

export default function Page() {
	const [checkboxes, setCheckboxes] = useState(initData(treeData));

	const findByNode = (nodes: Node[], id: string): Node | null => {
		for (const node of nodes) {
			if (node.id === id) {
				return node;
			}
			if (node.children) {
				const found = findByNode(node.children, id);
				return found;
			}
		}
		return null;
	};

	function updateChildren(node: Node, checked: boolean) {
		node.checked = checked;
		if (node.children) {
			for (const newNode of node.children) {
				updateChildren(newNode, checked);
			}
		}
	}

	function updateParents(nodes: Node[]) {
		for (const node of nodes) {
			if (node.children) {
				updateParents(node.children);

				const childNodes = node.children.length;
				const checked = node.children.filter(
					(newNode) => newNode.checked
				).length;

				if (childNodes === checked) {
					node.checked = true;
				} else {
					node.checked = false;
				}
			}
		}
	}

	const handleChange = (id: string) => {
		const temp = [...checkboxes];
		const updateNode = findByNode(temp, id);
		if (!updateNode) {
			return;
		}
		const newChecked = !updateNode?.checked;

		updateChildren(updateNode, newChecked);

		updateParents(temp);

		// const updateNodes = (nodes: Node[]): Node[] => {
		// 	const tempNodes = nodes.map((node) => {
		// 		if (node.id === id) {
		// 			return {
		// 				...node,
		// 				checked: !node.checked,
		// 			};
		// 		}

		// 		if (node.children) {
		// 			return {
		// 				...node,
		// 				children: updateNodes(node.children),
		// 			};
		// 		}

		// 		return node;
		// 	});

		// 	return tempNodes;
		// };

		// const updatedNodes = updateNodes(temp);
		setCheckboxes(temp);
	};

	return <Checkbox checkboxes={checkboxes} handleChange={handleChange} />;
}

function Checkbox({
	checkboxes,
	handleChange,
}: {
	checkboxes: Node[];
	handleChange: (id: string) => void;
}) {
	return (
		<div>
			{checkboxes.map((checkbox) => {
				return (
					<div>
						<input
							type="checkbox"
							checked={checkbox.checked}
							onChange={() => handleChange(checkbox.id)}
						/>
						<label>{checkbox.label}</label>
						{checkbox.children && (
							<div className="ml-2">
								<Checkbox
									checkboxes={checkbox.children}
									handleChange={handleChange}
									key={checkbox.id}
								/>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
