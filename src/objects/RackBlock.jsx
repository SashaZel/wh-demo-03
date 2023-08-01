import { useState } from "react";

const RACK_HEIGHT = 120;
const RACK_WIDTH = 80;

export function RackBlock({ id, isCollision, updateObstaclesData }) {
  const [x, setX] = useState(10);
  const [y, setY] = useState(150);
  const [innerX, setInnerX] = useState(0);
  const [innerY, setInnerY] = useState(0);
  const [highlight, setHighlight] = useState("");

  const handleDragStart = (e) => {
    // console.log(e.clientY);
    setInnerX(Number(e.clientX) - Number(e.target.offsetLeft));
    setInnerY(Number(e.clientY) - Number(e.target.offsetTop));
  };

  const handleDrag = (e) => {
    // console.log(e);
    const clientY = Number(e.clientY);
    const parentY = Number(e.target.parentNode.offsetTop);
    const clientX = Number(e.clientX);
    const parentX = Number(e.target.parentNode.offsetLeft);

    if (clientY === 0 || clientX === 0) return;

    const hasCollision = isCollision({ id: id, x: x, y: y, width: RACK_WIDTH, height: RACK_HEIGHT });
    if (hasCollision) {
      setHighlight("highlight-red");
    } else {
      setHighlight("highlight-green");
    }
    const offsetX = Math.ceil((clientX - parentX - RACK_WIDTH) / 10) * 10;
    const offsetY = Math.ceil((clientY - parentY - RACK_HEIGHT / 2) / 10) * 10;
    // if (offsetX < 0 || offsetY < 0 || offsetX > (800 - RACK_WIDTH) || offsetY > (400 - RACK_HEIGHT)) return;
    if (offsetX >= 0 && offsetX <= 800 - RACK_WIDTH) {
      setX(offsetX);
    }
    if (offsetY >= 0 && offsetY <= 600 - RACK_HEIGHT) {
      setY(offsetY);
    }
  };

  const handleDragEnd = () => {
    const hasCollision = isCollision({ id: id, x: x, y: y, width: RACK_WIDTH, height: RACK_HEIGHT });
    if (hasCollision) {
      setHighlight("highlight-red");
    } else {
      setHighlight("");
    }
    updateObstaclesData({ x: x, y: y, id: id, width: RACK_WIDTH, height: RACK_HEIGHT });
  };

  return (
    <div
      className={`racksBlock ${highlight}`}
      style={{ top: `${y}px`, left: `${x}px` }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      draggable="true"
    >
      <div className="rack-el">стеллаж</div>
      <div className="rack-el">стеллаж</div>
    </div>
  );
}
