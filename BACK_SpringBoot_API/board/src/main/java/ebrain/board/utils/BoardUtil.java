package ebrain.board.utils;

import ebrain.board.response.APIResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
/**
 * 게시판 관련 유틸리티 클래스입니다.
 */
public class BoardUtil {


    /**
     * 비밀번호를 해싱하는 메서드
     *
     * @param password 비밀번호
     * @return 해시화된 비밀번호
     */
    public static String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hashedPassword = new StringBuilder();
            for (byte hashByte : hashBytes) {
                hashedPassword.append(String.format("%02x", hashByte));
            }
            return hashedPassword.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}
