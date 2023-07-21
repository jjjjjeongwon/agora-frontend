import React from 'react';
import { styled } from 'styled-components';
import LoginSignupTitle from '../ui/public/LoginSignupTitle';
import SignupInputTitle from '../ui/Signup/SignupInputTitle';
import EmailAuthInput from '../ui/Signup/EmailAuthInput';
import AuthNumberInput from '../ui/Signup/AuthNumberInput';
import LoginSignupInputForm from '../ui/public/LoginSignupInputForm';
import PasswordInputForm from '../ui/public/PasswordInputForm';
import LoginSignupButton from '../ui/public/LoginSignupButton';

export const Signup = () => {
  return (
    <SignupContainer>
      <LoginSignupTitle />
      <Wrap>
        <SignupWrap>
          <SignupInputTitle title="닉네임" />

          <LoginSignupInputForm text="닉네임을 입력해주세요." />
          <SignupInputTitle title="이메일" />

          <LoginSignupInputForm text="이메일을 입력해주세요." />

          <SignupInputTitle title="캐릭터 선택" />
          <LoginSignupInputForm text="1-4번 중 선택해주세요." />

          <SignupInputTitle title="비밀번호" />
          <PasswordInputForm text="비밀번호를 입력해주세요." />

          <SignupInputTitle title="비밀번호 확인" />
          <PasswordInputForm text="비밀번호를 다시 입력해주세요." />

          <LoginSignupButton text="가입하기" />
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
