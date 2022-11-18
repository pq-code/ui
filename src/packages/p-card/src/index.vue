<template>
  <p-link :class="['p-card', type]" :href="href" :target="target" style="text-decoration: none">
    <slot></slot>
    <div class="card-img" v-if="url" :style="url"></div>
    <div class="p-card-info">
      <h4 class="detail-title" v-if="title">{{ title }}</h4>
      <p class="detail-describe" v-if="describe">{{ describe }}</p>
      <p class="detail-label" v-if="label">{{ label }}</p>
    </div>
  </p-link>
</template>

<script>
export default {
  name: 'p-card',
  props: {
    href: String,
    img: Object,
    title: String,
    label: String,
    url: Object,
    describe: String,
    target: String,
  },
};
</script>

<style scoped="scoped">
.p-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-color: #f5f5f7;
}
.p-card .card-img {
  border-radius: 16px 16px 0 0;
  height: 65%;
  /*box-shadow: 0 5px 10px 0 #e0e0e0;*/
  background-color: #cccccc;
}
.p-card .p-card-info {
  position: relative;
  z-index: 2;
  padding: 2.5% 0 2.5% 5px;
  min-height: 75px;
  overflow: hidden;
  bottom: 0px;
  height: 30%;
}
.p-card .p-card-info .detail-title {
  position: relative;
  font-size: 20px;
  font-weight: 600;
  color: #403f3f;
  text-align: left;
  padding-left: 16px;
  margin: 0;
  /*height: 100%;*/
  /*padding: 0px;*/
}
.p-card .p-card-info .detail-describe {
  position: relative;
  font-size: 14px;
  font-weight: 400;
  color: #403f3f;
  padding: 10px 20px 10px 16px;
  text-align: left;
  margin: 0;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.p-card .p-card-info .detail-label {
  position: absolute;
  font-size: 14px;
  font-weight: 400;
  color: #403f3f;
  bottom: 20px;
  right: 20px;
  margin: 0;
  text-align: right;
}
.p-head-link {
  text-decoration: none;
  display: block;
  font-size: 16px;
  color: #1d1d1f;
  margin: 18px auto;
  line-height: 30px;
}
.p-head-link-img {
  display: block;
  color: #1d1d1f;
  text-decoration: none;
  margin: 16px auto;
}
</style>
