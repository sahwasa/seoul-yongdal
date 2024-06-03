var fIndex = 0;
var totalfSize = 0;
var fList = [];
var fSizeList = [];
var uploadSize = 1024 * 1024 * 1024; //MB
var maxUploadSize = 200 * 1024 * 1024; //MB
var maxFileLength = 10; //첨부최대갯수
var lastElementId = null; //마지막 접근 파일 업로드 요소 id

function fileDropEvt(el){
  var file_drop = $(el);
  var file_ipt = file_drop.prev('[data-attach]');
  file_ipt.off('change').on('change',function(e){
    var files = e.target.files;
    var thisEl = e.target.dataset.attach;
    selectFile(e,files,thisEl);
  });
  
  file_drop.on("dragover",function drop(e){
    e.stopPropagation();
    e.preventDefault();
  });
  file_drop.on("drop",function(e){
    e.stopPropagation();
    e.preventDefault();
    var files = e.originalEvent.dataTransfer.files; //filelist obj.
    if(files != null){
      if(files.length < 1){
          alert("폴더 업로드 불가"); //ie
          return;
      }else{
        for(var i = 0; i < files.length; i++){
          var fType = files[i].type;
          if(fType == ""){
            alert("폴더 업로드 불가"); //chrome
            return;
          }
        }
      }
      selectFile(e,files,thisEl);
    }else{
        alert("ERROR");
    }
  });

  maxFileLength = 10 //사진의 경우 30개로 변경. 다른 곳에서는 10개로 유지
}

//파일목록 초기화
function resetSelectFile(){
  fList = []
  fIndex = 0;
  $(".attach_list:not(.file_attached .attach_list)").html(''); //file_attached 아래에 있는 경우는 이미 등록된 파일이어서 제외
}
function selectFile(event,fileObject,thisEl){
  let files = null;
  const file = event.target.files[0];
ul 
  //다른 파일 업로드창 접근시 파일목록 초기화
  if(lastElementId !== thisEl){
	// 게시글 수정 및 쪽지 전달시 기존 첨부파일 + 추가된 첨부파일 같이 보내야 함으로 조건 추가 / 김재구 연구원
	// fileList == 게시글수정페이지 및 쪽지전달페이지 첨부파일 id
	if(thisEl !== "fileList"){
	    // resetSelectFile()
	}
    lastElementId = thisEl
  }

  if(fileObject != null){
    files = fileObject;
  }else{
    files = $('#multipaartFileList_' + fIndex)[0].files; //직접등록
  }
  if (files != null){
    if(files.length > maxFileLength){ // =제거
      alert("최대 "+maxFileLength+"개 첨부가능합니다.");
      return
    }
    for(var i = 0; i < files.length; i++){
      var fName = files[i].name; //파일명
      var fNameArr = fName.split("\."); //경로
      var fExt = fNameArr[fNameArr.length - 1]; //확장자
      var fSize = files[i].size / 1024; //사이즈
      const fileArr = Array.prototype.slice.call(event.target.files);  
      var fSrc = URL.createObjectURL(fileArr[i]);
      var type = files[i].type.split("/")[0];
    
      if($.inArray(fExt, ['exe', 'bat', 'sh', 'java', 'jsp', 'html', 'js', 'css', 'xml']) >= 0){
        // 확장자 체크
        alert("등록 불가 확장자");
        break;
      }else if(fSize > uploadSize){
        // 파일 사이즈 체크
        alert("용량 초과\n업로드 가능 용량 : " + uploadSize + " KB");
        break;
      }else if($('#'+thisEl).children().length >= maxFileLength){
        alert("최대 "+maxFileLength+"개 첨부가능합니다.");
        break;
      }else{       
        totalfSize += fSize;// 전체 파일 사이즈
        fList[fIndex] = files[i];// 파일 배열에 넣기
        fSizeList[fIndex] = fSize;// 파일 사이즈 배열에 넣기
        addFileList(fIndex, fName, fSize, fExt, fSrc, type, thisEl);// 업로드 파일 목록 생성
        fIndex++;// 파일 번호 증가
      }
    }
  }else{
    alert("ERROR");
  }
}
function addFileList(fIndex, fName, fSize, fExt, fSrc, type, thisEl){
  var thisEl = thisEl;
  var viewList =  $('#'+thisEl);
  var html = "";
  var fUnit = "KB";
  if(fSize > 1024){
    fSize = fSize / 1024;
    fUnit = "MB";
  }
  fSize = Math.floor(fSize*100)/100;
  html += "<li id='fItem_" + fIndex + "'>";  
  //html += "<i class='ico_ext ext_" + fExt + "'></i>";
  html += fName;
  //html += "<span class='file_size'>" + fSize + fUnit + "</span>";
  html += '<a href="#" onclick="deleteFile(' + fIndex + ',\''+thisEl+'\'); return false;" class="file_del" title="삭제">삭제</a>';
  if (type === "image") html += "<img src='"+fSrc+"' class='attach_thumb'>";
  html += "</li>";
  viewList.append(html);
  infoView(thisEl);
}

function deleteFile(fIndex,id){
  totalfSize -= fSizeList[fIndex];// 전체 파일 사이즈 수정
  delete fList[fIndex];// 파일 배열에서 삭제
  delete fSizeList[fIndex];// 파일 사이즈 배열 삭제
  $("#fItem_" + fIndex).remove();// 업로드 파일 테이블 목록에서 삭제
  infoView(id);

  const nonEmptyFiles = fList.filter(file => file !== undefined && file !== null)
  if (nonEmptyFiles.length === 0)
    $('#'+lastElementId).parent().prev().val('');

}
function infoView(id){
  var fileList = $('#'+id+'.attach_list li').length;
  var info = $('.drop_info');
  (fileList == 0) ? info.show() : info.hide();
}