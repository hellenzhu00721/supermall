<template>
  <div class="check-button" :class="{ check: ischecked }">
    <img src="@/assets/img/cart/tick.svg" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    ischecked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
/* .check-button img {
  height: 10px;
} */
.check-button {
  border-radius: 50%;
  border: rgba(189, 184, 184, 0.644) solid 2px;
}
.check {
  background-color: coral;
  border-color: coral;
}
</style>
