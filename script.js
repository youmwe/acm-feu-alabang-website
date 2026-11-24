const fontLink=document.createElement('link');
fontLink.rel='stylesheet';
fontLink.href='https://fonts.googleapis.com/css2?family=Commissioner:wght@400;500;600;700&family=Prompt:wght@400;500;600;700;800&display=swap';
document.head.appendChild(fontLink);

const pages=[['Home','home.html'],['About','about.html'],['Officers','officers.html'],['Event','events.html'],['Gallery','gallery.html'],['Workshops and Seminars','workshops.html'],['Contact','contact.html']];
const currentFile=location.pathname.split('/').pop()||'home.html';
const nav=document.querySelector('.site-header .nav');
if(nav){
  nav.innerHTML=`<a class="header-logo-image" href="home.html"><img src="images/acm-logo-clean.png" alt="ACM logo"></a><button class="menu-toggle" aria-expanded="false" aria-controls="main-menu" aria-label="Open menu">☰</button><div class="nav-links" id="main-menu">${pages.map(([label,file])=>`<a href="${file}" class="${currentFile===file?'active':''}">${label}</a>`).join('')}</div><a class="header-feu-image" href="home.html"><img src="images/feu-logo-clean.png" alt="FEU logo"></a>`;
}

const menuToggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.nav-links');
menuToggle?.addEventListener('click',()=>{const isOpen=menu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',isOpen);menuToggle.setAttribute('aria-label',isOpen?'Close menu':'Open menu')});
menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>menu.classList.remove('open')));

if(document.title.startsWith('About')){document.querySelector('.page-hero')?.remove();document.querySelectorAll('.kicker').forEach(label=>{if(label.textContent.trim().toLowerCase()==='our direction')label.remove()})}
if(document.title.startsWith('Gallery'))document.querySelector('.page-hero')?.remove();
if(document.title.startsWith('Contact'))document.querySelectorAll('.page-hero .kicker,.page-hero p:not(.kicker)').forEach(text=>text.remove());
if(document.title.startsWith('Workshops'))document.querySelectorAll('.page-hero .kicker,.page-hero p:not(.kicker)').forEach(text=>text.remove());
const eventImages={siklab:'images/event1.webp',paragon:'images/event2.webp',assembly:'images/event3.webp',reality:'images/event4.webp',techreach:'images/event5.webp'};document.querySelectorAll('.event-detail').forEach(detail=>{const image=eventImages[detail.id];const frame=detail.querySelector('.event-detail-photo');if(image&&frame){frame.innerHTML=`<img src="${image}" alt="${detail.querySelector('h3')?.textContent||'Event'} photo">`}});
if(document.querySelector('.event-carousel'))document.querySelector('.page-hero')?.remove();

const carousel=document.querySelector('.event-carousel');
if(carousel){
  const step=()=>Math.min(carousel.clientWidth*.78,390);
  document.getElementById('event-next')?.addEventListener('click',()=>carousel.scrollBy({left:step(),behavior:'smooth'}));
  document.getElementById('event-prev')?.addEventListener('click',()=>carousel.scrollBy({left:-step(),behavior:'smooth'}));
}

if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.addEventListener('click',event=>{
    const link=event.target.closest('a');
    if(!link||link.target==='_blank'||link.hasAttribute('download'))return;
    const href=link.getAttribute('href');
    if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:'))return;
    const destination=new URL(link.href,location.href);
    if(destination.origin!==location.origin||destination.pathname===location.pathname&&destination.hash)return;
    event.preventDefault();
    document.body.classList.add('page-leaving');
    window.setTimeout(()=>{location.href=destination.href},220);
  });
}

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
