/* global kakao */
import React, { useState, useEffect } from 'react';
import '../css/PlaceDetail.css';
import { Button, ProgressBar } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

import PlaceSideBar from '../../components/js/PlaceSideBar.js';
import PlaceCarousel from '../../components/js/PlaceCarousel.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPhone, faMap, faHouse, faTags, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import KakaoMap from '../../components/js/KakaoMap.js';

const PlaceDetail = () => {
  const PlaceScore = '4.5';
  const ReviewScoreFive = '10';
  const ReviewScoreFour = '25';

  const [reviewCounts, setReviewCounts] = useState();
  const [place, setPlace] = useState([]);
  const [review, setReview] = useState([]);
  const [ratings, setRatings] = useState([]);
  let { place_id } = useParams();
  const [user, setUser] = useState();
  const [address, setAddress] = useState('');
  const [pname, setPname] = useState('');

  const initMap = () => {
    kakao.maps.load(() => {
      var container = document.getElementById('map');
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
          };
          var map = new kakao.maps.Map(container, options);
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          var message = 'latlng : new kakao.maps.LatLng(' + result[0].y + ', ';
          message += result[0].x + ')'

          var resultDiv = document.getElementById('clickLatlng');
          resultDiv.innerHTML = message;

          var marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });
          var infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${pname}</div>`
          });
          infowindow.open(map, marker);

          map.setCenter(coords);
        }
      })
    })
  };

  useEffect(() => {
    const getPlace = async () => {
      await axios.get(`/dog/place/detail?place_id=${place_id}`)
        .then(res => {
          setPlace(res.data);
        })
        .then(() => {
          setAddress(place.place_address);
          setPname(place.place_name);
        })
    }
    getPlace();

    const getReview = async () => {
      await axios.get(`/dog/review/${place_id}/review`)
        .then(res => {
          setReview(res.data);
          setReviewCounts(res.data.length);
        })
    }
    getReview();

    const getUser = async () => {
      await axios.get(`/dog/user/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(res => {
          setUser(res.data);
        })
    }
    getUser();

    const getRatings = async () => {
      await axios.get(`/dog/review/rating/${place_id}`)
        .then(res => {
          setRatings(res.data);
        })
    }
    getRatings();

    initMap();
  }, []);

  const countingLength = (e) => {
    if (e.target.value.length > 300) {
      alert('댓글을 300자 이하로 입력해 주세요.');
      e.target.value = e.target.value.substring(0, 300);
      e.target.focus();
    }
    document.getElementById('counter').innerText = e.target.value.length + '/300자';
  }

  const saveReview = () => {
    const content = document.getElementById('content');
    const params = {
      place_id: place_id,
      review_content: content.value,
      user_nickname: user.user_nickname,
      review_starRating: value
    }
    axios.post(`/dog/review/${place_id}/review`, params)
      .then(() => {
        const getReview = async () => {
          const resp = await axios.get(`/dog/review/${place_id}/review`)
          setReview(resp.data);
        }
        getReview();
        document.getElementById('content').value = '';
        const getRatings = async () => {
          const resp = await axios.get(`/dog/review/rating/${place_id}`)
          setRatings(resp.data);
        }
        getRatings();
      })
  };

  const onClickHeart = async () => {
    const resp = await axios.post(`/dog/place/favorite`, { place_id: place_id },
      { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }).then((res) => {
        if (res.data === "success") {
          alert('관심장소에 추가되었습니다.');
        } else {
          alert('이미 관심장소로 등록된 장소입니다.')
        }
      })
  }

  const [value, setValue] = React.useState(1);
  const [finalValue, setFinalValue] = React.useState(1);




  const data = [
    {
      id: 0,
      title: "가게 정보",
      description:
        <div className="PlaceDetailInfo">
          <p className="PlaceDetailInfoContents">사랑하는 반려견과 행복하고 즐거운 시간을 보내실 수 있는 따뜻한 공간, 어야가자애견카페에 고객님을 초대합니다.사랑하는 반려견과 행복하고 즐거운 시간을 보내실 수 있는 따뜻한 공간, 어야가자애견카페에 고객님을 초대합니다.사랑하는 반려견과 행복하고 즐거운 시간을 보내실 수 있는 따뜻한 공간, 어야가자애견카페에 고객님을 초대합니다.</p>
          <p><FontAwesomeIcon icon={faPhone} />{place.place_call}</p>
          <p><FontAwesomeIcon icon={faMap} />{place.place_address}</p>
          <p><FontAwesomeIcon icon={faHouse} /><a href={place.place_homepage}>{place.place_homepage}</a></p>

          <p><FontAwesomeIcon icon={faTags} />태그</p>

          <div className="kakaomap">
            <div id='map' style={{ width: "640px", height: "360px" }}></div>
            <div id="clickLatlng"></div>
          </div>
        </div>
    },

    {
      id: 1,
      title: "리뷰 " + "(" + reviewCounts + ")",
      description:
        <div className="PlaceDetailReview">

          <div className="PlaceDetailWriteReview">
            <div class="cm_write">
              <fieldset>
                <label class="skipinfo">리뷰 작성하기</label>
                <div class="cm_input">
                  <RangeSlider value={value || 1}
                    onChange={e => setValue(e.target.value)}
                    onAfterChange={e => setFinalValue(e.target.value)}
                    step={1}
                    min={1}
                    max={5}
                    tooltipPlacement='top'
                    tooltip='auto'
                    variant='info' />
                  <p class="cm_score"><p class="cm_value">{finalValue || 1}</p>점</p>
                  <textarea id="content" name="content" onKeyUp={(e) => countingLength(e)} cols="90" rows="4" placeholder="리뷰를 입력해 주세요."></textarea>
                  <span className="cm_submit"><Button type="button" className="submitbtns" onClick={saveReview}>등록</Button><i id="counter">0/300자</i></span>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="ProgressBars">
            {ratings.map((rating, index) => (
              <div key={index} className="PlaceDetailProgressbar"><b>{5 - index}점</b><ProgressBar now={Number(rating / ratings.length * 100)} /><b>{rating}명</b></div>
            ))}
          </div>

          <div className="PlaceDetailReviewList">
            {review.map(rev => (
              <div className="PlaceDetailReviews">
                <FontAwesomeIcon icon={faCircleUser} />
                <div className="PlaceReviewName">{rev.user_nickname}</div>
                <div className="PlaceReviewSub">{rev.review_starRating}점</div>
                <div className="PlaceReviewContents">{rev.review_content}</div>
                <Button variant="danger" className="comment_button">삭제</Button>
                <Button variant="primary" className="comment_button">수정</Button>
              </div>
            ))}
          </div>
        </div>
    }
  ];

  const [index, setIndex] = useState(0);



  return (
    <div>
      <PlaceSideBar></PlaceSideBar>
      <PlaceCarousel></PlaceCarousel>

      <div className="PlaceDetail">
        <div className="PlaceDetailTitle">
          <p className="PlaceCategory">{place.place_category}</p>
          <p className="PlaceName">{place.place_name}</p>
          <p className="Score">{place.place_score}</p>
          <Button className="likebtns" onClick={onClickHeart}><FontAwesomeIcon icon={faHeart} />&nbsp;관심 등록하기</Button>
        </div>

        <section className="PlaceDetailBar">
          <ul>
            {data.map(item => (
              <li
                key={item.id}
                className={index === item.id ? 'PlaceDetailMenu active' : 'PlaceDetailMenu'}
                onClick={() => setIndex(item.id)}>{item.title}</li>
            ))}
          </ul>
          {data.filter(item => index === item.id).map(item => (
            <div>{item.description}</div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default PlaceDetail;