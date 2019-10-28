<template>
   <div class='container-welcome'>
    <img src="../../assets/welcome.jpg" alt="">
  </div>
</template>

<script>
export default {
  created () {
    this.$axios.get('/articles').then(res => {
      console.log(res.data)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style lang="less">

.container-welcome img{
  display: block;
  margin: 0 auto;
}

</style>
