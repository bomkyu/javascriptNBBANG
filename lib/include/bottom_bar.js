let btBar = document.querySelector('.bt_bar');

// 현재 페이지 경로 가져오기
const currentPagePath = window.location.pathname;

// 링크에 active 클래스 추가하는 함수
function addActiveClass(linkElement) {
  linkElement.classList.add('active');
}

btBar.innerHTML = `
<ul>
    <li><a href="../../main.html" class="link-home"></a></li>
    <li><a href="../../subpage/write.html" class="link-write"></a></li>
    <li><a href="../../subpage/friend.html" class="link-friend"></a></li>
</ul>
`;

// 각 링크 요소 선택
const linkHome = document.querySelector('.link-home');
const linkWrite = document.querySelector('.link-write');
const linkFriend = document.querySelector('.link-friend');

// 특정 페이지 경로와 비교하여 active 클래스 추가
if (currentPagePath === '/main.html') {
  addActiveClass(linkHome);
} else if (currentPagePath === '/subpage/write.html') {
  addActiveClass(linkWrite);
} else if (currentPagePath === '/subpage/friend.html') {
  addActiveClass(linkFriend);
}