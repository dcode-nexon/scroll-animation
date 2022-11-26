const sections = document.querySelectorAll('section');
const ul = document.querySelector('ul');
const lis = ul.querySelectorAll('li');
const lis_arr = Array.from(lis);
let posArr = null;

//load event
setPos();

//resize event
window.addEventListener('resize', modifyPos);

//click event
lis.forEach((li, idx) => {
	li.addEventListener('click', () => moveScroll(idx));
});

//scroll event
window.addEventListener('scroll', activation);

//각 섹션의 세로 위치값을 배열에 저장하는 함수
function setPos() {
	posArr = [];
	for (const section of sections) posArr.push(section.offsetTop);
}

//브라우저 리사이즈시 스크롤 위치값 보정하는 함수
function modifyPos() {
	setPos();
	const active = ul.querySelector('li.on');
	const active_index = lis_arr.indexOf(active);
	window.scroll(0, posArr[active_index]);
}

//세로 스크롤 이동 모션 함수
function moveScroll(index) {
	new Anime(window, {
		prop: 'scroll',
		value: posArr[index],
		duration: 1000,
	});
}

//스크롤시 버튼 활성화 함수
function activation() {
	const scroll = window.scrollY || window.pageYOffset;

	sections.forEach((_, idx) => {
		if (scroll >= posArr[idx]) {
			for (const el of lis) el.classList.remove('on');
			for (const section of sections) section.classList.remove('on');
			lis[idx].classList.add('on');
			sections[idx].classList.add('on');
		}
	});
}
