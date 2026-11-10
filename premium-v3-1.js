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
  const getTabId=tab=>tab.dataset.target||({0:'loan',1:'zakat',2:'conv'})[tabs.indexOf(tab)];
  function select(id,focus=false){
    const tab=tabs.find(t=>getTabId(t)===id);
    if(!tab)return;
    tab.click();
    tabs.forEach(t=>t.setAttribute('aria-current',t===tab?'true':'false'));
    if(window.location.hash!=='#'+id)history.replaceState(null,'','#'+id);
    if(focus)tab.focus({preventScroll:true});
    tab.scrollIntoView({block:'nearest',inline:'nearest',behavior:scrollBehavior});
  }
  // Preserve legacy calculator handlers, add deep links and keep mobile navigation visible.
  tabs.forEach(tab=>{
    const id=getTabId(tab);
    if(!id)return;
    tab.setAttribute('aria-label','Buka kalkulator '+names[id]);
    tab.addEventListener('click',()=>{
      tabs.forEach(t=>t.setAttribute('aria-current',t===tab?'true':'false'));
      if(window.location.hash!=='#'+id)history.replaceState(null,'','#'+id);
      if(window.matchMedia('(max-width:690px)').matches && heading){
        heading.scrollIntoView({behavior:scrollBehavior,block:'start'});
      }
    });
  });
  const current=decodeURIComponent(window.location.hash.slice(1));
  if(ids.includes(current))select(current);
  else tabs[0]?.setAttribute('aria-current','true');
  window.addEventListener('hashchange',()=>{
    const id=decodeURIComponent(window.location.hash.slice(1));
    if(ids.includes(id))select(id);
  });
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
    function payload(){
      return 'Kira Cepat — '+names[id]+'\n'+result.innerText.trim()+'\n'+location.origin+location.pathname+'#'+id+'\nNota: Semak maklumat dan syarat pengiraan pada laman web.';
    }
    const share=document.createElement('button');
    share.type='button';share.className='v31-share';share.textContent='Kongsi keputusan';
    share.setAttribute('aria-label','Kongsi keputusan kalkulator '+names[id]);
    const status=document.createElement('span');status.className='v31-action-status';status.setAttribute('role','status');
    share.addEventListener('click',async()=>{
      const data=result.innerText.trim();
      if(!data||data.startsWith('Isi nilai')||data.startsWith('Masukkan nilai')||result.querySelector('.error')){
        status.textContent='Masukkan nilai yang sah dahulu.';return;
      }
      try{
        if(navigator.share){await navigator.share({title:'Kira Cepat — '+names[id],text:payload()});status.textContent='';}
        else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(payload());status.textContent='Disalin. Boleh tampal ke WhatsApp atau aplikasi lain.';}
        else status.textContent='Perkongsian tidak disokong dalam pelayar ini.';
      }catch(e){
        status.textContent=e.name==='AbortError'?'Perkongsian dibatalkan.':'Tidak dapat berkongsi dalam pelayar ini.';
      }
    });
    actions.appendChild(share);actions.appendChild(status);
    result.insertAdjacentElement('afterend',actions);
    // Attach labels to older calculator inputs without altering their IDs or formulas.
    card.querySelectorAll('label:not([for])').forEach(label=>{
      const control=label.nextElementSibling;
      if(control && (control.matches('input,select')) && control.id)label.htmlFor=control.id;
    });
  });
})();
