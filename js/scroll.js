class MyScroll {
	constructor(selector, opt) {
		this.init(selector, opt);
		this.bindingEvent();
	}

	init(selector, opt) {
		this.sections = document.querySelectorAll(selector);
		this.ul = document.querySelector('ul');
		this.lis = this.ul.querySelectorAll('li');
		this.lis_arr = Array.from(this.lis);
		this.speed = opt.speed;
		this.base = -window.innerHeight / 3;
		this.posArr = null;
	}

	bindingEvent() {
		//load event
		this.setPos();

		//resize event
		window.addEventListener('resize', () => this.modifyPos());

		//click event
		this.lis.forEach((li, idx) => {
			li.addEventListener('click', (e) => {
				const scroll = window.scrollY;
				const isOn = e.currentTarget.classList.contains('on');
				if (isOn && scroll === this.posArr[idx]) return;
				this.moveScroll(idx);
			});
		});

		//scroll event
		window.addEventListener('scroll', () => this.activation());

		//mousewheel event
		window.addEventListener('mousewheel', (e) => this.moveWheel(e), { passive: false });
	}

	//각 섹션의 세로 위치값을 배열에 저장하는 함수
	setPos() {
		this.posArr = [];
		for (const section of this.sections) this.posArr.push(section.offsetTop);
	}

	//브라우저 리사이즈시 스크롤 위치값 보정하는 함수
	modifyPos() {
		this.setPos();
		const active = this.ul.querySelector('li.on');
		const active_index = this.lis_arr.indexOf(active);
		window.scroll(0, this.posArr[active_index]);
	}

	//세로 스크롤 이동 모션 함수
	moveScroll(index) {
		new Anime(window, {
			prop: 'scroll',
			value: this.posArr[index],
			duration: this.speed,
		});
	}

	//wheel 이동 모션 함수
	moveWheel(e) {
		e.preventDefault();
		const active = this.ul.querySelector('li.on');
		const active_index = this.lis_arr.indexOf(active);

		if (e.deltaY < 0) {
			if (active_index === 0) return;
			this.moveScroll(active_index - 1);
		} else {
			if (active_index === this.lis.length - 1) return;
			this.moveScroll(active_index + 1);
		}
	}

	//스크롤시 버튼 활성화 함수
	activation() {
		const scroll = window.scrollY || window.pageYOffset;

		this.sections.forEach((_, idx) => {
			if (scroll >= this.posArr[idx] + this.base) {
				for (const el of this.lis) el.classList.remove('on');
				for (const section of this.sections) section.classList.remove('on');
				this.lis[idx].classList.add('on');
				this.sections[idx].classList.add('on');
			}
		});
	}
}
