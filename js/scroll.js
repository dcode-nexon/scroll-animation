const sections = document.querySelectorAll('section');
const lis = document.querySelectorAll('ul li');
let posArr = [];
for (const section of sections) posArr.push(section.offsetTop);

//click event
lis.forEach((li, idx) => {
	li.addEventListener('click', () => moveScroll(idx));
});

//scroll event
window.addEventListener('scroll', activation);

function moveScroll(index) {
	new Anime(window, {
		prop: 'scroll',
		value: posArr[index],
		duration: 1000,
	});
}

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
