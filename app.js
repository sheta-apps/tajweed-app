const CH=(window.CH1||[]).concat(window.CH2||[]).concat(window.CH3||[]).sort((a,b)=>a.n-b.n);
const $=s=>document.querySelector(s),app=$('#app');
let P=JSON.parse(localStorage.tjp||'{}');const save=()=>localStorage.tjp=JSON.stringify(P);
const aud=new Audio();
function playAy(k,n){let i=0;const f='audio/'+k.replace(':','').replace(/^(\d+)(\d{0})/,'$1').split('').join('');}
function ayFile(k){const[a,b]=k.split(':');return 'audio/'+a.padStart(3,'0')+b.padStart(3,'0')+'.mp3'}
function play(k,n){let i=0;aud.onended=()=>{if(++i<n){aud.currentTime=0;aud.play()}};aud.src=ayFile(k);aud.play().catch(()=>{})}
function home(){aud.pause();const done=Object.values(P).filter(x=>x.done).length;
 const cols=['#6a4c93','#2a9d8f','#e76f51','#f4a261','#118ab2','#ef476f','#06d6a0','#7b2cbf','#ff7f50','#00b4d8'];
 app.innerHTML=`<div class=top><h1>التجويد الميسر</h1><p>رواية حفص عن عاصم · ${CH.length} أبواب</p><div class=bar><i style="width:${done/CH.length*100}%"></i></div><p style="font-size:13px">أتممت ${done} من ${CH.length}</p></div><div class=grid>${CH.map((c,i)=>`<button class=tile style="background:${c.c}" onclick="openCh('${c.id}')"><em>${P[c.id]&&P[c.id].done?'✅':''}</em><b>${c.n}</b><span>${c.t}</span></button>`).join('')}</div><p class=note>الشرح بصياغة مبسطة من كتاب «التجويد الميسر»</p>${location.protocol.startsWith('http')?'<p class=note><a href="tajweed-muyassar.pdf">📖 الكتاب (PDF)</a> · <a href="tajweed.apk">📱 تحميل التطبيق للأندرويد</a></p>':''}`;scrollTo(0,0)}
function openCh(id,tab){const c=CH.find(x=>x.id==id);tab=tab||'learn';
 const T=[['learn','الشرح'],['ayat','الآيات'],['cards','بطاقات'],['quiz','اختبار'],['vid','فيديو']];
 app.innerHTML=`<div class=page style="--c:${c.c}"><div class=hd style="background:${c.c}"><button class=back onclick="home()">→</button><h2>${c.n}. ${c.t}</h2></div><div class=tabs>${T.map(t=>`<button class="${t[0]==tab?'on':''}" onclick="openCh('${id}','${t[0]}')">${t[1]}</button>`).join('')}</div><div id=body></div></div>`;
 const b=$('#body');aud.pause();
 if(tab=='learn'){b.innerHTML=`<div class=intro>${c.intro}</div>`+c.secs.map(s=>`<div class=card><h3>${s.h}</h3><p>${s.b}</p></div>`).join('')+`<div class=note>المرجع: كتاب التجويد الميسر ${c.p}</div>`}
 if(tab=='ayat'){b.innerHTML=c.ayat.map(a=>`<div class=ay>${AYAT[a.k]}<small>${a.lab} (${a.k.replace(':','/')})</small><button onclick="play('${a.k}',1)">▶ استمع</button><button onclick="play('${a.k}',3)">٣×</button><button onclick="play('${a.k}',5)">٥×</button><button onclick="aud.pause()">■</button></div>`).join('')+`<p class=note>التلاوة: مشاري العفاسي، والمقطع هو الآية كاملة</p>`}
 if(tab=='cards'){let i=0;const show=()=>{b.innerHTML=`<div class=flash onclick="this.classList.toggle('f')"><div class=fi><div>${c.cards[i][0]}</div><div class=bk>${c.cards[i][1]}</div></div></div><div class=nav><button class=btn id=pv>السابق</button><span>${i+1}/${c.cards.length}</span><button class=btn id=nx>التالي</button></div><p class=note>اضغط على البطاقة لتقلبها</p>`;$('#pv').onclick=()=>{i=(i-1+c.cards.length)%c.cards.length;show()};$('#nx').onclick=()=>{i=(i+1)%c.cards.length;show()}};show()}
 if(tab=='quiz'){let i=0,sc=0;const show=()=>{if(i>=c.quiz.length){P[c.id]=Object.assign(P[c.id]||{},{done:1,score:sc});save();b.innerHTML=`<div class=q><div class=score>${sc} / ${c.quiz.length}</div><p style="text-align:center">${sc==c.quiz.length?'ما شاء الله! ممتاز 🌟':'أحسنت، أعد المحاولة لتتقن'}</p><div class=nav><button class=btn onclick="openCh('${id}','quiz')">إعادة</button><button class=btn onclick="home()">الأبواب</button></div></div>`;return}
  const q=c.quiz[i];b.innerHTML=`<div class=q><p><b>${i+1}/${c.quiz.length}</b> ${q[0]}</p>${q[1].map((o,j)=>`<button class=o data-j=${j}>${o}</button>`).join('')}<p class=fb id=fb></p></div>`;
  let ans=0;b.querySelectorAll('.o').forEach(el=>el.onclick=()=>{if(ans)return;ans=1;const j=+el.dataset.j;if(j==q[2]){sc++;el.classList.add('ok')}else{el.classList.add('no');b.querySelector(`[data-j="${q[2]}"]`).classList.add('ok')}$('#fb').innerHTML=q[3]+'<br><button class=btn id=nq>التالي</button>';$('#nq').onclick=()=>{i++;show()}})};show()}
 if(tab=='vid'){b.innerHTML=`<video controls preload=none playsinline poster="" src="${(window.VBASE||'')}video/${c.id}.mp4"></video><p class=note>فيديو الشرح بأسلوب السبورة، بصوت آلي. يحتاج إلى اتصال بالإنترنت.</p>`}
 scrollTo(0,0)}
home();if(location.hash){const[h,t]=location.hash.slice(1).split("-");openCh(h,t)}
