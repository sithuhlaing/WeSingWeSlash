require=function e(t,i,n){function o(s,a){if(!i[s]){if(!t[s]){var r="function"==typeof require&&require;if(!a&&r)return r(s,!0);if(c)return c(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var h=i[s]={exports:{}};t[s][0].call(h.exports,function(e){var i=t[s][1][e];return o(i||e)},h,h.exports,e,t,i,n)}return i[s].exports}for(var c="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({CameraControl:[function(e,t,i){"use strict";cc._RF.push(t,"37547Dmdf5D+YE7ekmUvtI1","CameraControl"),cc.Class({extends:cc.Component,properties:{target:{default:null,type:cc.Node},camera:cc.Camera,anim:cc.Animation,jumpZoom:!1,centerAtStart:!1,smoothFollow:!1,followX:{default:0,visible:function(){return this.smoothFollow}},followY:{default:0,visible:function(){return this.smoothFollow}},minFollowDist:{default:0,visible:function(){return this.smoothFollow}},followRatio:{default:0,visible:function(){return this.smoothFollow}},overview:!1,overviewTargets:{default:[],type:[cc.Node],visible:function(){return this.overview}},overviewMargin:{default:0,visible:function(){return this.overview}},speedZoom:!1,zoomInSpeed:{default:0,visible:function(){return this.speedZoom}},zoomOutSpeed:{default:0,visible:function(){return this.speedZoom}},canShake:!1,shakeDuration:{default:0,visible:function(){return this.canShake}},pointerPan:!1,pointerXMult:{default:0,visible:function(){return this.pointerPan}},pointerYMult:{default:0,visible:function(){return this.pointerPan}},useBoundaries:!1,topBound:{default:0,visible:function(){return this.useBoundaries}},bottomBound:{default:0,visible:function(){return this.useBoundaries}},leftBound:{default:0,visible:function(){return this.useBoundaries}},rightBound:{default:0,visible:function(){return this.useBoundaries}},cameraOffset:!1,cameraOffsetPoints:{default:null,type:cc.Vec2,visible:function(){return this.cameraOffset}}},onLoad:function(){this.startFollow=!1;var e=cc.find("Canvas").getComponent(cc.Canvas);this.visibleSize=cc.view.getVisibleSize(),this.initZoomRatio=this.camera.zoomRatio,this.centerAtStart&&(this.node.position=this.target.convertToWorldSpaceAR(cc.Vec2.ZERO)),this.previousPos=this.node.position,this.pointerPan&&(this.overview=!1,this.speedZoom=!1,e.node.on("mousemove",this.onMouseMove,this),e.node.on("touchmove",this.onTouchMove,this),this.pointerPos=null),this.overview&&(this.jumpZoom=!1,this.speedZoom=!1),this.speedZoom&&(this.jumpZoom=!1)},onEnable:function(){cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera)},onDisable:function(){cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera)},lateUpdate:function(e){var t=void 0;if(t=this.overview?this.target.parent.convertToWorldSpaceAR(this.getOverviewTargetsMidpoint()):this.target.parent.convertToWorldSpaceAR(this.target.position),this.pointerPan&&this.pointerPos){var i=this.pointerPos.x/(this.visibleSize.width/2)-1,n=this.pointerPos.y/(this.visibleSize.height/2)-1;i*=this.pointerXMult,n*=this.pointerYMult,t=cc.pAdd(t,cc.p(i,n))}if(this.smoothFollow?((Math.abs(t.x-this.node.x)>=this.followX||Math.abs(t.y-this.node.y)>=this.followY)&&(this.startFollow=!0),this.startFollow&&(this.node.position=this.node.position.lerp(t,this.followRatio),cc.pDistance(t,this.node.position)<=this.minFollowDist&&(this.startFollow=!1))):this.node.position=this.node.parent.convertToNodeSpaceAR(t),this.speedZoom){var o=Math.abs(this.previousPos.x-t.x)/e,c=0;o>this.zoomOutSpeed?(c=1-(o-this.zoomOutSpeed)/(this.zoomInSpeed-this.zoomOutSpeed),this.camera.zoomRatio=cc.lerp(this.camera.zoomRatio,c,.02)):this.camera.zoomRatio=cc.lerp(this.camera.zoomRatio,this.initZoomRatio,.02)}if(this.previousPos=t,this.jumpZoom){var s=t.y/cc.winSize.height;this.camera.zoomRatio=1+.35*(.6-s)}if(this.useBoundaries){var a=this.visibleSize.width/2/this.camera.zoomRatio,r=this.visibleSize.height/2/this.camera.zoomRatio,u=this.node.x-a,h=this.node.x+a,l=this.node.y-r,d=this.node.y+r;u<this.leftBound&&(this.node.x=this.leftBound+a),l<this.bottomBound&&(this.node.y=this.bottomBound+r),h>this.rightBound&&(this.node.x=this.rightBound-a),d>this.topBound&&(this.node.y=this.topBound-r)}},getOverviewTargetsMidpoint:function(){for(var e=cc.p(0,0),t=99999,i=99999,n=-99999,o=-99999,c=0;c<this.overviewTargets.length;++c){var s=this.overviewTargets[c];n=s.x>n?s.x:n,t=s.x<t?s.x:t,o=s.y>o?s.y:o,i=s.y<i?s.y:i}n+=this.overviewMargin,t-=this.overviewMargin,o+=this.overviewMargin,i-=this.overviewMargin;var a=Math.abs(n-t),r=Math.abs(o-i);e=cc.p(t+a/2,i+r/2);var u=Math.max(a/this.visibleSize.width,r/this.visibleSize.height);return this.camera.zoomRatio=1/u,e},shakeCamera:function(){this.canShake&&(this.anim.play("shake"),this.scheduleOnce(this.stopShake.bind(this),this.shakeDuration))},stopShake:function(){this.anim.stop(),this.camera.node.position=cc.p(0,0)},onMouseMove:function(e){this.pointerPos=e.getLocation()},onTouchMove:function(e){this.pointerPos=e.getLocation()}}),cc._RF.pop()},{}],GameManager:[function(e,t,i){"use strict";cc._RF.push(t,"c2145H9qN5D1LdnzRhCyCdT","GameManager"),cc.Class({extends:cc.Component,properties:{gen_active:cc.SpriteFrame,bulb_active:cc.SpriteFrame},onLoad:function(){cc.director.getPhysicsManager().enabled=!0,cc.director.getCollisionManager().enabled=!0},onDestroy:function(){cc.audioEngine.stop(G.memoryAudio)}}),cc._RF.pop()},{}],Global:[function(e,t,i){"use strict";cc._RF.push(t,"cf764d8n+ZDFIQn4soeG7QR","Global"),window.G={memoryAudio:null,pianoAudio:null},cc._RF.pop()},{}],PlayerControl:[function(e,t,i){"use strict";cc._RF.push(t,"780a0hTkG5N6JoyOoas6PXg","PlayerControl");cc.Class({extends:cc.Component,properties:{speedX:0,speedY:0,bLeft:0,bRight:0,bTop:0,excalm:cc.Node,msgBox:cc.Node,msgLabel:cc.Label,portal:cc.Sprite,bulb:cc.Sprite,underDoor:cc.Node,generator:cc.Sprite,picture:cc.Node,room1Sprites:{default:[],type:cc.SpriteFrame}},onLoad:function(){this.spine=this.node.getComponent(sp.Skeleton),console.log(this.spine),this.goLeft=!1,this.goRight=!1,this.jump=!1,this.interact=!1,this._up=!1,this.body=this.getComponent(cc.RigidBody),this.registerInput(),this.items={portal:{state:0},drawer:{state:0},picture:{state:0},generator:{state:0}},this.curItem="",this.gameWon=!1},registerInput:function(){var e=this;cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,onKeyPressed:function(t,i){if(t!=cc.KEY.a||e.msgBox.active)if(t!=cc.KEY.d||e.msgBox.active)if(t!=cc.KEY.space||e.msgBox.active){if(t==cc.KEY.e&&e.interact)if(e.msgBox.active)e.msgLabel.string="",e.msgBox.active=!1;else switch(e.goLeft=!1,e.goRight=!1,e.jump=!1,e.spine.setAnimation(0,"idel",!0),e.curItem){case"Generator":0==e.items.generator.state?(e.items.generator.state=1,e.items.portal.state=2,e.generator.spriteFrame=e.room1Sprites[0],setTimeout(function(){e.bulb.node.y=-305,e.bulb.spriteFrame=e.room1Sprites[1]},1500),setTimeout(function(){e.portal.spriteFrame=e.room1Sprites[2]},2300)):(e.msgBox.active=!0,e.msgLabel.string="Unlimited power.............");break;case"Picture":if(0==e.items.picture.state){e.msgBox.active=!0,e.msgLabel.string="I see.... the picture is a switch. I wonder what it did after I switched it on....",e.items.picture.state=1,e.underDoor.active=!1;var n=new cc.rotateBy(1,15);e.picture.runAction(n)}else e.msgBox.active=!0,e.msgLabel.string="Jeeze.. the woman in the picture looks like my mother!";break;case"Portal":0==e.items.portal.state?(e.msgBox.active=!0,e.msgLabel.string="Wow... a portal! My way out! But it's blocking me. I need something to offer to it..."):1==e.items.portal.state?(e.msgBox.active=!0,e.msgLabel.string="The portal still does not have enough power....."):2==e.items.portal.state&&1==e.items.drawer.state?e.scheduleOnce(e.changeScene,1):(e.msgBox.active=!0,e.msgLabel.string="I still need something to offer to the portal....");break;case"Drawer":0==e.items.drawer.state?(e.msgBox.active=!0,e.msgLabel.string="Yes! I found a portal stone! This should do it...",e.items.portal.state<2&&(e.items.portal.state=1),e.items.drawer.state=1):(e.msgBox.active=!0,e.msgLabel.string="Nothing of interest here....")}}else e.jump||(e.jump=!0);else e.goRight=!0,e.goLeft=!1,e.node.scaleX>0&&(e.node.scaleX*=-1),e._walk||(e.spine.setAnimation(0,"walking fast",!0),e._walk=!0);else e.goLeft=!0,e.goRight=!1,e.node.scaleX<0&&(e.node.scaleX*=-1),e._walk||(e.spine.setAnimation(0,"walking fast",!0),e._walk=!0)},onKeyReleased:function(t,i){t!=cc.KEY.a||e.msgBox.active?t!=cc.KEY.d||e.msgBox.active?t!=cc.KEY.space||e.msgBox.active||e.jump||(e.jump=!1):(e.goRight=!1,e._walk&&(e.spine.setAnimation(0,"idel",!0),e._walk=!1)):(e.goLeft=!1,e._walk&&(e.spine.setAnimation(0,"idel",!0),e._walk=!1))}},this.node)},onCollisionEnter:function(e){"Interact"==cc.game.groupList[e.node.groupIndex]&&(this.interact=!0,this.excalm.active=!0,this.curItem=e.node.name)},onCollisionExit:function(e){"Interact"==cc.game.groupList[e.node.groupIndex]&&(this.interact=!1,this.excalm.active=!1,this.curItem="")},update:function(e){if(this.goLeft&&this.node.x>this.bLeft?this.node.x-=this.speedX*e:this.goRight&&this.node.x<this.bRight&&(this.node.x+=this.speedX*e),this.jump&&this.node.y<this.bTop){var t=cc.v2(0,200*e*50);this.jump=!1,this.body.linearVelocity=t,cc.log(this.body.linearVelocity)}},changeScene:function(){cc.director.loadScene("Rocket")}}),cc._RF.pop()},{}],PlayerCtrl:[function(e,t,i){"use strict";cc._RF.push(t,"a7f90tHxsZJVKP7rAPlpECC","PlayerCtrl"),cc.Class({extends:cc.Component,properties:{canvas:{default:null,type:cc.Node},player:{default:null,type:cc.Node},rocketInactive:{default:null,type:cc.Node},rocketActive:{default:null,type:cc.Node},rocketParticle:{default:null,type:cc.Node},speedX:0,speedY:0,bLeft:0,bRight:0,bTop:0,rocketAudio:{default:null,url:cc.AudioClip}},onLoad:function(){this.spine=this.getComponent(sp.Skeleton),this.isRocketLaunch=!1,this.nodeDestroyed=!1,cc.director.getPhysicsManager().enabled=!0,cc.director.getCollisionManager().enabled=!0,console.log(this.spine),this.goLeft=!1,this.goRight=!1,this.jump=!1,this.interact=!1,this._up=!1,this.body=this.node.getComponent(cc.RigidBody),this.registerInput()},registerInput:function(){var e=this;cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,onKeyPressed:function(t,i){t!=cc.KEY.a||this.nodeDestroyed?t!=cc.KEY.d||this.nodeDestroyed?t!=cc.KEY.space||this.nodeDestroyed||e.jump||(e.jump=!0):(e.goRight=!0,e.goLeft=!1,e.node.scaleX>0&&(e.node.scaleX*=-1),e._walk||(e.spine.setAnimation(0,"walking fast",!0),e._walk=!0)):(e.goLeft=!0,e.goRight=!1,e.node.scaleX<0&&(e.node.scaleX*=-1),e._walk||(e.spine.setAnimation(0,"walking fast",!0),e._walk=!0))},onKeyReleased:function(t,i){t!=cc.KEY.a||this.nodeDestroyed?t!=cc.KEY.d||this.nodeDestroyed?t!=cc.KEY.space||this.nodeDestroyed||e.jump||(e.jump=!1):(e.goRight=!1,e._walk&&(e.spine.setAnimation(0,"idel",!0),e._walk=!1)):(e.goLeft=!1,e._walk&&(e.spine.setAnimation(0,"idel",!0),e._walk=!1))}},this.node)},update:function(e){if(this.goLeft&&this.node.x>this.bLeft?this.node.x-=this.speedX*e:this.goRight&&this.node.x<this.bRight&&(this.node.x+=this.speedX*e),this.jump&&this.node.y<this.bTop){var t=cc.v2(0,200*e*50);this.jump=!1,this.body.linearVelocity=t,cc.log(this.body.linearVelocity)}this.isRocketLaunch&&(this.rocketActive.y+=200*e,this.rocketParticle.y+=100*e)},onCollisionEnter:function(e){"Obstacle"==cc.game.groupList[e.node.groupIndex]&&(this.spine.enabled=!1,this.node.opacity=0,this.nodeDestroyed=!0,this.scheduleOnce(this.rocketInActive,1))},rocketInActive:function(){this.rocketInactive.active=!1,this.rocketActive.active=!0,this.scheduleOnce(this.rocketParticlePlay,1),this.scheduleOnce(this.sceneFadeOut,1.5)},rocketLaunch:function(){this.isRocketLaunch=!0,this.playAudioId=cc.audioEngine.play(this.rocketAudio,!1,1),this.scheduleOnce(this.changeScene,5)},rocketParticlePlay:function(){this.rocketParticle.active=!0;var e=this.rocketParticle.getComponent(cc.ParticleSystem);e.particleCount>0?e.stopSystem():e.resetSystem(),this.scheduleOnce(this.rocketLaunch,1)},sceneFadeOut:function(e){var t=new cc.fadeIn(1),i=new cc.delayTime(1),n=new cc.fadeOut(3),o=new cc.sequence(t,i,n);this.canvas.runAction(o)},changeScene:function(){cc.audioEngine.stop(this.playAudioId),cc.director.loadScene("EndScene")}}),cc._RF.pop()},{}],endSceneCtrl:[function(e,t,i){"use strict";cc._RF.push(t,"4a820gvhyRBK4etwlTbvI7G","endSceneCtrl"),cc.Class({extends:cc.Component,properties:{blackFirst:{default:null,type:cc.Node},label1:{default:null,type:cc.Node},blackSecond:{default:null,type:cc.Node},label2:{default:null,type:cc.Node},blackThird:{default:null,type:cc.Node},image1:{default:null,type:cc.Node},label3:{default:null,type:cc.Node},blackFourth:{default:null,type:cc.Node},label4:{default:null,type:cc.Node},image2:{default:null,type:cc.Node},audioClip:{default:null,url:cc.AudioClip},label5:cc.Node},onLoad:function(){this.fadeInOutFirst(this.blackFirst),this.fadeInOutSecond(this.label1),this.fadeInOutThird(this.blackSecond),this.fadeInOutFourth(this.label2),this.fadeInOutFifth(this.blackThird),this.fadeInOutSixth(this.image1),this.fadeInOutSeventh(this.label3),this.fadeInOutEighth(this.blackFourth),this.fadeInOutninth(this.label4),this.fadeInOutTenth(this.image2)},start:function(){this.playAudioId=cc.audioEngine.play(this.audioClip,!0,.5)},onDestroy:function(){cc.audioEngine.stop(this.playAudioId)},buttonPlay:function(){},showCutScenes:function(){var e=this;if(this.image.getComponent(cc.Sprite).spriteFrame=this.cutScenes[this._index],++this._index==this.cutScenes.length){setTimeout(function(){e.unschedule(e.showCutScenes),cc.director.loadScene("NextScene")},4e3)}},fadeInOutFirst:function(e){var t=new cc.fadeIn(1),i=new cc.delayTime(1),n=new cc.fadeOut(5),o=new cc.sequence(t,i,n);e.runAction(o)},fadeInOutSecond:function(e){var t=new cc.fadeIn(1),i=new cc.delayTime(4),n=new cc.fadeOut(3),o=new cc.sequence(t,i,n);e.runAction(o)},fadeInOutThird:function(e){var t=new cc.fadeIn(1),i=new cc.delayTime(7),n=new cc.fadeOut(3),o=new cc.sequence(t,i,n);e.runAction(o)},fadeInOutFourth:function(e){var t=new cc.fadeIn(1),i=new cc.delayTime(10),n=new cc.fadeOut(.1),o=new cc.sequence(t,i,n);e.runAction(o)},fadeInOutFifth:function(e){var t=new cc.fadeIn(1),i=new cc.delayTime(10),n=new cc.fadeOut(.1),o=new cc.sequence(t,i,n);e.runAction(o)},fadeInOutSixth:function(e){var t=new cc.fadeIn(1),i=new cc.delayTime(12),n=new cc.fadeOut(5),o=new cc.sequence(t,i,n);e.runAction(o)},fadeInOutSeventh:function(e){var t=new cc.fadeIn(1),i=new cc.delayTime(15),n=new cc.fadeOut(5),o=new cc.sequence(t,i,n);e.runAction(o)},fadeInOutEighth:function(e){var t=new cc.fadeIn(1),i=new cc.delayTime(18),n=new cc.fadeOut(5),o=new cc.sequence(t,i,n);e.runAction(o)},fadeInOutninth:function(e){var t=new cc.fadeIn(3),i=new cc.delayTime(20),n=new cc.fadeOut(5),o=new cc.sequence(t,i,n);e.runAction(o)},fadeInOutTenth:function(e){var t=this,i=new cc.fadeIn(3),n=new cc.delayTime(20),o=new cc.fadeOut(5),c=new cc.sequence(i,n,o);e.runAction(c),setTimeout(function(){t.label5.active=!0,setTimeout(function(){cc.game.restart()},5e3)},3e4)}}),cc._RF.pop()},{}],mainMenu:[function(e,t,i){"use strict";cc._RF.push(t,"f3a58sE9HxLD7FUwnzST1/f","mainMenu"),cc.Class({extends:cc.Component,properties:{background:cc.Node,cutScenes:{default:[],type:cc.SpriteFrame},_index:0,btnPlay:cc.Node,audioClip:{default:null,url:cc.AudioClip}},onLoad:function(){cc.director.preloadScene("Room1",function(){})},onDestroy:function(){},buttonPlay:function(){G.memoryAudio=cc.audioEngine.play(this.audioClip,!0,.5),this.btnPlay.active=!1,this.fadeInOut(this.background),this.schedule(this.showCutScenes,4)},showCutScenes:function(){var e=this;if(this.fadeInOut(this.background),this.background.getComponent(cc.Sprite).spriteFrame=this.cutScenes[this._index],++this._index==this.cutScenes.length){setTimeout(function(){e.unschedule(e.showCutScenes),cc.director.loadScene("Room1")},4e3)}},fadeInOut:function(e){var t=new cc.fadeIn(1),i=new cc.delayTime(1),n=new cc.fadeOut(1),o=new cc.sequence(t,i,n);e.runAction(o)}}),cc._RF.pop()},{}]},{},["CameraControl","GameManager","Global","PlayerControl","PlayerCtrl","endSceneCtrl","mainMenu"]);