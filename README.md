### 목차

> 1. [ERD 구조](#erd-구조)
> 2. [기술 스택](#기술-스택)
> 3. [주요 기능](#주요-기능)
>    + 공통 : [회원가입, 로그인] | [예약 조회]
>    + 사용자 : [예약하기] | [리뷰 작성] 
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
        <img src="https://github.com/user-attachments/assets/34eb1b3c-df28-486c-a561-dd9c1680fc68" width=200px alt="moo">
      <br/>
    </td>
  </tr>
  <tr>
    <td align="center" class="doyoon">
        <a href="https://github.com/dodoyoo"><img alt="github-link" height="25" src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/></a>
        <br/>
        <a href="https://ehdrn822.tistory.com/"><img alt="blog-link" height="25" src="http://img.shields.io/badge/Tistory-FF7900?style=flat-square&logo=Tistory&logoColor=white"/></a>
    </td>
    <td align="center" class="moosung">
        -
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
</table>

## [ 공통 기능 ]

### 회원가입, 로그인
- 사용자는 이메일, 비밀번호, 닉네임, 전화번호를 이용해 회원가입할 수 있다.
- 회원가입 시 이메일 인증을 통해 회원가입을 완료할 수 있다.
- 회원가입 시 관리자를 선택할 수 있다.
- 사용자는 구글 소셜 로그인을 통해서 로그인을 할 수 있다.

### 예약 조회
- 마이페이지를 통한 예약한 내용을 확인할 수 있다.


## [ 사용자 기능 ]

### 예약하기
- 사용자가 원하는 시간과 날짜를 선택하여 예약을 할 수 있다.
- 예약이 이미 존재하는 시간에는 해당 시간 항목을 비활성화하여 선택할 수 없도록 처리한다.
- 요구사항을 작성하여 사용자의 요구사항을 전달할 수 있다.

### 리뷰 작성
- 해당 가게에 리뷰를 작성할 수 있다.
- 가게는 parameter, 사용자는 body로 받아서 작성할 수 있다.
- 리뷰는 작성, 수정, 삭제를 할 수 있다.


## [ 관리자 기능 ]

### 매장 등록
- 매장 사진을 통해서 매장을 등록할 수 있다.
- 사진은 AWS S3를 통해 등록한다.
- 매장 사진 중 대표사진을 선택해서 대표 사진으로 등록할 수 있다.
- 매장 운영 시간은 관리자가 선택해서 등록한다.
- 휴게시간과 작업시간을 등록하여 사용자의 편의성을 더 높일 수 있다.

  ## 예약 관리
  - 관리자는 사용자의 예약 현황을 관리할 수 있다.
  - 각 날짜를 통해 예약 현황을 확인할 수 있다.
  - 관리자는 예약 현항을 확인하고 예약을 취소할 수 있다.




  # [API 명세]
| Domain      | URL                                                                        | Http Method                 | description       | 접근 권한 |
|:------------|:---------------------------------------------------------------------------|:----------------------------|:------------------|:------|
| **Auth**    | /api/sign-up                                                                    | `POST`                      | 사용자 회원가입          | -     |
|             | /api/sign-in                                                                    | `POST`                      | 사용자/관리자 로그인       | -     |
|             | /api/users/{userId}                                                        | `GET`                       | 사용자 마이페이지 조회    |  USER  |  
|             | /api/verify                                                                | `GET`                       | 이메일 인증            |  -     |
|             | /api/stores                                                                | `POST`                      | 가게 등록              |  ADMIN  |
| **Store**   | /api/stores                                                                | `GET`                       | 모든 가게 조회          | -      |
|             | /ap/stores/{id}                                                            | `GET`                       | 가게 정보 조회          |  USER  |
|             | /api/stoers/{id}/time-slots                                                | `GET`                       | 가게 시간 정보 조회      |  USER  |
| **Review**  | /api/reviews                                                               | `GET`                       | 모든 리뷰 조회          |  -  |
|             | /api/stores/{storeId}/reviews                                              | `POST`                      | 리뷰 작성              |  USER  |
|             | /api/reviews/{storeId}/{reviewId}                                          | `PATCH`                     | 리뷰 수정              |  USER  |
|             | /api/reviews/{storeId}/{reviewId}                                          | `DELETE`                    | 리뷰 삭제              |  USER  |
| **Reservation** | /api/reservations                                                      | `POST`                      | 예약 생상              |  USER  |
|                 | /api/reservations/{reservationId}                                      | `DELETE`                    | 예약 취소              |  USER & ADMIN  |
|                 | /api/stores/{storeId}/reservations                                     | `GET`                       | 예약 조회              |  ADMIN  |


# 형상 관리
<table align="center">
  <tr>
    <th>
      [Notion]
      <br/>
      기능요구 정의서, 프로젝트 회의, 우리의 마인드
      <br/>
      프로젝트 진행에 필요한 전반적인 사항 기록
    </th>
    <th>
      [Task board]
      <br/>
      개발을 진행하며 Sprint 단위로
      <br/>
      담당자, 진행 상황, 에러 사항 기록
    </th>
  </tr>
  <tr>
    <td align="left" width="350px" class="Notion">
      <img src="https://github.com/user-attachments/assets/41ae3253-c754-4676-94a5-918669a8ca30">
      <img src="https://github.com/user-attachments/assets/7c3b9478-8284-41ab-be17-08c99a38b313">
      <img src="https://github.com/user-attachments/assets/1f34f21e-1feb-4206-a143-ba50f780e154">
    </td>
    <td align="left" width="350px" class"Taskboard">
      <img src="https://github.com/user-attachments/assets/e2679160-8fad-4636-944c-a21666e4ab8e">
  </tr>
</table>



# 팀 문화
1. 매일 진행하는 Daliy Meeting
    - 자신의 진행상황에 대해서 이야기합니다.
    - 논의 사항이 있다면 Notion에 질문 항목에 기록하거나 Slack으로 연락합니다.
    - 미팅을 할 때 상호 존중을 위하여 OO님을 사용합니다.
2. Sprint Meeting
    - 한 주 동안 자신의 계획을 얼마나 이행했는지 이야기합니다.
    - 다음 한 주 동안은 어떠한 작업을 할지 이야기합니다.
3. 개발 시간
    - 매일 오후 1 ~ 7시 필수, 주말 하루는 자유입니다.
    - 매일 오프라인으로 만나서 개발을 진행합니다.
4. Pull Request
    - Full stack의 팀원의 Approve를 받아야 PR을 Merge 합니다.
