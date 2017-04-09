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
  /*
  既に作成されているキャラデータを読み込む
  */
  chara_dic = getFromLocalStrage("character");
  console.log(chara_dic);
  for(key in chara_dic){
    var baseStatus = "";
    for(i in chara_dic[key]["base"]){
      baseStatus += "<td>" + chara_dic[key]["base"][i] + "</td>";
    }
    $('#ec_table1 tbody').append(
      "<tr>" +
        "<td>" + key + "</td>" + baseStatus +
      "</tr>"
    );
  }
});
