const translations = {
  ko: {
    tagline: "Korea to Thailand",
    streakDays: "일 연속",
    daysTogether: "일째",
    heroCopy: "오늘도 둘의 기록이 이어지는 중",
    startToday: "오늘 시작",
    todayRoutine: "오늘의 루틴",
    seeAll: "전체 보기",
    todayGame: "오늘의 게임",
    partnerWaiting: "상대 기다림",
    loveTemp: "커플 온도",
    nextAnniversary: "다음 기념일",
    todayWords: "오늘의 단어",
    practice: "외우기",
    memoryTitle: "기념일 기록",
    add: "추가",
    gamePage: "게임",
    gamePageCopy: "매일 하나씩 열리는 커플 미니게임",
    wordPage: "단어",
    wordPageCopy: "서로의 언어로 마음을 전하는 연습",
    wordMessage: "오늘 배운 말로 한마디",
    saveWords: "단어 완료",
    recordsPage: "기록",
    recordsPageCopy: "사진, 메모, 기념일을 한 곳에",
    coupleSettings: "커플 설정",
    startDate: "사귄 날짜",
    save: "저장",
    usPage: "우리",
    usPageCopy: "둘만의 기본 정보와 연결 상태",
    firebaseCopy: "Google 로그인과 초대 링크로 연결된 두 사람만 이 공간을 볼 수 있어요.",
    designNote: "디자인 노트",
    designCopy: "큰 터치 영역, 짧은 문구, 은은한 빛으로 매일 열고 싶은 느낌을 만들었어요.",
    navToday: "오늘",
    navGame: "게임",
    navWords: "단어",
    navRecords: "기록",
    navUs: "우리",
    done: "완료",
    coming: "예정",
    play: "플레이",
    completedToast: "오늘 기록이 저장됐어요."
  },
  th: {
    tagline: "เกาหลีถึงไทย",
    streakDays: "วันต่อเนื่อง",
    daysTogether: "วันแล้ว",
    heroCopy: "วันนี้เรายังบันทึกเรื่องของเราอยู่",
    startToday: "เริ่มวันนี้",
    todayRoutine: "กิจวัตรวันนี้",
    seeAll: "ดูทั้งหมด",
    todayGame: "เกมวันนี้",
    partnerWaiting: "รอคนรัก",
    loveTemp: "อุณหภูมิรัก",
    nextAnniversary: "วันครบรอบถัดไป",
    todayWords: "คำศัพท์วันนี้",
    practice: "ฝึก",
    memoryTitle: "บันทึกวันครบรอบ",
    add: "เพิ่ม",
    gamePage: "เกม",
    gamePageCopy: "มินิเกมคู่รักที่เปิดวันละหนึ่งเกม",
    wordPage: "คำศัพท์",
    wordPageCopy: "ฝึกส่งความรู้สึกด้วยภาษาของกันและกัน",
    wordMessage: "เขียนหนึ่งประโยคจากคำวันนี้",
    saveWords: "บันทึกคำศัพท์",
    recordsPage: "บันทึก",
    recordsPageCopy: "รูปภาพ โน้ต และวันสำคัญในที่เดียว",
    coupleSettings: "ตั้งค่าคู่รัก",
    startDate: "วันที่เริ่มคบกัน",
    save: "บันทึก",
    usPage: "เรา",
    usPageCopy: "ข้อมูลของเราและสถานะการเชื่อมต่อ",
    firebaseCopy: "เฉพาะสองคนที่เชื่อมด้วย Google และลิงก์เชิญเท่านั้นที่เห็นพื้นที่นี้",
    designNote: "โน้ตดีไซน์",
    designCopy: "พื้นที่แตะใหญ่ ข้อความสั้น และแสงนุ่มๆ เพื่อให้เปิดใช้ทุกวัน",
    navToday: "วันนี้",
    navGame: "เกม",
    navWords: "คำ",
    navRecords: "บันทึก",
    navUs: "เรา",
    done: "เสร็จแล้ว",
    coming: "กำลังมา",
    play: "เล่น",
    completedToast: "บันทึกวันนี้แล้ว"
  }
};

const state = {
  lang: localStorage.getItem("lovebase.lang") || "ko",
  startDate: localStorage.getItem("lovebase.startDate") || "2025-10-21",
  streak: Number(localStorage.getItem("lovebase.streak") || 12),
  loveTemp: Number(localStorage.getItem("lovebase.loveTemp") || 84),
  completedGame: localStorage.getItem("lovebase.completedGame") === todayKey(),
  completedWords: localStorage.getItem("lovebase.completedWords") === todayKey(),
  selectedChoice: null,
  firebaseReady: Boolean(window.LOVEBASE_FIREBASE_CONFIG?.apiKey),
  firebase: null,
  user: null,
  couple: null,
  coupleId: null
};

const miniGames = [
  {
    id: "telepathy",
    title: { ko: "텔레파시 선택", th: "โทรจิตคู่รัก" },
    description: { ko: "같은 질문에 답하고 둘의 싱크를 확인해요.", th: "ตอบคำถามเดียวกันแล้วดูว่าใจตรงกันแค่ไหน" },
    options: { ko: ["영상통화", "사진 보내기", "칭찬", "애교"], th: ["วิดีโอคอล", "ส่งรูป", "ชมกัน", "อ้อน"] }
  },
  {
    id: "letter",
    title: { ko: "비밀 편지", th: "จดหมายลับ" },
    description: { ko: "둘 다 작성해야 오늘의 편지가 열려요.", th: "จดหมายจะเปิดเมื่อทั้งสองคนเขียนเสร็จ" },
    options: { ko: ["보고 싶어", "고마워", "잘했어", "사랑해"], th: ["คิดถึง", "ขอบคุณ", "เก่งมาก", "รักนะ"] }
  },
  {
    id: "mood",
    title: { ko: "마음 온도", th: "อุณหภูมิใจ" },
    description: { ko: "오늘의 기분과 보고 싶은 정도를 남겨요.", th: "บันทึกอารมณ์และความคิดถึงของวันนี้" },
    options: { ko: ["편안해", "피곤해", "설레", "많이 보고 싶어"], th: ["สบายใจ", "เหนื่อย", "ตื่นเต้น", "คิดถึงมาก"] }
  }
];

const wordPacks = [
  {
    theme: { ko: "사랑 표현 4개", th: "คำบอกรัก 4 คำ" },
    words: [
      { ko: ["보고 싶어", "bogo sipeo", "I miss you"], th: ["คิดถึง", "khit thueng", "보고 싶어"] },
      { ko: ["안아줘", "anajwo", "Hug me"], th: ["กอด", "kot", "안아줘"] },
      { ko: ["귀여워", "gwiyeowo", "Cute"], th: ["น่ารัก", "na rak", "귀여워"] },
      { ko: ["사랑해", "saranghae", "I love you"], th: ["รักนะ", "rak na", "사랑해"] }
    ]
  }
];

const memories = [
  { title: { ko: "200일", th: "200 วัน" }, meta: { ko: "영상통화하고 같은 메뉴로 저녁 먹은 날 · 사진 3장", th: "วิดีโอคอลและกินเมนูเดียวกัน · 3 รูป" }, badge: "200" },
  { title: { ko: "첫 여행 계획", th: "แผนเที่ยวครั้งแรก" }, meta: { ko: "방콕에서 가고 싶은 카페와 야시장 저장 · 메모 5개", th: "คาเฟ่และตลาดกลางคืนในกรุงเทพ · 5 โน้ต" }, badge: "BKK" }
];

const anniversaryDays = [100, 200, 300, 365, 500, 700, 1000];

function todayKey() { return new Date().toISOString().slice(0, 10); }
function localText(value) { return value[state.lang] || value.ko; }
function t(key) { return translations[state.lang][key] || translations.ko[key] || key; }
function daysBetween(start, end) {
  const a = new Date(`${start}T00:00:00`);
  const b = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.max(1, Math.floor((b - a) / 86400000) + 1);
}
function addDays(start, days) {
  const date = new Date(`${start}T00:00:00`);
  date.setDate(date.getDate() + days - 1);
  return date;
}
function formatDate(date) { return date.toISOString().slice(0, 10); }
function getTodayGame() { return miniGames[daysBetween(state.startDate, new Date()) % miniGames.length]; }
function getTodayWordPack() { return wordPacks[daysBetween(state.startDate, new Date()) % wordPacks.length]; }
function getNextAnniversary() {
  const day = daysBetween(state.startDate, new Date());
  const next = anniversaryDays.find((target) => target >= day) || Math.ceil(day / 100) * 100;
  return { day: next, dday: Math.max(0, next - day), date: addDays(state.startDate, next) };
}
function inviteFromUrl() { return new URLSearchParams(location.search).get("invite"); }
function inviteUrl(coupleId) { return `${location.origin}${location.pathname}?invite=${coupleId}`; }
function memberProfile(user) {
  return { displayName: user.displayName || "", email: user.email || "", photoURL: user.photoURL || "" };
}
function setGate(authVisible, coupleVisible) {
  document.getElementById("authGate").classList.toggle("active", authVisible);
  document.getElementById("coupleGate").classList.toggle("active", coupleVisible);
}

function showAuthMessage(message) {
  document.getElementById("authNote").textContent = message;
}

function renderI18n() {
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll(".language-toggle button").forEach((button) => button.classList.toggle("active", button.dataset.lang === state.lang));
}

function renderDashboard() {
  const day = daysBetween(state.startDate, new Date());
  const next = getNextAnniversary();
  const game = getTodayGame();
  const pack = getTodayWordPack();
  document.getElementById("dayCount").textContent = day;
  document.getElementById("streakCount").textContent = state.streak;
  document.getElementById("loveTemp").textContent = state.loveTemp;
  document.getElementById("nextAnniversaryBadge").textContent = `${next.day}${state.lang === "ko" ? "일까지" : " วัน"} D-${next.dday}`;
  document.getElementById("nextAnniversaryTitle").textContent = state.lang === "ko" ? `${next.day}일` : `${next.day} วัน`;
  document.getElementById("nextAnniversaryDate").textContent = `${formatDate(next.date)} · D-${next.dday}`;
  document.getElementById("todayGameTitle").textContent = localText(game.title);
  document.getElementById("todayGameDescription").textContent = localText(game.description);
  document.getElementById("wordPackTheme").textContent = localText(pack.theme);
  document.getElementById("wordPracticeTheme").textContent = localText(pack.theme);
  document.getElementById("myGameStatus").textContent = state.completedGame ? t("done") : t("play");
  document.getElementById("myGameStatus").classList.toggle("done", state.completedGame);
  renderWords("todayWordPreview", pack.words.slice(0, 3));
  renderWords("wordPracticeList", pack.words);
  renderMemories();
  renderGame();
  renderGameList();
  renderAnniversaries();
}

function renderWords(targetId, words) {
  const learningLanguage = state.lang === "ko" ? "th" : "ko";
  document.getElementById(targetId).innerHTML = words.map((word) => {
    const [text, romanization, meaning] = word[learningLanguage];
    return `<div class="word-item"><div><div class="word-main">${text}</div><div class="word-sub">${romanization} · ${meaning}</div></div><div class="word-check">✓</div></div>`;
  }).join("");
}
function renderMemories() {
  document.getElementById("memoryPreview").innerHTML = memories.map((memory) => `<article class="card memory-card"><div class="memory-photo">${memory.badge}</div><div><div class="memory-title">${localText(memory.title)}</div><div class="memory-meta">${localText(memory.meta)}</div></div></article>`).join("");
}
function renderGame() {
  const game = getTodayGame();
  const card = document.getElementById("gamePlayCard");
  card.innerHTML = `<span class="eyebrow">${t("todayGame")}</span><h3>${localText(game.title)}</h3><p>${localText(game.description)}</p><div class="choice-grid">${game.options[state.lang].map((option) => `<button class="choice-button ${state.selectedChoice === option ? "selected" : ""}" type="button" data-choice="${option}">${option}</button>`).join("")}</div><button class="primary-button full" id="saveGameButton" type="button" style="margin-top:12px">${t("done")}</button>`;
  card.querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => { state.selectedChoice = button.dataset.choice; renderGame(); }));
  document.getElementById("saveGameButton").addEventListener("click", saveGameResult);
}
function renderGameList() {
  document.getElementById("miniGameList").innerHTML = miniGames.map((game, index) => `<article class="card mini-game-item"><div class="item-left"><strong>${localText(game.title)}</strong><span>${localText(game.description)}</span></div><span class="tiny-badge">${index + 1}</span></article>`).join("");
}
function renderAnniversaries() {
  const currentDay = daysBetween(state.startDate, new Date());
  document.getElementById("anniversaryList").innerHTML = anniversaryDays.map((day) => {
    const date = addDays(state.startDate, day);
    const done = currentDay >= day;
    return `<article class="card anniversary-item"><div class="item-left"><strong>${state.lang === "ko" ? `${day}일` : `${day} วัน`}</strong><span>${formatDate(date)} · ${done ? t("done") : `D-${day - currentDay}`}</span></div><span class="tiny-badge">${done ? "✓" : t("coming")}</span></article>`;
  }).join("");
}
function renderCoupleGate() {
  const input = document.getElementById("inviteLinkInput");
  document.getElementById("inviteStartDateInput").value = state.startDate;
  input.value = state.coupleId ? inviteUrl(state.coupleId) : "";
  document.getElementById("createInviteText").textContent = state.coupleId ? "초대 링크 다시 만들기" : "초대 링크 만들기";
  document.getElementById("coupleGateCopy").textContent = state.coupleId ? "이 링크를 상대에게 보내면 Google 로그인 후 둘만의 공간이 연결돼요." : "초대 링크를 보내고 상대가 수락하면 둘만의 기록이 열려요.";
}

async function initFirebase() {
  if (!state.firebaseReady) {
    setGate(true, false);
    return;
  }
  try {
    const [{ initializeApp }, authModule, storeModule] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js")
    ]);
    const app = initializeApp(window.LOVEBASE_FIREBASE_CONFIG);
    const auth = authModule.getAuth(app);
    const db = storeModule.getFirestore(app);
    state.firebase = { auth, ...authModule, db, ...storeModule };
    state.firebase.onAuthStateChanged(auth, handleAuthState);
    showAuthMessage("Firebase 연결 완료. Google 로그인을 눌러주세요.");
    const redirectResult = await state.firebase.getRedirectResult(auth);
    if (redirectResult?.user) {
      await handleAuthState(redirectResult.user);
      return;
    }
    if (auth.currentUser) {
      await handleAuthState(auth.currentUser);
    }
  } catch (error) {
    state.firebaseReady = false;
    console.warn("Firebase local fallback:", error);
    showAuthMessage(`Firebase 초기화 오류: ${error.code || error.message}`);
    setGate(true, false);
  }
}

async function signInWithGoogle() {
  if (!state.firebase?.auth) {
    showAuthMessage("Firebase가 아직 준비되지 않았어요. 잠시 후 다시 눌러주세요.");
    return;
  }
  const provider = new state.firebase.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  showAuthMessage("Google 로그인 페이지로 이동 중이에요...");
  try {
    await state.firebase.signInWithRedirect(state.firebase.auth, provider);
  } catch (error) {
    console.error(error);
    showAuthMessage(`로그인 오류: ${error.code || error.message}`);
    setGate(true, false);
  }
}

async function handleAuthState(user) {
  state.user = user;
  if (!user) {
    setGate(true, false);
    return;
  }
  document.getElementById("profileButton").textContent = (user.displayName || user.email || "LB").slice(0, 2).toUpperCase();
  setGate(false, false);
  try {
    await loadCoupleForUser();
  } catch (error) {
    console.error(error);
    renderCoupleGate();
    setGate(false, true);
    document.getElementById("coupleGateNote").textContent = `로그인은 됐지만 커플 정보를 불러오지 못했어요: ${error.code || error.message}`;
  }
}

async function loadCoupleForUser() {
  const inviteId = inviteFromUrl();
  if (inviteId) {
    await acceptInvite(inviteId);
    history.replaceState({}, "", location.pathname);
    return;
  }
  const { db, doc, getDoc } = state.firebase;
  const userSnap = await getDoc(doc(db, "users", state.user.uid));
  const coupleId = userSnap.exists() ? userSnap.data().coupleId : null;
  if (!coupleId) {
    state.coupleId = null;
    renderCoupleGate();
    setGate(false, true);
    return;
  }
  await loadCouple(coupleId);
}

async function loadCouple(coupleId) {
  const { db, doc, getDoc } = state.firebase;
  const coupleSnap = await getDoc(doc(db, "couples", coupleId));
  if (!coupleSnap.exists() || !coupleSnap.data().memberIds?.includes(state.user.uid)) {
    state.coupleId = null;
    renderCoupleGate();
    setGate(false, true);
    return;
  }
  state.coupleId = coupleId;
  state.couple = coupleSnap.data();
  state.startDate = state.couple.startDate || state.startDate;
  localStorage.setItem("lovebase.startDate", state.startDate);
  document.getElementById("startDateInput").value = state.startDate;
  if ((state.couple.memberIds || []).length < 2) {
    renderCoupleGate();
    setGate(false, true);
    return;
  }
  setGate(false, false);
  renderDashboard();
}

async function createInvite() {
  const { db, collection, addDoc, doc, setDoc, serverTimestamp } = state.firebase;
  const inviteStartDate = document.getElementById("inviteStartDateInput").value || state.startDate;
  state.startDate = inviteStartDate;
  localStorage.setItem("lovebase.startDate", inviteStartDate);
  const coupleRef = await addDoc(collection(db, "couples"), {
    ownerUid: state.user.uid,
    memberIds: [state.user.uid],
    members: { [state.user.uid]: { ...memberProfile(state.user), role: "owner" } },
    startDate: inviteStartDate,
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  await setDoc(doc(db, "users", state.user.uid), { coupleId: coupleRef.id, ...memberProfile(state.user), updatedAt: serverTimestamp() }, { merge: true });
  await loadCouple(coupleRef.id);
}

async function acceptInvite(coupleId) {
  const { db, doc, getDoc, updateDoc, setDoc, arrayUnion, serverTimestamp } = state.firebase;
  const coupleRef = doc(db, "couples", coupleId);
  const coupleSnap = await getDoc(coupleRef);
  if (!coupleSnap.exists()) {
    alert("초대 링크를 찾을 수 없어요.");
    return;
  }
  const couple = coupleSnap.data();
  if (!couple.memberIds.includes(state.user.uid) && couple.memberIds.length >= 2) {
    alert("이미 연결된 커플 공간이에요.");
    return;
  }
  await updateDoc(coupleRef, {
    memberIds: arrayUnion(state.user.uid),
    [`members.${state.user.uid}`]: { ...memberProfile(state.user), role: "partner" },
    status: "connected",
    updatedAt: serverTimestamp()
  });
  await setDoc(doc(db, "users", state.user.uid), { coupleId, ...memberProfile(state.user), updatedAt: serverTimestamp() }, { merge: true });
  await loadCouple(coupleId);
}

async function saveGameResult() {
  state.completedGame = true;
  state.loveTemp = Math.min(100, state.loveTemp + 1);
  localStorage.setItem("lovebase.completedGame", todayKey());
  localStorage.setItem("lovebase.loveTemp", state.loveTemp);
  await saveDailyPlay({ type: "game", gameId: getTodayGame().id, choice: state.selectedChoice });
  renderDashboard();
  alert(t("completedToast"));
}

async function saveDailyPlay(payload) {
  if (!state.firebaseReady || !state.firebase || !state.user || !state.coupleId) return;
  const { db, doc, setDoc, serverTimestamp } = state.firebase;
  await setDoc(doc(db, "couples", state.coupleId, "dailyLogs", todayKey(), "plays", state.user.uid), {
    ...payload,
    userId: state.user.uid,
    lang: state.lang,
    loveTemp: state.loveTemp,
    completedAt: serverTimestamp()
  }, { merge: true });
  await setDoc(doc(db, "couples", state.coupleId, "dailyLogs", todayKey()), {
    date: todayKey(),
    gameId: getTodayGame().id,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

async function leaveCouple() {
  if (!state.coupleId || !confirm("커플 연결을 해제할까요? 연결 해제 후 이 공간의 기록은 더 이상 볼 수 없어요.")) return;
  const { db, doc, updateDoc, setDoc, serverTimestamp } = state.firebase;
  await updateDoc(doc(db, "couples", state.coupleId), {
    status: "ended",
    endedBy: state.user.uid,
    memberIds: [],
    endedAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  await setDoc(doc(db, "users", state.user.uid), { coupleId: null, updatedAt: serverTimestamp() }, { merge: true });
  state.coupleId = null;
  state.couple = null;
  renderCoupleGate();
  setGate(false, true);
}

function switchTab(tab) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === `view-${tab}`));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.tab === tab));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function boot() {
  document.getElementById("startDateInput").value = state.startDate;
  document.getElementById("inviteStartDateInput").value = state.startDate;
  document.querySelectorAll(".language-toggle button").forEach((button) => button.addEventListener("click", () => {
    state.lang = button.dataset.lang;
    localStorage.setItem("lovebase.lang", state.lang);
    renderI18n();
    renderDashboard();
  }));
  document.querySelectorAll("[data-tab], [data-tab-target]").forEach((button) => button.addEventListener("click", () => switchTab(button.dataset.tab || button.dataset.tabTarget)));
  document.getElementById("startTodayButton").addEventListener("click", () => switchTab("game"));
  document.getElementById("googleLoginButton").addEventListener("click", signInWithGoogle);
  document.getElementById("createInviteButton").addEventListener("click", createInvite);
  document.getElementById("signOutButton").addEventListener("click", () => state.firebase.signOut(state.firebase.auth));
  document.getElementById("leaveCoupleButton").addEventListener("click", leaveCouple);
  document.getElementById("copyInviteButton").addEventListener("click", async () => {
    await navigator.clipboard.writeText(document.getElementById("inviteLinkInput").value);
    alert("초대 링크를 복사했어요.");
  });
  document.getElementById("saveWordsButton").addEventListener("click", async () => {
    state.completedWords = true;
    state.loveTemp = Math.min(100, state.loveTemp + 1);
    localStorage.setItem("lovebase.completedWords", todayKey());
    localStorage.setItem("lovebase.loveTemp", state.loveTemp);
    await saveDailyPlay({ type: "words", message: document.getElementById("wordMessageInput").value });
    alert(t("completedToast"));
    renderDashboard();
  });
  document.getElementById("saveStartDateButton").addEventListener("click", async () => {
    const value = document.getElementById("startDateInput").value;
    if (!value) return;
    state.startDate = value;
    localStorage.setItem("lovebase.startDate", value);
    if (state.coupleId && state.firebase) {
      const { db, doc, setDoc, serverTimestamp } = state.firebase;
      await setDoc(doc(db, "couples", state.coupleId), { startDate: value, updatedAt: serverTimestamp() }, { merge: true });
    }
    renderDashboard();
  });
  renderI18n();
  renderDashboard();
  await initFirebase();
}

boot();
