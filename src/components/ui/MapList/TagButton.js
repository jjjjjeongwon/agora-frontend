import { styled } from 'styled-components';

const TagButton = ({ tag }) => {
  return <Wrap>{tag}</Wrap>;
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  width: 50px;
  height: 23px;
  border-radius: 10px;
  background: #c6c6c6;
  box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.25);
`;

export default TagButton;
