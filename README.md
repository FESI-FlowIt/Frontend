![로고](https://d2eip3q853u04k.cloudfront.net/assets/images/flowIt-logo.svg)  
# FlowIt  
📅 2025.07.07 ~ 진행중(마지막 배포 - 2025.08.13)  

## 📣 Overview

## 📖 배경 (Introduction)  

**기존 체크리스트 서비스의 한계점**

- 단순히 할 일을 체크하는 것만으로는 지속적인 동기부여 부족
- 목표와 일정 관리가 분리되어 있어 체계적인 생산성 관리 어려움
- 데이터 누적 및 인사이트 제공 부재로 개선점 파악 한계
- 할 일 관련 자료나 메모를 체계적으로 관리할 수 있는 기능 부족

## 💡 FlowIt의 해결책(소개)

![dashboard.svg](https://d2eip3q853u04k.cloudfront.net/assets/images/landing_dashboard.svg)  

**목표 중심의 통합 생산성 관리**

- **목표-할일-시간 연결**: 큰 목표를 세분화하여 실행 가능한 할 일로 분해
- **실시간 시간 추적**: 타이머 기능으로 집중도 측정 및 시간 관리 최적화
- **데이터 기반 인사이트**: 히트맵과 통계로 생산성 패턴 분석 및 개선점 제시
- **일정 관리 통합**: 드래그 앤 드롭으로 직관적인 스케줄링
- **통합된 컨텐츠 관리:** 각 할 일에 파일, 링크, 노트를 첨부하여 모든 정보를 한 곳에서 관리

---

## 🔗 관련 링크

🌐 **[FlowIt 홈페이지 바로가기](http://3.35.108.14/)**  
📄 **[API 명세서 바로가기](http://13.209.138.171:8080/api-doc)**  
📂 **[Back-End Repository](https://github.com/FESI-FlowIt/Backend)**  

---

## 🔎 목차

1. [팀원 구성](#-팀원-구성)  
2. [기술 스택](#-기술-스택)  
3. [R&R](#rr)  
4. [아키텍처](#-아키텍처)  
5. [프로젝트 환경 변수 설정](#-프로젝트-환경-변수-설정)  

---

## 👨‍👨‍👧 팀원 구성

<div align="center">
<table>
  <tr>
    <td align="center" width="200">
      <a href="https://github.com/00kang">
        <img
          src="https://avatars.githubusercontent.com/u/176696485?v=4"
          alt="강다빈"
          width="100"
        />
        <br />
        <b>강다빈</b>
      </a>
      <br />
      Frontend
    </td>
    <td align="center" width="200">
      <a href="https://github.com/epass1123">
        <img
          src="https://avatars.githubusercontent.com/u/81586230?v=4"
          alt="김기정"
          width="100"
        />
        <br />
        <b>김기정</b>
      </a>
      <br />
      Frontend
    </td>
    <td align="center" width="200">
      <a href="https://github.com/LDY981212">
        <img
          src="https://avatars.githubusercontent.com/u/134135615?v=4"
          alt="이도엽"
          width="100"
        />
        <br />
        <b>이도엽</b>
      </a>
      <br />
      Frontend
    </td>
    <td align="center" width="200">
      <a href="https://github.com/seohyun062">
        <img
          src="https://avatars.githubusercontent.com/u/134135615?v=4"
          alt="임서현"
          width="100"
        />
        <br />
        <b>임서현</b>
      </a>
      <br />
      Frontend
    </td>
  </tr>
</table>
</div>

---

## 📚 기술 스택

<div align="center">

**FrontEnd**  
![Node.js](https://img.shields.io/badge/Node.js-68A063?style=flat&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/React-087EA4?style=flat&logo=react&logoColor=white) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) ![App Router](https://img.shields.io/badge/App%20Router-5A67D8?style=flat&logo=architect&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0F172A?style=flat&logo=TailwindCSS&logoColor=06B6D4) ![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=postcss&logoColor=white) ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat&logo=Storybook&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white) ![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=flat&logo=reactquery&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-5E412F?style=flat&logo=zustand&logoColor=white) ![Datepicker](https://img.shields.io/badge/Datepicker-4CAF50?style=flat&logo=architect&logoColor=white)  

**Infrastructure**  
![AWS EC2](https://img.shields.io/badge/AWS%20EC2-FF9900?style=flat&logo=amazonaws&logoColor=white) ![AWS CloudFront](https://img.shields.io/badge/AWS%20CloudFront-232F3E?style=flat&logo=amazonaws&logoColor=FF9900) ![AWS S3](https://img.shields.io/badge/AWS%20S3-569A31?style=flat&logo=amazonaws&logoColor=FF9900) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white) ![ZEP](https://img.shields.io/badge/ZEP-6C63FF?style=flat&logoColor=white) ![Chromatic](https://img.shields.io/badge/Chromatic-FFCC00?style=flat&logo=storybook&logoColor=black)  

**Tools**  
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat&logo=notion&logoColor=white)  

**Etc**  
![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=black) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=Prettier&logoColor=black) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=ESLint&logoColor=white)  

</div>

---

## <h2 id="rr">🙋‍♂️ R&R</h2>

**강다빈**

- 팀 리딩 담당
- 대시보드 시각화 담당
  - 대시보드 전체 레이아웃 설계 및 배치
  - 주/월 단위 히트맵 분석 그래프 구현
  - 마감일 캘린더 구현 (목표 뱃지 렌더링)

**김기정**

- 콘텐츠 및 상세 페이지 담당
  - 목표, 할일, 노트 리스트, 상세보기 구현
  - 노트 시스템 구현
  - 목표, 할 일 생성 모달 구현

**이도엽**

- 기반 설계 및 사용자 인증, CI/CD, 배포 담당
  - 네비게이션 사이드바 구현
  - 인증 로직 관리
  - 인프라 설정

**임서현**

- 대시보드 인터랙션 기능 담당
  - 타이머 플로팅 위젯 모달 구현
  - 일정표 관리 모달 전체 기능 구현
  - 목표별 할일 카드 구현

---

## 🏗️ 아키텍처
📦 src  
┣ 📂 app                   # Next.js App Router  
┃ ┣ 📂 (main)                # 메인 애플리케이션 그룹  
┃ ┃ ┣ 📂 dashboard           # 대시보드 페이지  
┃ ┃ ┣ 📂 goal                # 목표 관련 페이지  
┃ ┃ ┗ 📂 todo                # 할 일 관련 페이지  
┃ ┣ 📂 auth                  # 인증 페이지 (login, signup)  
┃ ┣ 📂 oauth                 # OAuth 콜백 처리  
┃ ┣ 📂 api                   # API 라우트 핸들러  
┃ ┗ 📂 providers             # Context Provider 설정  
┣ 📂 components            # UI 컴포넌트 (기능별 분리)  
┃ ┣ 📂 auth                  # 사용자 인증 (이도엽)  
┃ ┣ 📂 goals                 # 목표 관리 (김기정)  
┃ ┣ 📂 heatmaps              # 히트맵 시각화 (강다빈)  
┃ ┣ 📂 calendar              # 캘린더 시스템 (강다빈)  
┃ ┣ 📂 timer                 # 타이머 위젯 (임서현)  
┃ ┣ 📂 schedule              # 일정 관리 (임서현)  
┃ ┣ 📂 todos                 # 할 일 관리 (김기정)  
┃ ┣ 📂 notes                 # 노트 시스템 (김기정)  
┃ ┣ 📂 sidebar               # 네비게이션 (이도엽)  
┃ ┗ 📂 ui                    # 공통 UI 컴포넌트  
┣ 📂 hooks                 # Custom Hooks (비즈니스 로직 분리)  
┣ 📂 store                 # Zustand 전역 상태 관리  
┣ 📂 api                   # API 통신 레이어  
┃ ┣ 📂 mapper                # 데이터 변환 레이어  
┣ 📂 interfaces            # TypeScript 타입 정의  
┣ 📂 lib                   # 유틸리티 함수  
┣ 📂 constants             # 상수 정의  
┣ 📂 mocks                 # MSW 개발 환경  
┃ ┣ 📂 handlers              # API 핸들러  
┃ ┗ 📂 mockResponses         # 목 응답 데이터  
┣ 📂 stories               # Storybook 컴포넌트 문서화  
┣ 📂 tests                 # 테스트 파일  
┗ 📂 assets                # 정적 리소스 (아이콘, 이미지)  

---

## 🔑 프로젝트 환경 변수 설정

프로젝트의 루트 디렉토리에 **`.env`** 파일을 생성합니다.  
이 파일에 아래와 같은 환경 변수 항목을 추가해주세요.  
(실제 값은 여러분의 환경에 맞게 입력해야 합니다.)  

```env
NEXT_PUBLIC_BASE_URL=<your-backend-api-url>
NEXT_PUBLIC_KAKAO_API_KEY=<your-kakao-api-key>
NEXT_PUBLIC_KAKAO_MAP_KEY=<your-kakao-map-api-key>
NEXT_PUBLIC_KAKAO_REST_KEY=<your-kakao-rest-api-key>

// Chromatic
CHROMATIC_PROJECT_TOKEN=<your-chromatic-token>

// Aws ec2 
NEXT_PUBLIC_BASE_URL=<your-backend-api-url>

// S3 & CloudFront
CLOUDFRONT_IMAGE_URL=<your-cloudfront-url>
NEXT_PUBLIC_CLOUDFRONT_IMAGE_URL=<your-cloudfront-url>

// Redis
UPSTASH_REDIS_REST_URL=<your-redis-url>
UPSTASH_REDIS_REST_TOKEN=<your-redis-token>

//kakao
NEXT_PUBLIC_KAKAO_REST_API_KEY=<your-kakao-key>
NEXT_PUBLIC_KAKAO_REDIRECT_URI=<your-kakao-redirect-url>
