
var year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
(function(){
 const dateField=document.getElementById('preferredDate');
 if(dateField){const now=new Date();dateField.min=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');}
 const form=document.getElementById('contactForm');
 if(!form)return;
 // FormSubmit handles form delivery to the configured email address.
})();
