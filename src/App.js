import React, { useState } from "react";
import Items from "./components/Items";
import Comments from "./components/Comments";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (itemId) => {
    setSelectedItem(itemId);
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h1>DIARY APP</h1>
        <p>Comment with no sense</p>
      </div>
      <div className="react-items">
        <Items onSelectItem={handleSelectItem} />
      </div>
      <div className="react-comments">
        <Comments itemId={selectedItem} />
      </div>
    </div>
  );
}

export default App;
