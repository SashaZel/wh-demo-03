import { useState } from "react";

export function Wall({ id, updateObstaclesData }) {
  const [x, setX] = useState(100);
  const [y, setY] = useState(150);
  const [width, setWidth] = useState(30);
  const [height, setHeight] = useState(80);
  const [innerX, setInnerX] = useState(0);
  const [innerY, setInnerY] = useState(0);
  const [highlight, setHighlight] = useState("");
  const [resize, setResize] = useState(false);
  const [startDragX, setStartDragX] = useState(0);
  const [startDragY, setStartDragY] = useState(0);

  const handleDragStart = (e) => {
    // console.log(e.clientY);
    setInnerX(Number(e.clientX) - Number(e.target.offsetLeft));
    setInnerY(Number(e.clientY) - Number(e.target.offsetTop));
    setHighlight("highlight-blue");
  };

  const handleDrag = (e) => {
    // console.log(e);
    const clientY = Number(e.clientY);
    const parentY = Number(e.target.parentNode.offsetTop);
    const clientX = Number(e.clientX);
    const parentX = Number(e.target.parentNode.offsetLeft);

    if (clientY === 0 || clientX === 0 || resize) return;

    const offsetX = Math.ceil((clientX - parentX - width) / 10) * 10;
    const offsetY = Math.ceil((clientY - parentY - height / 2) / 10) * 10;
    // if (offsetX < 0 || offsetY < 0 || offsetX > (800 - RACK_WIDTH) || offsetY > (400 - RACK_HEIGHT)) return;
    if (offsetX >= 0 && offsetX <= 800 - width) {
      setX(offsetX);
    }
    if (offsetY >= 0 && offsetY <= 600 - height) {
      setY(offsetY);
    }
  };

  const handleDragEnd = () => {
    setHighlight("");
    updateObstaclesData({ x: x, y: y, id: id, width: width, height: height });
  };

  const handleDragRightStart = (e) => {
    setResize(true);
    setStartDragX(Number(e.clientX));
    setStartDragY(Number(e.clientY));
  };

  const handleDragRight = (e) => {
    if (Number(e.clientX) > startDragX) {
      // console.log("@")
      setWidth((width) => width + 1);
      return;
    }
    if (width <= 10) return;
    setWidth((width) => width - 1);
  };

  const handleDragRightEnd = () => {
    setResize(false);
    updateObstaclesData({ x: x, y: y, id: id, width: width, height: height });
  };

  const handleDragDownStart = (e) => {
    setResize(true);
    setStartDragX(Number(e.clientX));
    setStartDragY(Number(e.clientY));
  };

  const handleDragDown = (e) => {
    if (Number(e.clientY) > startDragY) {
      setHeight((height) => height + 1);
      return;
    }
    if (height <= 10) return;
    setHeight((height) => height - 1);
  };

  const handleDragDownEnd = () => {
    setResize(false);
    updateObstaclesData({ x: x, y: y, id: id, width: width, height: height });
  };

  return (
    <div
      className={`wall ${highlight}`}
      style={{ top: `${y}px`, left: `${x}px`, width: `${width}px`, height: `${height}px` }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      draggable="true"
    >
      <div className="wall_size-container justify-column">
        <div></div>
        <div
          className={`wall-side wall-top-bottom`}
          onDragStart={handleDragDownStart}
          onDrag={handleDragDown}
          onDragEnd={handleDragDownEnd}
          draggable="true"
        ></div>
      </div>
      <div className="wall_size-container wall-m3 justify-row">
        <div></div>
        <div
          className={`wall-side wall-left-right`}
          onDragStart={handleDragRightStart}
          onDrag={handleDragRight}
          onDragEnd={handleDragRightEnd}
          draggable="true"
        ></div>
      </div>
    </div>
  );
}
