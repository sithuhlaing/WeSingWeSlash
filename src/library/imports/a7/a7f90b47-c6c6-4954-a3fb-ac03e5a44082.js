"use strict";
cc._RF.push(module, 'a7f90tHxsZJVKP7rAPlpECC', 'PlayerCtrl');
// Script/PlayerCtrl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        rocketInactive: {
            default: null,
            type: cc.Node
        },
        rocketActive: {
            default: null,
            type: cc.Node
        },
        rocketParticle: {
            default: null,
            type: cc.Node
        },

        speedX: 0,
        speedY: 0,
        bLeft: 0,
        bRight: 0,
        bTop: 0,
        rocketAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.spine = this.getComponent(sp.Skeleton);
        this.isRocketLaunch = false;
        this.nodeDestroyed = false;
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;

        console.log(this.spine);

        this.goLeft = false;
        this.goRight = false;
        this.jump = false;
        this.interact = false;

        this._up = false;
        this.body = this.node.getComponent(cc.RigidBody);
        this.registerInput();
    },

    registerInput: function registerInput() {
        var that = this;
        // Keyboard
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                if (keyCode == cc.KEY.a && !this.nodeDestroyed) {
                    that.goLeft = true;
                    that.goRight = false;
                    if (that.node.scaleX < 0) that.node.scaleX *= -1;

                    if (!that._walk) {
                        that.spine.setAnimation(0, "walking fast", true);
                        that._walk = true;
                    }
                } else if (keyCode == cc.KEY.d && !this.nodeDestroyed) {
                    that.goRight = true;
                    that.goLeft = false;
                    if (that.node.scaleX > 0) that.node.scaleX *= -1;

                    if (!that._walk) {
                        that.spine.setAnimation(0, "walking fast", true);
                        that._walk = true;
                    }
                } else if (keyCode == cc.KEY.space && !this.nodeDestroyed) {
                    if (!that.jump) {
                        that.jump = true;
                    }
                }
            },

            onKeyReleased: function onKeyReleased(keyCode, event) {
                if (keyCode == cc.KEY.a && !this.nodeDestroyed) {
                    that.goLeft = false;

                    if (that._walk) {
                        that.spine.setAnimation(0, "idel", true);
                        that._walk = false;
                    }
                } else if (keyCode == cc.KEY.d && !this.nodeDestroyed) {
                    that.goRight = false;

                    if (that._walk) {
                        that.spine.setAnimation(0, "idel", true);
                        that._walk = false;
                    }
                } else if (keyCode == cc.KEY.space && !this.nodeDestroyed) {
                    if (!that.jump) {
                        that.jump = false;
                    }
                }
            }
        }, this.node);
    },


    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
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

        if (this.isRocketLaunch) {
            this.rocketActive.y += 200 * dt;
            this.rocketParticle.y += 100 * dt;
        }
    },

    onCollisionEnter: function onCollisionEnter(other) {
        var group = cc.game.groupList[other.node.groupIndex];
        if (group == "Obstacle") {

            this.spine.enabled = false;
            this.node.opacity = 0;
            this.nodeDestroyed = true;
            this.scheduleOnce(this.rocketInActive, 1);
        }
    },

    rocketInActive: function rocketInActive() {
        this.rocketInactive.active = false;
        this.rocketActive.active = true;
        this.scheduleOnce(this.rocketParticlePlay, 1);
        this.scheduleOnce(this.sceneFadeOut, 1.5);
    },

    rocketLaunch: function rocketLaunch() {
        this.isRocketLaunch = true;
        this.playAudioId = cc.audioEngine.play(this.rocketAudio, false, 1);
        this.scheduleOnce(this.changeScene, 5);
    },

    rocketParticlePlay: function rocketParticlePlay() {
        this.rocketParticle.active = true;

        var particle = this.rocketParticle.getComponent(cc.ParticleSystem);
        if (particle.particleCount > 0) {
            particle.stopSystem();
        } else {
            particle.resetSystem();
        }

        this.scheduleOnce(this.rocketLaunch, 1);
    },

    sceneFadeOut: function sceneFadeOut(myNode) {
        var fadeIn_action = new cc.fadeIn(1);
        var delay_action = new cc.delayTime(1);
        var fadeOut_action = new cc.fadeOut(3);
        var fadeInOut = new cc.sequence(fadeIn_action, delay_action, fadeOut_action);
        this.canvas.runAction(fadeInOut);
    },

    changeScene: function changeScene() {
        cc.audioEngine.stop(this.playAudioId);
        cc.director.loadScene('EndScene');
    }

});

cc._RF.pop();