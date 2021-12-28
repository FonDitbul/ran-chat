
# ran-chat

## User 모듈
로그인 회원가입 로그아웃 

회원탈퇴

profile, 프로필 변경, 이름변경, 프로필 이미지 변경, 소개 메시지 

OAuth2.0 
JWT 토큰

## 랜덤 채팅
1대1 랜덤 채팅
pooling 방식 매칭 기능 구현

## 공개 채팅방
공개채팅 기능

## 1대1 채팅방
랜덤 채팅 저장, 1대1로 채팅 이어지기

## 게시판
### 공지사항
게시판, 상단 고정 서비스 업데이트

### 자유게시판
유저 자유게시판

작성자, 내용,

summernote 를 활용한 게시판 생성 페이지

페이징 CRUD

## 컨트롤러 서비스
### chats 컨트롤러
채팅 소켓 게이트웨이


## view & JS
### layouts
nav 태그 따른 layout

### partials
header, footer등 반복 템플릿
### template
게시판 안에 게시물 템플릿,
공개채팅방, 1대1, 랜챗등에 사용되는 템플릿




## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
