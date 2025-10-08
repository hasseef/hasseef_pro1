
window.util={
  qs:(k)=>new URLSearchParams(location.search).get(k),
  role:()=> (new URLSearchParams(location.search).get('role')||'viewer'),
  toCSV:(rows)=> rows.map(r=>r.map(v=>('"'+String(v).replace(/"/g,'""')+'"')).join(',')).join('\n'),
  download:(name,content,type='text/csv')=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;a.click();},
  print:()=>window.print(),
  filterTable:(tableId,q)=>{const ql=(q||'').toLowerCase(); document.querySelectorAll('#'+tableId+' tbody tr').forEach(tr=>{tr.style.display = tr.innerText.toLowerCase().includes(ql)?'':'none';});},
  pdf:(title,selector)=>{ if(!window.jspdf){ alert('PDF: jsPDF غير متاح'); return;}
    const {jsPDF}=window.jspdf; const doc=new jsPDF({orientation:'p',unit:'pt',format:'a4'});
    doc.setFontSize(14); doc.text(title,40,40);
    const node=document.querySelector(selector);
    doc.html(node,{callback:(d)=>{d.save(title.replace(/\s+/g,'_')+'.pdf');}, x:40, y:60, html2canvas:{scale:0.6}});
  },
  showByRole:()=>{
    const r=util.role(); document.querySelectorAll('[data-role]').forEach(el=>{
      const need=el.getAttribute('data-role'); el.style.display = (need===r || need==='any' || (need==='delegate'&&r==='admin')) ? '' : 'none';
    });
    const pill=document.getElementById('role-pill'); if(pill) pill.textContent = 'الدور: '+(r=='admin'?'مدير':(r=='delegate'?'مفوّض':'قارئ'));
  }
};
document.addEventListener('DOMContentLoaded',()=>util.showByRole());
