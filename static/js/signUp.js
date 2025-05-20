// 회원가입 기능 구현
document.addEventListener('DOMContentLoaded', function () {
  // 전체 동의 체크박스 처리
  const agreeAllCheckbox = document.getElementById('agreeAll');
  const agreeCheckboxes = document.querySelectorAll(
    'input[name^="agree"]:not([name="agreeAll"])'
  );

  agreeAllCheckbox.addEventListener('change', function () {
    const isChecked = this.checked;
    agreeCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  });

  // 개별 체크박스 변경 시 전체 동의 체크박스 상태 업데이트
  agreeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      const allChecked = Array.from(agreeCheckboxes).every((cb) => cb.checked);
      agreeAllCheckbox.checked = allChecked;
    });
  });

  // 폼 제출 처리
  const form = document.getElementById('signupForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // 아이디 검증
    const userId = document.getElementById('userId').value;
    const userIdRegex = /^[a-z0-9_-]{5,20}$/;
    if (!userIdRegex.test(userId)) {
      document.getElementById('userIdError').style.display = 'block';
      document.getElementById('userId').classList.add('input-error');
      isValid = false;
    } else {
      document.getElementById('userIdError').style.display = 'none';
      document.getElementById('userId').classList.remove('input-error');
    }

    // 비밀번호 검증
    const password = document.getElementById('password').value;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    if (!passwordRegex.test(password)) {
      document.getElementById('passwordError').style.display = 'block';
      document.getElementById('password').classList.add('input-error');
      isValid = false;
    } else {
      document.getElementById('passwordError').style.display = 'none';
      document.getElementById('password').classList.remove('input-error');
    }

    // 비밀번호 확인
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
      document.getElementById('confirmPasswordError').style.display = 'block';
      document.getElementById('confirmPassword').classList.add('input-error');
      isValid = false;
    } else {
      document.getElementById('confirmPasswordError').style.display = 'none';
      document
        .getElementById('confirmPassword')
        .classList.remove('input-error');
    }

    // 이름 검증
    const name = document.getElementById('name').value;
    if (name.trim() === '') {
      document.getElementById('nameError').style.display = 'block';
      document.getElementById('name').classList.add('input-error');
      isValid = false;
    } else {
      document.getElementById('nameError').style.display = 'none';
      document.getElementById('name').classList.remove('input-error');
    }

    // 이메일 검증 (선택 사항이지만 입력 시 형식 검증)
    const email = document.getElementById('email').value;
    if (email !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        document.getElementById('email').classList.add('input-error');
        isValid = false;
      } else {
        document.getElementById('emailError').style.display = 'none';
        document.getElementById('email').classList.remove('input-error');
      }
    }

    // 필수 약관 동의 확인
    const agreeService = document.getElementById('agreeService').checked;
    const agreePrivacy = document.getElementById('agreePrivacy').checked;

    if (!agreeService || !agreePrivacy) {
      alert('필수 약관에 동의해주세요.');
      isValid = false;
    }

    // 폼이 유효하면 서버로 제출
    if (isValid) {
      alert('회원가입이 완료되었습니다!');
      // 실제로는 여기서 서버로 데이터를 전송
      // form.submit();
    }
  });

  // 인증번호 받기 버튼 클릭 처리
  const certButton = document.querySelector('.btn-cert');
  certButton.addEventListener('click', function () {
    const phoneNumber = document.getElementById('phoneNumber').value;
    if (phoneNumber.trim() === '') {
      alert('전화번호를 입력해주세요.');
      return;
    }

    alert('인증번호가 발송되었습니다.');
    document.getElementById('certNumber').disabled = false;
  });
});
