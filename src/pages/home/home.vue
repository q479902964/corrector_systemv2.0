<template>
  <div class="content">
    <div class="photo">
      <img src="../../assets/logo2.png">
    </div>
    <div class="entrance">
      <span>进入文档</span>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'home'
  }
</script>
<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .content{
    width: 100%;
    height:auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    text-align: center;
    margin-top: 12%;
  }
  .photo{
    flex: 1 0 0px;
    z-index:-10;
  }

  .entrance{
    flex: 1 0 0px;
    margin-top:2%;
    font-size: 30px;
    font-family: 'Microsoft YaHei';
    color: #89B7AD;
    border-bottom: 5px;
    z-index:-10;
  }

  .entrance span{
    border-bottom: 4px solid #11A586;
  }
</style>
