import { useState } from "react";
import { Wall } from "./objects/Wall.jsx";
import { RackBlock } from "./objects/RackBlock.jsx";

function App() {
  const [obstacles, setObstacles] = useState([]);
  const [maxWallId, setMaxWallId] = useState(0);
  const [maxRackId, setMaxRackId] = useState(0);
  const [walls, setWalls] = useState([]);
  const [racks, setRacks] = useState([]);

  const isCollision = (inspected) => {
    for (let i = 0; i < obstacles.length; i++) {
      const current = obstacles[i];
      if (current.id === inspected.id) continue;
      if (
        current.x < inspected.x + inspected.width &&
        current.x + current.width > inspected.x &&
        current.y < inspected.y + inspected.height &&
        current.y + current.height > inspected.y
      ) {
        // console.log("Hit collision!");
        return true;
      }
    }
    return false;
  };

  const updateObstaclesData = (updated) => {
    const obstaclesList = obstacles;
    console.log(obstacles, updated);
    for (let i = 0; i < obstaclesList.length; i++) {
      const current = obstaclesList[i];
      if (current.id !== updated.id) {
        continue;
      }
      current.x = updated.x;
      current.y = updated.y;
      current.width = updated.width;
      current.height = updated.height;
    }
    setObstacles(obstaclesList);
  };

  const handleAddWall = () => {
    setWalls((walls) => [
      ...walls,
      <Wall
        key={maxWallId + 1}
        id={`wall-${maxWallId + 1}`}
        isCollision={isCollision}
        updateObstaclesData={updateObstaclesData}
      />,
    ]);
    setMaxWallId((maxId) => maxId + 1);
    const wallData = {
      id: `wall-${maxWallId + 1}`,
      type: "wall",
      x: 100,
      y: 150,
      width: 30,
      height: 80,
    };
    obstacles.push(wallData);
  };

  const handleAddRack = () => {
    setRacks((racks) => [
      ...racks,
      <RackBlock
        key={maxRackId + 1}
        id={`rack-${maxRackId + 1}`}
        isCollision={isCollision}
        updateObstaclesData={updateObstaclesData}
      />,
    ]);
    setMaxRackId((maxId) => maxId + 1);
    const rackData = {
      id: `rack-${maxRackId + 1}`,
      type: "rack",
      x: 10,
      y: 150,
      width: 80,
      height: 120,
    };
    obstacles.push(rackData);
  };

  return (
    <div className="container">
      <div className="draw-area">
        <div className="draw-area-grid"></div>
        {walls}
        {racks}
      </div>
      <div className="menu">
        <h1 draggable="true">WH-Constructor v0.3</h1>
        <p>Конструктор позволяет рисовать склад</p>
        <h3>Правила конструктора</h3>
        <ul>
          <li>Нарисуй стены</li>
          <li>Размер стены можно изменить потянув за правую или нижнюю грань стены</li>
          <li>Нарисуй стеллажи, колонны, стол</li>
          <li>Если стеллажи пересекаются с препятствиями, то будет красная подсветка</li>
          <li>Объекты снапятся к сетке</li>
        </ul>
        <button onClick={handleAddRack}>Добавить блок стеллажей</button>
        <button onClick={handleAddWall}>Добавить стену</button>
        <p>
          Жду отзывов в чатике Склада и <a href="https://t.me/sasha_zelenkov">@sasha_zelenkov</a>
        </p>
      </div>
    </div>
  );
}

export default App;
