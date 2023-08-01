import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import LoginSignupTitle from '../ui/public/LoginSignupTitle';
import SignupInputTitle from '../ui/Signup/SignupInputTitle';
import EmailAuthInput from '../ui/Signup/EmailAuthInput';
import AuthNumberInput from '../ui/Signup/AuthNumberInput';
import LoginSignupInputForm from '../ui/public/LoginSignupInputForm';
import PasswordInputForm from '../ui/public/PasswordInputForm';
import LoginSignupButton from '../ui/public/LoginSignupButton';
import userAPI from '../../apis/userAPI';

export const Signup = () => {
  const nicknameRef = useRef();
  const emailRef = useRef();
  const charaterRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  const emailAuthNumRef = useRef();

  const completeSignUp = async (SignupData) => {
    await userAPI
      .post('/user-register', SignupData)
      .then((res) => {
        console.log(res);
        // Swal.fire({
        //   title: '회원가입 성공하셨습니다!',
        //   confirmButtonColor: '#0e72ed',
        // });
        window.alert('회원가입 성공!');

        // navigate('/login');
      })
      .catch((err) => {
        console.log('회원가입 오류', err);
        window.alert('회원가입 실패!');
      });
  };

  const receiveEmail = async () => {
    await userAPI
      .post('/verify', { email: emailRef.current.value })
      .then((res) => {
        TIMER();
        console.log(res);
        alert('인증번호 발송 성공!');
      })

      .catch((err) => {
        console.log('인증번호 전송 에러', err);
        window.alert('인증번호 전송 실패!');
      });
  };

  // const receiveEmail = async () => {
  //   await userAPI
  //     .get('/boards/64c81c748a631c0011be4610')
  //     .then((res) => {
  //       TIMER();
  //       console.log(res);
  //       alert(' 성공!');
  //     })

  //     .catch((err) => {
  //       console.log(' 에러', err);
  //       window.alert('=실패!');
  //     });
  // };

  //timer
  let PlAYTIME;
  let timerAuth;
  let sec = 60;
  var time = 60000 * 5;

  const [alertSent, setAlertSent] = useState(false);
  const [alertcomment, setAlertcomment] = useState('');
  const [sentAuth, setSentAuth] = useState(false);

  const playNumber = useRef(null);
  const timerNumber = useRef(null);

  const [showTimer, setShowTimer] = useState('');

  const TIMER = () => {
    PlAYTIME = setInterval(function () {
      time = time - 1000;
      let min = time / (60 * 1000); //초를 분으로 나눠준다.
      if (sec > 0) {
        //sec=60 에서 1씩 빼서 출력해준다.
        sec = sec - 1;
        setShowTimer(Math.floor(min) + '분' + sec + '초'); //실수로 계산되기 때문에 소숫점 아래를 버리고 출력해준다.
      }
      if (sec === 0) {
        // 0에서 -1을 하면 -59가 출력된다.
        // 그래서 0이 되면 바로 sec을 60으로 돌려주고 value에는 0을 출력하도록 해준다.
        sec = 60;
        setShowTimer(Math.floor(min) + '분' + '00초');
      }
    }, 1000); //1초마다
    playNumber.current = PlAYTIME;
  };

  const ReceiveEmail = () => {
    const email = emailRef.current.value;
    receiveEmail(email);
    if (email) {
      timerAuth = setTimeout(() => SentAuthOverTime(), time);
      timerNumber.current = timerAuth;
    } else {
      window.alert('이메일을 입력해주세요!');
    }
  };

  const SentAuthOverTime = () => {
    console.log('종료', timerNumber.current, playNumber.current);
    clearTimeout(timerNumber.current);
    clearInterval(playNumber.current);
    setAlertcomment('인증 시간이 초과되었습니다.');
    setShowTimer('');
    setAlertSent(true);
    setSentAuth(false);
  };

  const clickSubmit = () => {
    const SignupData = {
      email: emailRef.current.value,
      code: emailAuthNumRef.current.value,
      nickname: nicknameRef.current.value,
      characterNum: charaterRef.current.value,
      password: passwordRef.current.value,
      password2: passwordCheckRef.current.value,
    };

    console.log(SignupData);

    // if (SignupData.password !== SignupData.password_check) {
    //   // return Swal.fire({
    //   //   title: '비밀번호가 일치하지 않습니다',
    //   //   confirmButtonColor: '#0e72ed',
    //   // });
    //   return alert('비밀번호가 일치하지 않습니다!');
    // }

    // if (
    //   !SignupData.email ||
    //   !SignupData.user_id ||
    //   !SignupData.nickname ||
    //   !SignupData.password ||
    //   !SignupData.password_check
    // ) {
    //   window.alert('필수입력값을 입력해주세요!');
    // }
    // else {
    completeSignUp(SignupData);
    // }
  };

  return (
    <SignupContainer>
      <LoginSignupTitle />
      <Wrap>
        <SignupWrap>
          <SignupInputTitle title="본인 확인 이메일" />
          <EmailAuthInput
            inputRef={emailRef}
            OnClickCallback={ReceiveEmail}
            title="인증번호 전송"
            placeholder="이메일을 입력해주세요"
          />

          <AuthNumberInput
            emailAuthNumRef={emailAuthNumRef}
            showTimer={showTimer}
            emailAddress={emailRef}
          />

          <SignupInputTitle title="닉네임" />

          <LoginSignupInputForm
            inputRef={nicknameRef}
            text="닉네임을 입력해주세요."
          />
          {/* <SignupInputTitle title="이메일" /> */}

          {/* <LoginSignupInputForm
            inputRef={emailRef}
            text="이메일을 입력해주세요."
          /> */}

          <SignupInputTitle title="캐릭터 선택" />
          <LoginSignupInputForm
            inputRef={charaterRef}
            text="1-4번 중 선택해주세요."
          />

          <SignupInputTitle title="비밀번호" />
          <PasswordInputForm
            inputRef={passwordRef}
            text="비밀번호를 입력해주세요."
          />

          <SignupInputTitle title="비밀번호 확인" />
          <PasswordInputForm
            inputRef={passwordCheckRef}
            text="비밀번호를 다시 입력해주세요."
          />

          <LoginSignupButton clickSubmit={clickSubmit} text="가입하기" />
        </SignupWrap>
      </Wrap>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Wrap = styled.div`
  width: 500px;
  max-width: 500px;
  min-width: 500px;
  background-color: white;
  border: 1px solid #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const SignupWrap = styled.div`
  margin: 50px 150px;
`;

export default Signup;
