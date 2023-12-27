import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from "react-avatar";

import moment from "moment";
import "moment/locale/ko";

const PostList = () => {
    // postList 상태: useState 훅을 사용하여 컴포넌트의 상태로 postList를 선언하고, 초기값은 빈 배열([])로 설정합니다.
    const [postList, setPostList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState("최신순");


    const SetTime = (a, b) => {
        if (a !== b) {
            return moment(b).format("YYYY MMMM Do, hh:mm") + "(수정됨)";
        } else {
            return moment(a).format("YYYY MMMM Do, hh:mm");
        }
    }

    const getPostList = () => {
        let body = {
            sort: sort,
            searchTerm: searchTerm,
        }

        // axios.post: 서버에 POST 요청을 보내고, 성공하면 응답 데이터를 확인하여 postList 상태를 업데이트합니다.
        // axios를 사용하여 서버에 POST 요청을 보냄
        axios.post("/api/post/list", body)
            .then((response) => {
                // 서버 응답 데이터에서 success가 true인 경우
                if (response.data.success) {
                    // postList 상태를 응답에서 받은 postList로 업데이트
                    setPostList([...response.data.postList]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // useEffect 훅: 컴포넌트가 렌더링된 후에 실행되는 훅입니다. 서버에 POST 요청을 보내고 응답을 처리합니다.
    useEffect(() => {
        getPostList();
    }, [sort])  // useEffect의 두 번째 인자로 sort를 전달하여 한 번만 실행되도록 설정.


    const SearchHandler = () => {
        getPostList();
    }


    return (
        <>
            <div className='login__header'>
                <h3>List</h3>
                <p>잠깐 글좀 확인할까?</p>
            </div>

            <div className='list__search'>
                <input type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) SearchHandler();
                    }}
                />
                <button onClick={() => SearchHandler()}>검색</button>
            </div>

            <div className='list__btn'>
                <button onClick={() => setSort("최신순")}>최신순</button>
                <button onClick={() => setSort("인기순")}>인기순</button>
            </div>

            <div className='list__wrap'>
                {/* postList.map: postList 상태를 매핑하여 각 게시물의 정보를 화면에 출력합니다. */}
                {/* key 속성: 리액트에서 배열을 매핑할 때 각 항목에 고유한 key 속성을 제공하는 것이 좋습니다. 여기서는 배열의 인덱스를 key로 사용합니다. */}
                {postList.map((post, key) => {
                    console.log(post)
                    return (
                        <div className='list' key={key}>
                            <span className='cate'>교육</span>
                            <h3 className='title'>
                                <Link to={`/detail/${post.postNum}`}>{post.title}</Link>
                            </h3>
                            <p className='desc'>{post.content}</p>
                            <div className='auth'>
                                <Avatar
                                    size="30"
                                    round={true}
                                    src={post.author.photoURL}
                                />
                                {post.author.displayName}
                            </div>
                            <div>{SetTime(post.createdAt, post.updatedAt)}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PostList