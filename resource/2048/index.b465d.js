window.__require = function e(t, i, n) {
function o(c, s) {
if (!i[c]) {
if (!t[c]) {
var l = c.split("/");
l = l[l.length - 1];
if (!t[l]) {
var r = "function" == typeof __require && __require;
if (!s && r) return r(l, !0);
if (a) return a(l, !0);
throw new Error("Cannot find module '" + c + "'");
}
c = l;
}
var h = i[c] = {
exports: {}
};
t[c][0].call(h.exports, function(e) {
return o(t[c][1][e] || e);
}, h, h.exports, e, t, i, n);
}
return i[c].exports;
}
for (var a = "function" == typeof __require && __require, c = 0; c < n.length; c++) o(n[c]);
return o;
}({
Ball: [ function(e, t) {
"use strict";
cc._RF.push(t, "13f1bx00WhNDqkLut4sh4Od", "Ball");
var i = [ "f43c3d", "3cf4f3", "f33cf4", "3c3df4", "f4973c", "3df43c", "3a96ef", "f4f33c", "f43c98", "3cf497", "973cf4", "96f13b" ];
cc.Class({
extends: cc.Component,
properties: {
itemFrames: {
default: null,
type: cc.SpriteAtlas
},
coin: 0,
_coin: 0,
numIndex: 0,
radius: 64,
isAlive: !0,
status: 0,
LbNumber: cc.Label,
animBoom: cc.Prefab,
soundBoom: {
default: null,
type: cc.AudioClip
}
},
onBeginContact: function(e, t, i) {
this.game && this.game.onBeginContact(e, t, i);
},
explosive: function() {
var e = cc.instantiate(this.animBoom);
e.x = this.node.x;
e.y = this.node.y;
e.scale = this.node.scale;
e.parent = this.game.KhungNode;
this.game && this.game.enableSound && cc.audioEngine.playEffect(this.soundBoom, !1);
this.node.destroy();
},
doubleCoin: function() {
if (this.isAlive) {
var e = 2 * this.coin;
-1 != e.toString().indexOf("1024") && (e = parseInt(e.toString().replace("1024", "1000")));
this.setCoin(e);
}
},
setCoin: function(e) {
-1 != e.toString().indexOf("1024") && (e = parseInt(e.toString().replace("1024", "1000")));
this.coin = e;
this._coin = e;
for (var t = [ 2, 4, 8, 16, 32, 64, 128, 256, 512, 1e3 ], n = 0, o = e; o > 1e3; ) {
o = Math.round(o / 1e3);
n += t.length;
}
var a = (n += t.indexOf(o)) % 12;
this.refreshSize();
this.node.getChildByName("Ball").getComponent(cc.Sprite).spriteFrame = this.itemFrames.getSpriteFrame("ball-" + a);
this.getComponent(cc.MotionStreak).color = new cc.Color().fromHEX("#" + i[a]);
var c = e + "";
e >= 1e15 ? c = Math.floor(e / 1e15) + "P" : e >= 1e12 ? c = Math.floor(e / 1e12) + "T" : e >= 1e9 ? c = Math.floor(e / 1e9) + "G" : e >= 1e6 ? c = Math.floor(e / 1e6) + "M" : e >= 1e3 && (c = Math.floor(e / 1e3) + "K");
this.LbNumber.string = c;
var s = c.length;
1 === s ? this.LbNumber.fontSize = 32 : 2 === s ? this.LbNumber.fontSize = 28 : 3 === s ? this.LbNumber.fontSize = 23 : 4 === s && (this.LbNumber.fontSize = 18);
this.numIndex = new Date().getTime();
},
refreshSize: function() {
if (this.isAlive) {
var e = 1;
if (this.game) for (var t = this.game.nextBall; t > this.coin; ) {
-1 != t.toString().indexOf("1000") && (t = parseInt(t.toString().replace("1000", "1024")));
t = Math.round(t / 2);
e -= .04;
}
this.node.scale = e;
this.radius = 64 * e;
this.getComponent(cc.MotionStreak).stroke = 128 * e;
}
},
getCoin: function() {
return this.coin;
}
});
cc._RF.pop();
}, {} ],
Count: [ function(e, t) {
"use strict";
cc._RF.push(t, "74d97xE4n1C4o6QaV1glMgg", "Count");
cc.Class({
extends: cc.Component,
countUp: function(e, t, i) {
this._countTo = e;
this._countFrom = e;
i && (this._countTemplate = i);
this.countTo(t, .5);
},
countTo: function(e, t) {
3 === arguments.length && (this._countTo = arguments[2]);
if (e !== this._countTo) {
this._countFrom = this._countTo;
this._countTo = e;
this._countDuration = t || 1;
this._countTime = 0;
this._countStep = (this._countTo - this._countFrom) / this._countDuration;
this._countRunning = !0;
}
},
onLoad: function() {
this._countRunning = !1;
this._countFrom = 0;
this._countTo = 0;
this._countStep = 1;
this._countDuration = 1;
this._countTime = 0;
this._countTemplate = "%n";
this.LabelNode = this.getComponent(cc.Label);
},
update: function(e) {
if (!1 !== this._countRunning) {
this._countTime += e;
if (this._countTime > this._countDuration) {
this._countRunning = !1;
this.LabelNode.string = this._countTemplate.replace("%n", Math.round(this._countTo).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
this._countRunning = !1;
} else this.LabelNode.string = this._countTemplate.replace("%n", Math.round(this._countFrom + this._countStep * this._countTime).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
}
}
});
cc._RF.pop();
}, {} ],
main_game_control: [ function(e, t) {
"use strict";
cc._RF.push(t, "92a0bB1bqVJ4IFq69Xq/uON", "main_game_control");
var i = 2e3;
cc.Class({
extends: cc.Component,
properties: {
ballPre: cc.Prefab,
KhungNode: cc.Node,
MoveNode: cc.Node,
LineNode: cc.Node,
BoomNode: cc.Node,
CoinPre: cc.Node,
X2Node: cc.Node,
StringWin: cc.Node,
HowPlayNode: cc.Node,
DarkNode: cc.Node,
DangerLine: cc.Node,
NextLevelNode: cc.Node,
LevelProgess: cc.Node,
NextNode: cc.Node,
GameOverNode: cc.Node,
LbScrore: cc.Label,
LbCoin: cc.Label,
LbBest: cc.Label,
LbNumBoom: cc.Label,
LbNumX2: cc.Label,
ButtonX2: cc.Node,
ButtonBoom: cc.Node,
CancelBoom: cc.Node,
CancelX2: cc.Node,
_canMove: !1,
nextBall: 2e3
},
newBall: function(e) {
for (var t = this.KhungNode.children, i = !1, n = 0, o = 0, a = 0; a < t.length; a++) if (cc.isValid(t[a]) && "Ball" === t[a].name && (l = t[a].getComponent("Ball"))) if (1 === l.status) t[a].destroy(); else if (2 === l.status) {
o++;
var c = t[a].y + l.radius;
if (c > 850) {
i = !0;
c > 940 && n++;
}
}
if (n > 1) this.gameOver(); else {
o > 0 && (this.DangerLine.active = i);
this.ButtonX2.active = !0;
this.ButtonBoom.active = !0;
var s = null, l = (s = 4 === e ? cc.instantiate(this.BoomNode) : 5 === e ? cc.instantiate(this.X2Node) : cc.instantiate(this.ballPre)).getComponent("Ball");
s.name = "Ball";
s.active = !0;
s.parent = this.KhungNode;
l.status = 1;
l.game = this;
if (4 === e) this.ButtonBoom.active = !1; else if (5 === e) this.ButtonX2.active = !1; else {
var r = 2;
1 === e ? r = this._lastRandomBall : this.randomBalls && this.randomBalls.length && (r = this.randomBalls[Math.floor(Math.random() * this.randomBalls.length)]);
l.setCoin(r);
this._lastRandomBall = r;
}
s.x = 360;
s.y = 1050 - l.radius;
this.CurrentBall = s;
this.BallRadius = l.radius;
this._canMove = !0;
this.LineNode.active = !0;
this.LineNode.x = s.x;
}
},
clickButton: function(e, t) {
var n = this;
switch (t) {
case "SoundOn":
this.setSoundEnable(!0);
break;

case "SoundOff":
this.setSoundEnable(!1);
break;

case "Boom":
if (!this._canMove) return;
this.CurrentBall && 1 === this.CurrentBall.getComponent("Ball").status && cc.tween(this.CurrentBall).to(.3, {
scale: 0
}).start();
(o = cc.instantiate(this.BoomNode)).removeComponent(cc.RigidBody);
o.x = 110;
o.y = 165;
o.scale = .5;
o.parent = this.KhungNode;
o.active = !0;
this._canMove = !1;
this.LineNode.active = !1;
cc.tween(o).to(.25, {
scale: 1.2
}, {
easing: "cubicOut"
}).to(.25, {
scale: .8
}, {
easing: "cubicIn"
}).start();
cc.tween(o).to(.5, {
x: 360,
y: 1020
}).call(function() {
o.destroy();
n.newBall(4);
}).start();
break;

case "X2":
if (!this._canMove) return;
this.CurrentBall && 1 === this.CurrentBall.getComponent("Ball").status && cc.tween(this.CurrentBall).to(.3, {
scale: 0
}).start();
(o = cc.instantiate(this.X2Node)).removeComponent(cc.RigidBody);
o.x = 598;
o.y = 162;
o.scale = .5;
o.parent = this.KhungNode;
o.active = !0;
this._canMove = !1;
this.LineNode.active = !1;
cc.tween(o).to(.25, {
scale: 1.2
}, {
easing: "cubicOut"
}).to(.25, {
scale: .8
}, {
easing: "cubicIn"
}).start();
cc.tween(o).to(.5, {
x: 360,
y: 1020
}).call(function() {
o.destroy();
n.newBall(5);
}).start();
break;

case "CancelX2":
this._canMove = !1;
this.LineNode.active = !1;
this.CurrentBall.destroy();
(o = cc.instantiate(this.X2Node)).removeComponent(cc.RigidBody);
o.x = 360;
o.y = 1020;
o.scale = .8;
o.parent = this.KhungNode;
o.active = !0;
cc.tween(o).to(.25, {
scale: 1.2
}, {
easing: "cubicOut"
}).to(.25, {
scale: .8
}, {
easing: "cubicIn"
}).start();
cc.tween(o).to(.5, {
x: 598,
y: 162
}).call(function() {
o.destroy();
n.newBall(1);
}).start();
break;

case "CancelBoom":
this._canMove = !1;
this.LineNode.active = !1;
this.CurrentBall.destroy();
var o;
(o = cc.instantiate(this.BoomNode)).removeComponent(cc.RigidBody);
o.x = 360;
o.y = 1020;
o.scale = .8;
o.parent = this.KhungNode;
o.active = !0;
cc.tween(o).to(.25, {
scale: 1.2
}, {
easing: "cubicOut"
}).to(.25, {
scale: .8
}, {
easing: "cubicIn"
}).start();
cc.tween(o).to(.5, {
x: 110,
y: 165
}).call(function() {
o.destroy();
n.newBall(1);
}).start();
break;

case "SkipNextLevel":
if (!this._canClickContinue) return;
this.saveGame();
this._canClickContinue = !1;
for (var a = 0; a < this._coinEarn; a++) {
var c = cc.instantiate(this.CoinPre);
c.active = !0;
c.x = 390;
c.y = 570;
c.parent = this.KhungNode.parent;
cc.tween(c).delay(.1 * a).to(.5, {
x: 687,
y: 1234
}).call(function(e) {
e.destroy();
}).start();
}
this.NextLevelNode.getChildByName("Coin").getChildByName("Num").getComponent("Count").countTo(0);
this.LbCoin.getComponent("Count").countTo(this.GameCoin + this._coinEarn);
this.GameCoin += this._coinEarn;
this.scheduleOnce(function() {
cc.tween(n.DarkNode).to(.3, {
opacity: 0
}).call(function() {
n.DarkNode.active = !1;
}).start();
cc.tween(n.NextLevelNode).to(.3, {
opacity: 0
}).call(function() {
n.NextLevelNode.active = !1;
}).start();
n.MoveNode.active = !0;
n._canMove = !0;
n._isAnimNewLevel = !1;
cc.director.getPhysicsManager().enabled = !0;
n.eatingBall(0);
if (n._newLevelCallback) {
n._newLevelCallback();
n._isAnimNewLevel = null;
n._newLevelCallback = null;
}
}, 1.5 + .1 * this._coinEarn);
break;

case "Revite":
cc.tween(this.DarkNode).to(.4, {
opacity: 0
}).start();
cc.tween(this.GameOverNode).to(.5, {
opacity: 0
}).delay(.5).call(function() {
n.DarkNode.active = !1;
n.GameOverNode.active = !1;
for (var e = n.KhungNode.children, t = 1, i = 0; i < e.length; i++) if ("Ball" === e[i].name) {
var o = e[i].getComponent("Ball");
if (2 === o.status && o.isAlive) {
o.isAlive = !1;
cc.tween(e[i]).delay(.1 * t).call(function(e) {
e.getComponent("Ball").explosive();
}).start();
t++;
}
}
n.scheduleOnce(function() {
cc.director.getPhysicsManager().enabled = !0;
n.MoveNode.active = !0;
n.newBall();
}, .1 * t + .5);
}).start();
break;

case "GameOver":
if (this.GameScore > i) {
i = this.GameScore;
cc.sys.localStorage.setItem("BestScore", i);
this.LbBest.string = "BEST : " + i;
}
cc.tween(this.DarkNode).to(.4, {
opacity: 0
}).start();
cc.tween(this.GameOverNode).to(.5, {
opacity: 0
}).delay(.5).call(function() {
n.DarkNode.active = !1;
n.GameOverNode.active = !1;
cc.director.getPhysicsManager().enabled = !0;
n.MoveNode.active = !0;
n.newGame();
}).start();
}
},
setSoundEnable: function(e) {
this.enableSound = e;
if (!0 === e) {
this.node.parent.getChildByName("sound-on").active = !0;
this.node.parent.getChildByName("sound-off").active = !1;
} else {
this.node.parent.getChildByName("sound-on").active = !1;
this.node.parent.getChildByName("sound-off").active = !0;
}
},
onBeginContact: function(e, t, i) {
var n = this;
if (2 === t.tag && 2 === i.tag) {
var o = t.getComponent("Ball"), a = i.getComponent("Ball");
if (o && a && o._coin === a._coin && o.numIndex > a.numIndex && o.isAlive && a.isAlive) {
var c = null, s = null;
if (o.node.y > a.node.y + 3) {
c = a;
s = o;
} else if (a.node.y > o.node.y + 3) {
c = o;
s = a;
} else if (Math.abs(o.getComponent(cc.RigidBody).linearVelocity.x) > Math.abs(a.getComponent(cc.RigidBody).linearVelocity.x)) {
c = a;
s = o;
} else {
c = o;
s = a;
}
-1 != (h = 2 * Math.max(o.coin, a.coin)).toString().indexOf("1024") && (h = parseInt(h.toString().replace("1024", "1000")));
c._coin = h;
this.eatingBall(Math.max(o.coin, a.coin));
s.isAlive = !1;
s.getComponent(cc.RigidBody).destroy();
cc.tween(s.node).to(.08, {
x: c.node.x,
y: c.node.y
}).call(function() {
s.explosive();
cc.isValid(c.node) ? c.doubleCoin() : cc.log("not found! why?");
}).start();
}
} else if (4 === t.tag) {
var l = t.getComponent("Ball");
c = i.getComponent("Ball");
if (l && l.isAlive) if (0 === i.tag) this.scheduleOnce(function() {
if (l.isAlive) {
l.isAlive = !1;
l.explosive();
}
}, 1); else if (2 === i.tag && c && c.isAlive) {
l.isAlive = !1;
c.isAlive = !1;
l.getComponent(cc.RigidBody).destroy();
var r = c._coin;
cc.tween(l.node).to(.08, {
x: c.node.x,
y: c.node.y
}).call(function() {
for (var e = n.KhungNode.children, t = 1, i = 0; i < e.length; i++) if ("Ball" === e[i].name) {
var o = e[i].getComponent("Ball");
if (2 === o.status && o.isAlive && o._coin === r) {
o.isAlive = !1;
cc.tween(e[i]).delay(.1 * t).call(function(e) {
e.getComponent("Ball").explosive();
}).start();
t++;
}
}
l.node.destroy();
c.explosive();
}).start();
}
} else if (5 === t.tag) {
l = t.getComponent("Ball"), c = i.getComponent("Ball");
if (l && l.isAlive) if (0 === i.tag) this.scheduleOnce(function() {
if (l.isAlive) {
l.isAlive = !1;
l.explosive();
}
}, 1); else if (2 === i.tag && c && c.isAlive) {
l.isAlive = !1;
l.getComponent(cc.RigidBody).destroy();
var h;
-1 != (h = 2 * c.coin).toString().indexOf("1024") && (h = parseInt(h.toString().replace("1024", "1000")));
this.eatingBall(c.coin);
c._coin = h;
cc.tween(l.node).to(.08, {
x: c.node.x,
y: c.node.y
}).call(function() {
l.explosive();
cc.isValid(c.node) ? c.doubleCoin() : cc.log("not found! why?");
}).start();
if (h >= this.nextBall) {
this.MoveNode.active = !1;
this.LineNode.opacity = 0;
this.scheduleOnce(function() {
n.animNewRank();
}, 1);
}
}
}
},
pauseContact: function(e) {
cc.director.getPhysicsManager().enabled = !e;
},
winString: function(e) {
var t = this;
if (e > 2) {
var i;
i = e >= 5 ? 4 : 4 == e ? 3 : Math.random() > .5 ? 1 : 2;
var n = this.StringWin.getChildByName("T" + i);
if (n) {
this._isAnimMultiWin = !0;
n.y = -440;
n.opacity = 0;
n.scale = .4;
n.active = !0;
cc.tween(n).to(.3, {
y: 90,
opacity: 255,
scale: 1
}, {
easing: "cubicOut"
}).delay(.7).to(.3, {
opacity: 0,
y: 440
}).call(function() {
n.active = !1;
t._isAnimMultiWin = !1;
t._multiWinCallback && t._multiWinCallback();
t._multiWinCallback = null;
}).start();
}
}
},
setNextBall: function(e) {
this.nextBall = e;
for (var t = [ 2, 4, 8, 16, 32, 64, 128, 256, 512, 1e3 ], i = e; i > 1e3; ) {
i = Math.round(i / 1e3);
t.length;
}
t.indexOf(i);
this.randomBalls = [];
for (var n = e, o = 0; o < 10; o++) {
-1 != n.toString().indexOf("1000") && (n = parseInt(n.toString().replace("1000", "1024")));
if ((n = Math.round(n / 2)) < 2) break;
o >= 4 && this.randomBalls.push(n);
}
this.randomBalls.length < 4 && this.randomBalls.push(2 * this.randomBalls[0]);
this.CurrentBall && -1 != this.randomBalls.indexOf(this.CurrentBall.getComponent("Ball").coin) || this.newBall();
var a = this.KhungNode.children;
for (o = 0; o < a.length; o++) "Ball" === a[o].name && 3 === a[o].getComponent("Ball").status && a[o].destroy();
var c = cc.instantiate(this.ballPre);
c.x = -1;
c.y = -102;
c.removeComponent(cc.PhysicsCircleCollider);
c.removeComponent(cc.RigidBody);
c.getComponent("Ball").setCoin(e);
c.getComponent("Ball").status = 3;
c.getComponent("Ball").game = this;
c.parent = this.NextNode;
this.ballNext = c;
c.scale = .7;
},
_touchEnd: function() {
var e = this;
if (this._canMove) {
this.saveGame();
cc.director.getPhysicsManager().enabled = !0;
this._canMove = !1;
this.LineNode.active = !1;
this.CurrentBall;
var t = this.CurrentBall.getComponent("Ball");
t.status = 2;
var i = t.getComponent(cc.PhysicsCircleCollider).tag;
4 === i ? this.NumBoom-- : 5 === i && this.NumX2--;
this.CurrentBall.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
this.countWinTurn = 0;
this.ButtonBoom.active = !0;
this.ButtonX2.active = !0;
this.renderNumFree();
this.scheduleOnce(function() {
t && t.isAlive && (t.getComponent(cc.PhysicsCircleCollider).restitution = 0);
e.newBall();
}, 1);
this.countLevelBalls++;
}
},
eatingBall: function(e) {
for (var t = this, i = Math.min.apply(Math, this.randomBalls), n = 0; i < e; ) {
-1 != (i *= 2).toString().indexOf("1024") && (i = parseInt(i.toString().replace("1024", "1000")));
n++;
}
if (n > 0) {
this.countLevelEats++;
this.countWinTurn++;
}
cc.Tween.stopAllByTarget(cc.find("Mask/progess", this.LevelProgess));
var o = Math.floor(this.GameScore / 64);
this.GameScore += n;
this.LbScrore.string = this.GameScore;
this.LbCoin.getComponent(cc.Label).string = this.GameCoin;
if (!this._isAnimMultiWin) {
cc.log("this.countWinTurn", this.countWinTurn);
if (this.countWinTurn > 2) {
this._isAnimMultiWin = !0;
var a = this.countWinTurn;
this.scheduleOnce(function() {
if (!t._isAnimNewRank && !t._isAnimNewLevel) {
t.winString(Math.max(a, t.countWinTurn));
cc.log("max", Math.max(a, t.countWinTurn));
}
t.countWinTurn = 0;
t._isAnimMultiWin = !1;
}, .5);
}
}
var c = this.GameScore % 64;
if (!this._isAnimNewLevel && o < Math.floor(this.GameScore / 64)) {
this._isAnimNewLevel = !0;
this.LevelProgess.getChildByName("End").active = !0;
this.LevelProgess.getChildByName("NextLevel").color = new cc.Color(163, 98, 0);
cc.find("Mask/progess", this.LevelProgess).x = 0;
this.MoveNode.active = !1;
this._canMove = !1;
this.scheduleOnce(function() {
t.animNewLevel();
}, .5);
}
if (!this._isAnimNewRank) {
var s = 2 * e;
-1 != s.toString().indexOf("1024") && (s = parseInt(s.toString().replace("1024", "1000")));
if (s >= this.nextBall) {
cc.log("has new rank");
this._isAnimNewRank = !0;
this.MoveNode.active = !1;
this.LineNode.opacity = 0;
this.scheduleOnce(function() {
t._isAnimNewLevel ? t._newLevelCallback = function() {
t.animNewRank();
} : t.animNewRank();
}, .6);
}
}
if (!this._isAnimNewLevel) {
this.LevelProgess.getChildByName("End").active = !1;
this.LevelProgess.getChildByName("NextLevel").color = new cc.Color(255, 255, 255);
cc.tween(cc.find("Mask/progess", this.LevelProgess)).to(.2, {
x: 180 * c / 64 - 205
}).start();
this.LevelProgess.getChildByName("CurrLevel").getComponent(cc.Label).string = o;
this.LevelProgess.getChildByName("NextLevel").getComponent(cc.Label).string = o + 1;
}
},
animNewLevel: function() {
var e = this;
if (this._isAnimNewLevel) {
cc.log("call animNewLevel");
cc.director.getPhysicsManager().enabled = !1;
this.MoveNode.active = !1;
this._canMove = !1;
this._canClickContinue = !0;
this._coinEarn = Math.floor(10 * this.countLevelEats / this.countLevelBalls);
this.countLevelEats = 0;
this.countLevelBalls = 0;
this.NextLevelNode.active = !0;
this.NextLevelNode.opacity = 255;
var t = this.NextLevelNode.getChildByName("Ribbon"), i = this.NextLevelNode.getChildByName("Level"), n = this.NextLevelNode.getChildByName("Coin"), o = this.NextLevelNode.getChildByName("Continue"), a = n.getChildByName("Num");
i.active = !1;
n.active = !1;
o.active = !1;
t.active = !0;
this.DarkNode.active = !0;
i.getChildByName("Num").getComponent(cc.Label).string = Math.max(Math.floor(this.GameScore / 64) - 1, 0);
a.getComponent(cc.Label).string = "+0";
this.DarkNode.opacity = 0;
t.opacity = 0;
t.y = 45;
cc.tween(this.DarkNode).to(.3, {
opacity: 190
}).start();
cc.tween(t).to(.3, {
opacity: 255
}).delay(1).call(function() {
i.active = !0;
i.opacity = 0;
cc.tween(i).to(.3, {
opacity: 255
}).call(function() {
i.getChildByName("Num").getComponent(cc.Label).string = Math.floor(e.GameScore / 64);
}).delay(.5).call(function() {
n.active = !0;
n.opacity = 0;
cc.tween(n).delay(1).to(.3, {
opacity: 255
}).delay(.5).call(function() {
a.getComponent("Count").countUp(0, e._coinEarn, "+%n");
}).delay(2).call(function() {
o.active = !0;
}).start();
}).start();
}).to(.3, {
y: 305
}).start();
}
},
animNewRank: function() {
var e = this;
cc.log("finist Level");
this.MoveNode.active = !1;
this.LineNode.opacity = 0;
var t = 2 * this.nextBall;
-1 != t.toString().indexOf("1024") && (t = parseInt(t.toString().replace("1024", "1000")));
var i = this.nextBall;
this.nextBall = t;
var n = this.KhungNode.getChildByName("Light");
n.active = !1;
n.scale = 1;
n.x = 360;
n.y = 840;
this._isAnimNewRank = !0;
for (var o = !1, a = this.KhungNode.children, c = 0; c < a.length; c++) if ("Ball" === a[c].name) {
var s = a[c].getComponent("Ball");
if (2 === s.status && s.isAlive) if (s.coin === i) {
if (!1 === o) {
s.getComponent(cc.RigidBody).destroy();
a[c].zIndex = 99;
cc.tween(a[c]).to(.5, {
x: 360,
y: 840,
scale: 1,
angle: 0
}, {
easing: "cubicOut"
}).call(function() {}).delay(1.8).call(function(e) {
n.active = !1;
cc.tween(e).to(.6, {
x: 540
}, {
easing: "cubicOut"
}).to(.4, {
x: 360,
scale: .7
}, {
easing: "cubicIn"
}).start();
}).to(1, {
y: 144
}).call(function(i) {
i.getComponent("Ball").explosive();
e.setNextBall(t);
e.MoveNode.active = !0;
e.LineNode.opacity = 255;
for (var n = 1, o = e.KhungNode.children, a = 0; a < o.length; a++) if ("Ball" === o[a].name) {
var c = o[a].getComponent("Ball");
if (1 === c.status) c._coin < Math.min.apply(Math, e.randomBalls) && e.newBall(); else if (c.isAlive && c._coin < Math.min.apply(Math, e.randomBalls)) {
c.isAlive = !1;
cc.tween(o[a]).delay(.1 * n).call(function(e) {
e.getComponent("Ball").explosive();
}).start();
n++;
}
}
e._isAnimNewRank = !1;
e._newRankCallback && e._newRankCallback();
e._newRankCallback = null;
}).start();
}
o = !0;
} else s.refreshSize();
}
if (!1 === o) {
var l = this.KhungNode.children;
for (c = 0; c < l.length; c++) "Ball" === l[c].name && (h = l[c].getComponent("Ball")) && h.isAlive && 2 === h.status && t < 2 * h.coin && (t = 2 * h.coin);
-1 != t.toString().indexOf("1024") && (t = parseInt(t.toString().replace("1024", "1000")));
this.setNextBall(t);
this.MoveNode.active = !0;
this.LineNode.opacity = 255;
var r = 1;
for (c = 0; c < l.length; c++) if ("Ball" === l[c].name) {
var h;
if (1 === (h = l[c].getComponent("Ball")).status) h._coin < Math.min.apply(Math, this.randomBalls) && this.newBall(); else if (h.isAlive && h._coin < Math.min.apply(Math, this.randomBalls)) {
h.isAlive = !1;
cc.tween(l[c]).delay(.1 * r).call(function(e) {
e.getComponent("Ball").explosive();
}).start();
r++;
}
}
this._isAnimNewRank = !1;
this._newRankCallback && this._newRankCallback();
this._newRankCallback = null;
}
},
gameOver: function() {
cc.sys.localStorage.removeItem("gameCache");
cc.director.getPhysicsManager().enabled = !1;
this.MoveNode.active = !1;
this._canMove = !1;
this.GameOverNode.active = !0;
this.GameOverNode.opacity = 0;
this.DarkNode.active = !0;
this.DarkNode.opacity = 0;
this.GameOverNode.getChildByName("Score").getComponent(cc.Label).string = this.GameScore;
this.GameOverNode.getChildByName("Best").getComponent(cc.Label).string = i;
cc.tween(this.DarkNode).to(.5, {
opacity: 190
}).start();
cc.tween(this.GameOverNode).to(.5, {
opacity: 255
}).start();
},
newGame: function(e) {
for (var t = this, i = 256, n = this.KhungNode.children, o = 0; o < n.length; o++) "Ball" === n[o].name && n[o].destroy();
this.CurrentBall = null;
if (e) {
this.NumX2 = e.NumX2;
this.NumBoom = e.NumBoom;
this.GameScore = e.GameScore;
this.GameCoin = e.GameCoin;
this.nextBall = e.NextBall;
i = e.NextBall;
if (e.Balls && e.Balls.length) for (o = 0; o < e.Balls.length; o++) {
var a = cc.instantiate(this.ballPre), c = a.getComponent("Ball");
a.name = "Ball";
a.active = !0;
a.x = e.Balls[o].x;
a.y = e.Balls[o].y;
a.parent = this.KhungNode;
c.status = 2;
c.game = this;
c.setCoin(e.Balls[o].c);
a.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
a.getComponent(cc.PhysicsCircleCollider).restitution = 0;
}
cc.log(e);
} else {
this.NumX2 = 3;
this.NumBoom = 3;
this.GameScore = 0;
this.GameCoin = 0;
}
this.randomBalls = [];
this.countWinTurn = 0;
this.countLevelBalls = 0;
this.countLevelEats = 0;
this._isAnimMultiWin = !1;
this._isAnimNewRank = !1;
this._isAnimNewLevel = !1;
this._multiWinCallback = null;
this._newRankCallback = null;
this._newLevelCallback = null;
this.DangerLine.active = !0;
this.MoveNode.active = !0;
this._canMove = !0;
cc.director.getPhysicsManager().enabled = !0;
this.renderNumFree();
this.eatingBall(0);
this.scheduleOnce(function() {
t.setNextBall(i);
}, .3);
},
checkMyWeb: function() {
if (!cc.sys.isNative && location && -1 == location.host.indexOf("demomely") && -1 == location.host.indexOf("localhost")) {
for (var e = this.node.parent.children, t = 0; t < e.length; t++) e[t].destroy();
this.node.destroy();
}
},
renderNumFree: function() {
if (this.NumX2 > 0) {
this.LbNumX2.string = this.NumX2;
this.LbNumX2.node.active = !0;
this.LbNumX2.node.parent.getChildByName("playvid").active = !1;
} else {
this.NumX2 = 0;
this.LbNumX2.node.active = !1;
this.LbNumX2.node.parent.getChildByName("playvid").active = !0;
}
if (this.NumBoom > 0) {
this.LbNumBoom.string = this.NumBoom;
this.LbNumBoom.node.active = !0;
this.LbNumBoom.node.parent.getChildByName("playvid").active = !1;
} else {
this.NumBoom = 0;
this.LbNumBoom.node.active = !1;
this.LbNumBoom.node.parent.getChildByName("playvid").active = !0;
}
},
saveGame: function() {
this._gameCache.NumX2 = this.NumX2;
this._gameCache.NumBoom = this.NumBoom;
this._gameCache.GameScore = this.GameScore;
this._gameCache.GameCoin = this.GameCoin;
this._gameCache.NextBall = this.nextBall;
for (var e = this.KhungNode.children, t = [], i = 0; i < e.length; i++) if ("Ball" === e[i].name) {
var n = e[i].getComponent("Ball");
n && 2 === n.status && n.isAlive && t.push({
c: n.coin,
x: e[i].x,
y: e[i].y
});
}
this._gameCache.Balls = t;
cc.sys.localStorage.setItem("gameCache", JSON.stringify(this._gameCache));
},
onLoad: function() {
var e = this;
this._gameCache = {
NumX2: 0,
NumBoom: 0,
GameScore: 0,
GameCoin: 0,
NextBall: 256,
Balls: []
};
cc.director.getPhysicsManager().enabled = !0;
this.MoveNode.on("touchstart", function() {
e._canMove && (e.HowPlayNode.active = !1);
}, this);
this.MoveNode.on("touchmove", function(t) {
if (e._canMove && cc.isValid(e.CurrentBall)) {
var i = e.CurrentBall.x + 3 * t.getDelta().x;
i < 98 + e.BallRadius ? i = 98 + e.BallRadius : i > 620 - e.BallRadius && (i = 620 - e.BallRadius);
e.CurrentBall.x = i;
e.LineNode.x = i;
}
}, this);
this.MoveNode.on("touchend", this._touchEnd, this);
this.MoveNode.on("touchcancel", this._touchEnd, this);
var t = cc.tween().repeatForever(cc.tween().sequence(cc.tween().by(1, {
x: -450
}, {
easing: "sineOut"
}).delay(1), cc.tween().by(1, {
x: 450
}, {
easing: "sineOut"
}).delay(1)));
cc.tween(this.HowPlayNode).then(t).start();
var i = cc.tween().repeatForever(cc.tween().sequence(cc.tween().to(2, {
angle: 6
}), cc.tween().to(2, {
angle: -6
})));
cc.tween(this.NextNode).then(i).start();
var n = cc.tween().repeatForever(cc.tween().to(1, {
y: 718
}).call(function(e) {
e.y = 755;
}));
cc.tween(this.LineNode).then(n).start();
cc.tween(this.KhungNode.getChildByName("Light")).by(1, {
angle: -180
}).repeatForever().start();
cc.tween(this.DangerLine).then(cc.tween().repeatForever(cc.tween().sequence(cc.tween().to(.3, {
opacity: 0
}), cc.tween().to(.3, {
opacity: 255
})))).start();
this.checkMyWeb();
window.mygame = this;
},
start: function() {
var e = cc.sys.localStorage.getItem("gameCache");
e && (e = JSON.parse(e));
cc.sys.localStorage.removeItem("gameCache");
var t = cc.sys.localStorage.getItem("BestScore");
t && (i = Math.max(i, parseInt(t)));
this.LbBest.string = "BEST : " + i;
this.setSoundEnable(!1);
this.newGame(e);
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "Ball", "Count", "main_game_control" ]);