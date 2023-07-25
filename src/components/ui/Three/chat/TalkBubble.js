import { styled } from 'styled-components';

const TalkBubble = ({ message }) => {
  return (
    <Container>
      <TalkPlace>{message}</TalkPlace>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/images/bubble.png');
  background-size: cover;

  width: 190px;
  height: 160px;
`;

const TalkPlace = styled.div`
  width: 72%;
  height: 66%;
`;

export default TalkBubble;
