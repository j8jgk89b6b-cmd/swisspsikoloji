
var year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
(function(){
 const dateField=document.getElementById('preferredDate');
 if(dateField){const now=new Date();dateField.min=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');}
 const form=document.getElementById('contactForm');
 if(!form)return;
 // İlgili hizmet sayfasından gelen ziyaretçilerin formda doğru alanı görmesini sağlar.
 const requested=new URLSearchParams(window.location.search).get('alan');
 const area={spor:'Spor psikolojisi',kurumsal:'Kurumsal eğitim / danışmanlık',bireysel:'Bireysel danışmanlık'}[requested];
 const topic=document.getElementById('topic');
 if(area&&topic&&Array.from(topic.options).some(option=>option.value===area))topic.value=area;
 // FormSubmit mevcut e-posta alıcısına iletişimi iletir; tarih ve saat ayrıca onaylanır.
})();
