"use strict";
cc._RF.push(module, '4a820gvhyRBK4etwlTbvI7G', 'endSceneCtrl');
// Script/endSceneCtrl.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        blackFirst: {
            default: null,
            type: cc.Node
        },

        label1: {
            default: null,
            type: cc.Node
        },

        blackSecond: {
            default: null,
            type: cc.Node
        },

        label2: {
            default: null,
            type: cc.Node
        },

        blackThird: {
            default: null,
            type: cc.Node
        },

        image1: {
            default: null,
            type: cc.Node
        },

        label3: {
            default: null,
            type: cc.Node
        },

        blackFourth: {
            default: null,
            type: cc.Node
        },

        label4: {
            default: null,
            type: cc.Node
        },

        image2: {
            default: null,
            type: cc.Node
        },
        audioClip: {
            default: null,
            url: cc.AudioClip
        },
        label5: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.fadeInOutFirst(this.blackFirst);
        this.fadeInOutSecond(this.label1);
        this.fadeInOutThird(this.blackSecond);
        this.fadeInOutFourth(this.label2);
        this.fadeInOutFifth(this.blackThird);
        this.fadeInOutSixth(this.image1);
        this.fadeInOutSeventh(this.label3);
        this.fadeInOutEighth(this.blackFourth);
        this.fadeInOutninth(this.label4);
        this.fadeInOutTenth(this.image2);
        //  this.schedule(this.showCutScenes, 4);
    },
    start: function start() {
        this.playAudioId = cc.audioEngine.play(this.audioClip, true, 0.5);
    },

    onDestroy: function onDestroy() {
        cc.audioEngine.stop(this.playAudioId);
    },

    buttonPlay: function buttonPlay() {
        var that = this;
        //this.btnPlay.active = false;

        // this.fadeInOutFirst(this.black);
    },

    showCutScenes: function showCutScenes() {
        var _this = this;

        //this.fadeInOut(this.image);
        this.image.getComponent(cc.Sprite).spriteFrame = this.cutScenes[this._index];
        this._index++;
        if (this._index == this.cutScenes.length) {
            var that = this;
            setTimeout(function () {
                _this.unschedule(_this.showCutScenes);
                cc.director.loadScene("NextScene");
            }, 4000);
        }
    },

    fadeInOutFirst: function fadeInOutFirst(myNode) {
        var fadeIn_action = new cc.fadeIn(1);
        var delay_action = new cc.delayTime(1);
        var fadeOut_action = new cc.fadeOut(5);
        var fadeInOut = new cc.sequence(fadeIn_action, delay_action, fadeOut_action);
        myNode.runAction(fadeInOut);
    },

    fadeInOutSecond: function fadeInOutSecond(myNode) {
        var fadeIn_action = new cc.fadeIn(1);
        var delay_action = new cc.delayTime(4);
        var fadeOut_action = new cc.fadeOut(3);
        var fadeInOut = new cc.sequence(fadeIn_action, delay_action, fadeOut_action);
        myNode.runAction(fadeInOut);
    },

    fadeInOutThird: function fadeInOutThird(myNode) {
        var fadeIn_action = new cc.fadeIn(1);
        var delay_action = new cc.delayTime(7);
        var fadeOut_action = new cc.fadeOut(3);
        var fadeInOut = new cc.sequence(fadeIn_action, delay_action, fadeOut_action);
        myNode.runAction(fadeInOut);
    },

    fadeInOutFourth: function fadeInOutFourth(myNode) {
        var fadeIn_action = new cc.fadeIn(1);
        var delay_action = new cc.delayTime(10);
        var fadeOut_action = new cc.fadeOut(0.1);
        var fadeInOut = new cc.sequence(fadeIn_action, delay_action, fadeOut_action);
        myNode.runAction(fadeInOut);
    },

    fadeInOutFifth: function fadeInOutFifth(myNode) {
        var fadeIn_action = new cc.fadeIn(1);
        var delay_action = new cc.delayTime(10);
        var fadeOut_action = new cc.fadeOut(0.1);
        var fadeInOut = new cc.sequence(fadeIn_action, delay_action, fadeOut_action);
        myNode.runAction(fadeInOut);
    },

    fadeInOutSixth: function fadeInOutSixth(myNode) {
        var fadeIn_action = new cc.fadeIn(1);
        var delay_action = new cc.delayTime(12);
        var fadeOut_action = new cc.fadeOut(5);
        var fadeInOut = new cc.sequence(fadeIn_action, delay_action, fadeOut_action);
        myNode.runAction(fadeInOut);
    },

    fadeInOutSeventh: function fadeInOutSeventh(myNode) {
        var fadeIn_action = new cc.fadeIn(1);
        var delay_action = new cc.delayTime(15);
        var fadeOut_action = new cc.fadeOut(5);
        var fadeInOut = new cc.sequence(fadeIn_action, delay_action, fadeOut_action);
        myNode.runAction(fadeInOut);
    },

    fadeInOutEighth: function fadeInOutEighth(myNode) {
        var fadeIn_action = new cc.fadeIn(1);
        var delay_action = new cc.delayTime(18);
        var fadeOut_action = new cc.fadeOut(5);
        var fadeInOut = new cc.sequence(fadeIn_action, delay_action, fadeOut_action);
        myNode.runAction(fadeInOut);
    },

    fadeInOutninth: function fadeInOutninth(myNode) {
        var fadeIn_action = new cc.fadeIn(3);
        var delay_action = new cc.delayTime(20);
        var fadeOut_action = new cc.fadeOut(5);
        var fadeInOut = new cc.sequence(fadeIn_action, delay_action, fadeOut_action);
        myNode.runAction(fadeInOut);
    },

    fadeInOutTenth: function fadeInOutTenth(myNode) {
        var _this2 = this;

        var fadeIn_action = new cc.fadeIn(3);
        var delay_action = new cc.delayTime(20);
        var fadeOut_action = new cc.fadeOut(5);
        var fadeInOut = new cc.sequence(fadeIn_action, delay_action, fadeOut_action);
        myNode.runAction(fadeInOut);

        setTimeout(function () {
            _this2.label5.active = true;
            setTimeout(function () {
                cc.game.restart();
            }, 5000);
        }, 30000);
    }

    // update (dt) {},
});

cc._RF.pop();