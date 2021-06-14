const path = require("path");
const transcription = require("./lib/transcript.js");
const textsearch = require("./lib/textsearch.js");
const output = require("./lib/output.js");

// var filename = "common_voice_ja_19482498.mp3";
// var filepath = path.join(__dirname, `../tmp/mozila/clips/${filename}`);
var filename = "public_audio_ja-JP_Broadband-sample.wav";
var filepath = path.join(__dirname, `../tmp/ibm/${filename}`);
var words = ["音声", "認識", "でも"];

(async () => {
  // var text = await transcription.execute(filepath);
  // console.log(text);

  // var text = "何は先刻ぷんぷんこの脱却院という方のところを出ですまし。ちゃんと十月へ修養年も近頃同じ活動ですでくらいでなるて来だろをは挨拶しですありて、更ににはいうたたらしくう。魚が曲げたのはもち先刻にもしなたなけれ。もし岡田さんが矛盾人数ずいぶん紹介とかけるう気質そのちりあなたか解がにおいてご沙汰ないましないたが、その毎号はここか本国家がなりて、大森さんのつもりに地位の私を何しろご相違と防ぐと私落よりご想像が得るようにどうも同観念を握っないたから、よほどあに病気にするたばいですはずに怠けですない。";
  var text = "音声認識の現状について教えていただけないでしょうかはい最近では音声認識でもディープラーニングがよく使われていますねこれはどういったものなの？でしょうか簡単に言えば脳の仕組みをモデルにした技術ですこれは難しそうですね。一部では人間の能力を超えるまでになっています";
  // var text = "あいうえおあいうえお";
  var founds = textsearch.execute(text, words);
  output.execute(founds);
  // console.log(founds);
})();

