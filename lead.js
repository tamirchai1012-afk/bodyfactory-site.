const form = document.querySelector('#leadForm');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('button'), status = document.querySelector('#successMsg');
  if (button.disabled) return;
  const data = Object.assign({lastName:'', city:''}, Object.fromEntries([...new FormData(form)].map(([k,v])=>[k,v.trim()])));
  if(!data.firstName || !data.phone || !/^(0[2-9]\d{7,8}|\+972[2-9]\d{7,8})$/.test(data.phone.replace(/[\s-]/g,''))) {
    status.textContent='צריך שם ומספר טלפון תקין.'; return;
  }
  button.disabled=true; button.textContent='שולח…'; status.textContent='';
  try {
    const response=await fetch('https://script.google.com/macros/s/AKfycbz9PnXpA2EJT74xnOZ9yvWO4wQC9hIT80XB2yyASRiMuSa7O6R4zXtWNzsBOc9BRzTKBQ/exec',{method:'POST',body:JSON.stringify(data)});
    if(!response.ok) throw new Error('submit failed');
    const body=await response.text();
    if(/text\/html/i.test(response.headers.get('content-type')||'')) throw new Error('unexpected response');
    if(body.trim().startsWith('{')) {const result=JSON.parse(body);if(result.error||result.success===false||result.status==='error'||result.result==='error')throw new Error('rejected');}
    status.textContent='תודה, הפרטים התקבלו. תמיר יחזור אליכם לתיאום.';form.reset();
  } catch {status.textContent='לא התקבל אישור שליחה. הפרטים נשמרו בטופס ואפשר לפנות בוואטסאפ למטה.';}
  finally {button.disabled=false;button.textContent='שלח פרטים';}
});
