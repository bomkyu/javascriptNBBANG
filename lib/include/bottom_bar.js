let btBar = document.querySelector('.bt_bar');

// 현재 페이지 경로 가져오기
const currentPagePath = window.location.pathname;

// 링크에 active 클래스 추가하는 함수
function addActiveClass(linkElement) {
  linkElement.classList.add('active');
}

//로컬
/*
btBar.innerHTML = `
<ul>
    <li><a href="/main.html" class="link-home"></a></li>
    <li><a href="/subpage/write.html" class="link-write"></a></li>
    <li><a href="/subpage/friend.html" class="link-friend"></a></li>
</ul>
`;*/

//깃허브
btBar.innerHTML = `
<ul>
    <li><a href="/public/main.html" class="link-home"></a></li>
    <li><a href="/public/subpage/write.html" class="link-write"></a></li>
    <li><a href="/public/subpage/friend.html" class="link-friend"></a></li>
</ul>
`;

// 각 링크 요소 선택
const linkHome = document.querySelector('.link-home');
const linkWrite = document.querySelector('.link-write');
const linkFriend = document.querySelector('.link-friend');

// 특정 페이지 경로와 비교하여 active 클래스 추가
if (currentPagePath === '/main.html' || currentPagePath === '/public/main.html') {
  addActiveClass(linkHome);
} else if (currentPagePath === '/subpage/write.html' || currentPagePath === '/public/write.html') {
  addActiveClass(linkWrite);
} else if (currentPagePath === '/subpage/friend.html' || currentPagePath === '/public/friend.html') {
  addActiveClass(linkFriend);
}