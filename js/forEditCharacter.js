if (typeof localStorage == 'undefined') {
  console.error("お使いのブラウザではWeb Storageが使えません");
} else {
  var strage = localStorage;

  function setToLocalStrage(k, val){
    /*localStrageに保存する*/
    strage.setItem(k, JSON.stringify(val));
  }
  function getFromLocalStrage(key){
    /*localStrageからkeyのvalueを取得する*/
    return JSON.parse(strage.getItem(key));
  }
  function removeFromLocalStrage(key){
    /*localStrageからkeyを削除する*/
    strage.removeItem(key);
  }
}

$(function(){
  // キャラクター読み込み
  readCharacters();

  // ×ボタンが押された際に該当キャラを削除 ＆ 再読み込み
  $('.delete-btn').click(function(){
    console.log("ボタンが押された");
    var c_name = $(this).attr('name'); //削除するキャラ名を取得
    deleteCharacter(c_name);
    location.reload();
  });
});

function deleteCharacter(name){
  /*
  名前がnameのキャラクターを削除する
  */
  var chara_dic = getFromLocalStrage("character");
  delete chara_dic[name];
  setToLocalStrage("character", chara_dic);
  console.log(name, "を削除しました.");
};

function readCharacters() {
    /*
    既に作成されているキャラデータを再度読み込む
    */
    //一度tableをクリアする
    $('#ec_table1 tbody').empty();

    // 読み込み
    chara_dic = getFromLocalStrage("character");
    for(name in chara_dic){
      var baseStatus = "";
      for(info in chara_dic[name]["base"]){
        baseStatus += "<td>" + chara_dic[name]["base"][info] + "</td>";
      }
      $('#ec_table1 tbody').append(
        "<tr>" +
          "<td>" + name + `<a href="#" class="delete-btn" name="${name}">` +
            '<i class="glyphicon glyphicon-remove"></a></button>' +
          "</td>" + baseStatus +
        "</tr>"
      );
    }
}
