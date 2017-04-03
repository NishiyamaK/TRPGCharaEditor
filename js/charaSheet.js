/*CharacterEditorに関係するscript*/

/*********************
        Step1
*********************/

/** グローバル変数 **/
// キャラステータスに関する変数
var strValue,conValue,powValue,dexValue,appValue,sizValue,intValue,eduValue,
    sanValue, luckValue, ideaValue,knldValue,hpValue,mpValue,dbValue,jobpValue,
    hobpValue;

function saikoro(n, diceSize) {
  /* 最大値diceSizeのサイコロをn回振った合計値を返す */

  var SumValue = 0;
  for(var i=0; i<n; i++){
    SumValue += Math.floor(Math.random() * diceSize) + 1;;
  }
  //console.log("Saikoro = DiceSize:" + n + "D" + diceSize + " = " + SumValue);
  return SumValue;
}

(function() {
    'use strict';
    /* 基礎能力,SAN値決定をランダム決定し、Formに入力する */
    var strValue = document.getElementById('str'),
        conValue = document.getElementById('con'),
        powValue = document.getElementById('pow'),
        dexValue = document.getElementById('dex'),
        appValue = document.getElementById('app'),
        sizValue = document.getElementById('siz'),
        intValue = document.getElementById('int'),
        eduValue = document.getElementById('edu'),

        sanValue = document.getElementById('san'),
        luckValue = document.getElementById('luck'),
        ideaValue = document.getElementById('idea'),
        knldValue = document.getElementById('knowledge'),
        hpValue = document.getElementById('hp'),
        mpValue = document.getElementById('mp'),
        dbValue = document.getElementById('db'),
        jobpValue = document.getElementById('jobp'),
        hobpValue = document.getElementById('hobp'),
        push_cnt = [0,0,0,0,0,0,0,0,0]; /*ボタンの押された回数を記録する*/

    strValue.addEventListener('click', function() {this.select();});
    conValue.addEventListener('click', function() {this.select();});
    powValue.addEventListener('click', function() {this.select();});
    dexValue.addEventListener('click', function() {this.select();});
    appValue.addEventListener('click', function() {this.select();});
    sizValue.addEventListener('click', function() {this.select();});
    intValue.addEventListener('click', function() {this.select();});
    eduValue.addEventListener('click', function() {this.select();});
    sanValue.addEventListener('click', function() {this.select();});
    luckValue.addEventListener('click', function() {this.select();});
    ideaValue.addEventListener('click', function() {this.select();});
    knldValue.addEventListener('click', function() {this.select();});
    hpValue.addEventListener('click', function() {this.select();});
    mpValue.addEventListener('click', function() {this.select();});
    jobpValue.addEventListener('click', function() {this.select();});
    hobpValue.addEventListener('click', function() {this.select();});
    dbValue.addEventListener('click', function() {this.select();});

    /*ボタン処理*/
    rdm_btn.addEventListener('click', function() {
      strValue.value = saikoro(3,6);
      conValue.value = saikoro(3,6);
      powValue.value = saikoro(3,6);
      dexValue.value = saikoro(3,6);
      appValue.value = saikoro(3,6);
      sizValue.value = saikoro(2,6) + 6;
      intValue.value = saikoro(2,6) + 6;
      eduValue.value = saikoro(3,6) + 3;
      push_cnt[0] += 1;
      cnt_all.innerHTML = push_cnt[0] + "回";

      sanValue.value = powValue.value * 5;
      luckValue.value = powValue.value * 5;
      ideaValue.value = intValue.value * 5;
      knldValue.value = eduValue.value * 5;
      hpValue.value = Math.round((Number(conValue.value) + Number(sizValue.value))/2);
      mpValue.value = powValue.value;
      jobpValue.value = eduValue.value * 20;
      hobpValue.value = intValue.value * 10;
      dbValue.value = "N/A";

      //職業P,趣味Pの総量と残量を更新
      $('#skillJobP_cp').val($('#jobp').val());
      $('#skillHobP_cp').val($('#hobp').val());
      $('#skillJobPSum').val($('#jobp').val());
      $('#skillHobPSum').val($('#hobp').val());
    })
    str_btn.addEventListener('click', function() {
      strValue.value = saikoro(3,6);
      dbValue.value = "N/A";
      push_cnt[1] += 1;
      cnt_str.innerHTML = push_cnt[1] + "回";
    });
    con_btn.addEventListener('click', function() {
      conValue.value = saikoro(3,6);
      hpValue.value = Math.round((Number(conValue.value) + Number(sizValue.value))/2);
      push_cnt[2] += 1;
      cnt_con.innerHTML = push_cnt[2] + "回";
    });
    pow_btn.addEventListener('click', function() {
      powValue.value = saikoro(3,6);
      sanValue.value = powValue.value * 5;
      luckValue.value = powValue.value * 5;
      mpValue.value = powValue.value;
      push_cnt[3] += 1;
      cnt_pow.innerHTML = push_cnt[3] + "回";
    });
    dex_btn.addEventListener('click', function() {
      dexValue.value = saikoro(3,6);
      push_cnt[4] += 1;
      cnt_dex.innerHTML = push_cnt[4] + "回";
    });
    app_btn.addEventListener('click', function() {
      appValue.value = saikoro(3,6);
      push_cnt[5] += 1;
      cnt_app.innerHTML = push_cnt[5] + "回";
    });
    siz_btn.addEventListener('click', function() {
      sizValue.value = saikoro(2,6) + 6;
      hpValue.value = Math.round((Number(conValue.value) + Number(sizValue.value))/2);
      dbValue.value = "N/A";
      push_cnt[6] += 1;
      cnt_siz.innerHTML = push_cnt[6] + "回";
    });
    int_btn.addEventListener('click', function() {
      intValue.value = saikoro(2,6) + 6;
      ideaValue.value = intValue.value * 5;
      hobpValue.value = intValue.value * 10;
      push_cnt[7] += 1;
      cnt_int.innerHTML = push_cnt[7] + "回";
      $('#skillHobP_cp').val($('#hobp').val());
    });
    edu_btn.addEventListener('click', function() {
      eduValue.value = saikoro(3,6) + 3;
      knldValue.value = eduValue.value * 5;
      jobpValue.value = eduValue.value * 20;
      push_cnt[8] += 1;
      cnt_edu.innerHTML = push_cnt[8] + "回";
      $('#skillJobP_cp').val($('#jobp').val());
    });
  })();

/********************
        Step2
*********************/
(function(){
  /*
    スキル一覧を生成する
  */

  //各要素にスキル設定を保存
  var skillList=[
    ["回避",20,"#F6CEE3"],
    ["キック",25,"#F6CEE3"],
    ["組付き",25,"#F6CEE3"],
    ["こぶし（パンチ）",50,"#F6CEE3"],
    ["頭突き",10,"#F6CEE3"],
    ["投擲",25,"#F6CEE3"],
    ["マーシャルアーツ",1,"#F6CEE3"],
    ["拳銃",20,"#F6CEE3"],
    ["サブマシンガン",15,"#F6CEE3"],
    ["ショットガン",30,"#F6CEE3"],
    ["マシンガン",15,"#F6CEE3"],
    ["ライフル",25,"#F6CEE3"],
    ["応急手当",30,"#CEF6F5"],
    ["鍵開け",1,"#CEF6F5"],
    ["隠す",15,"#CEF6F5"],
    ["隠れる",10,"#CEF6F5"],
    ["聞き耳",25,"#CEF6F5"],
    ["忍び歩き",10,"#CEF6F5"],
    ["写真術",10,"#CEF6F5"],
    ["精神分析",1,"#CEF6F5"],
    ["追跡",10,"#CEF6F5"],
    ["登攀",40,"#CEF6F5"],
    ["図書館",25,"#CEF6F5"],
    ["目星",25,"#CEF6F5"],
    ["運転（）",20,"#F2F5A9"],
    ["機械修理",20,"#F2F5A9"],
    ["重機械操作",1,"#F2F5A9"],
    ["乗馬",5,"#F2F5A9"],
    ["水泳",25,"#F2F5A9"],
    ["製作（電子工作）",5,"#F2F5A9"],
    ["操縦（）",1,"#F2F5A9"],
    ["跳躍",25,"#F2F5A9"],
    ["電気修理",10,"#F2F5A9"],
    ["ナビゲート",10,"#F2F5A9"],
    ["変装",1,"#F2F5A9"],
    ["言いくるめ",5,"#FAAC58"],
    ["信用",15,"#FAAC58"],
    ["説得",15,"#FAAC58"],
    ["値切り",5,"#FAAC58"],
    ["母国語（）",80,"#FAAC58"],
    ["医学",5,"#D8CEF6"],
    ["オカルト",5,"#D8CEF6"],
    ["科学",1,"#D8CEF6"],
    ["クトゥルフ神話",0,"#D8CEF6"],
    ["芸術（）",5,"#D8CEF6"],
    ["経理",10,"#D8CEF6"],
    ["考古学",1,"#D8CEF6"],
    ["コンピュータ",1,"#D8CEF6"],
    ["心理学",5,"#D8CEF6"],
    ["人類学",1,"#D8CEF6"],
    ["地質学",1,"#D8CEF6"],
    ["生物学",1,"#D8CEF6"],
    ["電子工学",1,"#D8CEF6"],
    ["天文学",1,"#D8CEF6"],
    ["博物学",10,"#D8CEF6"],
    ["物理学",1,"#D8CEF6"],
    ["法律",5,"#D8CEF6"],
    ["薬学",1,"#D8CEF6"],
    ["歴史",20,"#D8CEF6"],
    ["日本語",1,"#F2F2F2"]
  ];

  for(var i=0;i< skillList.length;i++){

    //スキルごとにid=skill${スキル番号}
    //初期値, ジョブP, 趣味P, 合計値にそれぞれ class=skillInit, skillJobP, skillHobP, skillSumP
    $('#skillsTable').append(
      `<tr style="background-color:${skillList[i][2]}">` +
        `<td>${i}</td>` + //スキル番号
        `<td>${skillList[i][0]}</td>` + //スキル名
        `<td><input type="text" class="skill${i} skillInit" value="${skillList[i][1]}" style=\"background-color:${skillList[i][2]}\" readonly="readonly"></td>` +  // 初期値
        `<td><input type="number" class="skill${i} skillJobP" placeholder="0" value="" style=\"background-color:${skillList[i][2]};\"></td>` + //ジョブP
        `<td><input type="number" class="skill${i} skillHobP" placeholder="0" value="" style=\"background-color:${skillList[i][2]};\"></td>` + //趣味P
        `<td><input type="number" class="skill${i} skillSumP" value="${skillList[i][1]}" style=\"background-color:${skillList[i][2]};\" readonly="readonly"></td>` + // 合計
        "</style></tr>"
    );
  }
  //console.log(skillListHTML);
})();

/*
各スキルの合計値計算用関数
*/
$(function() {
  /*
  スキルの職業P, 趣味Pが変更された時に合計値を更新
  */
  $('.skillJobP, .skillHobP').each(function(){
    $(this).change(function(){

      var skillType = $(this).attr('class').split(" ")[1]; //職業P,趣味Pどちらなのかを取得
      var skillNum = $(this).attr('class').split(" ")[0]; //スキル番号
      var skillInit = $(`.${skillNum}.skillInit`).val(); //スキルの初期値
      var otherTypeValue; //趣味Pなら職業P,職業Pなら趣味Pの値を取得
      var capa, maxP; //職業P(あるいは趣味P)の残り容量/最大値
      if(skillType=="skillJobP"){
        capa = $('#skillJobPSum');
        maxP = $("#skillJobP_cp").val();
        otherTypeValue=$(`.${skillNum}.skillHobP`).val()
      }else{
        capa = $('#skillHobPSum');
        maxP = $("#skillHobP_cp").val();
        otherTypeValue=$(`.${skillNum}.skillJobP`).val();
      };

      //0以下であれば0に修正
      if($(this).val() < 0){$(this).val(0)};

      //残り容量を超えている場合入力値を残り容量に置き換え
      console.log("容量:",capa.val(),"入力値:",$(this).val());
      if(capa.val() < Number($(this).val())){
        $(this).val(capa.val());
        console.log("容量を超過したため入力値を修正:",$(this).val());
      };

      //合計値が99を超える場合は99になるように調整
      var limitP = 99-skillInit-otherTypeValue; //現在入力できる最大値(最大99)
      console.log("現在入力できる最大値:",limitP,"入力P:",$(this).val());
      if(limitP < $(this).val()){
        $(this).val(limitP);
        console.log("最大値を超過したため入力値を修正:",$(this).val());
      };

      //スキルの合計値を計算
      $(`.${skillNum}.skillSumP`).val(sumSkillPoint(skillNum));
      //未割当ポイントを更新
      capa.val(maxP - sumSkillTypePoint(skillType));
      console.log(capa.val(), maxP, sumSkillTypePoint(skillType));
    });
  });
});

function sumSkillTypePoint(className){
  /*
  className=skillJobP or skillHobP
  どちらかの合計値を計算して返す
  */
  var sum = 0;
  $(`.${className}`).each(function(){
    sum+=Number($(this).val());
  });
  return sum;
};

function sumSkillPoint(className){
  /*
  classNameをもつクラスの合計値を計算して返す
  */
  var initValue = Number($(`.${className}.skillInit`).val()),
      jobValue = Number($(`.${className}.skillJobP`).val()),
      hobValue = Number($(`.${className}.skillHobP`).val());

  return Number(initValue + jobValue + hobValue);
};

(function () {
  /*
    Table自動ソート
  */
  function sort(tbody, compareFunction) {
    var rows = tbody.children;
    if(!rows || !rows[0] || rows.length == 1) return;
    var size = rows.length;
    var arr = [];
    for(var i = 0; i < size; i++) arr.push(rows[i]);
    arr.sort(compareFunction);
    for(var i = size - 1; i > 0; i--) tbody.insertBefore(arr[i-1], arr[i]);
  }
  function numConvert(s) {
    return s == Number(s) ? Number(s) : s;
  }
  function asc(idx) {
    return function(a, b) {
      var a_ = numConvert(a.children[idx].innerText);
      var b_ = numConvert(b.children[idx].innerText);
      return a_ > b_ ? 1 : -1;
    };
  }
  function desc(idx) {
    return function(a, b) {
      var a_ = numConvert(a.children[idx].innerText);
      var b_ = numConvert(b.children[idx].innerText);
      return a_ < b_ ? 1 : -1;
    };
  }
  function sortEvent(tbody, idx) {
    var mode = true;
    return function(e) {
      if(mode) sort(tbody,  asc(idx));
      else     sort(tbody, desc(idx));
      mode = !mode;
    };
  }
  var ts = document.getElementsByTagName('table');
  for(var i = ts.length; i--; ) {
    var ths = ts[i].tHead.getElementsByTagName('th');
    for(var j = ths.length; j--; )
      ths[j].addEventListener("click", sortEvent(ts[i].tBodies[0], j));
  }
})();
