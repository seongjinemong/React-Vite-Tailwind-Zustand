import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Easteregg() {
  const navigate = useNavigate();
  const [position, setPosition] = useState({
    x: window.innerWidth * 0.5 - 45,
    y: window.innerHeight * 0.5 + 110,
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex flex-row gap-12">
        <div className="text-9xl font-bold -rotate-12">짜</div>
        <div className="text-9xl font-bold">!</div>
        <div className="text-9xl font-bold rotate-12">잔</div>
      </div>
      <div className="text-2xl">새로운 페이지입니다</div>
      <button
        className={`absolute left-[${position.x}px] top-[${position.y}px] rounded-md bg-gray-700 text-white p-2 hover:bg-gray-800 border-[1px] border-transparent hover:border-white transition-all duration-100 px-3`}
        onClick={() => navigate("/")}
        onMouseEnter={() => {
          console.log("hover");
          const newX = Math.random() * (window.innerWidth - 100);
          const newY = Math.random() * (window.innerHeight - 50);
          setPosition({ x: newX, y: newY });
        }}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        돌아가기
      </button>
    </div>
  );
}
