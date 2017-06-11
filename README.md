# tab组件

[demo](https://zofiamiao.github.io/Tab/tab.html)

### 初始化配置
```
var tab = new Tab(el,{
                "triggerType":"click",//触发tab页切换事件,click,mouseover
                "effect":"default",//tab页切换效果,default,fadein
                "index":3,//默认显示第几个tab页,1为第一个
                "auto":false,//是否自动切换
                "autoInterval":5000,//默认5s自动切换间隔
            });
```