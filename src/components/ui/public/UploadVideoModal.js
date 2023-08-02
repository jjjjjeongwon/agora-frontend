import { forwardRef, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import userAPI from '../../../apis/userAPI';

const UploadVideoModal = forwardRef((props, ref) => {
  let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

  // 모달 끄기
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    console.log(event);
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      props.setVideoModalOpen(false);
      props.setVideoRemote(false);
    }
  };
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  // const userEmail = JSON.parse(sessionStorage.getItem('isLogin'))[
  //   'LoginEmailState'
  // ];

  const previewVideo = (file) => {
    const videoPreview = document.getElementById('videoPreview');
    if (videoPreview) {
      const url = URL.createObjectURL(file);
      videoPreview.src = url;
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    previewVideo(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(file);
      const formData = new FormData();
      formData.append('file', file);
      // formData.append('email', userEmail);
      console.log(formData);

      const response = await userAPI.post('/board/video', formData, {
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
        <VisitListTitle>Video</VisitListTitle>
        <Content>
          <input
            type="file"
            accept="video/*"
            required
            name="file"
            onChange={handleFileChange}
          />
        </Content>
        <CustomButton>UPLOAD</CustomButton>
      </Container>
    </>
  );
});

const Container = styled.form`
  width: 460px;
  height: 200px;
  right: 5%;
  bottom: 10%;
  position: absolute;
  box-sizing: border-box;
  margin: 5% auto;
  padding: 60px 85px;
  border-radius: 10px;
  background-image: url('/images/upload_video.png');
  background-size: cover;
`;

const VisitListTitle = styled.div`
  font-family: 'luckiest guy';

  margin-right: 250px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 95%;
  height: 30px;
  padding-left: 3px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  outline: none;
`;

const CustomButton = styled.button`
  font-family: 'luckiest guy';
  width: 100px;
  height: 23px;
  border-radius: 27px;
  display: flex;
  margin: 5px auto auto 220px;
  align-items: center;
  justify-content: center;
  color: #303030;
  font-size: 16px;
  background-color: #c3c1c2;
  border: 1.5px solid #303030;
  cursor: pointer;
  &:hover {
    transition-duration: 0.3s;
    background-color: white;
  }
`;
export default UploadVideoModal;
