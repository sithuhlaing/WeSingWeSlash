"use strict";
cc._RF.push(module, 'c2145H9qN5D1LdnzRhCyCdT', 'GameManager');
// Script/GameManager.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        gen_active: cc.SpriteFrame,
        bulb_active: cc.SpriteFrame

    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
    },
    onDestroy: function onDestroy() {
        cc.audioEngine.stop(G.memoryAudio);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

});

cc._RF.pop();