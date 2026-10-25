const $ = s => document.querySelector(s);

const reviews = [
  {name:'Анна', course:'Таро. Язык интуиции', text:'Я пришла из любопытства, а нашла удивительно тёплое пространство. Здесь не дают готовых ответов за тебя — учат замечать свои. Теперь карты для меня — повод остановиться и услышать себя.'},
  {name:'Мария', course:'Магия повседневности', text:'Больше всего понравился спокойный темп. Никакой гонки и сложных обещаний. Маленькие ритуалы помогли выделить время для себя даже в самые занятые дни.'},
  {name:'Екатерина', course:'Искусство намерения', text:'Наконец смогла сформулировать, чего хочу именно я. Дневник практики стал любимой частью утра. Материал понятный, а задания легко вписать в обычную жизнь.'}
];

const modal = $('#modal');
function show(title, text) {
  $('#modal-title').textContent = title;
  $('#modal-text').textContent = text;
  modal.showModal();
}

document.addEventListener('click', e => {
  const b = e.target.closest('[data-demo]');
  if (b) {
    e.preventDefault();
    const label = b.dataset.demo;
    const text = (label.includes('Купить') || label.includes('Тариф'))
      ? 'Это демонстрация оформления покупки. Оплата пока не подключена, деньги не списываются.'
      : 'Этот раздел появится при запуске школы. Сейчас доступен только макет интерфейса.';
    show(label, text);
  }
});

$('.modal-close').onclick = $('#modal-ok').onclick = () => modal.close();
modal.addEventListener('click', e => {
  if (e.target === modal) {
    const r = modal.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) modal.close();
  }
});

$('.menu').onclick = () => {
  const open = $('.nav').classList.toggle('open');
  $('.menu').setAttribute('aria-expanded', open);
  $('.menu').textContent = open ? '×' : '☰';
};

document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  if ($('.nav').classList.contains('open')) {
    $('.nav').classList.remove('open');
    $('.menu').setAttribute('aria-expanded', false);
    $('.menu').textContent = '☰';
  }
}));

document.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  show(
    f.dataset.form === 'newsletter' ? 'Ты в шаге от магии' : 'Всё заполнено верно',
    'Это демонстрационная форма. Данные никуда не отправлены и не сохранены. Подключение заявок и уведомлений появится при запуске.'
  );
}));

if ($('#quote-content')) {
  let index = 0;
  const update = () => {
    const r = reviews[index];
    $('#quote-content').innerHTML = `<blockquote class="quote">${r.text}</blockquote><div class="quote-author">${r.name}</div><div class="quote-sub">Курс «${r.course}»</div>`;
    $('#review-count').textContent = `${index + 1} / ${reviews.length}`;
  };
  $('#prev-review').onclick = () => { index = (index + reviews.length - 1) % reviews.length; update(); };
  $('#next-review').onclick = () => { index = (index + 1) % reviews.length; update(); };
  update();
}

if ('IntersectionObserver' in window) {
  const ob = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('reveal'); ob.unobserve(e.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.section').forEach(e => ob.observe(e));
}
