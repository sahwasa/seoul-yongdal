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
  initScrollToTop();
};
