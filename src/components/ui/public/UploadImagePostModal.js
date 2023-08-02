import { forwardRef, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import userAPI from '../../../apis/userAPI';

const UploadImagePostModal = forwardRef((props, ref) => {
  let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      props.setUploadImageModalOpen(false);
      props.setCamera(false);
    }
  };

  const [errorMsg, setErrorMsg] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const [content, setContent] = useState('');

  // const userEmail = JSON.parse(sessionStorage.getItem('isLogin'))[
  //   'LoginEmailState'
  // ];

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
      // formData.append('email', userEmail);
      console.log(formData);

      const response = await userAPI.post('/board', formData, {
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
        <CustomTitle>Photo</CustomTitle>
        <TitleName>Photo</TitleName>
        {/* <FlexPhoto> */}
        <PhotoPreview>
          <img id="imagePreview" src="" alt="" />
        </PhotoPreview>
        <Content>
          <input
            type="file"
            accept="image/*"
            required
            name="file"
            onChange={handleFileChange}
          />
        </Content>
        {/* </FlexPhoto> */}

        <TitleName>Title</TitleName>
        <InputTitle
          placeholder="사진에 대한 제목을 입력해주세요"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></InputTitle>
        <TitleName>Contents</TitleName>
        <InputText
          placeholder="사진과 관련된 내용을 자유롭게 입력해주세요"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></InputText>
        <CustomButton>DISPLAY</CustomButton>
      </Container>
    </>
  );
});

const Container = styled.form`
  width: 38rem;
  height: 43rem;
  right: 30%;
  /* bottom: 10%; */
  top: 0;
  /* background-color: transparent; */
  position: absolute;
  box-sizing: border-box;
  margin: 2% auto;
  padding: 90px 100px;
  border-radius: 10px;
  background-image: url('/images/imageNote.png');
  background-size: cover;
`;
const FlexPhoto = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const PhotoPreview = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-right: 5px; */
  height: 220px;
  background-color: #bbbbbb;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  width: 180px;
  height: 30px;
  margin-bottom: 10px;
  padding-left: 3px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  outline: none;
`;

const TitleName = styled.div`
  font-family: 'luckiest guy';
  margin-bottom: 5px;
  font-size: 15px;
`;

const CustomTitle = styled.div`
  font-family: 'luckiest guy';
  margin-bottom: 55px;
  /* font-family: 'bagel fat one'; */
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputTitle = styled.input`
  height: 22px;
  background-color: transparent;
  border: 1px solid #686868;
  border-radius: 5px;
  color: #686868;
  outline: none;
  margin-bottom: 10px;
  width: 95%;
`;
const InputText = styled.textarea`
  height: 60px;
  background-color: transparent;
  border: 1px solid #686868;
  border-radius: 5px;
  outline: none;
  /* width: 100%; */
  width: 95%;
`;

const CustomButton = styled.button`
  /* font-family: 'gloria hallelujah'; */
  font-family: 'luckiest guy';

  width: 120px;
  height: 32px;
  border-radius: 27px;
  display: flex;
  margin: 12px auto auto;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background-color: #bbbbbb;
  border: 1.5px solid #686868;
  cursor: pointer;
  &:hover {
    transition-duration: 0.3s;
    background-color: white;
  }
`;

export default UploadImagePostModal;
