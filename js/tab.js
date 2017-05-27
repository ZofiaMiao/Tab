/**
 * Created by zofia on 2017/5/27.
 */
;(function ($) {
    var Tab = function (tab,arguments) {
        var _this_ = this;
        //保存为单个tab组建
        this.tab = tab;
        this.arguments = arguments;
        //默认配置参数
        this.config = {
            //定义鼠标触发类型，是click还是mouseover
            "triggerType":"click",
            //定义内容切换效果，default直接切换,fade淡入淡出
            "effect":"default",
            //默认显示第几个tab
            "invoke":1,
            //定义tab是否自动切换，当指定了时间，按照指定时间间隔进行切换
            "auto":false
        };
        //如果配置参数存在，就扩展默认配置参数
        if(this.arguments){
            $.extend(this.config,this.arguments);
        };
        //保存tab标签列表、对应的内容列表
        this.tabItems = this.tab.find("ul.tab-nav li");
        this.contentItems = this.tab.find("div.content-wrap div.content-item");
        //保存配置参数
        var config = this.config;
        if(config.triggerType === "click" || config.triggerType != "mouseover"){
            this.tabItems.bind(config.triggerType,function () {
                _this_.invoke($(this));
            })
        }else if(config.triggerType == "mouseover" ){
            this.tabItems.mouseover(function () {
                _this_.invoke($(this));
            })
        };
        //自动切换功能，如果配置了时间，根据时间间隔进行自动切换
        if(config.auto){
            //定义全局定时器
            this.timer = null;
            //定义计数器
            this.loop = 0;
            this.autoPlay();
            this.contentItems.hover(function () {
                window.clearInterval(_this_.timer);
                console.log(1);
            },function () {
                _this_.autoPlay();
                console.log(2);
            })
        };
        //设置默认显示第几个tab
        if(config.invoke >1){
            this.invoke(this.tabItems.eq(config.invoke-1));
        };
    };
    Tab.prototype={
        //事件驱动
        invoke:function (currentTab) {
            var _this_ = this;
            /***
             * 要执行tab的选中状态，当前选中的加上active(标记为白底)
             * 切换对应的tab内容，要根据配置参数的effect是default还是fade进行切换效果
             **/
            var index = currentTab.index();
            //tab选中状态
            currentTab.addClass("active").siblings().removeClass("active");
            //内容区域切换
            var effect = this.config.effect;
            var contentItems = this.contentItems
            if(effect === "default" || effect != "fade"){
                contentItems.eq(index).addClass("current").siblings().removeClass("current");
            }else if(effect === "fade"){
                contentItems.eq(index).fadeIn().siblings().fadeOut();
            };
            //index值和计数器值同步
            if(this.config.auto){
                _this_.loop = index;
            };
        },
        //自动间隔时间切换
        autoPlay:function () {
            var _this_ = this,
                tabItem = this.tabItems,//临时保存tab列表
                tabLength = tabItem.size(),//tab个数
                config=this.config;
            this.timer = window.setInterval(function () {
                _this_.loop ++;
                if(_this_.loop >= tabLength){
                    _this_.loop = 0;
                }
                tabItem.eq(_this_.loop).trigger(config.triggerType);
            },config.auto)

        }

    };
    window.Tab = Tab;
})(jQuery);