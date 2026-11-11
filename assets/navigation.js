
(function(){
  var menuButton=document.querySelector('.menu-toggle');
  var menu=document.getElementById('primary-navigation');
  function label(isOpen){
    var en=document.documentElement.lang==='en';
    if(menuButton){menuButton.setAttribute('aria-label',isOpen?(en?'Close menu':'Menüyü kapat'):(en?'Open menu':'Menüyü aç'));menuButton.innerHTML=isOpen?'<span aria-hidden="true">×</span>':'<span aria-hidden="true">☰</span>';}
  }
  function closeMenu(){if(menu&&menuButton){menu.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');label(false);}}
  if(menuButton&&menu){
    menuButton.addEventListener('click',function(){var isOpen=menu.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',isOpen?'true':'false');label(isOpen);});
    menu.querySelectorAll('a').forEach(function(link){link.addEventListener('click',closeMenu);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){var wasOpen=menu.classList.contains('is-open');closeMenu();if(wasOpen)menuButton.focus();}});
    window.addEventListener('resize',function(){if(window.innerWidth>700)closeMenu();});
  }
})();
