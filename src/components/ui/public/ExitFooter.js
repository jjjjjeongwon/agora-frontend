import styled from 'styled-components';
import { IoMdLogOut } from 'react-icons/io';
const ExitFooter = () => {
  return (
    <Container>
      <TextWrap>
        <IconWrap>
          <Logout
            onClick={() => {
              window.location.reload();
            }}
          >
            <HoverWrap color="white" hoverColor="#BCC9C6">
              <IoMdLogOut size={35} />
            </HoverWrap>
          </Logout>
        </IconWrap>
      </TextWrap>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 5%;
  right: 8%;
  margin: auto;
  display: flex;
  justify-content: space-between;

  height: 15%;
  /* border: 2px solid gray; */
`;

const HoverWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: ${({ color }) => color ?? 'white'};
  }
  svg:hover {
    color: ${({ hoverColor }) => hoverColor ?? 'grey'};
  }
`;

const IconWrap = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
`;

const TextWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Logout = styled.div`
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 35px;
  border: 5px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export default ExitFooter;
