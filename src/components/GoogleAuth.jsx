// Imports
// 구글 로그인 라이브러리
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// zustand에서 로그인 정보 저장소(store)
import { useAuthStore } from "../lib/store";

// GoogleAuth 컴포넌트
const GoogleAuth = () => {
  // .env에서 구글 클라이언트 ID 받기
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // 로그인 구현을 위해 로그인 정보 저장소에 정보를 등록하는 함수를 가져옴
  const setCredentials = useAuthStore((state) => state.setCredentials);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        // 성공시
        onSuccess={(credentialResponse) => {
          // 구글 서버로부터 받은 정보 표시
          console.log(credentialResponse);
          // 받은 정보를 저장소에 저장
          setCredentials(credentialResponse);
        }}
        // 실패시
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
