let count = 0;
let row = 1;
let isShuffled = false;
let appNames = ["Slack", "Outlook", "Tech::Chat", "Gmail"];
let icons = ["icons/slack.png", "icons/outlook.png", "icons/tech-chat.png", "icons/gmail.png"];
let responses = [["#general:<strong>@here</strong> 至急連絡お願いし...", "#techcamp-shibuya: <strong>@channel</strong> お疲れ様です。シフト募...", "@hosaka_yusuke: お疲れ様です。シフト申請...", "#shibuya_user_<br>question: <strong>【席番号35】</strong> 篠崎 かれん(シノザキ カレン)...", "#shibuya_user_<br>question: <strong>【席番号52】</strong>test test()さんから質問です...", "#shibuya_user_<br>question: <strong>@here</strong> 35番の方watsonです。webの方対応..."],
									["<strong>至急:お支払いのお願い</strong><br>未払いのお支払いがあります。詳し...", "<strong>家賃支払いのお願い</strong><br>今月分の家賃が支払われてお...", "<strong>次回の会議について</strong><br>先日はありがとうございまし..."],
									["篠崎 かれん(シノザキ カレン)さんから質問です。", "岡田 菜央(オカダ ナオ)さんから質問です。", "横倉 達也(ヨコクラ タツヤ)さんから質問です。", "荒井亮太郎(アライ リョウタロウ) さんから質問です。"],
									["<strong>至急:お支払いのお願い</strong><br>未払いのお支払いがあります。詳し...", "<strong>家賃支払いのお願い</strong><br>今月分の家賃が支払われてお...", "<strong>次回の会議について</strong><br>先日はありがとうございまし..."]]

window.onload = function(){
  document.getElementById("start-btn").onclick = start;
	document.getElementById("reset").onclick = shuffle;
}

function start() {
	document.getElementById("start").classList.add("bodyfadeout");
	document.getElementById("field").classList.remove("hidden");
	document.getElementById("wrap").classList.add("bodyfadeout");
	setInterval(function() {
	  prePush()
	}, 1500);
}

function prePush() {
	if (count/5 >= 1) {
		setInterval(function() {
	  	push();
		}, 60000/count);
	}
	push();
	
}

function push() {
	let i = Math.floor(Math.random() * appNames.length);
	let j = Math.floor(Math.random() * responses[i].length);
	let title = appNames[i];
	let str = responses[i][j];
	clicked(title, str, i);
}

function clicked(title, str, i) { 
	let icon = icons[i];
  Push.create(removeHTML(title), {
    body: removeHTML(str),
    icon: icons[i],
    timeout: 1500,
    onClick: function () {
        window.focus();
        this.close();
    }
	});
	let html = "<strong>" + title + "</strong></br>" + str;
	add(html, i);
}

function add(str, i) {
	count++;

	let newNode = document.createElement('div');
	newNode.appendChild(makeIcon(i));
	newNode.appendChild(makeP(str));

	newNode.classList.add('node');

	if (isShuffled) {
		rotate(newNode);
	}

	document.getElementById("field").appendChild(newNode);

	let wdt = getWidth();
	let ht = "calc(" + wdt + "* 0.5625" + ")";

	let nodes = document.querySelectorAll('.node');
	Array.prototype.forEach.call(nodes, node => {
	  node.style.width = wdt;
		node.style.height = ht;
		node.style.fontSize = getFontSize();
	});

	if (getSquareRoot(count)) {
		row++;
	}

	if ( row > 10 && document.getElementById("reset").classList.contains("hidden")) {
		document.getElementById("reset").classList.remove("hidden");
	}
}


function getSquareRoot(num) {
  let sq = Math.sqrt(num);
  return Number.isInteger(sq);
}

function getWidth() {
	console.log(row);
	let ratio = 1 / row;
	let wdt = "calc(85vw *" + ratio + ")";
	return wdt;
}

function getFontSize() {
	let ratio = 1 / row;
	let font = 60 * ratio;
	return font + "pt";
}


function shuffle() {
	document.getElementById("reset").classList.add("hidden");
	let nodes = document.querySelectorAll('.node');
	Array.prototype.forEach.call(nodes, node => {
		rotate(node);
	});
	isShuffled = true;
	setTimeout('document.getElementById("after").classList.remove("hidden")', 1500);
	
}

function changeAfter() {
	document.getElementById("after").classList.add("bodyfadein");
	document.getElementById("after").classList.remove("hidden");
}

function makeIcon(i) {

	let img = document.createElement('img');
	img.src = icons[i];
	
	return img;

}

function makeP(str) {
	let p = document.createElement('p');
	p.innerHTML = str;
	return p;
}

function rotate(node) {
	let randNum = Math.floor(Math.random()*360-180);
	node.style.transform = "rotate(" + randNum + "deg)";
}

function removeHTML(str) {
	str = str.replace("<strong>", "");
	str = str.replace("</strong>", "");
	str = str.replace("<br>", " ");
	return str;
}
