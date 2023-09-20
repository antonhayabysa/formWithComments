import React, { useState, useEffect } from "react";

function Items(props) {
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (itemName.trim()) {
      const newItem = {
        id: new Date().getTime(),
        name: itemName
      };
      setItems([...items, newItem]);
      setItemName("");
    }
  };

  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);

    // Удаляем комментарии, связанные с этим элементом
    localStorage.removeItem(`comments_${id}`);
  };

  const handleSelectItem = (id) => {
    props.onSelectItem(id);
  };

  return (
    <div className="react-items">
      <h1>Items</h1>
      <form
        className="react-items-input-group"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Type name here..."
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <button className="btn btn-info" type="button" onClick={handleAddItem}>
          Add New
        </button>
      </form>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center active-item"
            onClick={() => handleSelectItem(item.id)}
          >
            {item.name}
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                className="badge badge-info badge-pill"
                style={{ marginRight: "10px" }}
              >
                {index + 1}
              </span>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;
