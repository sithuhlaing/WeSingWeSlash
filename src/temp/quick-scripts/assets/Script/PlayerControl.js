(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/PlayerControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '780a0hTkG5N6JoyOoas6PXg', 'PlayerControl', __filename);
// Script/PlayerControl.js

"use strict";

var MOVE_LEFT = 1;
var MOVE_RIGHT = 2;
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
        speedX: 0,
        speedY: 0,
        bLeft: 0,
        bRight: 0,
        bTop: 0,
        excalm: cc.Node,
        msgBox: cc.Node,
        msgLabel: cc.Label,
        portal: cc.Sprite,
        bulb: cc.Sprite,
        underDoor: cc.Node,
        generator: cc.Sprite,
        picture: cc.Node,
        room1Sprites: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.spine = this.node.getComponent(sp.Skeleton);
        console.log(this.spine);
        this.goLeft = false;
        this.goRight = false;
        this.jump = false;
        this.interact = false;

        this._up = false;
        this.body = this.getComponent(cc.RigidBody);

        this.registerInput();

        // this.maxY = 0;
        // this.minY = 0;

        // Interactable items
        this.items = {
            portal: {
                state: 0
            },
            drawer: {
                state: 0
            },
            picture: {
                state: 0
            },
            generator: {
                state: 0
            }

            // Current interactable item
        };this.curItem = "";
        // Game won state
        this.gameWon = false;
    },

    registerInput: function registerInput() {
        var that = this;
        // Keyboard
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                if (keyCode == cc.KEY.a && !that.msgBox.active) {
                    that.goLeft = true;
                    that.goRight = false;
                    if (that.node.scaleX < 0) that.node.scaleX *= -1;

                    if (!that._walk) {
                        that.spine.setAnimation(0, "walking fast", true);
                        that._walk = true;
                    }
                } else if (keyCode == cc.KEY.d && !that.msgBox.active) {
                    that.goRight = true;
                    that.goLeft = false;
                    if (that.node.scaleX > 0) that.node.scaleX *= -1;

                    if (!that._walk) {
                        that.spine.setAnimation(0, "walking fast", true);
                        that._walk = true;
                    }
                } else if (keyCode == cc.KEY.space && !that.msgBox.active) {
                    if (!that.jump) {
                        that.jump = true;
                    }
                } else if (keyCode == cc.KEY.e) {
                    if (that.interact) {
                        if (!that.msgBox.active) {
                            // disable movements
                            that.goLeft = false;
                            that.goRight = false;
                            that.jump = false;
                            that.spine.setAnimation(0, "idel", true);

                            switch (that.curItem) {
                                case "Generator":
                                    if (that.items.generator.state == 0) {
                                        that.items.generator.state = 1;
                                        that.items.portal.state = 2;
                                        // Change active sprites
                                        that.generator.spriteFrame = that.room1Sprites[0];
                                        setTimeout(function () {
                                            that.bulb.node.y = -305;
                                            that.bulb.spriteFrame = that.room1Sprites[1];
                                        }, 1500);
                                        setTimeout(function () {
                                            that.portal.spriteFrame = that.room1Sprites[2];
                                        }, 2300);
                                    } else {
                                        that.msgBox.active = true;
                                        that.msgLabel.string = "Unlimited power.............";
                                    }
                                    break;
                                case "Picture":
                                    if (that.items.picture.state == 0) {
                                        that.msgBox.active = true;
                                        that.msgLabel.string = "I see.... the picture is a switch. I wonder what it did after I switched it on....";
                                        // Change portal and drawer states
                                        that.items.picture.state = 1;
                                        // Unlock underground
                                        that.underDoor.active = false;
                                        // Rotate the picture
                                        var toRight = new cc.rotateBy(1, 15);
                                        that.picture.runAction(toRight);
                                    } else {
                                        that.msgBox.active = true;
                                        that.msgLabel.string = "Jeeze.. the woman in the picture looks like my mother!";
                                    }
                                    break;
                                case "Portal":
                                    if (that.items.portal.state == 0) {
                                        that.msgBox.active = true;
                                        that.msgLabel.string = "Wow... a portal! My way out! But it's blocking me. I need something to offer to it...";
                                    } else if (that.items.portal.state == 1) {
                                        that.msgBox.active = true;
                                        that.msgLabel.string = "The portal still does not have enough power.....";
                                    } else {
                                        // Pass the room
                                        if (that.items.portal.state == 2 && that.items.drawer.state == 1) {
                                            // You have won this room
                                            that.scheduleOnce(that.changeScene, 1);
                                        } else {
                                            that.msgBox.active = true;
                                            that.msgLabel.string = "I still need something to offer to the portal....";
                                        }
                                    }
                                    break;
                                case "Drawer":
                                    if (that.items.drawer.state == 0) {
                                        that.msgBox.active = true;
                                        that.msgLabel.string = "Yes! I found a portal stone! This should do it...";
                                        // Change portal and drawer states
                                        if (that.items.portal.state < 2) that.items.portal.state = 1;
                                        that.items.drawer.state = 1;
                                    } else {
                                        that.msgBox.active = true;
                                        that.msgLabel.string = "Nothing of interest here....";
                                    }
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            that.msgLabel.string = "";
                            that.msgBox.active = false;
                        }
                    }
                }
            },

            onKeyReleased: function onKeyReleased(keyCode, event) {
                if (keyCode == cc.KEY.a && !that.msgBox.active) {
                    that.goLeft = false;

                    if (that._walk) {
                        that.spine.setAnimation(0, "idel", true);
                        that._walk = false;
                    }
                } else if (keyCode == cc.KEY.d && !that.msgBox.active) {
                    that.goRight = false;

                    if (that._walk) {
                        that.spine.setAnimation(0, "idel", true);
                        that._walk = false;
                    }
                } else if (keyCode == cc.KEY.space && !that.msgBox.active) {
                    if (!that.jump) {
                        that.jump = false;
                    }
                }
            }
        }, this.node);
    },


    onCollisionEnter: function onCollisionEnter(other) {
        var group = cc.game.groupList[other.node.groupIndex];
        if (group == "Interact") {
            this.interact = true;
            this.excalm.active = true;
            this.curItem = other.node.name;
        }
    },

    onCollisionExit: function onCollisionExit(other) {
        var group = cc.game.groupList[other.node.groupIndex];
        if (group == "Interact") {
            this.interact = false;
            this.excalm.active = false;
            this.curItem = "";
        }
    },

    update: function update(dt) {
        // -454 //833
        if (this.goLeft && this.node.x > this.bLeft) {
            this.node.x -= this.speedX * dt;
        } else if (this.goRight && this.node.x < this.bRight) {
            this.node.x += this.speedX * dt;
        }

        if (this.jump && this.node.y < this.bTop) {
            var v2 = cc.v2(0, 200 * dt * 50);
            this.jump = false;
            this.body.linearVelocity = v2;
            cc.log(this.body.linearVelocity);
        }
    },

    changeScene: function changeScene() {
        cc.director.loadScene('Rocket');
    }
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
        //# sourceMappingURL=PlayerControl.js.map
        