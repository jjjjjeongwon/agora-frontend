import { forwardRef, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import userAPI from '../../../apis/userAPI';

const ViewImagePostModal = forwardRef((props, ref) => {
  let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

  // 모달 끄기
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      props.setAlbumModalOpen(false);
      props.setAlbum(false);
    }
  };

  const [errorMsg, setErrorMsg] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const [content, setContent] = useState('');

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imagePreview = document.getElementById('imagePreview');
      if (imagePreview) {
        imagePreview.src = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    previewImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(file);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('email', 'rose3623@naver.com');
      console.log(formData);

      const response = await userAPI.post('/boards/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('서버 응답:', response.data);
    } catch (error) {
      setErrorMsg('게시물 업로드에 실패했습니다.');
      console.error('서버 오류:', error);
    }
  };

  return (
    <>
      <Container ref={wrapperRef} onSubmit={handleSubmit}>
        <PhotoPreview>
          <img src="/images/sample.png" alt="" />
        </PhotoPreview>
        <CustomTitle>나의 플레이 리스트 :)</CustomTitle>

        {/* <TitleName>contents</TitleName> */}
        <InputTitle>
          제 플레이 리스트 사진입니다
          <br />
          어떤가용?! 놀러가고 싶다
          <br />
          늦은 밤이 되었음에도 불구하고 잠이 잘 오지 않아서 생각할 것이 많아서
          고통스럽게 밤을 지새우는 경우도 많다. 생각할 것도 많고 신경쓸것도
          많아서 잠이 안오는 경우도 있지만 반대로 조금만 긍정적으로 생각하면 또
          하나의 전환점이 다가왔을때 들어야할 지금 현재의 시점에 필요한 감성이
          아닐까? 앞으로의 설레일 수 있는 일이 새롭게 펼쳐질 것을 예고하는 또
          하나의 스쳐지나가는 그런 감정, 나에게 필요한 시기이기도 하다.
        </InputTitle>
      </Container>
    </>
  );
});

const Container = styled.form`
  width: 520px;
  height: 670px;
  right: 35%;
  /* bottom: 10%; */
  top: 5%;
  /* background-color: transparent; */
  position: absolute;
  box-sizing: border-box;
  margin: 7% auto;
  padding: 80px 43px;
  border-radius: 10px;
  background-image: url('/images/album.png');
  background-size: cover;
`;

const PhotoPreview = styled.div`
  width: 100%;
  margin-right: 5px;
  margin-bottom: 10px;
  height: 290px;
  background-color: #bbbbbb;
  img {
    width: 100%;
    height: 100%;
  }
`;

const CustomTitle = styled.div`
  margin-bottom: 20px;
  margin-left: 20%;
  width: 65%;
  height: 34px;
  /* font-family: 'bagel fat one'; */
  font-size: 18px;
  background-color: #494949;
  box-shadow: 8px 10px 19px 0px rgba(0, 0, 0, 0.29);
  border-radius: 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputTitle = styled.div`
  height: 150px;
  background-color: white;
  font-size: 16px;
  padding: 15px;
  box-sizing: border-box;
  /* border: 1px solid #686868; */
  border-radius: 5px;
  width: 100%;
`;

export default ViewImagePostModal;
