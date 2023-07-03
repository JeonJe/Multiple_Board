package ebrain.board.utils;

import ebrain.board.response.APIResponse;

/**
 * ResponseUtil 클래스
 * API 응답을 생성하는 유틸리티 클래스입니다.
 */
public class ResponseUtil {

    private static final String SUCCESS_STATUS = "success";
    private static final String FAIL_STATUS = "fail";
    private static final String ERROR_STATUS = "error";

    /**
     * 데이터를 포함한 성공 응답 생성 메서드
     *
     * @param message 응답 메시지
     * @param data    응답 데이터
     * @return APIResponse 객체
     */
    public static APIResponse createSuccessWithData(String message, Object data) {
        APIResponse response = APIResponse.builder()
                        .status(SUCCESS_STATUS)
                        .message(message)
                        .data(data)
                        .build();
        return response;
    }

    /**
     * 데이터 없이 성공 응답 생성 메서드
     *
     * @param message 응답 메시지
     * @return APIResponse 객체
     */
    public static APIResponse createSuccessWithoutData(String message) {
        APIResponse response = APIResponse.builder()
                .status(SUCCESS_STATUS)
                .message(message)
                .data(null)
                .build();
        return response;
    }

    /**
     * 데이터를 포함한 에러 응답 생성 메서드
     *
     * @param message 에러 메시지
     * @param data    에러 데이터
     * @return APIResponse 객체
     */
    public static APIResponse createErrorWithData(String message, Object data) {
        APIResponse response = APIResponse.builder()
                .status(ERROR_STATUS)
                .message(message)
                .data(data)
                .build();
        return response;
    }

    /**
     * 데이터 없이 에러 응답 생성 메서드
     *
     * @param message 에러 메시지
     * @return APIResponse 객체
     */
    public static APIResponse createErrorWithoutData(String message) {
        APIResponse response = APIResponse.builder()
                .status(ERROR_STATUS)
                .message(message)
                .data(null)
                .build();
        return response;
    }



}
