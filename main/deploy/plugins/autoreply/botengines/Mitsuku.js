const axios = require("axios");
const htmldecode = require("decode-html");

// const MITSUKU_THREADID = "47719737069";
// const TRANS_KEY = "trnsl.1.1.20200421T120324Z.a5209d29ad08ae85.7328dad8e46f00dad4a4cdb9a911868d8ace112b"; // you can use your own yandex translate API KEY
// const emotes = ":3 🙂 😀 😞 😢 😛 😇 😈 o.O 😉 😮 😑  😠 😗 ❤ 😊 😎 😠 ♒ 😕 ♊ ☺ 󰀀 💩 ☀ ☁ ☔ ⚡ ✨ ⭐ ✳ ⛄ ☕ ♨ ⛵ ⛽ ✈ ⛲ ⛺ ⛪ ☎ ✉ ✂ 🚽 🛀 👙 👙 👕 👘 👗 👢 👠 👡 💼 👜 👔 🎩 👒 👑 💍 🚭 ⚽   ⚾ ⚾ ⛳ 🏈 🏀 🎾 🎱 🎯 🎿 🎌 🏁 🏆".split(" ");

module.exports = (api, message) => {
	axios({
		url: "https://kakko.pandorabots.com/pandora/talk-xml",
		data: `input=${encodeURI(message.body)}&botid=9fa364f2fe345a10&custid=${
			message.threadID
		}`,
		method: "POST",
		mode: "no-cors"
	}).then(res => {
		const regexString = /<that>(.*?)<\/that>/.exec(res.data);
		const responseChat = regexString ? regexString[1] : "...";
		const replyMsg = htmldecode(responseChat).replace(/<br>/g, "\n");
		// translate(replyMsg, {
		// 	from: "en",
		// 	to: "vi",
		// 	key:
		// 		"trnsl.1.1.20200421T120324Z.a5209d29ad08ae85.7328dad8e46f00dad4a4cdb9a911868d8ace112b",
		// 	engine: "yandex"
		// }).then(text => {
		// 	console.log(text); // Hola mundo
		// });
		api.replyMessage(replyMsg, message.threadID);
	});
};
