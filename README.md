### 목차

> 1. [ERD 구조](#erd-구조)
> 2. [기술 스택](#기술-스택)
> 3. [주요 기능](#주요-기능)
>    + 공통 : [회원가입, 로그인] | [예약 조회]
>    + 사용자 : [예약하기] | [리뷰 작성] | [댓글 작성]
>    + 관리자 : [매장 등록] | [예약 관리]
> 4. [API 명세](#api-명세)
> 5. [형상 관리 - Notion](#형상-관리)
> 6. [팀 문화](#팀-문화)

# 프로젝트 소개


> 선택한 매장에서 나의 애완견의 미용을 시간별로 예약 가능한 편리한 온라인 서비스입니다.\
> 사용자에게는 원하는 시간을 선택할 수 있는 편의성, 원하는 매장을 선택할 수 있는 이점을 제공합니다.\
> 관리자에게는 매장을 등록할 수 있는 서비스, 예약을 관리할 수 있는 편의성을 제공합니다.
>
> TypeScript와 MySQL을 사용해 기본적은 REST API를 구현하였으며,\
> AWS, S3, PM2 등을 이용해 서버를 배포했습니다.

> ### 개발 기간 및 인원
> 24.08.01 ~ 24.10.31 (8주) \
> 백엔드 1명 프론트 1명

> ### [배포 링크 (Swagger API Test 가능)](https://dangsalon.com/api-docs) 👈🏻 클릭 

## 팀원

<div align="center">
<table align="center">
  <tr>
   <th >
     Backend 김도윤
   </th>
   <th>
     Frontend 김무성
   </th> 
  </tr>
  <tr>
    <td align="center">
        <img src="https://github.com/user-attachments/assets/bc0c8c13-b37e-499a-acb5-1a7fc782d7c0" width=200px alt="do">
      <br/>
    </td>
    <td align="center">
    </td>
      <br/>
  </tr>
  <tr>
    <td align="center" class="doyoon">
        <a href="https://github.com/dodoyoo"><img alt="github-link" height="25" src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/></a>
        <br/>
        <a href="https://ehdrn822.tistory.com/"><img alt="blog-link" height="25" src="http://img.shields.io/badge/Tistory-FF7900?style=flat-square&logo=Tistory&logoColor=white"/></a>
    </td>
  </tr>

  </table>
  </div>

  # ERD 구조

  [👉🏻 ERD 직접 보기](https://dbdiagram.io/d/%EB%8C%95%EC%82%B4%EB%A1%B1-667a5a2d9939893dae2b90d6)
  
  <img src="https://github.com/user-attachments/assets/d649ce80-9a78-40e7-9ff7-775bef00f239">



# 기술 스택

<img width="610" alt="dang 기술 스택" src="https://github.com/user-attachments/assets/f7074abb-de3e-437d-808e-53d10bf273c4">

<br/>
<br/>

# 주요 기능

### 요약

<table align="center">
  <tr>
    <th>
      공통
    </th>
    <th>
      사용자
    </th>
    <th>
      관리자
    </th>
  </tr>
  <tr>
    <td align="left" width="350px" class="공통">
      - 회원가입, 로그인
      <br/>
      - 예약 조회
    </td>
    <td align="left" width="350px" class="사용자">
      - 예약하기
      <br/>
      - 리뷰 작성
      <br/>
      - 댓글 작성
      <br/>
    </td>
    <td align="left" width="350px" class="관리자">
      - 매장 등록
      <br/>
      - 예약 관리
      <br/>
    </td>
  </tr>
