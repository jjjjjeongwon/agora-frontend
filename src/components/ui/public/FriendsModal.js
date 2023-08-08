import { forwardRef, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import userAPI from '../../../apis/userAPI';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const FriendsModal = forwardRef((props, ref) => {
  let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

  const [content, setContent] = useState('');

  const navigate = useNavigate();
  const email = JSON.parse(sessionStorage.getItem('isLogin'))[
    'LoginEmailState'
  ];

  const visitData = {
    from: email,
    to: content,
  };
  // console.log(visitData);

  const sendVisitList = async () => {
    // console.log(content);
    await userAPI
      .post('user/handleFriendRequest', visitData)
      .then((res) => {
        console.log(res);
        props.setFriendsInfo(res.data);
        Swal.fire({
          title: '친구추가 성공!',
          confirmButtonColor: '#0e72ed',
        });

        // navigate('/login');
      })
      .catch((err) => {
        console.log('친구요청 오류', err);
        Swal.fire({
          title: '친구요청 실패!',
          confirmButtonColor: 'red',
        });
      });
  };
  // const sendVisitList = async () => {
  //   // console.log(content);
  //   await userAPI
  //     .get('user/surfing')
  //     .then((res) => {
  //       console.log(res);
  //       Swal.fire({
  //         title: '친구요청 성공!',
  //         confirmButtonColor: '#0e72ed',
  //       });

  //       // navigate('/login');
  //     })
  //     .catch((err) => {
  //       console.log('친구요청 오류', err);
  //       Swal.fire({
  //         title: '친구요청 실패!',
  //         confirmButtonColor: 'red',
  //       });
  //     });
  // };

  const handleClickOutside = () => {
    props.setFriendModalOpen(false);
    props.setFriend(false);
  };

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      // Enter 키를 눌렀을 때 처리할 로직을 여기에 작성합니다.
      // 예를 들어, sendVisitList() 함수를 호출하거나 다른 동작을 수행할 수 있습니다.
      // 여기서는 sendVisitList() 함수를 호출하는 예시를 보여줍니다.
      sendVisitList();
      setContent(''); // input 값을 비웁니다.
    }
  };

  const handleGoMap = (num, id) => {
    console.log(num, id);
    if (num === 1) {
      navigate(`/collectionspace/${id}`);
    }
    if (num === 2) {
      navigate(`/collectionspace_two/${id}`);
    }
    if (num === 3) {
      navigate(`/collectionspace_three/${id}`);
    }
  };

  console.log(props.friendsInfo);

  return (
    <>
      <Container ref={wrapperRef}>
        {/* <Container> */}
        <Wrap>
          <IconX onClick={handleClickOutside}></IconX>
        </Wrap>

        <VisitListTitle>Search Email</VisitListTitle>

        <Content>
          <Search
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleSearchEnter}
          ></Search>
          <WrapSearch>
            {/* <SearchResult></SearchResult> */}
            {/* <Plus></Plus> */}
          </WrapSearch>
        </Content>
        <VisitListTitle>Friends List</VisitListTitle>

        <Title>
          {props.friendsInfo.map((friend, idx) => (
            <Friend>
              <Name>{friend.nickname}</Name>
              <Button onClick={() => handleGoMap(friend.houseNum, friend._id)}>
                GO
              </Button>
            </Friend>
          ))}
        </Title>
      </Container>
    </>
  );
});

const Container = styled.div`
  width: 380px;
  height: 550px;
  right: 10%;
  top: 5%;
  background-color: white;
  position: absolute;
  box-sizing: border-box;
  margin: 5% auto;
  padding: 25px 30px;
  border-radius: 20px;
  background-size: cover;
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;

  align-items: end;
  justify-content: flex-end;
`;

const IconX = styled.div`
  width: 35px;
  height: 35px;
  background-image: url('/images/xicon.png');
  background-size: cover;
  margin-bottom: 10px;
  cursor: pointer;
`;

const WrapSearch = styled.div`
  display: flex;
  padding: 10px;
`;

const Search = styled.input`
  margin: 5px auto auto 60px;
  width: 230px;
  height: 30px;
  background-color: transparent;
  outline: none;
  border: none;
`;

const SearchResult = styled.div`
  width: 90px;
  height: 45px;
  margin-left: 60px;
  font-size: 18px;
`;

const Plus = styled.div`
cursor: pointer;
  width: 20px;
  height: 20px;
  background-image: url('/images/plusicon.png');
  background-size: cover;
  cur
`;

const VisitListTitle = styled.div`
  font-family: 'luckiest guy';
  margin-top: 10px;
  font-size: 18px;
  margin-bottom: 5px;
  color: #36363a;
`;

const Title = styled.div`
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  height: 280px;
  background-color: transparent;
  margin-bottom: 10px;
  border-radius: 3px;
  background-image: url('/images/list.png');
  background-size: cover;
  overflow-y: auto;
`;

const Content = styled.div`
  width: 100%;
  height: 88px;
  /* border: 1px solid #3f3e3c; */
  background-color: transparent;
  background-image: url('/images/search.png');
  background-size: cover;
`;

const Friend = styled.div`
  justify-content: space-between;
  padding-left: 25px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  box-sizing: border-box;
  width: 98%;
  height: 50px;
  background-color: #cfd0d3;
  /* border: 1px solid grey; */
  border-radius: 25px;
`;

const Name = styled.div`
  font-family: 'luckiest guy';
  font-size: 20px;
`;

const Button = styled.div`
  font-family: 'luckiest guy';

  width: 50px;
  height: 26px;
  border-radius: 27px;
  display: flex;
  color: #36363a;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  background-color: transparent;
  border: 1.2px solid #36363a;
  cursor: pointer;
  &:hover {
    transition-duration: 0.3s;
    background-color: white;
  }
`;

export default FriendsModal;
