# 🏠 ZARO

> 자취 생활의 빈틈을 채우고, 일상의 즐거움과 유용한 나눔을 만드는 **자취생 커뮤니티 플랫폼**

ZARO는 1인 가구를 위한 지역 기반 커뮤니티 서비스입니다.  
자취생들이 함께 정보를 나누고, 유용한 글을 작성하며, 동네를 더 잘 알아갈 수 있도록 돕습니다.

---

## 🕒 프로젝트 정보

- **프로젝트명:** ZARO
- **개발 기간:** 2025년 5월 4일 ~ 2025년 6월 19일 (총 6주)
- **참여 인원:** 프론트엔드 2명 / 백엔드 4명
- **주요 타겟:** 자취하는 1인 가구
- **기획 목표:** 정보 공유 + 커뮤니티 + 지역 탐색을 모두 아우르는 자취생 맞춤형 커뮤니티

---

## 🔧 기술 스택

| 분류            | 스택 |
|-----------------|------|
| **Framework**   | Next.js 15 (TypeScript 기반, App Router) |
| **Styling**     | Tailwind CSS |
| **State**       | Zustand |
| **Data Fetching** | React Query |
| **Storage**     | IndexedDB (idb) |
| **Editor**      | Toast UI Editor |
| **API**         | RESTful API, Kakao API 연동 |
| **CI/CD**       | GitHub Actions |
| **Code Quality**| ESLint + Prettier |
| **Deployment**  | Vercel |

---

## ✨ 주요 기능

### 🔐 인증 및 보안
- 이메일 기반 회원가입/로그인
- 카카오 소셜 로그인 (OAuth2)
- accessToken/refreshToken 기반 인증 및 자동 갱신 처리
- HttpOnly 쿠키와 nonce 기반 CSP로 보안 강화 (XSS 대응)

### 📝 커뮤니티
- 게시글 목록, 상세 보기
- 댓글 등록/수정/삭제 (페이지네이션, UX 디테일 반영)
- 게시글/댓글 신고 기능
- 카테고리 및 키워드 기반 검색

### 🧑‍💻 프로필 및 소셜 기능
- 유저 정보, 작성 글/댓글/좋아요 탭
- 팔로우/언팔로우 기능
- 즐겨찾기 그룹 및 항목 관리 (CRUD + 인라인 편집)
- D-Day 기반 자기소개, 프로필 이미지 설정

### 🗺 주변 탐색
- 카카오 지도 기반 장소 검색
- 거리순/이름순 필터 기능
- 리스트-지도 연동 UX
- 반응형 레이아웃

### 💬 공통 기능
- Base 컴포넌트 설계: `BaseButton`, `DateInput` 등
- Custom Hooks: `useLoginForm`, `useCommentList`, `useSse` 등
- 로딩/에러/스켈레톤 UI
- SSE 기반 실시간 알림

---

## 🧑‍🏭 팀 및 담당 역할

### 성민 (FE 리드)
- 프로젝트 구조 및 라우팅 전략 설계
- SSR/CSR 혼합 구성 및 SEO 최적화
- 인증 및 카카오 소셜 로그인 연동
- 커뮤니티 UI 및 댓글/신고 기능 구현
- 검색/프로필/팔로우 UI 개발
- 공통 컴포넌트 및 hook 구조 설계
- XSS 방지와 외부 스크립트 제어를 위해 CSP 헤더 구성

### 상휘 (FE)
- Toast UI 기반 글쓰기 에디터 구현 (이미지 업로드 포함)
- 게시글 상세 페이지 구성 및 메타 정보 출력
- 게시글 공유 기능 적용
- 즐겨찾기 CRUD 및 키보드 UX 최적화
- 지도 기반 장소 탐색 기능 개발

### 나현 (BE / 팀 리드)
- 로그아웃, 회원탈퇴, 약관 페이지 UI/API 연동
- Footer, 배너 등 공통 컴포넌트 구현

### 유림 (BE)
- SSE 기반 알림 시스템 구조 설계 및 전역 상태 연동
- 실시간 알림 UI, 로그인 후 자동 연결 처리
- 인증 이슈 트러블슈팅 (Vercel ↔ EC2)

### 지은 (BE)
- 인기 게시글 UI/API 연동
- 데이터 흐름 최적화 및 동적 반응 처리

### 동훈 (BE)
- 지도 페이지 FE 구현 및 상태 관리 개선
- 필터링 UI 리팩토링 및 디버깅

---

## 🖼 스크린 샷
|로그인|회원가입|
|--|--|
|<img width="1397" alt="image" src="https://github.com/user-attachments/assets/dd5d24be-a74d-454c-9afa-61e105927412" />|<img width="1397" alt="image" src="https://github.com/user-attachments/assets/52142891-06a7-481f-a179-edec5a14b883" />|
|홈|게시글 리스트|
|<img width="1397" alt="image" src="https://github.com/user-attachments/assets/79318e3e-beae-43cb-86df-8d88c5b68472" />|<img width="1397" alt="image" src="https://github.com/user-attachments/assets/a3e2b7b7-bd9e-4adc-b949-a1a4eddc63e8" />|
|게시글 상세|글쓰기|
|<img width="1397" alt="image" src="https://github.com/user-attachments/assets/ef2877c8-338a-4fe1-9131-0c315015bae1" />|<img width="1397" alt="image" src="https://github.com/user-attachments/assets/ee724f6d-cd4c-491c-9833-adeacc717901" />|
|지도|프로필|
|<img width="1397" alt="image" src="https://github.com/user-attachments/assets/61ab351d-85f5-482e-beda-d6e4e195dca0" />|<img width="1397" alt="image" src="https://github.com/user-attachments/assets/1e0667c9-33ad-4a7c-bf2e-da2b727e309c" />|
|프로필 수정|알림(SSE)|
|<img width="1397" alt="image" src="https://github.com/user-attachments/assets/2140b3b1-f91a-4c7e-b5ae-fb7d7da18607" />|<img width="403" alt="image" src="https://github.com/user-attachments/assets/33dd9e2a-97c4-410f-a4ad-fd8a26150420" />|



---

## 🎥 시연 영상

[👉 ZARO 프로젝트 시연 영상 보러가기](https://www.youtube.com/watch?v=j5y-rUP4AF4)
