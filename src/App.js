import React, { useState } from "react";
import Tree, { TreeNode } from "rc-tree";
import "rc-tree/assets/index.css";

function App() {
  const [treeData, setTreeData] = useState([
    { title: "Category 1", key: "0", children: [] },
    { title: "Category 2", key: "1", children: [] },
    {title:"Category 3", key: "2", children: []}
  ]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNodeTitle, setNewNodeTitle] = useState("");

  const handleSelect = (selectedKeys, info) => {
    setSelectedNode(info.node);
    console.log(info.node);
  };

  const handleAddNode = () => {
    if (!selectedNode) {
      alert("Please select a category to add a subcategory.");
      return;
    }
    const updatedTree = [...treeData];
    const addSubNode = (nodes) => {
      nodes.forEach((node) => {
        if (node.key === selectedNode.key) {
          if (!node.children) node.children = [];
          node.children.push({
            title: "New Subcategory",
            key: `${node.key}-${node.children.length}`,
          });
        } else if (node.children) {
          addSubNode(node.children);
        }
      });
    };
    addSubNode(updatedTree);
    setTreeData(updatedTree);
  };

  const handleEditNode = () => {
    if (!selectedNode) {
      alert("Please select a node to edit.");
      return;
    }
    setNewNodeTitle(selectedNode.title);
    setIsEditing(true);
  };

  const saveEditNode = () => {
    const updatedTree = [...treeData];
    const updateNodeTitle = (nodes) => {
      nodes.forEach((node) => {
        if (node.key === selectedNode.key) {
          node.title = newNodeTitle;
        } else if (node.children) {
          updateNodeTitle(node.children);
        }
      });
    };
    updateNodeTitle(updatedTree);
    setTreeData(updatedTree);
    setIsEditing(false);
  };

  const handleDeleteNode = () => {
    if (!selectedNode) {
      alert("Please select a node to delete.");
      return;
    }
  
    const filterTree = (nodes, keyToRemove) => {
      return nodes
    
      .filter((node) => node.key !== keyToRemove)
      .map((node) => ({
        ...node,
        children: node.children ? filterTree(node.children, keyToRemove) : [],
      })); 
    };
  
    const updatedTree = filterTree(treeData, selectedNode.key);
    setTreeData(updatedTree);
    setSelectedNode(null);
  };
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menu Builder</h1>
      <div className="flex gap-4">
        <div className="w-1/2 border p-4">
          <Tree
            treeData={treeData}
            onSelect={handleSelect}
            defaultExpandAll
          />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleAddNode}
          >
            Add Subcategory
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={handleEditNode}
          >
            Edit Node
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDeleteNode}
          >
            Delete Node
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="mt-4">
          <input
            type="text"
            value={newNodeTitle}
            onChange={(e) => setNewNodeTitle(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
            onClick={saveEditNode}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
