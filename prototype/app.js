const seasons = {
  spring: {kicker:'Весна / Пробуждение',title:'Помочь саду войти в сезон',copy:'Оцениваем, как растения перенесли зиму, и составляем план ухода на период роста.',items:['Осмотр деревьев и кустарников','Обрезка плодовых и декоративных до цветения','Формирующая обрезка хвойных','Подбор подкормок и защитных мероприятий','Посадки','Монтаж автополива']},
  summer: {kicker:'Лето / Рост и форма',title:'Сохранить красоту в разгар лета',copy:'Следим за состоянием растений, поддерживаем форму и учитываем нагрузку жары и засухи.',items:['Санитарная обрезка и коррекция приростов','Подпорки для плодовых','Поддерживающая стрижка изгородей','Уход за цветниками и розарием','Контроль состояния растений','Оценка полива, мульчирование и уход за почвой','Борьба с вредителями']},
  autumn: {kicker:'Осень / Подготовка к отдыху',title:'Заложить основу следующего сезона',copy:'Приводим сад в порядок и подбираем работы, которые помогут растениям подготовиться к зиме.',items:['Формирующая обрезка хвойных','Санитарная обрезка плодовых после листопада','Оценка потребности в подкормках и защите','Планирование посадок и обновлений','Подготовка укрытий для молодых саженцев и теплолюбивых видов','Влагозарядный полив']},
  winter: {kicker:'Зима / Наблюдение и замысел',title:'Время увидеть сад по-новому',copy:'Оцениваем структуру сада и планируем будущие изменения. Возможность работ зависит от погоды и состояния растений.',items:['Оценка структуры крон и композиций','Подбор растений, проектирование изменений','Защита от снега и сугробов','Восстановление декоративности поломанных деревьев и кустарников']}
};
const tabs = [...document.querySelectorAll('[data-season]')];
function setSeason(key, focus = false) {
  const data = seasons[key];
  tabs.forEach(tab => {const active = tab.dataset.season === key; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; if(active && focus) tab.focus();});
  document.getElementById('season-panel').setAttribute('aria-labelledby', 'tab-' + key);
  document.getElementById('season-kicker').textContent = data.kicker;
  document.getElementById('season-title').textContent = data.title;
  document.getElementById('season-copy').textContent = data.copy;
  const list = document.getElementById('season-list'); list.replaceChildren();
  data.items.forEach((item,i)=>{const row=document.createElement('div');row.className='season-item';const number=document.createElement('span');number.textContent='0'+(i+1);const text=document.createElement('span');text.textContent=item;row.append(number,text);list.append(row);});
}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>setSeason(tab.dataset.season));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%4;if(e.key==='ArrowLeft')next=(i+3)%4;if(e.key==='Home')next=0;if(e.key==='End')next=3;if(next!==undefined){e.preventDefault();setSeason(tabs[next].dataset.season,true);}});});
setSeason('autumn');
const menu = document.querySelector('.menu-toggle');const navigation=document.getElementById('navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const services=['Консультация','День садовника','Обрезка деревьев и кустарников','Обрезка хвойных и ниваки','Комплексный уход','Обновление сада','Посадки и подбор растений','Обработки и лечение растений','Спил и расчистка','Автополив и благоустройство','Другая задача'];
const choices=document.getElementById('service-choices');const form=document.getElementById('request-form');
services.forEach(service=>{const label=document.createElement('label');const input=document.createElement('input');input.type='checkbox';input.name='service';input.value=service;label.append(input,document.createTextNode(service));choices.append(label);});
function selectedServices(){return [...form.querySelectorAll('[name=service]:checked')].map(el=>el.value);}
function updateConditional(){document.getElementById('tree-fields').hidden=!selectedServices().some(s=>/Обрезка|Спил|День садовника|Комплексный/.test(s));document.getElementById('date-field').hidden=form.elements.timing.value!=='Есть конкретная дата';document.getElementById('telegram-field').hidden=form.elements.contact.value!=='Telegram';if(selectedServices().length)document.getElementById('service-error').hidden=true;}
form.addEventListener('change',updateConditional);
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{const input=[...form.querySelectorAll('[name=service]')].find(el=>el.value===link.dataset.service);if(input)input.checked=true;updateConditional();}));
const dateInput=form.elements.date;const now=new Date();dateInput.min=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
form.elements.phone.removeAttribute('pattern');
form.elements.phone.addEventListener('input',()=>{const digits=form.elements.phone.value.replace(/\D/g,'');form.elements.phone.setCustomValidity(digits.length>=10&&digits.length<=15?'':'Укажите телефон: от 10 до 15 цифр.');});
let files=[];let objectUrls=[];
function renderFiles(){objectUrls.forEach(URL.revokeObjectURL);objectUrls=[];const list=document.getElementById('file-list');list.replaceChildren();files.forEach((file,i)=>{const row=document.createElement('div');row.className='file-row';if(file.type.startsWith('image/')){const img=document.createElement('img');const url=URL.createObjectURL(file);objectUrls.push(url);img.src=url;img.alt='';row.append(img);}const text=document.createElement('span');text.textContent=file.name+' · '+(file.size/1048576).toFixed(1)+' МБ';const remove=document.createElement('button');remove.type='button';remove.textContent='×';remove.setAttribute('aria-label','Удалить '+file.name);remove.addEventListener('click',()=>{files.splice(i,1);renderFiles();});row.append(text,remove);list.append(row);});}
document.getElementById('attachments').addEventListener('change',e=>{let errors=[];for(const file of e.target.files){if(!/^(image|video)\//.test(file.type)){errors.push(file.name+': только фото или видео.');continue;}if(file.size>30*1048576){errors.push(file.name+': больше 30 МБ.');continue;}if(files.length>=8){errors.push('Можно прикрепить до 8 файлов.');break;}if(!files.some(f=>f.name===file.name&&f.size===file.size))files.push(file);}e.target.value='';const error=document.getElementById('file-error');error.textContent=errors.join(' ');error.hidden=!errors.length;renderFiles();});
const dialog=document.getElementById('review-dialog');let reviewText='';
form.addEventListener('submit',e=>{e.preventDefault();if(!selectedServices().length){document.getElementById('service-error').hidden=false;choices.querySelector('input').focus();return;}const data=new FormData(form);const rows=[['Услуги',selectedServices().join(', ')],['Имя',data.get('name')],['Телефон',data.get('phone')],['Связь',data.get('contact')],['Город',data.get('city')],['Район',data.get('district')||'Не указан'],['Территория',data.get('territory')],['Сроки',data.get('timing')+(data.get('date')&&data.get('timing')==='Есть конкретная дата'?' · '+data.get('date'):'')]];
if(data.get('contact')==='Telegram'&&data.get('telegram'))rows.push(['Telegram',data.get('telegram')]);
if(!document.getElementById('tree-fields').hidden)rows.push(['Деревья',data.get('trees')||'Нужна оценка'],['Кустарники',data.get('shrubs')||'Нужна оценка'],['Доступ',data.get('access')],['Остатки',data.get('waste')]);rows.push(['Описание',data.get('description')||'Не указано'],['Медиа по ссылке',data.get('mediaLink')||'Не указано'],['Вложения',files.length?files.map(f=>f.name).join('\n'):'Нет']);const dl=document.getElementById('review-content');dl.replaceChildren();rows.forEach(([key,value])=>{const dt=document.createElement('dt');dt.textContent=key;const dd=document.createElement('dd');dd.textContent=value;dl.append(dt,dd);});reviewText='KISELLO · ТЕСТОВАЯ ЗАЯВКА (НЕ ОТПРАВЛЕНА)\n\n'+rows.map(([k,v])=>k+': '+v).join('\n')+'\n\nФайлы перечислены по именам; в текстовый файл не включены.';dialog.showModal();});
document.getElementById('close-review').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.getElementById('download-review').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([reviewText],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='kisello-request.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});

document.querySelectorAll('[data-compare]').forEach(compare=>{
  const range=compare.querySelector('input[type=range]');
  const update=()=>compare.style.setProperty('--split',`${range.value}%`);
  range.addEventListener('input',update);
  compare.querySelectorAll('[data-position]').forEach(button=>{
    button.addEventListener('click',()=>{range.value=button.dataset.position;update();});
  });
  update();
});
