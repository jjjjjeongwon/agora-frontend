import React, { useState } from 'react';
import userAPI from '../../apis/userAPI';

const Test = () => {
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

  const previewVideo = (file) => {
    const videoPreview = document.getElementById('videoPreview');
    if (videoPreview) {
      const url = URL.createObjectURL(file);
      videoPreview.src = url;
    }
  };

  // console.log(file);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile.type.startsWith('image/')) {
      previewImage(selectedFile);
    } else if (selectedFile.type.startsWith('video/')) {
      previewVideo(selectedFile);
    }
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

      // 성공적으로 게시물을 생성한 후에 추가적인 처리를 할 수 있습니다.
    } catch (error) {
      setErrorMsg('게시물 업로드에 실패했습니다.');
      console.error('서버 오류:', error);
    }
  };

  return (
    <>
      {errorMsg && <span>{errorMsg}</span>}
      <video id="videoPreview" className="mediaPreview" controls />
      <form
        id="createBoardForm"
        method="post"
        action="/boards/upload"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label htmlFor="file">게시물 업로드</label>
        <input
          type="file"
          accept="image/*,video/*"
          required
          name="file"
          onChange={handleFileChange}
        />
        <input
          placeholder="title"
          type="text"
          required
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Content"
          type="text"
          required
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="submit" value="Create Board" />
      </form>
      <style>{`
        .mediaPreview {
          width: 200px;
          height: 200px;
          object-fit: cover;
        }
      `}</style>
    </>
  );
};

export default Test;
