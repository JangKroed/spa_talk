# API
|기능|METHOD|API URL|REQUEST|RESPONSE|
|:-----:|------|-------|-------|--------|
|게시글<br/>작성|POST|/posts|{ user, password, title, content }|{ "message" }|
|게시글<br/>조회|GET|/posts||{ data: [{ postId, user, title, createdAt }] }|
|게시글<br/>상세<br/>조회|GET|/posts/:_postId||{ data: [{ postId, user, title, content, createdAt }] }|
|게시글<br/>수정|PUT|/posts/:_postId|{ password, title, content }|{ "message" }|
|게시글<br/>삭제|DELETE|/posts/:_postId|{ password : "1234" }|{ "message" }|
|댓글<br/>생성|POST|/comments/:_postId|{ user, password, content }|{ "message" }|
|댓글<br/>목록<br/>조회|GET|/comments/:_postId||{ data: [{ commentId, user, content, createdAt }] }|
|댓글<br/>수정|PUT|/comments/:_comments|{ password, content }|{ "message" }|
|댓글<br/>삭제|DELETE|/comments/:_comments|{ password }|{ "message" }|
