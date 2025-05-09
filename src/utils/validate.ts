const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NICKNAME_REGEX = /^[\uAC00-\uD7A3a-zA-Z0-9_-]+$/;
const PASSWORD_MIN_LENGTH = 8;
const NICKNAME_MAX_LENGTH = 10;

export const validateEmail = (email: string): string | undefined => {
	if (!email || email.trim() === "") {
		return "이메일을 입력해주세요.";
	}

	if (!EMAIL_REGEX.test(email)) {
		return "올바른 이메일 형식이 아닙니다.";
	}
};
export const validatePassword = (password: string): string | undefined => {
	if (!password) {
		return "비밀번호를 입력해주세요.";
	}

	if (password.length < PASSWORD_MIN_LENGTH) {
		return `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`;
	}

	if (!/[A-Z]/.test(password)) {
		return "대문자를 포함해야 합니다.";
	}

	if (!/[a-z]/.test(password)) {
		return "소문자를 포함해야 합니다.";
	}

	if (!/[0-9]/.test(password)) {
		return "숫자를 포함해야 합니다.";
	}

	if (!/[_!@#$%^&*]/.test(password)) {
		return "특수문자(_!@#$%^&*)를 포함해야 합니다.";
	}
};

export const validateNickname = (nickname: string): string | undefined => {
	if (!nickname || nickname.trim() === "") {
		return "닉네임을 입력해주세요.";
	}

	if (nickname.length > NICKNAME_MAX_LENGTH) {
		return `닉네임은 최대 ${NICKNAME_MAX_LENGTH}자까지 입력할 수 있습니다.`;
	}

	if (!NICKNAME_REGEX.test(nickname)) {
		return "닉네임은 한글, 영문, 숫자, _, -만 사용할 수 있습니다.";
	}
};
