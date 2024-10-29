// Imports
// 리엑트
import { useState } from "react";
// 라우팅
import { useNavigate } from "react-router-dom";
// 토스트 알림
import { toast } from "react-toastify";
// ???
import messages from "./lib/messages";

// App 컴포넌트
function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    setCount(count + 1);

    if (count >= messages.length) navigate("/easteregg");
    else toast.info(messages[count]);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="font-bold text-7xl">FORIF-REACT-2024</h1>

      <p className="text-xl">이번 프로젝트 화이팅!</p>

      <button
        className="rounded-md bg-gray-700 text-white p-2 hover:bg-gray-800 border-[1px] border-transparent hover:border-white transition-all duration-100 px-3"
        onClick={handleClick}
      >
        눌러보세요
      </button>
    </div>
  );
}

export default App;
