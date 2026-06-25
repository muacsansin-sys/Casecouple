# Love Base

모바일 브라우저용 커플 게임 + 커플 매니저 MVP입니다.

## 현재 포함

- 모바일 첫 화면
- 한국어 / 태국어 UI 전환
- 사귄 날짜 기준 N일째 / 다음 기념일 D-day
- 오늘의 미니게임 로테이션
- 오늘의 단어 카드
- 기념일 기록 리스트
- Firebase 연결용 설정 파일 구조

## 실행

`index.html`을 브라우저에서 열면 됩니다.

## Firebase 연결

1. Firebase 콘솔에서 웹 앱을 생성합니다.
2. `firebase-config.example.js`를 `firebase-config.js`로 복사합니다.
3. Firebase 콘솔의 설정값을 `firebase-config.js`에 넣습니다.
4. Firestore, Storage, Authentication을 활성화합니다.

## Git 연결

이 환경에서는 `git` 명령이 설치되어 있지 않아 자동 초기화는 못 했습니다.
Git 설치 후 아래 명령을 실행하세요.

```powershell
cd C:\Users\baika\Dropbox\AI-cording\love-base
git init
git add .
git commit -m "Initial Love Base MVP"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## Vercel

배포 주소: https://casecouple.vercel.app/

Vercel에서 GitHub 저장소를 Import하면 됩니다.

- Framework Preset: Other
- Build Command: 비움
- Output Directory: 비움 또는 `.`
- Install Command: 비움

Firebase Authentication의 Authorized domains에 `casecouple.vercel.app`을 추가하세요.
