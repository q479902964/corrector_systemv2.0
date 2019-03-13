import Ajax from './ajax.js'

class Api extends Ajax{

  //用户登陆
  async loginIn(params = {}){
    try{
      let result = await this.axios("POST","/api/login",params);
      return result;
    }catch (err){
      throw (err)
    }
  }

  //用户注册
  async register(params = {}){
    try{
      let result = await this.axios("POST","/api/register",params);
      return result;
    }catch (err){
      throw (err)
    }
  }
  //获取回收站文件中信息
  async getTrash(username){
    try{
      let result = await this.axios("GET","/api/trash?username="+username,{});
      return result;
    }catch (err){
      throw (err)
    }
  }
  //获取我的文档
  async getFile(username){
    try{
      let result = await this.axios("GET","/api/file?username="+username,{});
      return result;
    }catch (err){
      throw (err)
    }
  }

  //获取协作文档
  async getTeamworkfile(username){
    try{
      let result = await this.axios("GET","/api/coop?username="+username,{});
      return result;
    }catch (err){
      throw (err)
    }
  }

  //获取星标文档
  async getStarfile(username){
    try{
      let result = await this.axios("GET","/api/istar?username="+username,{});
      return result;
    }catch (err){
      throw (err)
    }
  }

  //保存我的文档
  async saveFile(params = {}){
    try{
      let result = await this.axios("POST","/api/savefile",params);
      return result;
    }catch (err){
      throw (err)
    }
  }
  //保存协作文档
  async saveCoop(params = {}){
    try{
      let result = await this.axios("POST","/api/saveCoop",params);
      return result;
    }catch (err){
      throw (err)
    }
  }
  //星标切换
  async starToggle(params = {}){
    try{
      let result = await this.axios("POST","/api/tostar",params);
      return result;
    }catch (err){
      throw (err)
    }
  }

  //清空回收站
  async deltrash(params = {}){
    try{
      let result = await this.axios("POST","/api/deltrash",params);
      return result;
    }catch (err){
      throw (err)
    }
  }

  //删除文档
  async deleteFile(params = {}){
    try{
      let result = await this.axios("POST","/api/delete",params);
      return result;
    }catch (err){
      throw (err)
    }
  }

  ///恢复文档

  async restore(params = {}){
    try{
      let result = await this.axios("POST","/api/restore",params);
      return result;
    }catch (err){
      throw (err)
    }
  }

  //获取用户信息
  async getUserInfo(username){
    try{
      let result = await this.axios("GET","/api/userinfo?username="+username,{});
      return result;
    }catch (err){
      throw (err)
    }
  }

  //获取通知栏消息
  async getNoticeData(username){
    try{
      let result = await this.axios("GET","/api/getNotice?username="+username,{});
      return result;
    }catch(err){
      throw(err);
    }
  }

  //点击通知栏后清除通知栏通知条数(即为已读)
  async readNotice(params = {}){
    try{
      let result = await this.axios("POST","/api/toRead",params);
      return result;
    }catch(err){
      throw(err);
    }
  }

  //是否接受邀请
  async isAcceptNotice(parmas ={}){
    try{
      let result = await this.axios("POST","/api/isAccept",parmas);
      return result;
    }catch(err){
      throw(err);
    }
  }

  //添加成员
  async add_Member(params ={}){
    try{
      let result = await this.axios("POST","/api/addMember",params);
      return result;
    }catch(err){
      throw(err);
    }
  }

  //任务分配
  async task_allocation(params ={}){
    try{
      let result = await this.axios("POST","/api/taskAllocation",params);
      return result;
    }catch(err){
      throw(err);
    }
  }

  //发送留言到后台
  async send_message(params ={}){
    try{
      let result = await this.axios("POST","/api/sendMessage",params);
      return result;
    }catch(err){
      throw(err);
    }
  }


  //协作者提交文档
  async submit_job(parmas ={}){
    try{
      let result = await this.axios("POST","/api/submitJob",parmas);
      return result;
    }catch(err){
      throw(err);
    }
  }


  //获取历史纪录
  async get_editHistroy(username){
    try{
      let result = await this.axios("GET","/api/getHistory?username="+username,{});
      return result;
    }catch(err){
      throw(err);
    }
  }

  //添加历史纪录
  async addHistroy(parmas ={}){
    try{
      let result = await this.axios("POST","/api/addHistory",parmas);
      return result;
    }catch(err){
      throw(err);
    }
  }

  //通过id获取文档内容
  async get_post(id){
    try{
      let result = await this.axios("GET","/api/getPost?id="+id,{});
      return result;
    }catch(err){
      throw(err);
    }
  }
  //登出
  async logout(){
    try{
      let result = await this.axios("GET","/api/logout",{});
      return result;
    }catch(err){
      throw(err);
    }
  }

  //对语句进行纠正(表单提交)
  async correct(params = {}){
    try{
      let result = await this.axiosForm("POST","/api/corrector",params,0);
      return result;
    }catch (err){
      throw (err)
    }
  }

  //上传图片(表单提交,含有file控件)
  async updateFile(params = {}){
    try{
      let result = await this.axiosForm("POST","/api/initial",params,1);
      return result;
    }catch (err){
      throw (err)
    }
  }



}
export default new Api();
