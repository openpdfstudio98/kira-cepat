/* Ultimate V3.1 — progressive enhancement only; financial formulae unchanged. */
(function () {
  'use strict';
  const names = {
    loan:'Pinjaman',zakat:'Zakat',conv:'Penukar Unit',currency:'Penukar Mata Wang',
    salary:'Gaji Bersih',ot:'Overtime',epf:'KWSP / EPF',
    socso:'SOCSO & EIS',tax:'Cukai Pendapatan',savings:'Simpanan'
  };
  const ids=Object.keys(names);
  const resultIds={loan:'l_res',zakat:'z_res',conv:'c_res',currency:'fx_res',salary:'s_res',ot:'o_res',epf:'e_res',socso:'p_res',tax:'t_res',savings:'v_res'};
  const menu=document.querySelector('.tools-menu');
  const trigger=menu?.querySelector('summary');
  document.addEventListener('click',event=>{
    if(menu?.open&&!menu.contains(event.target))menu.open=false;
  });
  menu?.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&menu.open){
      menu.open=false;
      trigger.focus();
    }
  });
  const workspace=document.querySelector('.workspace');
  if(!workspace)return;
  function selectFromUrl(){
    let hash;
    try{hash=decodeURIComponent(window.location.hash.slice(1));}catch{}
    const selected=ids.includes(hash)?hash:document.body.dataset.defaultCalculator||'loan';
    for(const id of ids)document.getElementById(id).classList.toggle('hidden',id!==selected);
    for(const link of menu.querySelectorAll('[data-tool]')){
      if(link.dataset.tool===selected)link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    }
  }
  selectFromUrl();
  window.addEventListener('hashchange',selectFromUrl);
  // Result actions are shared across the calculators and converters.
  ids.forEach(id=>{
    const card=document.getElementById(id);
    const result=document.getElementById(resultIds[id]);
    if(!card||!result)return;
    result.setAttribute('role','status');
    result.setAttribute('aria-live','polite');
    const actions=document.createElement('div');
    actions.className='v31-actions';
    const copyButton=card.querySelector('.v2-copy');
    if(copyButton)actions.appendChild(copyButton);
    const localized=text=>window.KiraLanguage?.translate(text)??text;
    const shareTitle=()=> 'Kira Cepat — '+localized(names[id]);
    function payload(){
      return shareTitle()+'\n'+result.innerText.trim()+'\n'+location.origin+location.pathname+'#'+id+'\n'+localized('Nota: Semak maklumat dan syarat pengiraan pada laman web.');
    }
    const share=document.createElement('button');
    share.type='button';share.className='v31-share';share.textContent='Kongsi keputusan';
    share.setAttribute('aria-label','Kongsi keputusan kalkulator '+names[id]);
    const status=document.createElement('span');status.className='v31-action-status';status.setAttribute('role','status');
    share.addEventListener('click',async()=>{
      if(result.dataset.resultReady!=='true'){
        status.textContent='Masukkan nilai yang sah dahulu.';return;
      }
      try{
        if(navigator.share){await navigator.share({title:shareTitle(),text:payload()});status.textContent='';}
        else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(payload());status.textContent='Disalin. Boleh tampal ke WhatsApp atau aplikasi lain.';}
        else status.textContent='Perkongsian tidak disokong dalam pelayar ini.';
      }catch(e){
        status.textContent=e.name==='AbortError'?'Perkongsian dibatalkan.':'Tidak dapat berkongsi dalam pelayar ini.';
      }
    });
    if(id==='loan'||id==='zakat'){
      const invalidate=()=>{
        result.dataset.resultReady='false';
        result.textContent='Isi nilai dan tekan Kira.';
      };
      card.addEventListener('input',invalidate);
    }
    for(const event of ['input','change']){
      card.addEventListener(event,()=>{status.textContent='';});
    }
    actions.appendChild(share);actions.appendChild(status);
    result.insertAdjacentElement('afterend',actions);
    // Attach labels to older calculator inputs without altering their IDs or formulas.
    card.querySelectorAll('label:not([for])').forEach(label=>{
      const control=label.nextElementSibling;
      if(control && (control.matches('input,select')) && control.id)label.htmlFor=control.id;
    });
  });
})();
