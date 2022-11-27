class MyScroll {
	constructor(selector, opt) {
		const default_opt = { enableBtns: true, enableWheel: false, speed: 500 };
		const result = { ...default_opt, ...opt };
		this.init(selector, result);
		this.enableBtns && this.createBtns();
		this.bindingEvent();
	}

	init(selector, opt) {
		this.sections = document.querySelectorAll(selector);
		this.sections_arr = Array.from(this.sections);
		this.len = this.sections.length;
		this.speed = opt.speed;
		this.base = -window.innerHeight / 3;
		this.enableBtns = opt.enableBtns;
		this.enableWheel = opt.enableWheel;
		this.posArr = null;
	}

	bindingEvent() {
		//load event
		this.setPos();

		//resize event
		window.addEventListener('resize', () => this.modifyPos());

		//click event
		if (this.enableBtns) {
			this.lis.forEach((li, idx) => {
				li.addEventListener('click', (e) => {
					const scroll = window.scrollY;
					const isOn = e.currentTarget.classList.contains('on');
					if (isOn && scroll === this.posArr[idx]) return;
					this.moveScroll(idx);
				});
			});
		}

		//scroll event
		window.addEventListener('scroll', () => this.activation());

		//mousewheel event
		this.enableWheel &&
			window.addEventListener('mousewheel', (e) => this.moveWheel(e), { passive: false });
	}

	//각 섹션의 세로 위치값을 배열에 저장하는 메서드
	setPos() {
		this.posArr = [];
		for (const section of this.sections) this.posArr.push(section.offsetTop);
	}

	//브라우저 리사이즈시 스크롤 위치값 보정하는 메서드
	modifyPos() {
		this.setPos();
		const active = this.sections_arr.filter((el) => el.classList.contains('on'))[0];
		const active_index = this.sections_arr.indexOf(active);
		window.scroll(0, this.posArr[active_index]);
	}

	//세로 스크롤 이동 모션 메서드
	moveScroll(index) {
		new Anime(window, {
			prop: 'scroll',
			value: this.posArr[index],
			duration: this.speed,
		});
	}

	//wheel 이동 모션 메서드
	moveWheel(e) {
		e.preventDefault();
		const active = this.sections_arr.filter((el) => el.classList.contains('on'))[0];
		const active_index = this.sections_arr.indexOf(active);

		if (e.deltaY < 0) {
			if (active_index === 0) return;
			this.moveScroll(active_index - 1);
		} else {
			if (active_index === this.sections.length - 1) return;
			this.moveScroll(active_index + 1);
		}
	}

	//스크롤시 버튼 활성화 메서드
	activation() {
		const scroll = window.scrollY || window.pageYOffset;

		this.sections.forEach((_, idx) => {
			if (scroll >= this.posArr[idx] + this.base) {
				for (const section of this.sections) section.classList.remove('on');
				this.sections[idx].classList.add('on');

				if (this.enableBtns) {
					for (const el of this.lis) el.classList.remove('on');
					this.lis[idx].classList.add('on');
				}
			}
		});
	}

	//섹션의 갯수에 따라 자동 버튼 생성 메서드
	createBtns() {
		const btns = document.createElement('ul');
		btns.classList.add('btns');
		document.body.append(btns);
		Array(this.len)
			.fill()
			.forEach((_, idx) => {
				btns.append(document.createElement('li'));
			});
		this.ul = document.querySelector('.btns');
		this.lis = this.ul.querySelectorAll('li');
		this.lis_arr = Array.from(this.lis);
		this.lis[0].classList.add('on');
	}
}
