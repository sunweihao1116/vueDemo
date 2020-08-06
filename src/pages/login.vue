<template>
  <div>
    <div @click="to">to---></div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    mounted() {
      console.log(this.$route.query);
    },
    methods: {
      to() {
        console.log(this.$route.query.url);
        this.$router.push(this.$route.query.url);
      },
    },
  };
</script>

<style lang="less" scoped>

</style>