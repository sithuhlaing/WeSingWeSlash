(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/mainMenu.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f3a58sE9HxLD7FUwnzST1/f', 'mainMenu', __filename);
// Script/mainMenu.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        background: cc.Node,
        cutScenes: {
            default: [],
            type: cc.SpriteFrame
        },
        _index: 0,
        btnPlay: cc.Node,
        audioClip: {
            default: null,
            url: cc.AudioClip
        }
    },

    onLoad: function onLoad() {
        // this.node.getComponent("SoundManager").onPlayPianoClip()
        cc.director.preloadScene('Room1', function () {
            // cc.log("Next scene preloaded");
        });
    },
    onDestroy: function onDestroy() {
        //this.node.getComponent("SoundManager").onStopPianoClip()//afkja

    },
    // button click
    buttonPlay: function buttonPlay() {
        var that = this;
        G.memoryAudio = cc.audioEngine.play(this.audioClip, true, 0.5);
        this.btnPlay.active = false;
        this.fadeInOut(this.background);
        this.schedule(this.showCutScenes, 4);
    },

    showCutScenes: function showCutScenes() {
        var _this = this;

        this.fadeInOut(this.background);
        this.background.getComponent(cc.Sprite).spriteFrame = this.cutScenes[this._index];
        this._index++;
        if (this._index == this.cutScenes.length) {
            var that = this;
            setTimeout(function () {
                _this.unschedule(_this.showCutScenes);
                cc.director.loadScene("Room1");
            }, 4000);
        }
    },

    fadeInOut: function fadeInOut(myNode) {
        var fadeIn_action = new cc.fadeIn(1);
        var delay_action = new cc.delayTime(1);
        var fadeOut_action = new cc.fadeOut(1);
        var fadeInOut = new cc.sequence(fadeIn_action, delay_action, fadeOut_action);
        myNode.runAction(fadeInOut);
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // start () {

    // },

    // update (dt) {},
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=mainMenu.js.map
        