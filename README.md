# 🪐 OrbitStore

> **망원경 및 천체 관측 장비 전문 이커머스 플랫폼**  
> Supabase 기반의 인증/데이터 관리, PortOne v2 결제 연동, 그리고 Zustand 중심의 견고한 상태 제어를 제공합니다.

<br />

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-orbitstore--app.vercel.app-2ea44f?style=for-the-badge)](https://orbitstore-app.vercel.app/)

- **배포 URL**: [https://orbitstore-app.vercel.app/](https://orbitstore-app.vercel.app/)
- **테스트 계정**: `user@orbitstore.com` / `qwer1234`

<br />

---

## 📑 목차

1. [프로젝트 소개](#1-프로젝트-소개)
2. [기술 스택 및 도구](#2-기술-스택-및-도구)
3. [주요 기능](#3-주요-기능)
4. [트러블슈팅 및 성능 최적화](#4-트러블슈팅-및-성능-최적화)
5. [폴더 구조](#5-폴더-구조)

<br />

---

## 1. 프로젝트 소개

**OrbitStore**는 우주 관측 장비 특화 쇼핑몰로, 사용자 중심의 구매 경험과 결제/재고 데이터의 높은 무결성을 목표로 제작된 Single Page Application(SPA)입니다.

- **안정적인 상태 관리**: Zustand와 `persist` 미들웨어를 도입하여 영속적 장바구니 데이터 동기화 구현.
- **2중 방어선 구축**: UI 제어 한계를 보완하기 위해 Store 단에서의 재고 상한선 Validation 추가.
- **서버리스 백엔드 연동**: Supabase Auth를 이용한 회원/비회원 권한 제어

<br />

---

## 2. 기술 스택 및 도구

| 구분 | 기술 스택 |
| :--- | :--- |
| **Frontend** | <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=React-Router&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=Tailwind-CSS&logoColor=white"/> |
| **State Management** | <img src="https://img.shields.io/badge/Zustand-2C51C1?style=flat-square&logo=zustand&logoColor=white"/> <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=TanStack&logoColor=white"/> |
| **Backend & Database** | <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=Supabase&logoColor=white"/> |
| **Payment API** | <img src="https://img.shields.io/badge/PortOne_v2-FF6B6B?style=flat-square&logoColor=white"/> |
| **Tooling & IDE** | <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=Visual-Studio-Code&logoColor=white"/> <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white"/> |

<br />

---

## 3. 주요 기능

### 🔐 인증 및 권한 제어 (Auth & Protection)
- **Supabase Auth 기반 회원/비회원 분기**: 로그인 세션 유무에 따라 라우팅 차단(Protected Route) 및 접근 권한 제어.
- **마이페이지 연동**: 유저 ID 기준 과거 결제 내역 조회 및 상태 모니터링.

### 🛒 카탈로그 & 장바구니 (Catalog & Cart)
- **실시간 연산 최적화**: `useMemo`를 통해 수량 변경 시 발생하는 장바구니 총액 계산 불필요 렌더링 최소화.
- **2중 재고 방어 (Stock Validation)**: UI 버튼 비활성화(`disabled`) 조건 외에도 Zustand Store Reducer 단에 `Math.min` 방어 로직을 적용하여 실제 남은 재고(`amount`) 초과 입력을 원천 차단.
- **상태 영속성 유지**: `zustand/middleware`의 `persist` 기능을 활용하여 브라우저 새로고침 시에도 동기화 유지.

### 💳 결제 및 주문 처리 (Checkout & Payment)
- **PortOne v2 결제 연동**: 포트원 SDK를 활용한 신용카드 및 간편결제(EASY_PAY) 수단 지원.
- **주문 내역 연동**: 결제 완료 시 `orders` 테이블에 정보 저장 및 `resetCart`를 통한 상태 동기화 처리.

<br />

---

## 4. 트러블슈팅 및 성능 최적화

### 🚨 1. Zustand Store와 UI 간의 재고(Stock) 무결성 보장
> **문제 상황**
> 장바구니 및 상세 페이지에서 수량 변경 시, UI 버튼 비활성화(`disabled`) 조건만으로는 수량이 실제 재고 수량(`amount`)을 초과하여 상승하는 데이터 불일치 이슈 발생.

- **원인 분석**
  - `useCartStore`의 `updateQuantity` 및 `addItem` Reducer 내부에서 전달받은 `quantity` 상한선 검증 부재.
  - LocalStorage에 저장된 기존 Persist 데이터의 필드명 구조 불일치 및 캐시 오염.
- **해결 방안**
  - Store Reducer 단에 `Math.min(quantity, maxStock)` 방어 로직을 추가하여 UI 제어 실패 시에도 스토어 차원에서 재고 수량을 강제 제한하는 2중 방어선 구축.
  - LocalStorage Persist 데이터 캐시 구조 재정비 및 `addItem` 시 합산 연산 오타 수정.

---

### 🔄 2. API 레이어와 Mutation 간의 역할 분리 (단일 책임 원칙)
> **문제 상황**
> 결제 완료 후 `orders` 저장과 `products` 재고 차감 과정이 Mutation 단에 파편화되어 호출될 경우, 네트워크 에러 시 결제만 완료되고 재고는 깎이지 않는 비즈니스 로직 불일치 위험성 존재.

- **원인 분석**
  - 클라이언트 컴포넌트 및 Hook 단에서 비즈니스 연산을 직접 제어하여 불완전한 상태 업데이트 위험 노출.
- **해결 방안**
  - React Query Mutation(`useCheckoutMutation`)은 UI 로딩, 에러 핸들링, 토스트 알림, 캐시 무효화(`invalidateQueries`)만을 담당하도록 역할 분리.
  - 재고 차감 및 주문 생성 연산은 API 레이어(`createCheckout`) 내부로 직렬화하여 원자적 처리 흐름 구축.

<br />

---

## 5. 폴더 구조

```text
src/
├── api/             # Supabase DB 연동 및 외부 API (checkoutAPI, productAPI)
├── components/      # 재사용 가능한 UI 컴포넌트 (Hero, AddressModal 등)
├── hook/            # Custom Hooks 및 React Query Mutations (useCheckoutMutation)
├── pages/           # 라우팅 페이지 컴포넌트 (Cart, Checkout, OrderSuccess 등)
├── store/           # Zustand 전역 상태 관리 (useCartStore, useCheckoutStore)
└── types/           # TypeScript 타입 정의 파일