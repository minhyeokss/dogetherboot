import React, { useState } from 'react';
import '../css/MyInfo2.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import MySideBar from '../../components/js/MySideBar.js';

const Myinfo2 = () => {
  const [passwordInput, setPasswordInput] = useState('');

  const [info, setInfo] = useState({
    name: "",
    birth: "",
    gender: "",
    role: ""
  });

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleWithdrawal = () => {
    const correctPassword = '4321';

    if (passwordInput === correctPassword) {
      // 비밀번호가 맞으면 프롬프트 창을 표시
      const confirmed = window.confirm('정말로 탈퇴하시겠습니까?');
      if (confirmed) {
        // 탈퇴 또는 다른 작업 수행
        // 여기에서 회원 탈퇴 로직 또는 API를 호출할 수 있습니다.
        console.log('탈퇴가 확인되었습니다');

        // 추가적인 메시지 표시
        alert('탈퇴가 완료되었습니다.');
      }
    } else {
      // 비밀번호가 틀리면 ALERT 창을 표시
      alert('비밀번호가 올바르지 않습니다. 다시 시도해주세요.');
    }
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value })
  }

  return (
    <>
      <MySideBar />
      <div className="myinfo2">

        <div className='withdrawal'>
          <p className='ppppp'>내 정보</p>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              <b>닉네임</b>
            </InputGroup.Text>
            <Form.Control
              disabled
              placeholder="닉네임"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </div>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <b>이메일</b>
          </InputGroup.Text>
          <Form.Control
            disabled
            defaultValue="aaaaa@naver.com"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <b>아이디</b>
          </InputGroup.Text>
          <Form.Control
            disabled
            placeholder="아이디"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <b>이름</b>
          </InputGroup.Text>
          <Form.Control
            disabled
            placeholder="홍길동"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <b>생년월일</b>
          </InputGroup.Text>
          <Form.Control
            disabled
            aria-label="Username"
            aria-describedby="basic-addon1"
            type='date'
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <b>성별</b>
          </InputGroup.Text>
          <Form.Control
            disabled
            placeholder="성별"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <div className='memType'>
            <InputGroup.Text id="basic-addon1"><b>회원 종류</b></InputGroup.Text>
            <div className='radio_1'>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="radio_2">
                  <Form.Check disabled checked inline vlaue="USER" label="일반회원" name="role" type={type} id={`inline-${type}-1`} onChange={handleInfoChange} />
                  <Form.Check disabled inline vlaue="SELLER" label="판매자회원" name="role" type={type} id={`inline-${type}-2`} onChange={handleInfoChange} />
                </div>
              ))}
            </div>
          </div>
          <Button variant="primary">변경</Button>{' '}
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup>
            <InputGroup.Text id="inputGroup-sizing-default">
              <b>회원 탈퇴</b>
            </InputGroup.Text>

            <Form.Control
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={passwordInput}
              onChange={handlePasswordChange}
            />
            <Button onClick={handleWithdrawal} variant="danger">회원 탈퇴</Button>{' '}
          </InputGroup>
        </InputGroup>
      </div>

    </>
  )
}

export default Myinfo2;