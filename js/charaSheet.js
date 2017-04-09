/*CharacterEditorに関係するscript*/
/*********************
        共通
*********************/
if (typeof localStorage == 'undefined') {
  console.error("お使いのブラウザではWeb Storageが使えません");
} else {
  var strage = localStorage;

  function setToLocalStrage(key, val){
    /*localStrageに保存する*/
    strage.setItem(key, JSON.stringify(val));
    console.log("保存しました");
  }
  function getFromLocalStrage(key){
    /*localStrageからkeyのvalueを取得する*/
    return JSON.parse(strage.getItem(key));
  }
  function removeFromLocalStrage(key){
    /*localStrageからkeyを削除する*/
    strage.removeItem(key);
    console.log("key:", key, "を削除しました.");
  }
}

/*localStrage関連*/
// 初期化
//removeFromLocalStrage("character");

/*********************
        Step1
*********************/

$('#table1 button').click(function(){
  var target = $(this).parents('tr').find('input[type="text"]'); //能力値の要素
  $(target).val(diceBtnAction($(this))).change(); //jQueryはchangeイベントを付与する必要がある！
  // ボタンの押された回数+1
  bdge = $(this).next();
  bdge.text(countBtnPushedTimes(bdge));
});

$('#random_btn').click(function(){
  $('#table1 td:nth-child(3) button').each(function(){
    var target = $(this).parents('tr').find('input[type="text"]'); //能力値の要素
    $(target).val(diceBtnAction($(this))).change();
  })
  $('#step1 #table1 span[class="badge"]').text("");
  //ボタンの押された回数+1
  bdge = $(this).children('span');
  bdge.text(countBtnPushedTimes(bdge));

});

$('#reset_btn_1').click(function(){
  $('#table1 input').val("0").change();
  $('#table2 input').val("0").change();
  $('#step1 span[class="badge"]').text("");
});

$(function(){
  /*table1が変更された時にtable2を更新する*/
  $('#table1 td:nth-child(2) input[type="text"]').each(function(){
    $(this).change(function(){
      /*table2更新*/
      var san = $('#table2 td:contains("SAN値")').next().children('input'),
          lack = $('#table2 td:contains("幸運")').next().children('input'),
          idea = $('#table2 td:contains("アイデア")').next().children('input'),
          knldge = $('#table2 td:contains("知識")').next().children('input'),
          hp = $('#table2 td:contains("耐久力")').next().children('input'),
          mp = $('#table2 td:contains("マジックP")').next().children('input'),
          jp = $('#table2 td:contains("職業技能P")').next().children('input'),
          hbp = $('#table2 td:contains("趣味技能P")').next().children('input'),
          db = $('#table2 td:contains("ダメージボーナス(DB)")').next().children('input');
      var pow = Number($('#table1 td:contains("POW")').next().children('input').val()),
          int = Number($('#table1 td:contains("INT")').next().children('input').val()),
          edu = Number($('#table1 td:contains("EDU")').next().children('input').val()),
          con = Number($('#table1 td:contains("CON")').next().children('input').val()),
          siz = Number($('#table1 td:contains("SIZ")').next().children('input').val()),
          str = Number($('#table1 td:contains("STR")').next().children('input').val());
      san.val(pow * 5);
      lack.val(pow * 5);
      idea.val(int * 5);
      knldge.val(edu * 5);
      hp.val(Math.round((con + siz) / 2));
      mp.val(pow);
      jp.val(edu * 20).change();
      hbp.val(int * 10).change();
      db.val("0");
    });
  });
}());

function diceBtnAction(obj){
  /*
  table1で押されたボタンに対応したダイス値と出力する要素を返す
  */
  var diceInfo = obj.text().split('+') //nDmを取得
  var diceValue = saikoro(diceInfo[0].split('D')); //ダイスを振る

  var addDiceValue = 0; //2D6+1 などの+1の部分を取得する
  if(diceInfo.length==2){
    addDiceValue = Number(diceInfo[1]);
  }
  return diceValue + addDiceValue;
};

function saikoro(diceInfo) {
  /* 最大値diceSizeのサイコロをn回振った合計値を返す
    diceinfo(array) = [n, diceSize]
  */
  var n = diceInfo[0], diceSize = diceInfo[1];
  var SumValue = 0;
  for(var i=0; i<n; i++){
    SumValue += Math.floor(Math.random() * diceSize) + 1;;
  }
  return SumValue;
};

function countBtnPushedTimes(obj){
  /*obj.text()の回数を+1して返す*/
  times = Number(obj.text());
  console.log(times);
  if(times > 0){
    return times + 1;
  }else{
    return 1;
  };
};

/********************
        Step2
*********************/
$(function(){
  /*
  職業P, 趣味Pの最大値が変更された時に修正する
  */
  $('#table2 td:contains("趣味技能P")').next().children('input')
  .change(function(){
    //趣味Pの合計値
    $('#hobp, #hobp_now').val($(this).val());
  });
  $('#table2 td:contains("職業技能P")').next().children('input')
  .change(function(){
    //職業Pの合計値
    $('#jobp, #jobp_now').val($(this).val());
  });
});

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
    $('#table4 tbody').append(
      `<tr style="background-color:${skillList[i][2]}">` +
        `<td>${i}</td>` +
        `<td>${skillList[i][0]}</td>` +
        `<td><input type="text" value="${skillList[i][1]}" style="background-color:${skillList[i][2]}" readonly="readonly"></td>` +
        `<td class="job_col"><input type="number" placeholder="0" value="" style="background-color:${skillList[i][2]};"></td>` +
        `<td class="hob_col"><input type="number" placeholder="0" value="" style="background-color:${skillList[i][2]};"></td>` +
        `<td><input type="number" value="${skillList[i][1]}" style="background-color:${skillList[i][2]};" readonly="readonly"></td>` +
      `</tr>`
    );
  };
})();

$(function(){
  /*
  職業P, 趣味Pいずれかが変更された場合に
  スキルの合計値
  未割当ポイント　を更新する.
  */
  $('.job_col, .hob_col').each(function(){
    $(this).change(function(){
      var inputObj = $(this).children('input');
      // 入力値をチェック
      inValue = checkInputPoint(inputObj.val(), 0, 0, 0);
      inputObj.val(inValue);
      // スキルの合計値を修正
      modifySkillTotal($(this));
      // 未割当ポイントを修正
      modifyUnassignedPoint();
    });
  });
});

function modifySkillTotal(obj){
  /*
  スキルの合計値を修正する.
  */
  var col = obj.parent('tr');
  var skIni = col.find('td:nth-child(3)').children('input').val();
  var skJobP = col.find('td:nth-child(4)').children('input').val();
  var skHobP = col.find('td:nth-child(5)').children('input').val();
  var total = Number(skIni) + Number(skJobP) + Number(skHobP);
  col.find('td:last').children('input').val(total);
};

function modifyUnassignedPoint(){
  /*
  未割当ポイントを修正する.
  */
  var job_sum=0, hob_sum=0;
  $('.job_col').each(function(){
    job_sum += Number($(this).children('input').val());
    console.log(job_sum);
  });
  $('.hob_col').each(function(){
    hob_sum += Number($(this).children('input').val());
    console.log(hob_sum);
  });
  $('#jobp_now').val($('#jobp').val() - job_sum);
  $('#hobp_now').val($('#hobp').val() - hob_sum);
};

function checkInputPoint(p, p_now, capa, capa_now){
  /*
  入力値が条件に当てはまらない場合は修正して返す
  */
  if(p < 0){
    p = 0;
  }
  // 割当ポイントの合計 <= ポイント総量
  // スキルの最大値は99
  return p;
};

/*
最終Step
*/
$(function(){
  /*
  キャラ作成ボタンでローカルストレージにキャラの情報を保存する.
  */
  $('#make_chara_btn').click(function() {
    // 新規保存キャラの保存先
    var new_chara_dic = {base:new Array(), skill:new Array(), info:new Array()};
    var skill_data, name, chara_dic;
    /*
      new_chara_dic = {
        base:[str,con,pow,dex,app,siz,int,edu,san,lack,idea,knlg,hp,mp,hp,jbp,db],
        skill:[[skill名,合計値,rgb],[...,...],...],
        info:[名前,職業,年齢,性別]
      }
    */

    // 基礎能力を取得
    $('#table1 tr').each(function(){
      $(this).children('td:nth-child(2)').children('input').each(function(){
        new_chara_dic["base"].push($(this).val());
      });
    });
    $('#table2 tr').each(function(){
      $(this).children('td:nth-child(2)').children('input').each(function(){
        new_chara_dic["base"].push($(this).val());
      });
    });
    // スキル能力の合計値を取得
    $('#table4 tr').each(function(){
      skill_data = new Array();
      skill_data[0] = $(this).children('td:nth-child(2)').text();
      skill_data[1] = $(this).children('td:last').children('input').val();
      skill_data[2] = $(this).css('background-color');
      new_chara_dic["skill"].push(skill_data);
    });
    new_chara_dic["skill"] = new_chara_dic["skill"].slice(1);
    // その他情報を取得
    $('#table5 tr').each(function(){
      $(this).children('td:last').children('input').each(function(){
        new_chara_dic["info"].push($(this).val());
      });
    });

    // 既に作成されているcharacterのリストを取得
    chara_dic = getFromLocalStrage("character");
    if(chara_dic == null){chara_dic = new Object();}
    // 新規キャラの名前を取得し、辞書に追加
    name = new_chara_dic["info"][0];
    chara_dic[name] = new_chara_dic;
    console.log(new_chara_dic);
    // リストに作成したキャラクターを追加
    setToLocalStrage("character", chara_dic);
    console.log(getFromLocalStrage("character"));
  });
});
