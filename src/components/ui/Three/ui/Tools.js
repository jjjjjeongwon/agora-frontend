import { styled } from 'styled-components';

const Tools = () => {
  return (
    <div>
      <PostBox>
        <img src="/images/constructTool.png" alt="" />
      </PostBox>
    </div>
  );
};

const PostBox = styled.div`
  position: absolute;
  cursor: pointer;
  left: 2%;
  bottom: 5.5%;
  width: 60px;
  height: 60px;
  margin-bottom: 70px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export default Tools;
