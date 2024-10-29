// imports
// 서버와의 통신을 위한 라이브러리
import axios from 'axios'

// axios 인스턴스 생성
const customAaxios = axios.create({
  // .env에서 서버 URL 받은 후 baseURL로 설정
  baseURL: import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_SERVER_URL : "http://localhost:3000",
  withCredentials: true,
})

// baseURL을 설정하면 axios를 호출할 때 중복되는 url을 수정할 수 있음
// 사용할 경우 (api 경로만 써주면 됨)
// baseUrl -> http://localhost:3000, customAxios.get('/user/login')
// 사용 안할 경우 (매번 모든 url을 써줘야 함)
// axios.get('http://localhost:3000/user/login')

export default customAaxios