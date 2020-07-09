//init 함수
function all_init() {
    //툴팁 재설정
    tooltip_start();
    //드래그 초기화
    drag_start();
}
all_init();

var container = [];
var container_set = [];
//  [0]박스이름,  [1]장,  [2]폭,   [3]고, [4]수량,[5]단, [6]단 묶음수 , [7]묶음 나머지,[8] 비었음, [9]다단적재 [10]CBM

var box = [];


var radioVal
var old_radioVal = $('input[name="container_size"]:checked').val();

//컨데이너 사이즈 체크
$("input:radio[name=container_size]").click(function () {
    radioVal = $('input[name="container_size"]:checked').val();
    switch (radioVal) {
        case "1톤": //1톤 트럭 260*160*160
            container_set = [260, 160, 160];
            break;
        case "2.5톤": //2.5톤 트럭 420*180*180
            container_set = [420, 180, 180];
            break;
        case "5톤": //5톤 트럭 620*230*230
            container_set = [620, 230, 230];
            break;
        case "11톤": //11톤 트럭  960*240*240
            container_set = [960, 240, 240];
            break;
        case "25톤": //25톤 트럭 1020 * 240 * 240
            container_set = [1020, 240, 240];
            break;
        case "직접입력":
            container_set = container_input;
            break;
        default:
            //위의 값 A~E 모두 아닐때 실행할 명령문;
    }
    chk_boxs();

});

//기본 클릭값
$('input:radio[value="11톤"]').trigger("click");
old_radioVal = "11톤";

//직접입력값 받기
var container_input = [0,0,0];
$("#container_size_1").keyup(function () {
    container_input[0] = Number($("#container_size_1").val());
});

$("#container_size_2").keyup(function () {
    container_input[1] = Number($("#container_size_2").val());
});

$("#container_size_3").keyup(function () {
    container_input[2] = Number($("#container_size_3").val());
});

//직접입력 적용 버튼
$('.container_apply_btn').click(function () {
    $('input:radio[value="직접입력"]').trigger("click");
});



//컨테이너 그리기
function container_css(radioVal) {
    $('#container').css("height", container[0]);
    $('#container').css("width", container[1]);
    $('#container_area').css("width", container[1] + 120);
    $('.container_info1').html(radioVal + " " + container[0] + ' * ' + container[1] + ' * ' + container[2]);
}

//박스높이가 설정하려는 컨테이너보다 작은지 체크
function chk_boxs() {
    console.log('box.length', box.length);
    console.log('초기 container_set', container_set);
    console.log('초기 container', container);

    if (box.length > 0) { //박스가 있으면 박스 높이 너비 체크
        chk_boxs_hw();
        container_css(radioVal);
    } else { //박스 없으면 바로 컨테이너 변경
        container = container_set;
        container_css(radioVal);
    }
    console.log('체크후 container_set', container_set);
    console.log('체크후 container', container);

}

function chk_boxs_hw() {
    //높이순으로 정렬
    var boxs_height = [];
    for (var i = 0; i < box.length; i++) {
        //박스묶음 높이 = 박스 높이 * 설정 다단적재
        boxs_height[i] = box[i][3] * box[i][9];
    }
    var length = boxs_height.length;
    var i, j, temp;
    //큰순으로 정렬
    for (i = 0; i < length - 1; i++) { // 순차적으로 비교하기 위한 반복문
        for (j = 0; j < length - 1 - i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문
            if (boxs_height[j] < boxs_height[j + 1]) { // 두 수를 비교하여 앞 수가 뒷 수보다 작으면
                temp = boxs_height[j]; // 두 수를 서로 바꿔준다
                boxs_height[j] = boxs_height[j + 1];
                boxs_height[j + 1] = temp;
            }
        }
    }
    console.log('boxs_height', boxs_height);

    //너비순으로 정렬
    var boxs_width = [];
    for (var i = 0; i < box.length; i++) {
        //박스묶음 높이 = 박스 높이 * 설정 다단적재
        boxs_width[i] = box[i][2];
    }
    var length = boxs_width.length;
    var i, j, temp;
    //큰순으로 정렬
    for (i = 0; i < length - 1; i++) { // 순차적으로 비교하기 위한 반복문
        for (j = 0; j < length - 1 - i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문
            if (boxs_width[j] < boxs_width[j + 1]) { // 두 수를 비교하여 앞 수가 뒷 수보다 작으면
                temp = boxs_width[j]; // 두 수를 서로 바꿔준다
                boxs_width[j] = boxs_width[j + 1];
                boxs_width[j + 1] = temp;
            }
        }
    }
    console.log('boxs_width', boxs_width);



    if (boxs_height[0] > container_set[2]) {
        $('input[value="' + old_radioVal + '"]').prop('checked', true);
        console.log('고 높음 radioVal', radioVal);
        console.log('고 높음 container_set', container_set);
        console.log('고 높음 container', container);
        alert('설정되어있는 단수*박스높이가 변경하려는 컨테이너의 고보다 높습니다.');
        radioVal = old_radioVal;

    }

    if (boxs_width[0] > container_set[1]) {
        $('input[value="' + old_radioVal + '"]').prop('checked', true);
        console.log('폭 큼 radioVal', radioVal);
        console.log('폭 큼 container_set', container_set);
        console.log('폭 큼 container', container);
        alert('설정되어있는 박스너비가 변경하려는 컨테이너의 폭보다 큽니다.');
        radioVal = old_radioVal;
    }

    if ((boxs_height[0] <= container_set[2]) && (boxs_width[0] <= container_set[1])) {
        console.log('박스 벨리데이션 통과 container_set', container_set);
        console.log('박스 벨리데이션 통과 before_container', container);

        old_radioVal = radioVal;
        $('input[value="' + radioVal + '"]').prop('checked', true);

        container = container_set;
        container_css(radioVal);
        //박스 다시넣기
        boxincontainer_init();
        console.log('박스 벨리데이션 통과 radioVal', radioVal);
        console.log('박스 벨리데이션 통과 after_container', container);
    }
}



//박스 입력 벨리데이션
$("#box_val_2").keyup(function () {
    var val = $(this).val();
    if (val > container[0]) {
        alert("컨테이너를 초과하는 장입니다.");
        $(this).val(null);
    }
});
$("#box_val_3").keyup(function () {
    var val = $(this).val();
    if (val > container[1]) {
        alert("컨테이너를 초과하는 폭입니다.");
        $(this).val(null);
    }
});
$("#box_val_4").keyup(function () {
    var val = $(this).val();
    if (val > container[2]) {
        alert("컨테이너를 초과하는 고입니다.");
        $(this).val(null);
    }
});
$("#box_val_6, #box_val_4").keyup(function () {
    var val_1 = $('#box_val_4').val(); //고
    var val_2 = $('#box_val_6').val(); //최대단수
    // 최대단수 사용안함 체크여부 확인
    $("#chk_no_dan").change(function () {
        if ($("#chk_no_dan").is(":checked")) {
            val_1 = 0;
        }
        if ((val_1 * val_2) > container[2]) {
            alert("최대단수*박스 높이가 컨테이너 높이를 초과합니다.");
            $(this).val(null);
        }
    });
});
// 최대단수 사용안함 체크여부 확인
$("#chk_no_dan").change(function () {
    if ($("#chk_no_dan").is(":checked")) {
        $('#box_val_6').attr('disabled', true);
    } else {
        $('#box_val_6').removeAttr('disabled', false);
    }
});


//소터블(박스목록 드래그)
$("#boxlist").sortable({
    placeholder: 'ul-state-highlight',
    update: function (event, ui) {
        var result = $(this).sortable('toArray', {
            attribute: 'value'
        });
        for (var i = 0; i < result.length; i++) {
            box[i] = result[i].split(',');
            for (var j = 1; j < box[i].length; j++) {
                box[i][j] = Number(box[i][j]);

            }
        }
        console.log('box', box);
        //컨테이너 박스넣기 재실행
        boxincontainer_init();
    }
});
$("#boxlist").disableSelection();

//적재함 토글
$("#togle_btn").on("click", function () {
    $("#togle_body").toggle(function () {
        boxlist_height();
    });
});
//박스추가 토글
$("#togle_btn2").on("click", function () {
    $("#togle_body2").toggle(function () {
        boxlist_height();
    });
});
//전체 토글
$("#togle_btn3").on("click", function () {
    $(".all_toggle_body").toggle(function () {
        boxlist_height();
    });
});
//박스 리스트 사이즈 조절
function boxlist_height() {
    if (800 < window.innerHeight) {
        var top = $('.box_list_panel').position().top;
        top = top + 160;
        var max_height = 'calc(100vh - ' + top + 'px)';
        $('#boxlist').css('max-height', max_height);
        $('#input_area').css('position', 'fixed');

    } else {
        //브라우저 높이 660 이하일떄는 최대높이 없음
        $('#boxlist').css('max-height', 'none');
        $('#input_area').css('position', 'relative');
    }

}
$(window).resize(function () {
    boxlist_height();
});


//드래그 시작
function drag_start() {
    $(function () {
        $(".box").draggable({
            snap: ".box,#container",
            containment: "document",
            cursor: "crosshair",
            delay: 200,
            opacity: 0.5,
            zIndex: 100,
            stack: ".box",
            stop: function () {
                //박스 위치 길이, 너비 구하기
                get_boxs_heigth();
            }

        });
    });
    $(".box_inner").droppable({
        drop: function (event, ui) {
            $(this).removeClass("bg_red");
            $(this)
                .addClass("ui-state-highlight")
                .addClass("bg_red");
        },
        out: function (event, ui) {
            $(this)
                .addClass("ui-state-highlight")
                .removeClass("bg_red");
        },
        tolerance: "touch",
    });
}
//툴팁 시작
function tooltip_start() {
    //툴팁 초기화
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'click',
        //delay: { "show": 0, "hide": 1500 }
        container: '#container_area',

    });

    //컨테이너 밖으로 나가면 툴팁 닫음
    $('#container_area')
        .on('mouseleave focusout', function () {
            $('.box_info').tooltip('hide');
        });
}

//툴팁 장폭고 버튼 트리거
function tooltip_triger_ho_btn(idx) {
    idx = idx + 1;
    $('#boxlist li:nth-of-type(' + idx + ') .glyphicon-resize-horizontal').trigger('click');
}

function tooltip_triger_ver_btn(idx) {
    idx = idx + 1;
    $('#boxlist li:nth-of-type(' + idx + ') .glyphicon-resize-vertical').trigger('click');
}


//박스 추가 버튼
function addBoxValue_btn() {
    var new_box = [];

    //[0]박스이름,  [1]장,  [2]폭,   [3]고, [4]수량,[5]단, [6]단 묶음수 , [7]묶음 나머지,[8] 비었음,[9]최대단수 설정
    new_box[0] = $('#box_val_1').val(); //박스이름
    new_box[1] = Number($('#box_val_2').val()); //장
    new_box[2] = Number($('#box_val_3').val()); //폭
    new_box[3] = Number($('#box_val_4').val()); //고
    new_box[4] = Number($('#box_val_5').val()); //수량
    new_box[5] = 1; //기본값 설정
    new_box[6] = 1; //기본값 설정
    new_box[7] = 0; //기본값 설정

    if ($("#chk_no_dan").is(":checked")) {
        new_box[9] = 0;
    } else {
        new_box[9] = Number($('#box_val_6').val()); //최대단수 설정
    }

    if (new_box[1] == "" || new_box[2] == "" || new_box[3] == "" || new_box[4] == "") {
        alert('장폭고, 수량을 다 입력해주세요.');
    } else if (new_box[1] > container[0]) {
        alert("컨테이너를 초과하는 장입니다.");
    } else if (new_box[2] > container[1]) {
        alert("컨테이너를 초과하는 폭입니다.");
    } else if (new_box[3] > container[2]) {
        alert("컨테이너를 초과하는 고입니다.");
    } else if ((new_box[9] * new_box[3]) > container[2]) {
        alert("최대단수*박스 높이가 컨테이너 높이를 초과합니다.");
    } else {
        //단수와 나머지 박스 계산
        //  [0]박스이름,  [1]장,  [2]폭,   [3]고, [4]수량,[5]단, [6]단 묶음수 , [7]묶음 나머지,[8] 비었음, [9]다단적재 [10]CBM
        var dan = parseInt(container[2] / new_box[3]); //컨테이너 높이 나누기 물건 높이 = 최대 단수
        if (dan >= 1) { //1단 이상으로 쌓을수 있을때 = 적재가능
            if (new_box[9] != "0") { //다단적재가 0이 아니고, 높이 *최대단수가 컨테이너 높이보다 작으면 단을 최대단수로 입력
                dan = new_box[9];
                console.log((new_box[9] * new_box[3]) < container[2]);
            }
            if (new_box[4] > dan) { //최대 단수보다 수량이 많을때
                new_box[6] = parseInt(new_box[4] / dan); //수량을 단으로 나눔 = 묶음 수 (표시되는 상자 수)
                console.log("묶음 수", new_box[6]);
                new_box[5] = dan; //단수 입력
                new_box[7] = new_box[4] % dan; //묶음 나머지수
                console.log("묶음 나머지 수", new_box[7]);

            } else { //단수로 쌓을수 있으나 그보다 수량이 적거나 같을때
                //단수 = 수량 (수량이 단수가 됨)
                new_box[5] = new_box[4];
                //단묶음수 = 1
                new_box[6] = 1;
            }
            box.push(new_box);

            boxincontainer_init()

        } else { //1단 이하로 쌓아질떄 = 적재불가
            alert(new_box[0] + " 박스는 컨테이너 높이를 초과하는 박스입니다.");
        }
    }

}
//초기화후 박스 넣기
function boxincontainer_init() {
    $('#container').empty(); //컨테이너 내용물 초기화
    //루프돌며 박스 생성
    for (var i = 0; i < box.length; i++) {
        //단수 다시계산
        //  [0]박스이름,  [1]장,  [2]폭,   [3]고, [4]수량,[5]단, [6]단 묶음수 , [7]묶음 나머지,[8] 비었음
        var dan = parseInt(container[2] / box[i][3]); //컨테이너 높이 나누기 물건 높이 = 최대 단수
        if (dan >= 1) { //1단 이상으로 쌓을수 있을때 = 적재가능
            if (box[i][9] != "0") { //다단적재가 0이 아니면 단수 다단적재로 강제 입력
                dan = box[i][9];
            }
            if (box[i][4] > dan) { //최대 단수보다 수량이 많을때
                box[i][6] = parseInt(box[i][4] / dan); //수량을 단으로 나눔 = 묶음 수 (표시되는 상자 수)
                console.log("묶음 수", box[i][6]);
                box[i][5] = dan; //단수 입력
                box[i][7] = box[i][4] % dan; //묶음 나머지수
                console.log("묶음 나머지 수", box[i][7]);

            } else { //단수로 쌓을수 있으나 그보다 수량이 적거나 같을때
                //단수 = 수량 (수량이 단수가 됨)
                box[i][5] = box[i][4];
                //단묶음수 = 1
                box[i][6] = 1;
            }
        }

        //묶음 생성
        for (var j = 0; j < box[i][6]; j++) { //단 묶음수길이만큼 돌림
            dan = box[i][5];
            boxincontainer(box[i], i, dan);
        }
        if (box[i][7] > 0) { //묶음 나머지가 있는 박스라면
            //단을 나머지로 변경하여
            dan = box[i][7];
            //한번더 박스 추가
            boxincontainer(box[i], i, dan);
        }
    }
    //박스 리스트 초기화
    box_list_init();
    //박스 위치 길이, 너비 구하기
    get_boxs_heigth();
}
//박스 넣기 
function boxincontainer(new_box, idx, dan) {
    //툴팁 가로세로 장폭고 버튼 -> 박스 리스트의 가로세로버튼 트리거
    var garosero_btn = "<span class='glyphicon glyphicon-resize-horizontal change_size' onclick='tooltip_triger_ho_btn(" + idx + ");' box_idx='" + idx + "'></span><span class='glyphicon glyphicon-resize-vertical change_size' onclick='tooltip_triger_ver_btn(" + idx + ");' box_idx='" + idx + "'></span><br/>";
    //박스명 체크
    var box_name_in_box = "";
    //박스 이름 있으면 <br/>추가
    if (new_box[0] != "") {
        box_name_in_box = new_box[0] + '<br/>';
    }
    var in_css = "";
    var tooltip_dan = "";

    if (new_box[1] >= 200 && new_box[2] >= 200) {
        //박스 200*200 이상이면 글씨 검정
        in_css = in_css + "color:#333;";
    }
    if (new_box[9] == 0) { //최대단수 설정 안하면
        in_css = in_css + "border:1px solid #fff;";
    } else {
        //최대단수 설정했으면 툴팁에 최대단수 표시
        tooltip_dan = '<br/>최대단수 ' + new_box[9] + '단';
    }

    var bg_color = new_box[1] + ',' + new_box[2] + ',' + new_box[3];
    var box_html = '<div class="box" style="width:' + new_box[2] + 'px; height:' + new_box[1] + 'px; background:rgb(' + bg_color + ');' + in_css + '" box_idx="' + idx + '" box_dan="' + dan + '"><div class="box_inner" style="width:' + (new_box[2] - 2) + 'px; height:' + (new_box[1] - 2) + 'px;">' +
        //박스 정보
        '<span  class="box_info"' +
        //툴팁
        'data-toggle="tooltip" data-html="true" data-placement="left" title="' + garosero_btn + box_name_in_box + new_box[1] + ' * ' + new_box[2] + ' * ' + new_box[3] + '<br/>' + dan + '단' + tooltip_dan + '"> ' +
        box_name_in_box + new_box[1] + ' * ' + new_box[2] + ' * ' + new_box[3] + '<br/>' + dan + '단<span></div></div>';
    $('#container').append(box_html);
    all_init();
}

//박스 리스트 가져오기
function box_list_init() {
    $('#boxlist').empty(); //박스리스트 초기화
    var all_CBM = 0;

    for (var i = 0; i < box.length; i++) {
        var dansu = '<span class="badge"> ' + box[i][9] + '단</span>';
        var box_name = "";
        //조건따라 단수유무, 배경색 설정
        if (box[i][9] != "0" && box[i][9] > box[i][4]) { //최대단수 설정이 수량보다 크면 뱃지 비활성화
            dansu = '<span class="badge" style="background-color:#bbb;"> ' + box[i][9] + '단</span>';
        } else if (box[i][9] != "0") {} else { //최대단수 설정이 없으면
            dansu = '<span class="badge" style="background-color:#fff;color:#414344;border: 1px solid #414344;">자동</span>';;
        }

        if (box[i][0] != "") {
            box_name = '<p>' + box[i][0] + '</p>';
        }

        //#boxlist에 넣기
        var CBM = (box[i][1] * 0.01) * (box[i][2] * 0.01) * (box[i][3] * 0.01) * box[i][4];
        CBM = Math.floor(CBM * 100) / 100;
        all_CBM = all_CBM + CBM;
        all_CBM = Math.floor(all_CBM * 100) / 100;

        var append = '<li class="ui-state-default" style="border-color:rgb(' + box[i][1] + ',' + box[i][2] + ',' + box[i][3] + ');" value="' + box[i] + '">' +
            box_name + '<strong>' + box[i][1] + '*' + box[i][2] + '*' + box[i][3] + '</strong>' + box[i][4] + '개 ' +
            //그룹
            '<div class="list_btn_group">' +
            //단수 뱃지
            dansu +
            //CBM
            '<span class="badge"> ' + CBM + 'CBM</span>' +
            //위아래 버튼
            '<span class="glyphicon glyphicon-triangle-top change_size" aria-hidden="true" onclick="ch_up_btn(' + i + ');"></span>' +
            '<span class="glyphicon glyphicon-triangle-bottom change_size" aria-hidden="true" onclick="ch_down_btn(' + i + ');"></span>' +
            //장폭고 버튼
            '<span class="glyphicon glyphicon-resize-horizontal change_size" aria-hidden="true"onclick="ch_garo_btn(' + i + ');"></span>' +
            '<span class="glyphicon glyphicon-resize-vertical change_size" aria-hidden="true" onclick="ch_sero_btn(' + i + ');"></span>' +
            //삭제버튼
            '<span class="glyphicon glyphicon-remove" aria-hidden="true" onclick="box_list_delet_btn(' + i + ')"></span> ' +
            '</div>' +
            '</li>';
        $('#boxlist').append(append);
    }
    $('.all_cbm').html('총 ' + all_CBM + ' CBM');
    console.log("all_CBM", all_CBM);
    all_init();
}
//박스 삭제
function box_list_delet_btn(i) {
    var spliced = box.splice(i, 1); //해당 인덱스 배열 삭제
    //컨테이너 박스넣기 재실행
    boxincontainer_init();
}




//폭 작은순 정렬하고 컨테이너 넣기
function start_bubbleSort1_btn() {
    bubbleSort1(box);
    //컨테이너 박스넣기 재실행
    boxincontainer_init();
}
//장 작은순 정렬하고 컨테이너 넣기
function start_bubbleSort2_btn() {
    bubbleSort2(box);
    //컨테이너 박스넣기 재실행
    boxincontainer_init();
}
//폭 큰순 정렬하고 컨테이너 넣기
function start_bubbleSort1_2_btn() {
    bubbleSort1_2(box);
    //컨테이너 박스넣기 재실행
    boxincontainer_init();
}
//장 큰순 정렬하고 컨테이너 넣기
function start_bubbleSort2_2_btn() {
    bubbleSort2_2(box);
    //컨테이너 박스넣기 재실행
    boxincontainer_init();
}
//작은순으로정렬
var bubbleSort1 = function (array) {
    var length = array.length;
    var i, j, temp;
    //폭 비교
    for (i = 0; i < length - 1; i++) { // 순차적으로 비교하기 위한 반복문
        for (j = 0; j < length - 1 - i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문
            if (array[j][2] > array[j + 1][2]) { // 두 수를 비교하여 앞 수가 뒷 수보다 크면
                temp = array[j]; // 두 수를 서로 바꿔준다
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;

};
var bubbleSort2 = function (array) {
    var length = array.length;
    var i, j, temp;
    //장비교
    for (i = 0; i < length - 1; i++) { // 순차적으로 비교하기 위한 반복문
        for (j = 0; j < length - 1 - i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문
            if (array[j][1] > array[j + 1][1]) { // 두 수를 비교하여 앞 수가 뒷 수보다 크면
                temp = array[j]; // 두 수를 서로 바꿔준다
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
};
//큰순으로정렬
var bubbleSort1_2 = function (array) {
    var length = array.length;
    var i, j, temp;
    //폭 비교
    for (i = 0; i < length - 1; i++) { // 순차적으로 비교하기 위한 반복문
        for (j = 0; j < length - 1 - i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문
            if (array[j][2] < array[j + 1][2]) { // 두 수를 비교하여 앞 수가 뒷 수보다 작으면
                temp = array[j]; // 두 수를 서로 바꿔준다
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;

};
var bubbleSort2_2 = function (array) {
    var length = array.length;
    var i, j, temp;
    //장비교
    for (i = 0; i < length - 1; i++) { // 순차적으로 비교하기 위한 반복문
        for (j = 0; j < length - 1 - i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문
            if (array[j][1] < array[j + 1][1]) { // 두 수를 비교하여 앞 수가 뒷 수보다 작으면
                temp = array[j]; // 두 수를 서로 바꿔준다
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;

};


//박스목록 비우기
function all_delet_boxlist_btn() {
    var con_test = confirm("박스목록을 모두 지우시겠습니까?");
    if (con_test == true) {
        box = [];
        //컨테이너 박스넣기 재실행
        boxincontainer_init();
    }
}

//박스 장폭 변경
function ch_garo_btn(i) {
    $('.box_info').tooltip('hide');
    var target_box = $('.box[box_idx="' + i + '"]');
    //i번쨰 배열의 장폭 변경
    var d = "";
    console.log("box[i][1]", box[i][1]);
    d = box[i][1]; //d에 장 담아놓음
    box[i][1] = box[i][2]; //장에 폭 넣음
    box[i][2] = d; //폭에 장 넣음

    boxincontainer_init();
};
//폭고 토글
function ch_sero_btn(i) {
    $('.box_info').tooltip('hide');
    var target_box = $('.box[box_idx="' + i + '"]');
    //i번쨰 배열의 폭고 변경
    var d = "";
    console.log("box[i][2]", box[i][2]);
    d = box[i][2]; //d에 폭 담아놓음
    box[i][2] = box[i][3]; //폭에 고 넣음
    box[i][3] = d; //고에 폭 넣음

    boxincontainer_init();
};

//박스 목록 위로 버튼
function ch_up_btn(i) {
    if (i != 0) {
        var d = "";
        d = box[i - 1];
        box[i - 1] = box[i];
        box[i] = d;

        //컨테이너 박스넣기 재실행
        boxincontainer_init();
    }
};
//박스 목록 아래로 버튼
function ch_down_btn(i) {
    var box_leng = box.length;
    if (i + 1 != box_leng) {
        var d = "";
        d = box[i + 1];
        box[i + 1] = box[i];
        box[i] = d;

        //컨테이너 박스넣기 재실행
        boxincontainer_init();
    }
};
//박스 위치 길이, 너비 구하기
function get_boxs_heigth() {
    var box_position = [];
    var start = $('#container').position();
    console.log("start ", start, "bottom", (start.top + container[0]), "right", (start.left + container[0]));
    //자식들 복사
    var boxs = $('#container').children();
    for (var i = 0; i < boxs.length; i++) {
        //자식 위치와 높이 너비 객체배열화
        box_position[i] = boxs.eq(i).position();
        box_position[i].box_idx = Number(boxs[i].attributes[2].value);
        box_position[i].box_dan = Number(boxs[i].attributes[3].value);
        box_position[i].height = boxs.eq(i).height() + 2;
        box_position[i].width = boxs.eq(i).width() + 2;
        box_position[i].bottom = box_position[i].top + box_position[i].height;
        box_position[i].right = box_position[i].left + box_position[i].width;

    }

    //객체 복사
    var box_position_width = box_position.slice();
    var box_position_height = box_position.slice();

    //너비 큰순으로 정렬
    var length = box_position_width.length;
    var i, j, temp;
    //폭 비교
    for (i = 0; i < length - 1; i++) { // 순차적으로 비교하기 위한 반복문
        for (j = 0; j < length - 1 - i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문
            if (box_position_width[j].right < box_position_width[j + 1].right) { // 두 수를 비교하여 앞 수가 뒷 수보다 작으면
                temp = box_position_width[j]; // 두 수를 서로 바꿔준다
                box_position_width[j] = box_position_width[j + 1];
                box_position_width[j + 1] = temp;
            }
        }
    }
    console.log("너비 큰순 정렬", box_position_width);

    //밖으로 나간거 제외
    array_out(box_position_width, start);
    array_out(box_position_width, start);
    console.log("너비 큰순 정렬2", box_position_width);


    //높이 큰순으로 정렬
    var length = box_position_height.length;
    var i, j, temp;
    //폭 비교
    for (i = 0; i < length - 1; i++) { // 순차적으로 비교하기 위한 반복문
        for (j = 0; j < length - 1 - i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문
            if (box_position_height[j].bottom < box_position_height[j + 1].bottom) { // 두 수를 비교하여 앞 수가 뒷 수보다 작으면
                temp = box_position_height[j]; // 두 수를 서로 바꿔준다
                box_position_height[j] = box_position_height[j + 1];
                box_position_height[j + 1] = temp;
            }
        }
    }
    console.log("높이 큰순 정렬", box_position_height);

    //밖으로 나간거 제외
    array_out(box_position_height, start);
    array_out(box_position_height, start);
    console.log("높이 큰순 정렬2", box_position_height);


    //가장 높은 고 구하기 
    var box_height = [];
    for (i = 0; i < box_position_height.length; i++) {
        box_height[i] = box[box_position_height[i].box_idx][3] * box_position_height[i].box_dan;
        //console.log("box_position_height.height",i,box_position_height[i].height);
        //console.log("box_position_height.box_dan",i,box_position_height[i].box_dan);
    }
    var length = box_height.length;
    var i, j, temp;
    for (i = 0; i < length - 1; i++) { // 순차적으로 비교하기 위한 반복문
        for (j = 0; j < length - 1 - i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문
            if (box_height[j] < box_height[j + 1]) { // 두 수를 비교하여 앞 수가 뒷 수보다 작으면
                temp = box_height[j]; // 두 수를 서로 바꿔준다
                box_height[j] = box_height[j + 1];
                box_height[j + 1] = temp;
            }
        }
    }

    console.log("box_position", box_position);

    if (box_position_width.length > 0 && box_position_height.length > 0) {

        //너비 높이는 맨 오른쪽 - 맨 왼쪽 
        full_width = box_position_width[0].right - box_position_width[box_position_width.length - 1].left;
        //소수점 반올림
        full_width = Math.floor(full_width * 100) / 100;

        full_height = box_position_height[0].bottom - box_position_height[box_position_height.length - 1].top;
        full_height = Math.floor(full_height * 100) / 100;
    } else {
        full_width = 0;
        full_height = 0;
        box_height[0] = 0;
    }


    console.log("full", full_height, full_width, box_height[0]);


    $('.full_box').html(" 박스 너비 " + full_height + ' * ' + full_width + ' * ' + box_height[0] + ' = ' + numberWithCommas((full_height * full_width * box_height[0]) / 100) + "㎥");

}
//밖으로 나가는 배열 제거
function array_out(array, start) {

    for (var j = 0; j < array.length; j++) {

        for (var i = 0; i < array.length; i++) {
            //console.log("in array", array);
            if (array[i].right > (start.left + container[1])) {
                //옆 오른쪽으로 붙거나 나가면 잘라냄
                array.splice(i, 1);
            } else if (array[i].left < start.left) {
                //옆 왼쪽으로 나가면 잘라냄
                array.splice(i, 1);
            } else if (array[i].bottom > (start.top + container[0])) {
                //아래로 붙거나 나가면 잘라냄
                array.splice(i, 1);
            } else if (array[i].top < start.top) {
                //위로 나가면 잘라냄
                array.splice(i, 1);
            }
            //console.log("out array", array);
        }
    }
}


//콤마
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}