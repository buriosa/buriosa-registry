import type { Repository, Commit } from "@/types";
import { generateId, getISODate } from "./utils";

// Helper to create dates relative to today
function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export function generateDemoData(): { repos: Repository[]; commits: Commit[] } {
  const now = getISODate();

  // Repos
  const repos: Repository[] = [
    { id: generateId(), name: "Career / Projects", tag: "resume · impact", createdAt: now, updatedAt: now },
    { id: generateId(), name: "Baby / Growth", tag: "milestones", createdAt: now, updatedAt: now },
    { id: generateId(), name: "Investing / Journal", tag: "복기 · 원칙", createdAt: now, updatedAt: now },
    { id: generateId(), name: "Fitness / Cut", tag: "diet · workout", createdAt: now, updatedAt: now },
    { id: generateId(), name: "Music / Lyrics", tag: "창작 · 작업물", createdAt: now, updatedAt: now },
    { id: generateId(), name: "Ideas / Inbox", tag: "brain dump", createdAt: now, updatedAt: now },
  ];

  const commits: Commit[] = [];

  // Career commits
  commits.push(
    { id: generateId(), repoId: repos[0].id, repoName: repos[0].name, title: "Client meeting — scope finalized", body: "- Narrowed to 3 deliverables\n- Stakeholders aligned", tags: ["meeting", "scope"], dateTime: daysAgo(2), isHighlighted: true, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[0].id, repoName: repos[0].name, title: "Resume v3 draft completed", body: "Added recent project impact metrics", tags: ["resume"], dateTime: daysAgo(5), isHighlighted: false, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[0].id, repoName: repos[0].name, title: "Portfolio site deployed", body: "Vercel deployment successful", tags: ["milestone", "deploy"], dateTime: daysAgo(8), isHighlighted: true, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[0].id, repoName: repos[0].name, title: "LinkedIn profile optimized", body: "", tags: ["profile"], dateTime: daysAgo(12), isHighlighted: false, createdAt: now, updatedAt: now },
  );

  // Baby commits
  commits.push(
    { id: generateId(), repoId: repos[1].id, repoName: repos[1].name, title: "첫 뒤집기 성공! 🎉", body: "드디어 뒤집었다! 4개월 2주차", tags: ["milestone", "성장"], dateTime: daysAgo(1), isHighlighted: true, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[1].id, repoName: repos[1].name, title: "이유식 첫 시도 (쌀미음)", body: "반응 좋음, 10ml 완료", tags: ["이유식"], dateTime: daysAgo(4), isHighlighted: false, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[1].id, repoName: repos[1].name, title: "4개월 검진 완료", body: "키 65cm, 몸무게 7.2kg", tags: ["검진", "기록"], dateTime: daysAgo(10), isHighlighted: false, createdAt: now, updatedAt: now },
  );

  // Investing commits
  commits.push(
    { id: generateId(), repoId: repos[2].id, repoName: repos[2].name, title: "NVDA 손절 — 원칙 복기", body: "-15% 도달, 손절 원칙 적용\n교훈: 진입 타이밍 재검토 필요", tags: ["복기", "원칙"], dateTime: daysAgo(3), isHighlighted: true, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[2].id, repoName: repos[2].name, title: "포트폴리오 리밸런싱", body: "채권 비중 20% → 30%", tags: ["리밸런싱"], dateTime: daysAgo(7), isHighlighted: false, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[2].id, repoName: repos[2].name, title: "배당주 스크리닝 완료", body: "후보 5개 선정: KO, JNJ, PG, VZ, T", tags: ["리서치"], dateTime: daysAgo(14), isHighlighted: false, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[2].id, repoName: repos[2].name, title: "투자 원칙 v2 정리", body: "1. 손절선 -15%\n2. 분할매수 3회\n3. 섹터 분산", tags: ["원칙"], dateTime: daysAgo(20), isHighlighted: true, createdAt: now, updatedAt: now },
  );

  // Fitness commits
  commits.push(
    { id: generateId(), repoId: repos[3].id, repoName: repos[3].name, title: "체중 70kg 돌파! 🔥", body: "시작 78kg → 현재 69.8kg\n8주간 -8.2kg 감량", tags: ["milestone", "체중"], dateTime: daysAgo(0), isHighlighted: true, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[3].id, repoName: repos[3].name, title: "상체 루틴 변경", body: "푸시업 → 벤치프레스 전환", tags: ["workout"], dateTime: daysAgo(6), isHighlighted: false, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[3].id, repoName: repos[3].name, title: "식단 기록 시작", body: "MyFitnessPal 연동 완료", tags: ["diet"], dateTime: daysAgo(15), isHighlighted: false, createdAt: now, updatedAt: now },
  );

  // Music commits
  commits.push(
    { id: generateId(), repoId: repos[4].id, repoName: repos[4].name, title: "새 곡 데모 완성", body: "코드 진행: Am - F - C - G\n가사 1절 완료", tags: ["demo", "작곡"], dateTime: daysAgo(2), isHighlighted: true, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[4].id, repoName: repos[4].name, title: "기타 녹음 테이크 3", body: "어쿠스틱 버전, 조금 더 다듬기 필요", tags: ["녹음"], dateTime: daysAgo(9), isHighlighted: false, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[4].id, repoName: repos[4].name, title: "믹싱 피드백 반영", body: "보컬 볼륨 +2db, 리버브 줄임", tags: ["mixing"], dateTime: daysAgo(16), isHighlighted: false, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[4].id, repoName: repos[4].name, title: "레퍼런스 곡 분석", body: "Coldplay - Yellow 구조 분석", tags: ["리서치"], dateTime: daysAgo(25), isHighlighted: false, createdAt: now, updatedAt: now },
  );

  // Ideas commits
  commits.push(
    { id: generateId(), repoId: repos[5].id, repoName: repos[5].name, title: "앱 아이디어: 습관 자산화", body: "기록 → 커밋 → 릴리즈 개념\nBURIOSA 컨셉 정리", tags: ["idea", "앱"], dateTime: daysAgo(4), isHighlighted: true, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[5].id, repoName: repos[5].name, title: "블로그 주제 리스트", body: "1. 비개발자 GitHub\n2. 기록의 복리\n3. 릴리즈 사고방식", tags: ["블로그"], dateTime: daysAgo(11), isHighlighted: false, createdAt: now, updatedAt: now },
    { id: generateId(), repoId: repos[5].id, repoName: repos[5].name, title: "사이드 프로젝트 후보", body: "- 뉴스레터\n- 유튜브\n- 전자책", tags: ["project"], dateTime: daysAgo(18), isHighlighted: false, createdAt: now, updatedAt: now },
  );

  return { repos, commits };
}
