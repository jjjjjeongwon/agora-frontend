import styled from 'styled-components';
import { IoMdLogOut } from 'react-icons/io';
import { ImSphere } from 'react-icons/im';
import { TbArrowsRandom } from 'react-icons/tb';
const PhotoBoxHeader = () => {
  return (
    <Container>
      <Logo>
        Poly
        <br />
        World
      </Logo>
      {/* <Wrap>
        <TextWrap>
          <IconWrap>
            <Logout
              onClick={() => {
                window.location.reload();
              }}
            >
              <HoverWrap color="white" hoverColor="#BCC9C6">
                <ImSphere size={22} />
              </HoverWrap>
            </Logout>
          </IconWrap>
          <Text>Sphere</Text>
        </TextWrap>
        <TextWrap>
          <IconWrap>
            <Logout
              onClick={() => {
                window.location.reload();
              }}
            >
              <HoverWrap color="white" hoverColor="#BCC9C6">
                <TbArrowsRandom size={22} />
              </HoverWrap>
            </Logout>
          </IconWrap>
          <Text>Random</Text>
        </TextWrap>
      </Wrap> */}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  /* width: 90vw */
  height: 15%;
  /* border: 2px solid gray; */
`;

const Logo = styled.div`
  color: white;
  font-family: 'luckiest guy';
  font-size: 50px;
`;

const Wrap = styled.div`
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
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

const Text = styled.div`
  margin-left: 15px;
  font-family: 'luckiest guy';
  color: white;
  font-size: 22px;
`;

const Logout = styled.div`
  cursor: pointer;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export default PhotoBoxHeader;
