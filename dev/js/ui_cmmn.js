// top scroll
const createScrollButton = () => {
  const scrollBtn = document.createElement('button')
  scrollBtn.innerHTML = '상단으로 이동';
  scrollBtn.setAttribute('id', 'btn_scroll');
  scrollBtn.classList.add('btn_scroll');
  document.body.appendChild(scrollBtn)
  return scrollBtn
}
const toggleScrollButton = () => {
  const scrollBtn = document.querySelector('.btn_scroll')
  scrollBtn.classList.toggle('show', window.scrollY > window.innerHeight / 2)
}
const scrollToTop = () => {
  if (window.scrollY > 0) {
    window.scrollTo(0, window.scrollY - 50)
    setTimeout(scrollToTop, 10)
  }
}
const initScrollToTop = () => {
  let scrollBtn;
  if($('#btn_scroll').length==0){    
    scrollBtn = createScrollButton()
  }else{
    scrollBtn = $('#btn_scroll').get(0);
  }
  scrollBtn.addEventListener('click', scrollToTop)
  if(window!=null) window.addEventListener('scroll', toggleScrollButton)
}
//tab
  $('.tab').find('li:first').addClass('on')
  $('.tab_wrap').find('.tab_cont:not(:first)').hide()
$('.tab li').on('click', function (e) {
  e.preventDefault()
  $(this).addClass('on').siblings().removeClass('on')
  var link = $(this).find('a').attr('href')
  var link_num = link.substr(link.length - 1)
  $('.m_tab option')
      .eq(link_num - 1)
      .prop('selected', 'selected')
  var findTarget = $(this).parents('.tab_wrap').find('.tab_contents')
  findTarget.find('.tab_cont').hide()
  // console.log($(link))
  $(link).show();
  if(typeof calendar !== 'undefined') calendar.updateSize();
})

   // nav
	var $nav=$('.nav'),
    	$deps1=$('.nav_lst>li'),
    	$deps2=$('.nav .sub li'),
      $snb = $('.snb_lst li'),
    	preLocate,deps1Locate,deps2Locate,
    	indexDeps1,getDeps,indexDeps2,
    	locate=window.location.href;

function menuInit(){
  $deps1.each(function(index, item){
  var getAttr=$(this).children('a').attr('href');
    index+=1;
    indexDeps1=$(this).children('a').attr('href',getAttr + "#?index="+ index +',1');
    indexDeps2=$(this).find($deps2);
    getDeps=$(this).children('a').attr('href');
    indexDeps2.each(function(index2, item){
      getAttr=$(this).children('a').attr('href');
      index2+=1;
      indexDeps2=$(this).children('a').attr('href',getAttr + "#?index="+index+',' + index2);
    });
  });    

  if(locate.indexOf("index=") > -1){    
    preLocate=locate.split("index=")[1].split(',');
    deps1Locate=preLocate[0]-1;
    deps2Locate=preLocate[1]-1;
    console.log(deps1Locate <= 0)
    if(deps1Locate >= 0){
      $deps1.eq(deps1Locate).addClass('on')
      .find($deps2).eq(deps2Locate).addClass('on');
    }
    $snb.eq(deps2Locate).addClass('on');
    $snb.each(function(index){
      getAttr = $(this).children('a').attr('href');
      index += 1;
      $(this).children('a').attr('href',getAttr + "#?index="+ preLocate[0]+','+index);
    })      
  }
};

function menuEvt(el){
  var getAttr=el.attr('href').split("index=")[1].split(',');
  deps1Locate=getAttr[0]-1;
  deps2Locate=getAttr[1]-1;
  console.log(deps1Locate,deps2Locate);
  $deps1.removeClass('on');
  $deps2.removeClass('on');
  $snb.removeClass('on');
  $deps1.eq(deps1Locate).addClass('on')
 .find($deps2).eq(deps2Locate).addClass('on');
  el.parent('li').addClass('on');
}
//로딩순서 때문에 수동실행
function commonInit(){
  const nav = $('#nav'),
        navOpen = $('.open_aside'),
        navClose = $('.close_aside');

  navOpen.on('click',function(){
    nav.addClass('aside');
    console.log('open')
  })
  navClose.on('click',function(){
    nav.removeClass('aside');
    console.log('close')
  });

	menuInit();
	
  initScrollToTop();
};
