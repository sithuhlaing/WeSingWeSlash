"use strict";
cc._RF.push(module, '37547Dmdf5D+YE7ekmUvtI1', 'CameraControl');
// Script/CameraControl.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node
        },
        camera: cc.Camera,
        anim: cc.Animation,
        //Jump Zoom
        jumpZoom: false,
        centerAtStart: false,
        //Smooth Follow
        smoothFollow: false,
        followX: {
            default: 0,
            visible: function visible() {
                return this.smoothFollow;
            }
        },
        followY: {
            default: 0,
            visible: function visible() {
                return this.smoothFollow;
            }
        },
        minFollowDist: {
            default: 0,
            visible: function visible() {
                return this.smoothFollow;
            }
        },
        followRatio: {
            default: 0,
            visible: function visible() {
                return this.smoothFollow;
            }
        },
        //Overview
        overview: false,
        overviewTargets: {
            default: [],
            type: [cc.Node],
            visible: function visible() {
                return this.overview;
            }
        },
        overviewMargin: {
            default: 0,
            visible: function visible() {
                return this.overview;
            }
        },
        //Speed Zoom
        speedZoom: false,
        zoomInSpeed: {
            default: 0,
            visible: function visible() {
                return this.speedZoom;
            }
        },
        zoomOutSpeed: {
            default: 0,
            visible: function visible() {
                return this.speedZoom;
            }
        },
        //Camera Shake
        canShake: false,
        shakeDuration: {
            default: 0,
            visible: function visible() {
                return this.canShake;
            }
        },
        //Pointer Pan
        pointerPan: false,
        pointerXMult: {
            default: 0,
            visible: function visible() {
                return this.pointerPan;
            }
        },
        pointerYMult: {
            default: 0,
            visible: function visible() {
                return this.pointerPan;
            }
        },
        //Boundaries in world position
        useBoundaries: false,
        topBound: {
            default: 0,
            visible: function visible() {
                return this.useBoundaries;
            }
        },
        bottomBound: {
            default: 0,
            visible: function visible() {
                return this.useBoundaries;
            }
        },
        leftBound: {
            default: 0,
            visible: function visible() {
                return this.useBoundaries;
            }
        },
        rightBound: {
            default: 0,
            visible: function visible() {
                return this.useBoundaries;
            }
        },
        // Offset
        cameraOffset: false,
        cameraOffsetPoints: {
            default: null,
            type: cc.Vec2,
            visible: function visible() {
                return this.cameraOffset;
            }
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.startFollow = false;
        var canvas = cc.find('Canvas').getComponent(cc.Canvas);
        this.visibleSize = cc.view.getVisibleSize();
        this.initZoomRatio = this.camera.zoomRatio;
        //place camera on target if centerAtStart
        if (this.centerAtStart) {
            this.node.position = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        }
        this.previousPos = this.node.position;
        if (this.pointerPan) {
            // this.jumpZoom = false;
            this.overview = false;
            this.speedZoom = false;
            canvas.node.on('mousemove', this.onMouseMove, this);
            canvas.node.on('touchmove', this.onTouchMove, this);
            this.pointerPos = null;
        }
        if (this.overview) {
            this.jumpZoom = false;
            this.speedZoom = false;
        }
        if (this.speedZoom) {
            this.jumpZoom = false;
        }
    },

    onEnable: function onEnable() {
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
    },
    onDisable: function onDisable() {
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera);
    },

    // called every frame, uncomment this function to activate update callback
    lateUpdate: function lateUpdate(dt) {
        var targetPos = void 0;

        if (this.overview) {
            targetPos = this.target.parent.convertToWorldSpaceAR(this.getOverviewTargetsMidpoint());
        } else {
            targetPos = this.target.parent.convertToWorldSpaceAR(this.target.position);
        }

        if (this.pointerPan && this.pointerPos) {
            var xDelta = this.pointerPos.x / (this.visibleSize.width / 2) - 1;
            var yDelta = this.pointerPos.y / (this.visibleSize.height / 2) - 1;
            xDelta *= this.pointerXMult;
            yDelta *= this.pointerYMult;
            targetPos = cc.pAdd(targetPos, cc.p(xDelta, yDelta));
        }

        //smooth follow
        if (this.smoothFollow) {
            if (Math.abs(targetPos.x - this.node.x) >= this.followX || Math.abs(targetPos.y - this.node.y) >= this.followY) {
                //when camera and target distance is larger than max distance
                this.startFollow = true;
            }
            if (this.startFollow) {
                this.node.position = this.node.position.lerp(targetPos, this.followRatio);
                if (cc.pDistance(targetPos, this.node.position) <= this.minFollowDist) {
                    this.startFollow = false;
                }
            }
        } else {
            this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos);
        }

        //speed zoom
        if (this.speedZoom) {
            var curSpeed = Math.abs(this.previousPos.x - targetPos.x) / dt;
            var ratio = 0;
            if (curSpeed > this.zoomOutSpeed) {
                ratio = 1 - (curSpeed - this.zoomOutSpeed) / (this.zoomInSpeed - this.zoomOutSpeed);
                this.camera.zoomRatio = cc.lerp(this.camera.zoomRatio, ratio, 0.02);
            } else {
                this.camera.zoomRatio = cc.lerp(this.camera.zoomRatio, this.initZoomRatio, 0.02);
            }
        }

        this.previousPos = targetPos;

        //jump zoom
        if (this.jumpZoom) {
            var _ratio = targetPos.y / cc.winSize.height;
            this.camera.zoomRatio = 1 + (0.6 - _ratio) * 0.35;
        }

        //boundaries

        if (this.useBoundaries) {
            var width = this.visibleSize.width / 2 / this.camera.zoomRatio;
            var height = this.visibleSize.height / 2 / this.camera.zoomRatio;
            var minX = this.node.x - width;
            var maxX = this.node.x + width;
            var minY = this.node.y - height;
            var maxY = this.node.y + height;
            if (minX < this.leftBound) {
                this.node.x = this.leftBound + width;
            }
            if (minY < this.bottomBound) {
                this.node.y = this.bottomBound + height;
            }
            if (maxX > this.rightBound) {
                this.node.x = this.rightBound - width;
            }
            if (maxY > this.topBound) {
                this.node.y = this.topBound - height;
            }
        }
    },

    getOverviewTargetsMidpoint: function getOverviewTargetsMidpoint() {
        var midPoint = cc.p(0, 0);
        var minX = 99999,
            minY = 99999,
            maxX = -99999,
            maxY = -99999;
        for (var i = 0; i < this.overviewTargets.length; ++i) {
            var target = this.overviewTargets[i];
            maxX = target.x > maxX ? target.x : maxX;
            minX = target.x < minX ? target.x : minX;
            maxY = target.y > maxY ? target.y : maxY;
            minY = target.y < minY ? target.y : minY;
        }
        maxX += this.overviewMargin;
        minX -= this.overviewMargin;
        maxY += this.overviewMargin;
        minY -= this.overviewMargin;
        var distX = Math.abs(maxX - minX);
        var distY = Math.abs(maxY - minY);
        midPoint = cc.p(minX + distX / 2, minY + distY / 2);
        var ratio = Math.max(distX / this.visibleSize.width, distY / this.visibleSize.height);
        this.camera.zoomRatio = 1 / ratio;
        return midPoint;
    },
    shakeCamera: function shakeCamera() {
        if (!this.canShake) return;
        this.anim.play('shake');
        this.scheduleOnce(this.stopShake.bind(this), this.shakeDuration);
    },
    stopShake: function stopShake() {
        this.anim.stop();
        this.camera.node.position = cc.p(0, 0);
    },
    onMouseMove: function onMouseMove(event) {
        this.pointerPos = event.getLocation();
    },
    onTouchMove: function onTouchMove(event) {
        this.pointerPos = event.getLocation();
    }
});

cc._RF.pop();