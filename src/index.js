const path = require("path");
const transcription = require("./lib/transcript.js");
const textsearch = require("./lib/textsearch.js");

var filename = "common_voice_ja_19482498.mp3";
var filepath = path.join(__dirname, `../tmp/mozila/clips/${filename}`);


(async () => {
  // var text = await transcription.execute(filepath);
  // console.log(text);

  var text = "何は先刻ぷんぷんこの脱却院という方のところを出ですまし。ちゃんと十月へ修養年も近頃同じ活動ですでくらいでなるて来だろをは挨拶しですありて、更ににはいうたたらしくう。魚が曲げたのはもち先刻にもしなたなけれ。もし岡田さんが矛盾人数ずいぶん紹介とかけるう気質そのちりあなたか解がにおいてご沙汰ないましないたが、その毎号はここか本国家がなりて、大森さんのつもりに地位の私を何しろご相違と防ぐと私落よりご想像が得るようにどうも同観念を握っないたから、よほどあに病気にするたばいですはずに怠けですない。";
  // var text = "あいうえおあいうえお";
  var words = ["何", "脱却", "ろ"];
  var founds = textsearch.execute(text, words);
  console.log(founds);
})();

