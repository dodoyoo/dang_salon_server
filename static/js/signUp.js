// 회원가입 기능 구현
document.addEventListener('DOMContentLoaded', function () {
  // 폼 제출 처리
  const form = document.getElementById('signupForm');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let isValid = true;

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
      e.preventDefault();
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

    const emailInput = document.getElementById('email');
    const emailCheckButton = document.getElementById('checkEmailBtn');

    emailCheckButton.addEventListener('click', async function () {
      const email = emailInput.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        alert('유효한 이메일을 입력해주세요.');
        return;
      }

      try {
        const response = await fetch('/api/signup/email-verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (response.ok) {
          alert('인증 메일이 발송되었습니다. 메일함을 확인해주세요.');
          localStorage.setItem('pendingEmail', email);

          // 👉 이메일 input 비활성화
          emailInput.disabled = true;
          emailCheckButton.disabled = true;
        } else {
          alert(result.message || '이메일 전송 실패');
        }
      } catch (err) {
        console.error(err);
        alert('서버 오류');
      }
    });

    // 필수 약관 동의 확인
    const agreeService = document.getElementById('agreeService').checked;
    const agreePrivacy = document.getElementById('agreePrivacy').checked;

    if (!agreeService || !agreePrivacy) {
      alert('필수 약관에 동의해주세요.');
      isValid = false;
    }

    // 폼이 유효하면 서버로 제출
    if (isValid) {
      // 👉 서버로 실제 회원가입 요청 보내기
      try {
        const formData = {
          userId: document.getElementById('userId').value,
          password: document.getElementById('password').value,
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
        };

        const response = await fetch('/api/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          alert('회원가입이 완료되었습니다!');
          window.location.href = '/main'; // ✅ 여기서 이동
        } else {
          alert(result.message || '회원가입 실패');
        }
      } catch (err) {
        console.error(err);
        alert('서버 오류');
      }
    }
  });
});
