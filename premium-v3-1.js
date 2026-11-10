/* Ultimate V3.1 — progressive enhancement only; financial formulae unchanged. */
(function () {
  'use strict';
  const names = {
    loan:'Pinjaman',zakat:'Zakat',conv:'Converter',
    salary:'Gaji Bersih',ot:'Overtime',epf:'KWSP / EPF',
    socso:'SOCSO & EIS',tax:'Cukai Pendapatan',savings:'Simpanan'
  };
  const ids=Object.keys(names);
  const resultIds={loan:'l_res',zakat:'z_res',conv:'c_res',salary:'s_res',ot:'o_res',epf:'e_res',socso:'p_res',tax:'t_res',savings:'v_res'};
  const tabs=Array.from(document.querySelectorAll('.tabs .tab'));
  const heading=document.querySelector('.workspace-heading');
  const reduceMotion=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior=reduceMotion?'instant':'smooth';
  function hashId(){
    try{return decodeURIComponent(window.location.hash.slice(1));}
    catch{return '';}
  }
  const getTabId=tab=>tab.dataset.target||({0:'loan',1:'zakat',2:'conv'})[tabs.indexOf(tab)];
  function select(id){
    const tab=tabs.find(t=>getTabId(t)===id);
    if(!tab)return;
    tab.click();
  }
  // Preserve legacy calculator handlers, add deep links and keep mobile navigation visible.
  tabs.forEach(tab=>{
    const id=getTabId(tab);
    if(!id)return;
    tab.setAttribute('aria-label','Buka kalkulator '+names[id]);
    tab.setAttribute('aria-controls',id);
    tab.addEventListener('click',event=>{
      tabs.forEach(t=>t.setAttribute('aria-current',t===tab?'true':'false'));
      if(event.isTrusted && window.location.hash!=='#'+id)history.replaceState(null,'','#'+id);
      if(event.isTrusted && window.matchMedia('(max-width:690px)').matches && heading){
        heading.scrollIntoView({behavior:scrollBehavior,block:'start'});
      }
    });
  });
  function selectFromUrl(){
    const id=hashId();
    select(ids.includes(id)?id:document.body.dataset.defaultCalculator||'loan');
  }
  selectFromUrl();
  window.addEventListener('hashchange',selectFromUrl);
  // Standard accessible result utilities for all nine calculator cards.
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
