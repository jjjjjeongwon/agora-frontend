import { styled } from 'styled-components';

const SearchBox = () => {
  return (
    <Container>
      <MagnifierIcon>
        <img src="/images/magnifier.png" alt="" />
      </MagnifierIcon>
      <SearchWrap>
        <TextInput></TextInput>
      </SearchWrap>
    </Container>
  );
};

const Container = styled.div`
  width: 200px;
  height: 70px;
  margin: auto auto 40px 30px;
`;

const MagnifierIcon = styled.div`
  width: 45px;
  height: 45px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const SearchWrap = styled.div`
  background: rgba(176, 158, 187, 0.53);
  width: 175px;
  height: 40px;
  border-radius: 20px;
  box-shadow: 4px 2px 23px 0.5px rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  height: 25px;
`;
export default SearchBox;
