/* Saved calculations stay in this browser. Restore inputs or view the original result. */
(function(){
 'use strict';
 const workspace=document.querySelector('.workspace');
 const storageKey='kira-cepat-saved-v1';
 const maxSaved=50;
 const fields='input[id]:not([type="search"]),select[id]';
 const cards=new Map([...workspace.querySelectorAll('.card[id]')].map(card=>[card.id,card]));
 const names=new Map([...cards].map(([id,card])=>[id,card.querySelector('h2').textContent]));
 const panel=document.createElement('details');
 panel.className='saved-calculations';
 panel.innerHTML=`<summary>Kiraan disimpan</summary>
  <p>Simpanan ini berada dalam pelayar ini sahaja. Hasil asal kekal seperti ketika disimpan.</p>
  <p class="saved-status" role="status"></p><div class="saved-list"></div>`;
 workspace.append(panel);
 const list=panel.querySelector('.saved-list');
 const status=panel.querySelector('.saved-status');
 function read(){
  try{
   const data=JSON.parse(localStorage.getItem(storageKey)||'[]');
   return Array.isArray(data)?data.filter(entry=>entry&&cards.has(entry.tool)&&
    typeof entry.id==='string'&&typeof entry.result==='string'&&Number.isFinite(entry.savedAt)&&
    entry.inputs&&typeof entry.inputs==='object'):[];
  }catch{return [];}
 }
 function write(entries){
  try{localStorage.setItem(storageKey,JSON.stringify(entries));return true;}
  catch{status.textContent='Simpanan pelayar tidak tersedia.';return false;}
 }
 function button(label){
  const control=document.createElement('button');
  control.type='button';
  control.className='secondary-button';
  control.textContent=label;
  return control;
 }
 function restore(entry){
  const card=cards.get(entry.tool);
  if(location.hash!=='#'+entry.tool){
   history.pushState(null,'','#'+entry.tool);
   window.dispatchEvent(new Event('hashchange'));
  }
  for(const field of card.querySelectorAll(fields)){
   if(!Object.hasOwn(entry.inputs,field.id))continue;
   const value=entry.inputs[field.id];
   if(field.type==='checkbox')field.checked=value===true;
   else if(typeof value==='string'){
    if(field.tagName==='SELECT'&&![...field.options].some(option=>option.value===value))continue;
    field.value=value;
   }
   field.dispatchEvent(new Event(field.type==='checkbox'||field.tagName==='SELECT'?'change':'input',{bubbles:true}));
  }
  const heading=card.querySelector('h2');
  heading.tabIndex=-1;
  heading.focus({preventScroll:true});
  card.scrollIntoView({block:'start'});
  status.textContent='Input disimpan telah dimuatkan.';
 }
 function render(){
  const entries=read();
  list.replaceChildren();
  if(!entries.length){list.textContent='Belum ada kiraan disimpan.';return;}
  for(const entry of entries){
   const item=document.createElement('details');
   item.className='saved-entry';
   const summary=document.createElement('summary');
   const date=document.createElement('time');
   date.dateTime=new Date(entry.savedAt).toISOString();
   date.dataset.savedDate='';
   date.textContent=new Date(entry.savedAt).toLocaleString('ms-MY');
   summary.append(names.get(entry.tool),' · ',date);
   const heading=document.createElement('p');
   heading.textContent='Hasil asal';
   const result=document.createElement('pre');
   result.dataset.savedSnapshot='';
   result.lang=entry.language==='en'?'en':'ms';
   result.textContent=entry.result;
   const open=button('Muat semula input');
   const remove=button('Padam');
   open.addEventListener('click',()=>restore(entry));
   remove.addEventListener('click',()=>{
    if(!write(read().filter(item=>item.id!==entry.id)))return;
    render();
    status.textContent='Kiraan dipadam.';
   });
   const actions=document.createElement('div');
   actions.className='saved-actions';
   actions.append(open,remove);
   item.append(summary,heading,result,actions);
   list.append(item);
  }
 }
 for(const [tool,card] of cards){
  const result=card.querySelector('.result');
  const actions=card.querySelector('.v31-actions');
  const save=button('Simpan kiraan');
  save.classList.add('save-calculation');
  actions.insertBefore(save,actions.querySelector('.v31-action-status'));
  save.addEventListener('click',()=>{
   if(result.dataset.resultReady!=='true'){
    actions.querySelector('.v31-action-status').textContent='Kira dahulu';
    return;
   }
   const entries=read();
   panel.open=true;
   if(entries.length>=maxSaved){
    status.textContent='Had 50 kiraan dicapai. Padam satu kiraan untuk menyimpan yang baharu.';
    return;
   }
   const inputs=Object.fromEntries([...card.querySelectorAll(fields)].map(field=>
    [field.id,field.type==='checkbox'?field.checked:field.value]));
   const savedAt=Date.now();
   const id=globalThis.crypto?.randomUUID?.()||`${savedAt}-${Math.random().toString(36).slice(2)}`;
   const entry={id,tool,inputs,savedAt,result:result.innerText.trim(),language:document.documentElement.lang};
   if(!write([entry,...entries]))return;
   render();
   actions.querySelector('.v31-action-status').textContent='Kiraan disimpan.';
   status.textContent='Kiraan disimpan.';
  });
 }
 window.addEventListener('storage',event=>{if(event.key===storageKey||event.key===null)render();});
 render();
})();
