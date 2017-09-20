$(function(){
  let pageIndex = 1;
  let target = '';
  let $searchBtn = $('.search-btn');
  let $input = $('.search-input');
  let $lists = $('.lists');
  let $load = $('.load-more');
  let $info = $('.info');

  $searchBtn.on('click',function(){
    $info.html('');
    pageIndex = 1;
    console.log('current page '+ pageIndex );
    $searchBtn.addClass('onload');
    target = $input.val();
    getPage(pageIndex,target);
    $searchBtn.removeClass('onload');

  })
  $load.on('click',function(e){
    e.preventDefault();
    $info.html('');
    pageIndex += 1;
    console.log('current page '+ pageIndex );
    $load.addClass('onload');
    target = $input.val();
    getPage(pageIndex,target);
    $load.removeClass('onload');
  })

  function getPage(index,target){
    $.ajax({
      url: 'getPage',
      type: 'get',
      data:{
        index: index,
        target: target
      },
      success: (data) =>{
        if (data.length === 0){
          $info.html('第'+index+'页没有'+target+'地区房源信息');
        }else{
          data.forEach(function(item){
            let html = tplHtml(item);
            $lists.append(html);
          })
        }
      },
      error: (error) =>{
        console.log(error)
      }
    })
  }
  function tplHtml(data){
    let html;
    let details = data.details.length > 0 ? data.details : '';
    html = `
      <li class="item">
        <h3><a href="${data.url}" target="_blank">${data.title}</a></h3>
        <p>${details}</p>
      </li> 
    `;
    return html;
  }

})