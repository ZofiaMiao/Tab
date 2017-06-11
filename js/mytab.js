/**
 * Created by zofia on 2017/6/11.
 */
(function ($) {
    var Tab = function (tab,arguments) {
        var _this = this;
        _this.tab = tab;
        _this.arguments = arguments;
        _this.tabItems = _this.tab.find(".tab-nav > li");//tab页的标签
        _this.tabContentItems = _this.tab.find("div.content-wrap > div.content-item");//tab页的内容
        //默认配置
        this.config = {
            "triggerType":"click",//触发tab页切换事件,click,mouseover
            "effect":"default",//tab页切换效果,default,fadein
            "index":3,//默认显示第几个tab页,1为第一个
            "auto":false,//是否自动切换
            "autoInterval":5000,//默认5s切换
        };
        //如果配置参数存在，就扩展默认配置参数
        if(this.arguments){
            $.extend(_this.config,_this.arguments);
        }
        var config = _this.config;
        //绑定事件
        _this.tabItems.bind(config.triggerType,function () {
            _this.tabEvent($(this));
        });
        //设置自动轮播
        if(config.auto){
            _this.timer = null;//定义一个全局计时器
            _this.loop = 0;//定义循环次数
            _this.autoPlay();
            _this.tabContentItems.hover(function () {
                window.clearInterval(_this.timer);
            },function () {
                _this.autoPlay();
            })
        }
        //设置默认展示第几个tab
        if(config.invoke)_this.tabEvent(_this.tabItems.eq(config.invoke-1));
    }
    //事件方法
    Tab.prototype = {
        //tab页切换的事件
        tabEvent(currTab) {
            var _this = this;
            var config = _this.config;
            var _tabindex = currTab.index();
            currTab.addClass("active").siblings().removeClass("active");
            if(config.effect === "default" || config.effect !== "fadein"){
                _this.tabContentItems.eq(_tabindex).addClass("current").siblings().removeClass("current");
            }else if(config.effect === "fadein"){
                _this.tabContentItems.eq(_tabindex).fadeIn().siblings().fadeOut();
            }
            //每次执行事件后，将循环中的计数与当前索引保持一致
            if(config.auto)_this.loop = _tabindex;
        },
        //循环播放
        autoPlay() {
            var _this = this;
            var tabItems = _this.tabItems;
            var tabItemsLen = tabItems.size();
            _this.timer = window.setInterval(function () {
                _this.loop ++
                _this.loop = _this.loop >= tabItemsLen ? 0 : _this.loop;
                tabItems.eq(_this.loop).trigger(_this.config.triggerType);
            },_this.config.autoInterval);
        }
    }
window.Tab = Tab;

})(jQuery)