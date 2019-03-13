<template>
  <div class="edit_box">
    <div class="header_title">
      <h1 v-show="type=='edit'">文档编辑</h1>
      <h1 v-show="type=='teamwork_edit'">文档编辑[协作]</h1>
      <select class="select_language">
        <option value="ind_corrector">印尼语</option>
        <option value="phi_corrector">菲律宾语</option>
        <option value="eng_corrector">英语</option>
        <option value="may_corrector">马来语</option>
      </select>
      <img src="./delete.png" @click="delete_edit">
    </div>
    <div class="wrapper_box">
      <div class="left-box">
        <a href="jacascript::void(0)"><div class="icon" id="revoke" @click="revoke">
          <img src="./revoke.png">
          <h1>撤销</h1>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="reset" @click="reset">
          <img src="./reset.png">
          <h1>重置</h1>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="brush" @click="brush">
          <img src="./formatting.png" style="width: 30px;height: 20px">
          <h1>格式刷</h1>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="insert">
          <input type="file" id="insert_img" enctype=”multipart/form-data” accept = 'image/gif,image/jpeg,image/jpg,image/png' @change="readAsDataURL()">
          <img src="./insert.png">
          <h1>插入</h1>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="font" style="position: relative" @click.stop="font_area()">
          <div class="special"><span>宋</span><img src="./spacing.png" style="width: 10px;height: 16px"></div>
          <h1>宋体</h1>
          <div style="position: absolute;" class="select_area"  v-show="font_show" id="toggler-icon">
            <ul>
              <li @click="font($event)">宋体</li>
              <li @click="font($event)">黑体</li>
              <li @click="font($event)">仿宋</li>
              <li @click="font($event)">Arial</li>
              <li @click="font($event)">雅黑</li>
              <li @click="font($event)">楷体</li>
              <li @click="font($event)">隶书</li>
              <li @click="font($event)">Comic Sans MS</li>
            </ul>
          </div>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="thickening" @click="thickening" >
          <img src="./thickening.png">
          <h1>粗体</h1>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="italic" @click="italic">
          <img src="./italic.png">
          <h1>斜体</h1>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="underline" @click="underline">
          <img src="./underline.png" style="margin-left: 8px">
          <h1>下划线</h1>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="fo_si" @click.stop="size_area()">
          <div class="special"><span>20</span><img src="./spacing.png" style="width: 10px;height: 16px"></div>
          <h1>字号</h1>
          <div style="position: absolute;" class="select_area"  v-show="size_show">
            <ul>
              <li @click="size($event)">1</li>
              <li @click="size($event)">2</li>
              <li @click="size($event)">3</li>
              <li @click="size($event)">4</li>
              <li @click="size($event)">5</li>
              <li @click="size($event)">6</li>
              <li @click="size($event)">7</li>
            </ul>
          </div>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="fo_co" @click.stop="color_area">
          <div style="width: 20px;height: 21px;background: #555;border-radius: 3px;margin-left: 3px"></div>
          <h1>颜色</h1>
          <div style="position: absolute;z-index: 100" class="select_area"  v-show="color_show">
            <ul>
              <li @click="color('#ff0000')">红色</li>
              <li @click="color('#ffff00')">黄色</li>
              <li @click="color('#0000FF')">蓝色</li>
              <li @click="color('#008000')">绿色</li>
              <li @click="color('#000')">黑色</li>
              <li @click="color('#808080')">灰色</li>
            </ul>
          </div>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="spacing" style="position: relative" @click.stop="spacing_area">
          <div style="display: inline-block;width: 10px;height: 10px;position: absolute"><p style="line-height: 8px">单</p><p>倍</p></div><img src="./spacing.png" style="margin-left: 18px;margin-top:2px;width: 10px;height: 18px">
          <h1>行间距</h1>
          <div style="position: absolute;z-index: 100" class="select_area"  v-show="spacing_show">
            <ul>
              <li @click="spacing('1em')">单倍</li>
              <li @click="spacing('1.5em')">1.25倍</li>
              <li @click="spacing('1.5em')">1.5倍</li>
              <li @click="spacing('1.75em')">1.75倍</li>
              <li @click="spacing('2em')">两倍</li>
              <li @click="spacing('3em')">三倍</li>
            </ul>
          </div>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="alignment" @click="alignment">
          <img src="./alignment.png">
          <h1>对齐</h1>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="order" @click="order()">
          <img src="./order1.png">
          <h1>有序</h1>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="unorder" @click="unorder()" >
          <img src="./unorder.png" >
          <h1>无序</h1>
        </div>
        </a>
        <a href="jacascript::void(0)"><div class="icon" id="correction" @click="correction">
          <img src="./correction.png" >
          <h1>纠错</h1>
        </div>
        </a>
        <div class="task">
          <div class="save" @click="save_file">保存</div>
          <div class="task_al"  @click="task_allocation" v-show="!isCollaborator&&type=='teamwork_edit'">分配任务</div>
          <div class="task_su" v-show="isCollaborator&&type=='teamwork_edit'" @click="submit_job">提交任务</div>
        </div>
      </div>
      <div class="right-box edit" v-show="type=='edit'">
        <img :src="star?isStar:notStar" class="star_img">
        <div class="file_tl" contenteditable="true" spellcheck="false" @keyup="is_edit = true"></div>
        <div id="edit_area" @keyup.8="check_clear"  @keyup="is_edit = true" spellcheck="false" contenteditable="true" style="outline: none;border: 0">
          <p><br></p>
        </div>
        <transition name="fade">
          <div id="correction_area"  v-show="correction_state" style="outline: none;border: 0">
          </div>
        </transition>
      </div>
      <div class="right-box teamwork_edit" v-show="type=='teamwork_edit'">
        <div class="rb_tl">
          <img :src="star?isStar:notStar" class="star_img">
          <div class="file_tl" contenteditable="true" spellcheck="false" @keyup="is_edit = true"></div>
          <div class="icon_ls">
            <ul>
              <li><img src="./ad.png" @click="add_box_show=true"></li>
              <li v-for="item in teamwork_members"><img :src=item.icon></li>
            </ul>
          </div>
          <!--<div class="task"  @click="task_allocation" v-show="!isCollaborator">分配任务</div>-->
          <!--<div class="task" v-show="isCollaborator" @click="submit_job">提交任务</div>-->
        </div>
        <div class="rb_ct">
          <div class="edit_area">
            <div id="edit_area1" @keyup.8="check_clear" @keyup="is_edit = true" spellcheck="false" contenteditable="true" style="outline: none;border: 0">
              <p><br></p>
            </div>
            <div id="correction_area1"  v-show="correction_state" style="outline: none;border: 0">
            </div>
          </div>
          <div class="chat_area">
            <div class="chat_list">
              <ul>
                <li v-for="item in chat_list" :class="item.isMe?'is_me':'not_me'"><span class="chat_content">{{item.content}}</span><img class="chat_icon" :src="item.icon"></li>
              </ul>
            </div>
            <div class="chat_edit">
              <img class="expression" src="./icon.png">
              <img class="picture" src="./pic.png">
              <input type="text" value="" spellcheck="false" @keyup.enter="send_message" v-model="message">
              <span class="send_btn" @click="send_message">ENTER</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="task_box" v-show="task_show&&type=='teamwork_edit'">
      <div class="task_lb">
        <h1>任务清单</h1>
        <div class="task_content">
        </div>
      </div>
      <div class="task_rb">
        <h1>选择协作者</h1>
        <div class="tasker">
          <ul>
            <li v-for="(item,index) in teamwork_members" :class="isChoose==index?'select_box':'noselect_box'" @click="isChoose=index"><img :src=item.icon><span>{{item.nickname}}</span></li>
          </ul>
        </div>
        <span class="task_btn" @click="send_allocation()">确定</span>
      </div>
      <div class="delete_btn" @click="task_show=false">×</div>
    </div>
    <div class="add_member_box" v-show="add_box_show&&type=='teamwork_edit'">
      <h1>成员添加</h1>
      <span>邮箱:</span>
      <input type="text" placeholder="请输入邮箱" @keyup.enter="add_member" v-model="email"/>
      <div class="add_member" @click="add_member">确定</div>
      <div class="delete_btn" @click="add_box_show=false">×</div>
    </div>
  </div>
</template>
<script>
  import api from "../../api/api.js"
    export default {
      name: "edit_box",
      props:{
        id:{
          default:""
        },
        file_name:"",
        content:"",
        star:0,
        type:"",
        isCollaborator:0,
        teamwork_members:{},
        chat_list:{},
        username:"",
        creator:""
      },
      data(){
        return {
          is_edit:false,
          font_show:false,
          size_show:false,
          color_show:false,
          spacing_show:false,
          brush_text:{},
          brush_flag:false,
          title_show:false,
          content_html:this.content,
          isStar:"static/star2.png",
          notStar:"static/star1.png",
          intId:{},
          content_text:{},
          select_text:"",
          correction_state:false,
          data:{},
          task_show:false,
          add_box_show:false,
          message:"",
          email:"",
          isChoose:null,
          avater:"",
          text_index:0
        }
      },
      methods:{
        //清除br
        clear_br(){
          if(this.type=='edit'){
            $('#edit_area p').find('br').remove();
          }else{
            $('#edit_area1 p').find('br').remove();
          }
        },
        //添加为个人文档
        async add_myfile(){
            this.content_html = $("#edit_area1").html();
            this.file_name = $(".file_tl").eq(1).text();
            // var file_name  =$(".file_tl").eq(1).text();
            // this.$emit('change_filename',file_name);
            console.log(this.file_name);
            // this.file_name = $(".file_tl").eq(0).text();
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            var update =year + "-"+month+"-"+strDate;
            this.data= {id:"",username:this.username,file_name:this.file_name,content:this.content_html};

            try{
              let result = await api.saveFile(this.data);
              result = result.data;
              if(result.success){
                alert("添加个人文档成功！")
              }
            }catch (err){
              alert("添加个人文档失败！")
              console.log(err)
            }
            // this.$http.post('/api/savefile',this.data)
            //   .then((res) => {
            //     res = res.body;
            //     if(res.success){
            //       alert("添加个人文档成功！")
            //     }
            //   })
            //   .catch(error => {
            //     alert("添加个人文档失败！")
            //   });
        },
        //导入文档
        input_file(url){
          // var w = new ActiveXObject('Word.Application');
          // var docText;
          // var obj;
          // if(w != null) {
          //   w.Visible = true;
          //   obj = w.Documents.Open(url);
          //   docText = obj.Content;
          //   w.Selection.TypeText("Hello");
          //   w.Documents.Save();
          //   $('#edit_area').text(docText);//Print on webpage
          //   /*The Above Code Opens existing Document
          //    set w.Visible=false
          //    */
          //   /*Below code will create doc file and add data to it and will close*/
          //   w.Documents.Add();
          //   w.Selection.TypeText("Writing This Message ....");
          //   w.Documents.Save(url);
          //   w.Quit();
          //   /*Don't forget
          //    set w.Visible=false */
          // }
          alert("此功能暂未开放")
        },
        exportDoc(){//导出文档
          this.file_name = $(".file_tl").eq(1).text();
          $("#edit_area1").wordExport(this.file_name);
        },
        //添加历史纪录
        async add_history(){
          var date=new Date;
          var year=date.getFullYear();
          var month=date.getMonth()+1;
          var day = date.getDate();
          month =(month<10 ? "0"+month:month);
          var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
          var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
          var mydate = (year.toString()+"/"+month.toString()+"/"+day.toString()+" "+hour+":"+minute);
          try{
            let params ={
              data:{
                username:this.username,
                file_id:this.id
              }
            };
            let result = await api.addHistroy(params);
            let data = result.data;
            console.log(result)
            if(data.code==1){
              this.$emit("add_history");
              console.log("添加纪录成功!")
            }else{
              console.log("添加纪录失败！")
            }
          }catch(err){
            console.log("添加纪录失败！")
            throw(err);
          }
        },
        //协作者任务提交
        async submit_job(){
          try{
            var date=new Date;
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day = date.getDate();
            month =(month<10 ? "0"+month:month);
            var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var mydate = (year.toString()+"/"+month.toString()+"/"+day.toString()+" "+hour+":"+minute);
            this.content_html = $('#edit_area1').html();
            let params ={
              data:{
                username:this.username,
                file_id:this.id,
                content:this.content_html,
                submit_date:mydate,
                creator:this.creator
              }
            };
            let result = await api.submit_job(params);
            let data = result.data;
            if(data.code==1){
              alert("提交成功！")
              this.save_file();
            }else{
              alert("提交失败！")
            }
          }catch(err){
            alert("提交失败！")
            throw(err);
          }
        },
        //添加成员
        async add_member(){
          var date=new Date;
          var year=date.getFullYear();
          var month=date.getMonth()+1;
          var day = date.getDate();
          month =(month<10 ? "0"+month:month);
          var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
          var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
          var mydate = (year.toString()+"/"+month.toString()+"/"+day.toString()+" "+hour+":"+minute);
          if(this.email==""){
            alert("请输入邮箱");
            return;
          }
          try{
            let params ={
              data:{
                sender:this.username,
                receiver:this.email,
                file_id:this.id,
                state:2,
                add_time:mydate
              }
            };
            let result = await api.add_Member(params);
            let data = result.data;
            if(data.code==1){
              alert("添加成功！")
            }else{
              alert("添加失败！")
            }
          }catch(err){
            alert("添加失败！")
            throw(err);
          }
        },
        //发送留言
        async send_message(){
          //var data = {username:this.username,message:this.message};
          this.avater = sessionStorage.getItem("avater");
          if(this.message==""){
            alert("内容不能为空");
            return;
          }
          var ch_ls = {content:this.message,icon:this.avater,isMe:1};
          try{
            let params ={
              data:{
                username:this.username,
                content:this.message,
                file_id:this.id
              }
            };
            let result = await api.send_message(params);
            let data = result.data;
            console.log(result)
            if(data.code==1){
              this.chat_list.push(ch_ls)
            }else{
              alert("留言失败！")
            }
          }catch(err){
            alert("留言失败！")
            throw(err);
          }
          this.message = "";
        },
        //发送任务分配
        async send_allocation(){
          var date=new Date;
          var year=date.getFullYear();
          var month=date.getMonth()+1;
          var day = date.getDate();
          month =(month<10 ? "0"+month:month);
          var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
          var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
          var mydate = (year.toString()+"/"+month.toString()+"/"+day.toString()+" "+hour+":"+minute);
          var task_list = [];
          for(var i=0;i<$(".task_content").children().length;i++){
            if($(".task_content").children().eq(i).find('span').attr("class")=='select_box'){
              task_list.push($(".task_content").children().eq(i).text().trim())
            }
          }
          console.log(task_list);
          if(task_list==""||this.isChoose==null){
            alert("请选择分配内容或对象");
            return;
          }
          var username = this.teamwork_members[this.isChoose].username;
          console.log(username)
          // var data = {collaborator_name:username,task_list:task_list,pid:id,allocation_time:mydate};
          try{
            let params ={
              data:{
                sender:this.username,
                receiver:username,
                tasks:task_list,
                file_id:this.id,
                allocation_time:mydate
              }
            };
            let result = await api.task_allocation(params);
            let data = result.data;
            if(data.code==1){
              alert("分配成功！");
              this.save_file();
            }else{
              alert("分配失败！")
            }
          }catch(err){
            alert("分配失败！")
            throw(err);
          }
        },
        //任务分配清单
        task_allocation(){
          this.task_show=true;
          $(".task_content").html("");
          for(var i=0;i<$("#edit_area1").children().length;i++){
            var text = $("#edit_area1").children().eq(i).text();
            $(".task_content").append("<p><span class='noselect_box'></span>"+text+"</p>");
            $(".task_content").children().last().find('.noselect_box').on('click',function () {
              if($(this).attr("class")=='noselect_box'){
                $(this).attr("class",'select_box')
              }else{
                $(this).attr("class",'noselect_box')
              }
            })
          }


          //办法2
          // $(".task_content").html($("#edit_area").html());
          // console.log( $(".task_content").children().html());
          //   $(".task_content").children().prepend("<span class='noselect_box'></span>");
          //   // alert(i);
          //   $(".task_content").children().find("span").on('click',function () {
          //     if($(this).attr("class")=='noselect_box'){
          //       $(this).attr("class",'select_box')
          //     }else{
          //       $(this).attr("class",'noselect_box')
          //     }
          //   })
        },
        check_clear(){ //文本被清空后div插入<p><br></p>
          if(this.type=='edit'){
            if($("#edit_area").html().trim()==""){
              $("#edit_area").append("<p><br></p>")
            }
          }else{
            if($("#edit_area1").html().trim()==""){
              $("#edit_area1").append("<p><br></p>")
            }
          }
        },
        textSelect(o,a,b){
          var a = parseInt(a, 10), b = parseInt(b, 10);
          var l = o.innerText.length;
          if(l){
            //如果非数值，则表示从起始位置选择到结束位置
            if(!a){
              a = 0;
            }
            if(!b){
              b = l;
            }
            //如果值超过长度，则就是当前对象值的长度
            if(a > l){
              a = l;
            }
            if(b > l){
              b = l;
            }
            //如果为负值，则与长度值相加
            if(a < 0){
              a = l + a;
            }
            if(b < 0){
              b = l + b;
            }
            if(o.createTextRange){//IE浏览器
              var range = o.createTextRange();
              range.moveStart("character",-l);
              range.moveEnd("character",-l);
              range.moveStart("character", a);
              range.moveEnd("character",b);
              range.select();
            }else{
              o.setSelectionRange(a, b);
              o.focus();
            }
          }
        },
        delete_edit(){
          if(this.type=='edit'){
            if(this.is_edit ==true){
              if(confirm("你未保存，确定提交吗？")){
                this.$router.push({name:'myfile',params:{username:this.username}});
              }else{
              }
            }else{
              this.$router.push({name:'myfile',params:{username:this.username}});
            }
          }else{
            if(this.is_edit ==true){
              if(confirm("你未保存，确定提交吗？")){
                this.$router.push({name:'teamworkfile',params:{username:this.username}});
              }else{
              }
            }else{
              this.$router.push({name:'teamworkfile',params:{username:this.username}});
            }
          }

        },
        brush(){//格式刷
          var s1,s2 ;
          if(this.brush_flag){
            s1 = this.brush_text.split(":")[0];
            s2 = this.brush_text.split(":")[1];
            document.execCommand(s1,false,s2);
          }else{
            document.execCommand(this.brush_text);
          }
        },
        revoke(){//撤消
          document.execCommand('undo');
          this.brush_text = 'undo';
          this.brush_flag = false;
        },
        reset(){//重置
          document.execCommand('selectAll');
          document.execCommand('delete')
        },
        thickening(){//加粗
          document.execCommand('bold');
          this.brush_text = "bold"
          this.brush_flag = false;
        },
        italic(){//斜体
          document.execCommand('italic');
          this.brush_text = 'italic';
          this.brush_flag = false;
        },
        underline(){//下划线
          document.execCommand('underline');
          this.brush_text = 'underline';
          this.brush_flag = false;
        },
        alignment(){//左对齐
          document.execCommand('justifyLeft',false,null);
          this.brush_text = 'justifyLeft';
          this.brush_flag = false;
        },
        async correction(){
          this.correction_state = !this.correction_state;
          this.clear_br();
          var select_lan = $(".select_language  option:selected").val();
          if(this.type=='edit'){
            if(this.correction_state){
              $("#correction_area").empty();
              $("#edit_area").css("height","200px");
              $("#edit_area").css("border-bottom","1px solid #555");
              // $("#correction_area").css("border-top","1px solid #555");
              //清除br
              this.content_html = $('#edit_area').html();
              function correct(data){
                let texts = [];
                let index = 0;
                for(var i=0;i<data.length;i++){
                  console.log(data[i].wrongs.length);
                  var t = data[i].text;
                  console.log(t);
                  if(data[i].wrongs.length){
                    index=0;
                    texts.splice(0,texts.length);
                    texts.push(data[i].position+"&nbsp;&nbsp;");
                    data[i].wrongs.sort((value1, value2) => {
                      return value1.index > value2.index;
                    }).forEach(value => {
                      texts.push(data[i].text.substring(index, value.index));
                      // texts.push('<span data-word="' + value.corrects + '">'+value.word+'</span>');
                      let texts1 = []
                      texts1.push(value.word)
                      value.corrects.forEach(item=>{
                        texts1.push('<span class="span-show" data-text="'+t+'" data-word="'+value.word+'">'+item+'</span>');
                      })
                      texts1.unshift('<div class="wrong_word">');
                      texts1.push('</div>')
                      texts.push(texts1.join(""));
                      index = value.index + value.word.length;
                    });
                    texts.push(data[i].text.substr(index));
                    texts.unshift("<div class='correction_li'>")
                    texts.push("</div>");
                    $('#correction_area').append(texts);
                  }
                }
              }
              console.log(this.content_html)

              try{
                  let params = {
                    data:{
                      text:this.content_html,
                      language:select_lan
                    }
                  }
                  let result = await api.correct(params);
                  result = result.data
                  // data = {wrong:[{'index':9,word:'gg',corrects:['good']}],text:'I think gg'};
                  console.log(result);
                  correct(result);

              }catch (err){
                console.log(err)
              }
              // $.ajax({
              //   type:'POST',
              //   url:'/api/corrector',
              //   data:{
              //     text:this.content_html,
              //     language:select_lan
              //   },
              //   success:function(data){
              //     data = data.data
              //     // data = {wrong:[{'index':9,word:'gg',corrects:['good']}],text:'I think gg'};
              //     console.log(data);
              //     correct(data);
              //   },
              //   error:function(err){
              //     console.log(err);
              //   }
              // });
            }else{
              $("#edit_area").css("height","400px")
              $("#edit_area").css("border-bottom","0")
            }
          }else{
            if(this.correction_state){
              $("#correction_area1").empty();
              $("#edit_area1").css("height","200px");
              $("#edit_area1").css("border-bottom","1px solid #555");
              this.content_html = $('#edit_area1').html();
              function correct(data){//将纠错数据进行处理
                let texts = [];
                let index = 0;
                for(var i=0;i<data.length;i++){
                  console.log(data[i].wrongs.length);
                  var t = data[i].text;
                  if(data[i].wrongs.length){
                    index=0;
                    texts.splice(0,texts.length);
                    texts.push(data[i].position+"&nbsp;&nbsp;");
                    data[i].wrongs.sort((value1, value2) => {
                      return value1.index > value2.index;
                    }).forEach(value => {
                      texts.push(data[i].text.substring(index, value.index));
                      // texts.push('<span data-word="' + value.corrects + '">'+value.word+'</span>');
                      let texts1 = []
                      texts1.push(value.word)
                      value.corrects.forEach(item=>{
                        texts1.push('<span class="span-show" data-text="'+t+'">'+item+'</span>');
                      })
                      texts1.unshift('<div class="wrong_word">');
                      texts1.push('</div>')
                      // texts.push(texts1.toString().replace(/,/g,''));
                      texts.push(texts1.join(""));
                      index = value.index + value.word.length;
                    });
                    texts.push(data[i].text.substr(index));
                    texts.unshift("<div class='correction_li'>")
                    texts.push("</div>");
                    $('#correction_area1').append(texts);
                  }
                }
              }
              console.log(this.content_html)
              try{
                let params = {
                  data:{
                    text:this.content_html,
                    language:select_lan
                  }
                }
                let result = await api.correct(params);
                result = result.data
                // data = {wrong:[{'index':9,word:'gg',corrects:['good']}],text:'I think gg'};
                console.log(result);
                correct(result);
              }catch (err){
                console.log(err)
              }
              // $.ajax({
              //   type:'POST',
              //   url:'/api/corrector',
              //   data:{
              //     text:this.content_html,
              //     language:select_lan
              //   },
              //   success:function(data){
              //     data = data.data
              //     console.log(data);
              //     correct(data);
              //   },
              //   error:function(err){
              //     console.log(err);
              //   }
              // });
            }else{
              $("#edit_area1").css("height","400px")
              $("#edit_area1").css("border-bottom","0")
            }
          }
        },
        // correct(data){
        //   let texts = [];
        //   let index = 0;
        //   for(var i=0;i<data.length;i++){
        //     index=0;
        //     texts.splice(0,texts.length);
        //     texts.push(data[i].position+"&nbsp;&nbsp;");
        //     data[i].wrongs.sort((value1, value2) => {
        //       return value1.index > value2.index;
        //     }).forEach(value => {
        //       texts.push(data[i].text.substring(index, value.index));
        //       texts.push('<span data-word="' + value.corrects + '">'+value.word+'</span>');
        //       index = value.index + value.word.length;
        //     });
        //     texts.push(data[i].text.substr(index));
        //     texts.unshift("<div class='correction_li'>")
        //     texts.push("</div>");
        //     $('#correction_area').append(texts);
        //   }
        // },
        font(e){
          document.execCommand('fontname',false,e.target.innerText);
          this.brush_text = "fontname:"+e.target.innerText;
          this.brush_flag = true;
        },
        font_area(){
          this.font_show = !this.font_show
          this.color_show = false
          this.spacing_show = false
          this.size_show = false
        },
        size_area(){
          this.size_show = !this.size_show;
          this.font_show = false
          this.color_show = false
          this.spacing_show = false
        },
        size(e){
          document.execCommand('fontsize',false,e.target.innerText)
          this.brush_text = "fontsize:"+e.target.innerText;
          this.brush_flag = true;
        },
        order(){
          document.execCommand('InsertOrderedList',false,null);
          this.brush_text = "InsertOrderedList";
          this.brush_flag = false;
          this.adjustList();
        },
        unorder(){
          document.execCommand('insertUnorderedList',false,null);
          this.brush_text = "insertUnorderedList";
          this.brush_flag = false;
          this.adjustList();
        },
        color_area(){
          this.color_show = !this.color_show
          this.font_show = false
          this.size_show = false
          this.spacing_show = false
        },
        color(val){
          document.execCommand('forecolor',false,val)
          this.brush_text = 'forecolor:'+val;
          this.brush_flag = true;
          // $("#edit_area").focus();
        },
        spacing_area(){
          this.spacing_show = !this.spacing_show
          this.font_show = false
          this.size_show = false
          this.color_show = false
        },
        spacing(val){
          if(this.type=='edit'){
            $("#edit_area").css('line-height',val);
          }else{
            $("#edit_area1").css('line-height',val);
          }
        },
        adjustList() { //有序无序加套p标签
          let lists;
          if(this.type=='edit'){
            lists = document.getElementById("edit_area").querySelectorAll("ol, ul");
          }else{
            lists = document.getElementById("edit_area1").querySelectorAll("ol, ul");
          }
          console.log(lists);
          for (let i = 0; i < lists.length; i++) {
            let ele = lists[i]; // ol
            let parentNode = ele.parentNode;
            if (parentNode.tagName=== 'P' && parentNode.lastChild === parentNode.firstChild) {
              parentNode.insertAdjacentElement("beforeBegin", ele);
              parentNode.remove()
            }
          }
        },
        //处理paste
        dealPaste(){
          $('#edit_area').on('paste',(event)=>{
            event.preventDefault();
            let plainText = event.clipboardData.getData('text/plain');  // 无格式文本
            let plainHTML = event.clipboardData.getData('text/html');// 有格式文本
            // let plainHTML = "<p>"+event.clipboardData.getData('text/html')+"</p>";// 有格式文本
            document.execCommand('insertText', false, plainText);
            document.execCommand('insertHTML', false, plainHTML);
          })
        },
        async readAsDataURL(){
          try{
            let params = {
              data:{
                imgFile: $('#insert_img')[0].files[0],
                flag:1
              }
            }
            let result = await api.updateFile(params);//插入图片
            let res = result.data;
            document.execCommand("InsertImage",false,res.imgUrl)
          }catch (err){
            console.log(err)
            alert("插入图片失败")
          }

        },
        async save_file(){  //实时保存文件
          var date = new Date();
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var update =year + "-"+month+"-"+strDate
          if(this.type=='edit'){
            this.content_html = $("#edit_area").html();
            this.file_name = $(".file_tl").eq(0).text();
          }else{
            this.content_html = $("#edit_area1").html();
            this.file_name = $(".file_tl").eq(1).text();
          }
          this.data= {id:this.id,username:this.username,file_name:this.file_name,content:this.content_html};
          console.log(this.data)
          if(this.type=='edit'){
            try{
              let params = {
                data:this.data
              }
              let result = await api.saveFile(params);
              let res  = result.data;
              if(res.success){
                console.log("保存成功")
                this.is_edit = false;
                if(res.id){
                  this.$emit('changeFileid',res.id);
                  // this.id=res.id;
                }
              }
            }catch (err){
              console.log("保存失败")
              console.log(err)
            }
          }else{
            try{
              let params = {
                data:this.data
              }
              let result = await api.saveCoop(params);
              let res = result.data;
              console.log("保存成功")
              this.is_edit = false;
              if(res.id){
                this.$emit('changeFileid',res.id);
                // this.id=res.id;
              }
            }catch (err){
              console.log("保存失败")
              console.log(err)
            }
          }
        },
        init_correct() {
          if (this.type == 'edit') {
            $('#edit_area').html(this.content_html)//改变iframe中内容
            $('#correction_area').delegate(".wrong_word", "click", function () {
              $(this).children().css('display', 'inline-block');
            });
            $('#correction_area').delegate(".span-show", "click", function () {
              console.log($(this).text())
              var corrector = $(this).text();
              // var wrong = $(this).parent().prop('firstChild').nodeValue;
              var wrong = $(this).attr('data-word');
              var wrong_text = $(this).attr('data-text');
              var right_text = wrong_text.replace(wrong, corrector)
              $(this).parents('#correction_area').find(".span-show").attr('data-text',right_text)
              $(this).parents('#correction_area').find(".span-show").attr('data-word',corrector)
              var text = $('#edit_area').html().replace(wrong_text, right_text)
              console.log(text);
              $('#edit_area').html(text);
            })
          } else {
            $('#edit_area1').html(this.content_html)//改变iframe中内容
            $('#correction_area1').delegate(".wrong_word", "click", function () {
              $(this).children().css('display', 'inline-block');
            });
            $('#correction_area1').delegate(".span-show", "click", function () {
              var corrector = $(this).text();
              console.log(corrector)
              // var wrong = $(this).parent().prop('firstChild').nodeValue;
              var wrong = $(this).attr('data-word');
              var wrong_text = $(this).attr('data-text');
              console.log(wrong_text)
              var right_text = wrong_text.replace(wrong, corrector)
              $(this).parents('#correction_area1').find(".span-show").attr('data-text',right_text)
              $(this).parents('#correction_area1').find(".span-show").attr('data-word',corrector)
              var text = $('#edit_area1').html().replace(wrong_text, right_text)
              console.log(text);
              $('#edit_area1').html(text);
            })
          }
        }
      },
      created(){
        // this.play();//开启保存
        let body = document.querySelector('body')
        body.addEventListener('click',(e)=>{
          if(e.target.id === 'font'){
            this.font_show = true
          }else {
            this.font_show = false
          }
          if(e.target.id === 'fo_si'){
            this.size_show = true
          }else {
            this.size_show = false
          }
          if(e.target.id === 'fo_co'){
            this.color_show = true
          }else {
            this.color_show = false
          }
          if(e.target.id === 'spacing'){
            this.spacing_show = true
          }else {
            this.spacing_show = false
          }
          if(e.target.className=='wrong_word'){
             var el = e.target.children;
            for (var i = 0; i<el.length;i++) {
              el[i].style.display = 'inline-block'
            };
          }else {
            $('.span-show').hide();
          }
        },false)
      },
      mounted(){
        var regExp = /\<p.*?p\>/g;
        if(this.isCollaborator==1&&!this.content.match(regExp)){
          console.log(this.content);
          var content =this.content;
          var s = "";
          // content = eval('(' + content + ')');
          content = JSON.parse(content);
          console.log(content);
          content.forEach((item)=>{
            s+="<p>"+item+"</p>";
          })
          this.content_html = s;
        }else{
          this.content_html = this.content;
        }
        $('.file_tl').text(this.file_name)//改变iframe中内容
        this.init_correct();
          //增加历史纪录
        this.add_history();
        //处理paste
        this.dealPaste();
      },
      watch:{
        file_name(){
          var regExp = /\<p.*?p\>/g;
          if(this.isCollaborator==1&&!this.content.match(regExp)){
            console.log(this.content);
            var content =this.content;
            var s = "";
            content = eval('(' + content + ')');
            console.log(content);
            content.forEach((item)=>{
              s+="<p>"+item+"</p>";
            })
            this.content_html = s;
          }else{
            this.content_html = this.content;
          }
          console.log(this.file_name);
          $('.file_tl').text(this.file_name)//改变div中内容
          this.init_correct()
        }
      }
    }
</script>

<style scoped >
  .header_title{
    width: 100%;
    height: 52px;
    background: #11a586;
    border-radius: 3px 3px 0 0;
    position:relative;
  }
  .header_title .select_language{
    position :absolute;
    left: 200px;
    top:30px
  }
  .header_title h1{
    float: left;
    padding-top: 18px;
    font-style: normal;
    font-family: STHeitiSC-Light;
    font-size:20px ;
    color: #fff;
    margin-left: 55%;
  }
  .header_title img{
    float: right;
    width: 25px;
    height: 25px;
    margin-top: 15px;
    margin-right: 18px;
    color: #fff;
    cursor: pointer;
  }
  .wrapper_box{
    width: 100%;
    height:490px;
    display: flex;
  }
  .wrapper_box .left-box{
    width: 200px;
    background: #eee;
    position: relative;
  }
  .icon{
    float: left;
    margin: 25px 0 22px 18px;
    cursor: pointer;
    background: transparent;
    position: relative;
  }
  .icon img{
    width: 20px;
    height: 20px;
    margin-left: 2px;
    vertical-align: baseline;
  }
  .icon h1{
    font-style: normal;
    font-family: STHeitiSC-Light;
    font-size:12px;
    color: #aeaeae;
    padding-top: 10px;

  }
  .special{
    width: 25px;
    height: 20.5px;
    font-style: normal;
    font-family: STHeitiSC-Light;
    font-size:11px;
    color: #aeaeae;
    padding-top: 1px;
  }
  .icon p{
    font-style: normal;
    font-family: STHeitiSC-Light;
    font-size:11px;
    color: #aeaeae;
    margin-left: 5px;
  }
  .saveFile{
    position: absolute;
    width: 100px;
    height: 30px;
    border: 1px solid #aeaeae;
    text-align: center;
    line-height: 30px;
    bottom :0px;
    left :0px;
    cursor :pointer;
  }
  .saveFile span{
    font-style: normal;
    font-family: STHeitiSC-Light;
    font-size:14px;
    color: #aeaeae;
  }
  .task{
    position: absolute;
    bottom :20px;
    left :25px;
  }
  .save,.task_al,.task_su{
    cursor :pointer;
    width :150px;
    height: 35px;
    color: white;
    font-size :18px;
    border-radius: 5px;
    text-align: center;
    line-height :35px;
    background:#11a586;
  }
  .save{
    margin-bottom: 10px;
  }




  /*我的文档编辑*/
  .edit .right-box{
    width: 100%;
    height: 448px;
    flex :1;
    width: 0;
  }
  .edit .right-box .star_img{
    width: 20px;
    height: 20px;
    margin-left: 18px;
    position: relative;
    bottom: 20px;
  }
  .edit .right-box .file_tl{
    width: 90%;
    height: 55px;
    display: inline-block;
    font-size: 30px;
    color: #333;
    margin-left: 10px;
    /*margin-top: 15px;*/
    line-height :55px;
    border-bottom: 1px solid #e1e1e1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .edit #edit_area{
    width: 80%;
    height: 400px;
    margin-left: 52px;
    margin-top: 13px;
    overflow-x: hidden;
    border: 0;
    color:#333;
    font-size: 16px;
    font-family: STHeitiSC-Light;
    word-wrap:break-word;
  }
  /*限制图片最大为200*200*/
  .edit #edit_area img{
    max-height: 200px;
    max-width: 200px;
  }
  .edit #correction_area{
    width: 80%;
    height: 180px;
    margin-left: 52px;
    margin-top: 13px;
    /*overflow-x: hidden;*/
    /*white-space nowrap;*/
    border: 0;
    align-self: flex-end;
    background-color: white;
    text-decoration:none;
  }
  .edit .select_area{
    border:1px solid #000000 ;
    background: #fff;
    z-index: 100;
  }
  .edit .select_area ul{
    padding: 0;
  }
  .edit .select_area ul li{
    list-style: none;
    width: 110px;
  }
  .edit .select_area ul li:hover{
    background: rgb(213,225,242);
  }

  .edit #correction_area span {
    text-decoration: wavy underline red;
    cursor: pointer;
    position: relative;
    color:#ff0000;
  }

  .edit #correction_area span::before{
    content: attr(data-word);
    display: none;
    position: absolute;
    top: 100%;
    background-color: white;
    border: 1px solid black;
    left: 0;
    color:#555;
  }
  .edit #correction_area span.span-show::before {
    display: block;
    font-size: 23px;
  }
  .edit #correction_area .correction_li:not(:first-of-type){
    margin-top: 30px;
  }
  .edit #insert_img{
    position: absolute;
    width: 20px;
    height :45px;
  }
  .edit input[type="file"]{
    opacity:0;
    filter:alpha(opacity=0);
    cursor: pointer;
    width: 30px;
    height: 50px;
  }
  /*!*图片预览区*!*/
  .edit #result{
    position: absolute;
    width: 200px;
    height: 200px;
    left: 43%;
    display: none;
  }
  .edit .fade-enter-active,.edit .fade-leave-active{
    transition: all 1s;
  }
  .edit .fade-enter,.edit .fade-leave-active {
    opacity: 0;
    transform: translateY(100%);
  }
  /*我的文档编辑*/

  /*协作文档*/

  .teamwork_edit .right-box{
    min-height: 490px;
    background: #fff;
    flex: 1;
    width: 0;
  }
  .teamwork_edit .right-box .rb_tl{
    width: 100%;
    min-height: 55px;
    overflow: hidden;
    border-bottom: 1px solid rgb(225, 225, 225);
  }
  .teamwork_edit .right-box .rb_tl .icon_ls{
    width: 318px;
    min-height: 55px;
    display: inline-block;
    float: right;
    margin-top: 7px;
    padding-right: 40px;
  }
  .teamwork_edit .icon_ls ul{
    padding-top: 5px;
    height: 40px;
  }
  .teamwork_edit .icon_ls ul li{
    float: right;
    list-style: none;
    width:40px ;
    height: 40px;

    margin-right: 6px;
  }
  .teamwork_edit .icon_ls ul li:first-of-type{
    cursor: pointer;
  }
  .teamwork_edit .icon_ls ul li img{
    width:40px ;
    height: 40px;
    border-radius: 50%;
  }
  .teamwork_edit .right-box .rb_tl .task{
    margin-top: 12px;
    float: right;
    font-size: 16px;
    border: 1px solid #333;
    padding: 10px;
    cursor: pointer;
  }
  .teamwork_edit .right-box .rb_tl .task:hover{
    background:#11a586 ;
    color: #fff;
  }
  .teamwork_edit .right-box .rb_ct{
    width: 100%;
    height: auto;
    display: flex;
  }
  .teamwork_edit .right-box .edit_area{
    flex: 1;
    height: 100%;
    padding-bottom: 10px;
    width: 0;
  }
  .teamwork_edit .right-box .chat_area{
    height: 412px;
    width: 318px;
    justify-content:flex-end;
    padding-right: 45px;
    border-left: 1px solid #eeeeee;
  }
  .teamwork_edit .right-box .star_img{
    width: 20px;
    height: 20px;
    margin-left: 18px;
    position: relative;
    bottom: 20px;
  }
  .teamwork_edit .right-box .file_tl{
    width: 35%;
    min-height: 55px;
    display: inline-block;
    font-size: 30px;
    line-height: 55px;
    color: #333;
    margin-left: 10px;
    /*margin-top: 15px;*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .teamwork_edit .chat_list{
    width: 100%;
    height: 370px;
    overflow: auto;
  }
  /*滚轮条样式*/
  .teamwork_edit .chat_list::-webkit-scrollbar-track-piece{
    background-color:transparent;/*滚动条的背景颜色*/
    -webkit-border-radius:6px;/*滚动条的圆角宽度*/
  }
  .teamwork_edit .chat_list::-webkit-scrollbar{
    width:10px;/*滚动条的宽度*/
    height:80px;/*滚动条的高度*/
  }
  .teamwork_edit .chat_list::-webkit-scrollbar-thumb:vertical{/*垂直滚动条的样式*/

    background-color:#999;
    -webkit-border-radius:4px;
    outline:2px solid #fff;
    outline-offset:-2px;
    position: relative;
    left: 20px;
  }
  /*滚轮条样式*/
  .teamwork_edit .chat_edit{
    height: 40px;
    padding-top: 10px;
    padding-left: 18px;
    position: relative;
  }
  .teamwork_edit .chat_edit .expression{
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  .teamwork_edit .chat_edit .picture{
    width: 18px;
    height: 16px;
    cursor: pointer;
  }
  .teamwork_edit .chat_edit input{
    outline: none;
    border: 0;
    border-bottom: 1px solid #eee;
    margin-left: 10px;
    width: 195px;
    padding-right: 50px;
    font-size: 14px;
  }
  .teamwork_edit .chat_edit .send_btn{
    color: #cbcbcb;
    position: absolute;
    font-size: 14px;
    right: 0;
    top:13px;
    cursor: pointer;
  }


  .teamwork_edit #edit_area1{
    width: 80%;
    height: 400px;
    margin-left: 52px;
    margin-top: 13px;
    overflow-x: hidden;
    border: 0;
    color:#333;
    font-size: 16px;
    font-family: STHeitiSC-Light;
    /*word-wrap:break-word;*/
  }
  /*限制图片最大为200*200*/
  .teamwork_edit #edit_area1 img{
    max-height: 200px;
    max-width: 200px;
  }
  .teamwork_edit #correction_area1{
    width: 80%;
    height: 180px;
    margin-left: 52px;
    margin-top: 13px;
    overflow-x: hidden;
    word-wrap:break-word;
    border: 0;
    align-self: flex-end;
    background-color: white;
    text-decoration:none;
  }
  .teamwork_edit .select_area{
    border:1px solid #000000 ;
    background: #fff;
    z-index: 100;
  }
  .teamwork_edit .select_area ul{
    padding: 0;
  }
  .teamwork_edit .select_area ul li{
    list-style: none;
    width: 110px;
  }
  .teamwork_edit .select_area ul li:hover{
    background: rgb(213,225,242);
  }

  .teamwork_edit #correction_area span {
    text-decoration: wavy underline red;
    cursor: pointer;
    position: relative;
    color:#ff0000;
  }

  .teamwork_edit #correction_area span::before{
    content: attr(data-word);
    display: none;
    position: absolute;
    top: 100%;
    background-color: white;
    border: 1px solid black;
    left: 0px;
    color:#555;
  }
  .teamwork_edit #correction_area span.span-show::before {
    display: block;
    font-size: 23px;
  }
  .teamwork_edit #correction_area .correction_li:not(:first-of-type){
    margin-top: 30px;
  }
  .teamwork_edit #insert_img{
    position: absolute;
    width :20px;
    height :45px;
  }

  /*任务分配box显示*/
  .teamwork_edit .task_box{
    width: 1050px;
    height: 450px;
    position: fixed;
    left:50%;
    top:50%;
    margin-top: -200px;
    margin-left: -37.5%;
    z-index: 1000;
    background: #fff;
  }
  .teamwork_edit .task_box .delete_btn{
    font-size: 30px;
    color:#333;
    position: absolute;
    right: 10px;
    top:10px;
    cursor: pointer;
  }
  .teamwork_edit .task_box .task_lb{
    float: left;
    width: 700px;
    height: 410px;
    margin-top: 20px;
    border-right: 1px solid #333;
  }
  .teamwork_edit .task_lb h1{
    font-size: 20px;
    text-align: center;
  }
  .teamwork_edit .task_lb .task_content{
    width: 90%;
    height: 350px;
    margin: 20px auto;
    border: 1px solid #333;
    font-size: 20px;
    line-height: 20px;
    padding: 10px 0 0 30px;
  }


  .teamwork_edit .task_box .task_rb{
    float: right;
    width: 340px;
    height: 410px;
    margin-top: 20px;
    border-right: 1px solid #333;
  }
  .teamwork_edit .task_rb h1{
    font-size: 20px;
    text-align: center;
  }
  .teamwork_edit .task_rb .tasker{
    width: 80%;
    max-height: 300px;
    margin: 20px auto;
    border: 1px solid #333;
  }
  .teamwork_edit .task_rb .task_btn{
    padding: 10px;
    font-size: 20px;
    border: 1px solid #333;
    text-align: center;
    width: 62px;
    margin: 0 auto;
    display: block;
    cursor: pointer;
  }
  .teamwork_edit .task_rb .task_btn:hover{
    background: #11a586 ;
    color: #fff;
  }
  .teamwork_edit .tasker ul{
    padding: 0;
  }
  .teamwork_edit .tasker ul li{
    width: 100%;
    height: 70px;
    list-style: none;
    border-bottom: 1px solid #333;
    cursor: pointer;
    line-height: 70px;
  }
  .teamwork_edit .tasker ul li:hover{
    background: #11a586 ;
    color: #fff;
  }
  .teamwork_edit .tasker ul li:last-of-type{
    border-bottom: 0;
  }
  .teamwork_edit .tasker ul li img{
    width: 40px;
    height: 40px;
    margin-left: 20px;
    border-radius: 50%;
    float: left;
    margin-top: 15px;
  }
  .teamwork_edit .tasker ul li span{
    float: left;
    height: 15px;
    font-size: 20px;
    margin-left: 20px;
  }
  /*任务分配box显示*/

  /*添加成员box显示*/
  .teamwork_edit .add_member_box{
    width: 300px;
    height: 150px;
    position: fixed;
    left:50%;
    top:50%;
    margin-top: -75px;
    margin-left: -100px;
    z-index: 1000;
    background: #fff;
    border: 1px solid #333;
  }
  .teamwork_edit .add_member_box h1{
    font-size: 20px;
    margin-bottom: 20px;
    padding: 5px 0 0 10px;
  }
  .teamwork_edit .add_member_box span{
    padding-left: 10px;
  }
  .teamwork_edit .add_member_box .add_member{
    width: 50px;
    height:30px;
    position: absolute;
    text-align: center;
    line-height: 30px;
    border: 1px solid #333;
    cursor: pointer;
    bottom: 10px;
    left: 50%;
    margin-left:-25px ;
  }
  .teamwork_edit .add_member_box .add_member:hover{
    background:#11a586 ;
    color: #fff;
  }
  .teamwork_edit .add_member_box .delete_btn{
    font-size: 30px;
    color:#333;
    position: absolute;
    right: 10px;
    top:0px;
    cursor: pointer;
  }
  /*添加成员box显示*/

  /*协作文档*/
</style>
<style>
  .edit #correction_area .wrong_word,.teamwork_edit #correction_area1 .wrong_word{
    text-decoration: wavy underline red;
    cursor: pointer;
    position: relative;
    color:#ff0000;
    display: inline-block;
    word-wrap: break-word
  }

  .edit #correction_area .wrong_word .span-show,.teamwork_edit #correction_area1 .wrong_word .span-show{
    width: auto;
    height: auto;
    display: none;
    float: right;
    margin-top: 10px;
    /*top: 100%;*/
    background-color: white;
    border: 1px solid black;
    color:#555;
  }
  /*.edit #correction_area span.span-show::before {*/
    /*display: block;*/
    /*font-size: 23px;*/
  /*}*/
  .edit #correction_area .correction_li:not(:first-of-type),.teamwork_edit #correction_area1 .correction_li:not(:first-of-type){
    margin-top: 30px;
  }
  .tasker  .noselect_box{
    background: #fff ;
    color: #333;
    border:0 ;
  }
  .tasker  .select_box{
    background: #11a586 ;
    color: #fff;
  }
  .task_content .noselect_box{
    width: 17px;
    height: 17px;
    display: inline-block;
    border: 1px solid #333;
    background: #ffffff;
    position: relative;
    top:2px;
    right: 5px;
  }
  .task_content .noselect_box:hover{
    background:#11a586;
  }
  .task_content .select_box{
    width: 17px;
    height: 17px;
    display: inline-block;
    background: #11a586;
    position: relative;
    top:2px;
    right: 5px;
  }
  .task_content p{
    padding-top: 5px;
  }
  .chat_list ul{
    padding: 0;
  }
  .chat_list ul .not_me{
    list-style: none;
    float: right;
  }
  .chat_list ul .is_me{
    list-style: none;
    float:left;
    margin-left: 10px;
  }
  .chat_list ul li:first-of-type{
    margin-top: 15px;
    clear: both;
  }
  .chat_list ul li:not(:first-of-type){
    margin-top: 20px;
    clear: both;
  }
  .chat_list ul .not_me .chat_content{
    margin-right: 10px;
    position: relative;
  }
  .chat_list ul .not_me .chat_icon{
    position: relative;
    bottom:2px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .chat_list ul .not_me .chat_content::after{
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #eee;
    content: "";
    position: absolute;
    top:20px;
    width: 0;
  }
  .chat_list ul .is_me .chat_content{
    margin-left: 10px;
    position: relative;
  }
  .chat_list ul .is_me .chat_icon{
    display: inline-block;
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .chat_list ul .is_me .chat_content::after{
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #11a586;
    content: "";
    position: absolute;
    top:20px;
    left: -10px;
    width: 0;
  }
  .chat_list .chat_content{
    display: inline-block;
    max-width:200px ;
    min-height: 20px;
    height: auto;
    padding:10px;
    border-radius: 3px;
    color: #333;
    font-size: 14px;
  }
  .chat_list .not_me .chat_content{
    background:#eeeeee;
  }
  .chat_list .is_me .chat_content{
    background: #11a586;
    color:#fff;
  }
</style>
