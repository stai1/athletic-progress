(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{Yj9t:function(t,e,r){"use strict";r.r(e),r.d(e,"AuthModule",(function(){return p}));var n=r("ofXK"),c=r("tyNb"),o=r("HC5s"),a=r("fXoL"),s=r("qXBG");const i=[{path:"",component:(()=>{class t{constructor(t){this.authService=t}ngOnInit(){}get authUrl(){return Object(o.a)("https://www.strava.com/oauth/authorize",{client_id:36433,response_type:"code",redirect_uri:Object(o.b)(document.baseURI,this.authService.redirectUrl),approval_prompt:"force",scope:"activity:read,activity:read_all"})}}return t.\u0275fac=function(e){return new(e||t)(a.Eb(s.a))},t.\u0275cmp=a.yb({type:t,selectors:[["app-auth-page"]],decls:2,vars:1,consts:[[3,"href"],["src","assets/btn_strava_connectwith_orange.png"]],template:function(t,e){1&t&&(a.Jb(0,"a",0),a.Fb(1,"img",1),a.Ib()),2&t&&a.Rb("href",e.authUrl,a.Tb)},styles:[""]}),t})()}];let u=(()=>{class t{}return t.\u0275mod=a.Cb({type:t}),t.\u0275inj=a.Bb({factory:function(e){return new(e||t)},imports:[[c.d.forChild(i)],c.d]}),t})(),p=(()=>{class t{}return t.\u0275mod=a.Cb({type:t}),t.\u0275inj=a.Bb({factory:function(e){return new(e||t)},imports:[[n.b,u]]}),t})()}}]);