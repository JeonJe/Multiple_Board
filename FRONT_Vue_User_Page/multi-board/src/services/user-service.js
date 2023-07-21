import axios from "axios";

/**
 * JSON 콘텐츠를 위한 서버 URL과 헤더를 사용하여 axios 인스턴스 생성합니다.
 */
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const newLocal = "Authorization";
api.defaults.headers.common[newLocal] = `Bearer ${localStorage.getItem("jwt")}`;

/**
 * 요청 전에 실행될 인터셉터
 * @param {Object} config - 요청 설정 객체
 * @returns {Object} - 처리된 요청 설정 객체
 */
api.interceptors.request.use(
  (config) => {
    console.log("[Before] Request:", config);
    return config;
  },
  (error) => {
    console.error("[Before] Request Error:", error);
    return Promise.reject(error);
  }
);

/**
 * 요청 후에 실행될 인터셉터
 * @param {Object} response - 응답 객체
 * @returns {Object} - 처리된 응답 객체
 */
api.interceptors.response.use(
  (response) => {
    console.log("[After] Response:", response);
    return response;
  },
  (error) => {
    console.error("[After] Response Error:", error);
    return Promise.reject(error);
  }
);

/**
 * 사용자 회원가입을 위한 함수
 * @param {Object} userData - 사용자 데이터
 * @returns {Promise<void>}
 */
const signupUser = async (userData) => {
  try {
    const response = await api.post(
      process.env.VUE_APP_API_USER_SIGNUP,
      JSON.stringify(userData)
    );
    localStorage.setItem("jwt", response.data.data.jwt);
    alert(response.data.message);
    return response.data.data;
  } catch (error) {
    alert(error.response.data.data);
    return false;
  }
};

/**
 * 중복된 ID 체크를 위한 함수
 * @param {string} userId - 사용자 ID
 * @returns {Promise<void>}
 */
const checkDuplicateId = async (userId) => {
  try {
    const URL = process.env.VUE_APP_API_CHECK_DUPLICATED_ID + userId;
    const response = await api.get(URL);
    alert(response.data.message);
  } catch (error) {
    alert(error.response.data.data);
  }
};

/**
 * 사용자 로그인을 위한 함수
 * @param {Object} userData - 사용자 데이터
 * @returns {Promise<void>}
 */
const loginUser = async (userData) => {
  try {
    const response = await api.post(
      process.env.VUE_APP_API_USER_LOGIN,
      JSON.stringify(userData)
    );
    localStorage.setItem("jwt", response.data.data.jwt);
    alert(response.data.message);
    return response.data.data;
  } catch (error) {
    alert(error.response.data.data);
    return false;
  }
};

/**
 * JWT 토큰 확인을 위한 함수
 * @returns {Promise<void>}
 */
const getJWTAuthStatus = async () => {
  try {
    const response = await api.get(process.env.VUE_APP_API_CHECK_JWT_STATUS);
    return response.data;
  } catch (error) {
    // 만료된토큰 400에러
    if (error.response.status === 400) {
      alert("로그인 시간이 만료되었습니다. 재로그인하세요.");
      localStorage.removeItem("jwt");
    }
    //미인증 401에러
    return false;
  }
};

export default {
  signupUser,
  loginUser,
  checkDuplicateId,
  getJWTAuthStatus,
};
