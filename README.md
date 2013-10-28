#jQuery幻灯片插件  


----------

###使用方法

1. 引入相应的css、js和images  
   1:需要引入jQuery  
   2:images文件夹和css文件夹同级

2.  书写html代码，结构如下
> 	```<div class="slide-pic">
>         <ul class="slide-viewport">
>             <li style="z-index:2;">
>                 <a href="javascript:void(0);">
>                     <img src="images/sample1.jpg" width="600" height="300" alt="">
>                 </a>
>             </li>
>             <li>
>                 <a href="javascript:void(0);">
>                     <img src="images/sample2.jpg" width="600" height="300" alt="">
>                 </a>
>             </li>
>             <li>
>                 <a href="javascript:void(0);">
>                     <img src="images/sample3.jpg" width="600" height="300" alt="">
>                 </a>
>             </li>
>         </ul>
>     </div>```

说明: 每个`li`就是一张幻灯图，其中第一个`li`需要加上一句 `style="z-index:2;"`；

3 调用方法如下
> 	 <script>
>         $(".slide-pic").slidePic({width:600,height:300,autoSlideTime:3000,controllerLeft:true});
>     </script>

可以设置4个参数。  
其中 `width` 和 `height` 必须设置，就是你图片的宽高。  
 `autoSlideTime`是自动切换的时间，默认是5000，也就是5秒钟切换下一张   
 `controllerLeft`是控制左右两边控制按钮是否显示的参数，默认为`true`，也就是显示，也可以设置为`false`
