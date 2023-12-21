## client
npx create-react-app .   
npm install sass   
npm install react-bootstrap bootstrap   
npm install react-router-dom   
npm install axios   
npm install http-proxy-middleware   
npm install @emotion/css    
npm install @emotion/react  
npm install @emotion/styled   
npm install firebase   
npm install react-redux   
npm install @reduxjs/toolkit   
npm install react-avatar  
npm install moment  

## server
npm init -y;   
npm install express --save;   
npm install nodemon --save;   
npm install path --save;   
npm install mongoose --save;   
npm install multer --save;      
npm install aws-sdk@2.348.0 --save;      
npm install multer-s3@2.10.0 --save;      

## 문제 해결
- client 폴더에 화살표 생길 때 : .git 폴더를 지운다.   
`rm -rf .git`   
`git rm --cached . -rf`# simple300   

- READEME 줄바꿈: `git config --global core.autocrlf true`  

- error: src refspec master does not match any
error: failed to push some refs to 'https://github.com/repo~':  
새로운 깃 리파지토리를 init하고, 다시 push 하는 방법이다.

`git init`
`git add .`
`git commit -m "message"`
`git config user.name "Username"`
`git config user.email "Email address"`
`git remote add origin "github.com/your-repo.git"`
`git push -u origin master`


- error: remote origin already exists.
`git remote remove origin`
## 초기 설정
- 디렉토리 생성   
    > mkdir client      
    mkdir server

- README 파일 생성
    > echo "" > README.md   

- client npm 패키지 설치   
    > cd client  
    //React 생성  
    npx create-react-app .  

    //웹사이트에서 다양한 페이지를 쉽게 구현할 수 있게 해주는 라이브러리  
    npm install react-router-dom  

    // HTTP 요청을 쉽게 보낼 수 있게 해주는 라이브러리  
    npm install axios  

    // 프록시?? 설정을 쉽게 해주는 라이브러리  
    npm install http-proxy-middleware  

    // 웹사이트에 Bootstrap 스타일을 적용할 수 있게 해주는 라이브러리  
    npm install react-bootstrap bootstrap  

    // CSS-in-JS 방식을 사용할 수 있게 해주는 라이브러리  
    npm install @emotion/css  
    npm install @emotion/react  
    npm install @emotion/styled  

    // sass 설치
    npm i sass

    // firebase 설치
    npm install firebase

    // redux 설치
    npm install react-redux
    npm install @reduxjs/toolkit

- 클라이언트 파일에서 build 생성  
`cd ./client`  
`npm run build`

- server npm 패키지 설치 
    > cd ..   
    cd server  
    // package.json 파일을 생성   
    npm init -y;  

    // nodeJS를 사용한 REST 서버를 편리하게 구현하는 프레임워크 설치   
    npm install express --save;  

    // 수정할 때마다 자동으로 서버 재시작   
    npm install nodemon --save;  

    // 파일과 디렉토리 경로 설정(=서버랑 클라이언트 연결)
    npm install path --save;  

    // MongoDB에 쉽게 연결하고 데이터를 관리할 수 있게 해주는 라이브러리   
    npm install mongoose --save;

    // 이미지 업로드 시 설ㅊ;??
    npm install multer --save;
    // npm install multer-s3 --save;
    // 클라우드 연결 오류 때문에 낮은 버전 설치
    npm install multer-s3@2.10.0 --save
    혹은 server package.json "multer-s3": "^2.10.0", 넣고 터미널에 npm i

    // 네이버 클라우드 스토리지
    npm install --save aws-sdk@2.348.0

    - package.json
    ```javascript
    "scripts": {
        // 서버를 쉽게 시작하기 위해 npm start 명령어를 실행할 때 nodemon index.js를 실행하기
        "start": "nodemon index.js"
    }
    ```

## 제작과정
### 1. 서버 셋팅하기
- 기본 예시(server의 index.js)
```javascript
// Express.js를 이용하여 간단한 웹 서버를 생성
const express = require("express");
const app = express();
const port = 5050;

// 해당 포트에서 서버를 시작하는 메서드
app.listen(port, () => {
    console.log("running --->" + port);
})

// 루트?? URL('/')에 GET 요청이 오면 "Hello World"라는 응답을 보내는 라우트 핸들러??를 설정
app.get("/", (req, res) => {
    res.send("Hello World") // JSON 응답
})
```
## mongoose
Database Access - readWriteAnyDatabase로 설정
Network Access - 0.0.0.0/0로 설정
Database Deployments -> connect drivers -> Add your connection string into your application code 복사 .connect() 안에 삽입

```javascript
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;

// 서버와 클라이언트 연동
app.use(express.static(path.join(__dirname, "../client/build")));   // 기본 값 주소 설정

// 서버와 mongoDB 연동
app.listen(port, () => {
    mongoose
        .connect(
            'mongodb+srv://ppiyoxia1215:ppiyoxia1215@cluster0.ejlg0vf.mongodb.net/blog?retryWrites=true&w=majority' // 이름 설정(db id): blog
        )
        .then(() => {
            console.log("listening -->" + port);
            console.log("mongoose --> connecting");
        })
        .catch((err) => {
            console.log(err);
        })
})
// 배포할 때 사용?
// 클라이언트 주소 build 연동
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// 서버 주소 build 연동
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
```

### 2. components 파일 생성

- APP.js 다른 js 파일을 연동
```javascript
import React from 'react'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Upload from './components/Upload'
import List from './components/List'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/upload' element={<Upload />}></Route>
        <Route path='/list' element={<List />}></Route>
      </Routes>
    </div>
  )
}

export default App
```

## Bootstrap
- Heading.js
```javascript
// https://react-bootstrap.netlify.app/docs/components/navbar/
// https://react-bootstrap.netlify.app/docs/getting-started/introduction - public index.html에 css 연동
import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/list">list</Nav.Link>
                        <Nav.Link href="/upload">upload</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Home">Action</NavDropdown.Item>
                            <NavDropdown.Item href="/list">list</NavDropdown.Item>
                            <NavDropdown.Item href="/upload">upload</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
```
- public의 index.html
```javascript
// https://react-bootstrap.netlify.app/docs/getting-started/introduction
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous" />  {/* css 연동 */}
</head>

<body>
    <div id="root"></div>
</body>

</html>
```
- client의 index.js BrowserRouter 설정 
<!-- BrowserRouter가 무엇인지 적기 -->
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

```

### 3. 
- client의 index.js 파일과 같은 위치에 setupProxy.js 생성 클라이어튼 서버 통신
```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5050",
            changeOrigin: true,
        })
    );
};
```

- server의 index.js 서버 요청 받았음 및 list에게 데이터 전송
```javascript
app.post("/api/test", (req, res) => {
    console.log(req);
    res.status(200).json({ success: true, text: "안녕하세요!" });   // 서버에서 클라이언트에게 데이터 전송
})
```

- list.js 서버가 보낸 데이터 클라이언트 (list)가 받음
```javascript
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const List = () => {
    const [text, setText] = useState("");

    useEffect(() => {
        axios
            .post("/api/test")
            .then((response) => {
                alert("요청 성공");
                // 서버에서 보낸 데이터 출력
                setText(response.data.text);
                console.log(response)
            })
            .catch((err) => {
                alert("요청 실패");
                console.log(err)
            })
    }, [])
    return (
        <div>List
            <p>서버에서 받은 데이터 : {text}</p>
        </div>
    )
}

export default List
```

- list.js 클라이언트가 서버에 데이터 보내기
```javascript
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const List = () => {
    const [text, setText] = useState("");


    useEffect(() => {
        // 서버에 데이터 전송
        let body = {
            text: "안녕하세요~"
        }

        axios
            .post("/api/test", body)
            .then((response) => {
                alert("요청 성공");
                // 서버에 있는 데이터 출력
                setText(response.data.text);
                console.log(response)
            })
            .catch((err) => {
                alert("요청 실패");
                console.log(err)
            })
    }, [])
    return (
        <div>List
            <p>서버에서 받은 데이터 : {text}</p>
        </div>
    )
}

export default List
```

- 서버가 클라이언트가 보낸 데이터 받기
```javascript
// body-parser 설정해야 undefind가 아닌 클라이언트가 보낸 데이터를 받을 수 있음 하지만 업데이트 된 후 express에 포함되어 있음
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/test", (req, res) => {
    console.log(req.body)
    res.status(200).json({ success: true, text: "서버에서 클라이언트에게 보내는 데이터" }); // 서버에서 클라이언트에게 데이터 전송
});
```

## 스키마 생성
- server Model 폴더 생성 Post.js 파일 생성
```javascript
const mongoose = require("mongoose");

// 스키마 생성 = sql 테이블 생성
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
}, {collection: "post"});   // 이름 설정

const Post = mongoose.model("Post", postSchema);


module.exports = { Post };
```

- server index.js 서버와 스키마 연동 후 MongoDB에 임의로 데이터 전송
```javascript
const { Post } = require("./Model/Post.js");

// mongoDB에 전송
app.post("/api/test", (req, res) => {
    const BlogPost = new Post({ title: "안녕하세요", content: "내용입니다."})
    BlogPost.save().then(() => {
        res.status(200).json({ success: true });
    })
})
```

## Emotion
- style 폴더 UploadCSS.js 생성

```javascript
import styled from "@emotion/styled";

const UploadDiv = styled.div`
    width: 100%;
`

const UploadTitle = styled.h3`
    text-align: center;
`

const UploadForm = styled.form`
    width: 500px;
    margin: 0 auto;

    label {
        display: block;
    }
    input {
        width: 100%;
        padding: 10px;
    }
    textarea {
        width: 100%;
        height: 300px;
        resize: none;
        padding: 10px;
    }
`

const UploadButton = styled.div`
    button {
        border: 1px solid #000;
        background: #ccc;
        width: 100%;
        padding: 10px;
    }
`

export { UploadDiv, UploadTitle, UploadForm, UploadButton };
```

- Upload.js 버튼 컴포넌트화

```javascript
import React, { useState } from 'react'
import { UploadDiv, UploadTitle, UploadForm, UploadButton } from "../style/UploadCSS.js"

const Upload = () => {
    // 
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        alert("dd")
    }

    return (
        <UploadDiv>
            <UploadTitle>
                글을 작성해 주세요!!
            </UploadTitle>
            <UploadForm>
                <label htmlFor='title'>제목</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                    }}
                ></input>

                <label htmlFor='content'>내용</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => {
                        setContent(e.currentTarget.value);
                    }}
                ></textarea>

                <UploadButton>
                    <button
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >저장하기</button>
                </UploadButton>
            </UploadForm>
        </UploadDiv>
    )
}

export default Upload
```


### 4. 클라이언트 - 서버 - 데이터베이스 연동 데이터 주고 받기
- client Upload.js 데이터를 서버에 전송
```javascript
if (title === "" || content === "") {
            return alert("내용을 작성해주세요!");
        }

        // 값이 있으면 보냄
        let body = {
            title: title,
            content: content
        }

        axios
            .post("/api/post/submit", body)
            .then((response) => {
                if (response.data.success) {
                    // 데이터가 잘 전송됨
                    alert("글 작성이 완료되었습니다.");
                } else {
                    alert("글 작성이 실패하였습니다");
                }
            })
```

- server index.js 클라이언트에게 받은 데이터 MongoDB에 전송
```javascript
// mongoDB에 전송
app.post("/api/post/submit", (req, res) => {
    // 성공하면 body에 들어있음
    let temp = req.body;

    const BlogPost = new Post(temp);    // mysql의 insert와 같음, temp 받음
    BlogPost.save()
        .then(() => {   // DB에 temp 저장
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
        })
})
```

- list.js DB에 있는 데이터 불러오기
```javascript
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const List = () => {
    // 서버가 DB에서 데이터 받아와서 클라이언트가 받아서 화면에 출력
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios
            .post("/api/post/list")
            .then((response) => {
                if (response.data.success) {
                    setPostList([...response.data.postList]);   // doc, postList, postNum 있음
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h3>글 목록</h3>
            {postList.map((post, key) => (
                <div key={key}>
                    <h4>제목: {post.title}</h4>
                    <p>내용: {post.content}</p>
                </div>
            ))}
        </div>
    )
}

export default List
```

- client index.js  DB에서 데이터 받기
```javascript
app.post("/api/post/list", (req, res) => {
    // 스키마 데이터 모두 가져오기 doc는 파일 이름 설정한 것 doc 파일을 postList에 넣음
    Post.find().exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})
```

## Counter 스키마 생성
```javascript
const mongoose = require("mongoose");

const countSchema = new mongoose.Schema(
    {
        name: String,
        postNum: Number,
    },
    { collection: "counter" });

const Counter = mongoose.model("Counter", countSchema);

module.exports = { Counter };
```

- Post.js 추가 = php에서 필드 추가
```javascript
    const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    postNum: Number, // 추가
}, { collection: "posts" });
```
- server index.js Counter 연동
```javascript
const { Counter } = require("./Model/Counter.js");
```
- 임의로 몽고DB의 conter에 데이터 저장
```
name: "counter" String
postNum: "1" Int32
```

- upload.js 게시글 작성 후 경로 지정
```javascript
import { useNavigate } from 'react-router-dom';

// 글 작성 후 페이지 이동될 경로 설정
    let navigate = useNavigate();

axios
    .post("/api/post/submit", body)
    .then((response) => {
        if (response.data.success) {
            // 데이터가 잘 전송됨
            alert("글 작성이 완료되었습니다.");
            navigate("/list");
        } else {
            alert("글 작성이 실패하였습니다");
        }
    })
```

- server index.js 게시글 번호 증가
```javascript
app.post("/api/post/submit", (req, res) => {
    let temp = req.body;
    // 넘버 추가 작업
    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            // counter 스키마 postNum 값 가져와서 temp에 저장
            temp.postNum = counter.postNum;

            const BlogPost = new Post(temp);
            BlogPost.save()
                .then(() => {
                    Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(() => {
                        res.status(200).json({ success: true });
                    });
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false });
        })
})
```

- list.js
```javascript
import { Link } from 'react-router-dom';

    return (
        <div>
            {postList.map((post, key) => (
                <div key={key} className='post'>
                    <h3>제목: {post.title}</h3>
                    <p>내용: {post.content}</p>
                    <Link to={`/post/${post.postNum}`}>내용보기</Link> // 추가
                </div>
            ))}
        </div>
    )

```
## 4. 수정 삭제하기
- APP.js 주소 연동
```javascript
<Route path='/post/:postNum' element={<Detail />}></Route>
<Route path='/edit/:postNum' element={<Edit />}></Route>
```

- server index.js
```javascript
app.post("/api/post/detail", (req, res) => {
    Post.findOne({ postNum: req.body.postNum })
        .exec()
        .then((doc) => {
            console.log(doc);
            res.status(200).json({ success: true, post: doc })
        })
        .catch((err) => {
            res.status(400).json({ success: false })
        })
})
```

- server index.js 삭제하기
```javascript
app.post("/api/post/delete", (req, res) => {
    Post.deleteOne({ postNum: Number(req.body.postNum) })
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            res.status(400).json({ success: false })
        })
})
```

- Detail.js 삭제
```javascript
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Detail = () => {
    let params = useParams();
    let navigator = useNavigate();

    const [postInfo, setPostInfo] = useState({});

    useEffect(() => {
        let body = {
            postNum: params.postNum,
        }
        axios.post("/api/post/detail", body)
            .then((response) => {
                console.log(response)
                setPostInfo(response.data.post)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    const DeleteHandler = () => {
        if (window.confirm("정말로 삭제하겠습니까?")) {
            let body = {
                postNum: params.postNum,
            }
            axios
                .post("/api/post/delete", body)
                .then((response) => {
                    if (response.data.success) {
                        alert("게시글이 삭제되었습니다.");
                        navigator("/list");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("게시글 삭제가 실패했습니다.")
                })
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <div>
                <h3>제목: {postInfo.title}</h3>
                <p>내용: {postInfo.content}</p>
            </div>
            <div>
                <Link to={`/edit/${postInfo.postNum}`}>
                    <button>수정</button>
                </Link>
                <button onClick={() => DeleteHandler()}>삭제</button>
            </div>
        </div>
    )
}

export default Detail
```

- Detail.js 수정
```javascript
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Detail = () => {
    let params = useParams();

    const [postInfo, setPostInfo] = useState({});

    useEffect(() => {
        let body = {
            postNum: params.postNum
        }

        axios.post("/api/post/detail", body)
            .then((response) => {
                console.log(response)
                setPostInfo(response.data.post);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum]);

    return (
        <div style={{ padding: "20px" }}>
            <div>
                <h3>제목: {postInfo.title}</h3>
                <p>내용: {postInfo.content}</p>
            </div>
            <div>
                <Link to={`/edit/${postInfo.postNum}`}>
                    <button>수정</button>
                </Link>
                <button>삭제</button>
            </div>
        </div>
    )
}

export default Detail
```


- Edit.js 수정
```javascript
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Edit = () => {
    let params = useParams();

    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    useEffect(() => {
        let body = {
            postNum: params.postNum
        }

        axios.post("/api/post/detail", body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.post);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    useEffect(() => {
        setTitle(postInfo.title);
        setContents(postInfo.content);
    }, [postInfo])

    return (
        <div style={{ padding: "20px" }}>
            <form>
                <label htmlFor='title'>제목</label>
                <input
                    id='title'
                    type='text'
                    value={title || ""}
                    onChange={(event) => {
                        setTitle(event.currentTarget.value);
                    }}
                /><br />
                <label htmlFor='contents'>내용</label>
                <textarea
                    id='contents'
                    value={contents || ""}
                    onChange={(event) => {
                        setContents(event.currentTarget.value);
                    }}
                ></textarea>

            </form>
        </div>
    )
}

export default Edit
```

- Edit.js 수정하기
```javascript
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
    let params = useParams();
    let navigate = useNavigate();

    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    useEffect(() => {
        let body = {
            postNum: params.postNum
        }

        axios.post("/api/post/detail", body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.post);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    useEffect(() => {
        setTitle(postInfo.title);
        setContents(postInfo.content);
    }, [postInfo])

    const onsubmit = (e) => {
        e.preventDefault();

        if (title === "" || contents === "") {
            return alert("모든 항목을 채워주세요!");
        }

        let body = {
            title: title,
            content: contents,
            postNum: params.postNum
        }

        axios
            .post("/api/post/edit", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 수정이 완료되었습니다.")
                    navigate(`/post/${params.postNum}`);
                } else {
                    alert("글 수정이 실패하였습니다.")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div style={{ padding: "20px" }}>
            <form>
                <label htmlFor='title'>제목</label>
                <input
                    id='title'
                    type='text'
                    value={title || ""}
                    onChange={(event) => {
                        setTitle(event.currentTarget.value);
                    }}
                /><br />
                <label htmlFor='contents'>내용</label>
                <textarea
                    id='contents'
                    value={contents || ""}
                    onChange={(event) => {
                        setContents(event.currentTarget.value);
                    }}
                ></textarea>

                <div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}>취소</button>
                    <button onClick={(e) => {
                        onsubmit(e);
                    }}>제출</button>
                </div>
            </form>
        </div>
    )
}

export default Edit
```

- server index.js
```javascript
app.post("/api/post/edit", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content
    }
    Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false })
        })
})
```

## 5. api 외부파일로 설정하기
- server index.js Router에 넣은 api들 삭제 후 추가
```javascript
app.use("/api/post", require("./Router/post.js"))
```

- server Router 폴더 post.js 생성
```javascript
const express = require('express');
const router = express.Router();

const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");

router.post("/submit", (req, res) => {
    let temp = req.body;

    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            temp.postNum = counter.postNum;

            const BlogPost = new Post(temp);
            BlogPost.save()
                .then(() => {
                    Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } })
                        .then(() => {
                            res.status(200).json({ success: true })
                        })
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false })
        })

});

router.post("/list", (req, res) => {
    Post.find()
        .exec()
        .then((doc) => {
            res.status(200).json({ success: true, postList: doc })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false })
        })
});

router.post("/detail", (req, res) => {
    Post.findOne({ postNum: req.body.postNum })
        .exec()
        .then((doc) => {
            res.status(200).json({ success: true, post: doc });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
        })
});

router.post("/delete", (req, res) => {
    Post.deleteOne({ postNum: Number(req.body.postNum) })
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            res.status(400).json({ success: false })
        })
})

router.post("/edit", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content
    }
    Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false })
        })
})

module.exports = router;
```

## 6. 이미지 업로드

- server에 image 폴더 생성
- Post.js에 이미지 필드 추가
```javascript
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    postNum: Number,
    image: String,
}, { collection: "post" });
```

- ImageUpload.js
```javascript
import React from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'

const ImageUpload = (props) => {

    const FileUpload = (e) => {
        // console.log(e.target.files);
        let formData = new FormData();
        formData.append("file", (e.target.files[0]))

        // 배열로 불러오기
        // for (const keyValue of formData) {
        //     console.log(keyValue);
        // }

        axios
            .post("/api/post/image/upload", formData)
            .then((response) => {
                props.setImage(response.data.filePath)
            })
    }
    return (
        <div>
            <Form.Control
                type='file'
                accept='image/*'
                onChange={(e) => FileUpload(e)}
            />
        </div>
    )
}

export default ImageUpload
```

- Upload.js 추가
```javascript
import ImageUpload from './ImageUpload.js';

const [image, setImage] = useState("");

let body = {
            title: title,
            content: content,
            image: image,
        }

// 이미지 파일 선택 둘 위치에 넣기
<ImageUpload setImage={setImage} />
```
- Detail.js 이미지 보여질 곳에 추가
```javascript
<h3>제목: {postInfo.title}</h3>
<img src={`http://localhost:5050/${postInfo.image}`} alt="g" style={{ width: "100%" }} />
<p>내용: {postInfo.content}</p>
```

- server post.js multer 설정
```javascript
const multer = require("multer");

// https://github.com/expressjs/multer/blob/master/doc/README-ko.md 에서 복사
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'image/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).single("file");

router.post("/image/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ success: false });
        } else {
            res.status(200).json({ success: true, filePath: res.req.file.path })
        }
    })
})
```

## Taliwindcss


## firebase 로그인/회원가입 서비스 이용 설정
```
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD28TsB9U2VQ7XUVmZeFLKqgp9sOBJON5Y",
    authDomain: "simple-test-2f7c6.firebaseapp.com",
    projectId: "simple-test-2f7c6",
    storageBucket: "simple-test-2f7c6.appspot.com",
    messagingSenderId: "701890977223",
    appId: "1:701890977223:web:270d4d017dd77a07d00de2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
```

<details>
    <summary>데이터 추가 방법</summary>

```javascript
import React, { useState } from 'react'

const App = () => {
    const [temp, setTemp] = useState([1, 2, 3]);

    return (
        <div>
        <h1>React</h1>
        {temp}
        <br />
        <button
            onClick={() => {
                let arr = [];
                arr = [...temp];
                arr.push(4);
                setTemp([...arr]);
            }}
        >
            버튼</button>
        </div>
    )
}

export default App
```

</details>

<details>

<summary>데이터 추가 방법</summary>

```javascript
import React, { useState } from 'react'

const App = () => {
    const [content, setContent] = useState("");
    const [contentList, setContentList] = useState([]);

    const onSubmit = () => {
        let tempArr = [...contentList];
        tempArr.push(content)
        setContentList([...tempArr]);
    }

    return (
        <div>
        <h1>React</h1>
        <div>
            {contentList.map((content, key) => (
            <div key={key}>{content}</div>
            ))}
        </div>
        <input
            type='text'
            value={content}
            onChange={(e) => {
            // console.log(e.currentTarget.value)
            setContent(e.currentTarget.value)
            }}
        />
        <br />
        <button
            onClick={() => {
            onSubmit();
            }}
        >입력</button>
        </div>
    )
}

export default App
```
</details>