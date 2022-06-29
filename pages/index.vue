<template>
  <div class="flex flex-col h-screen justify-center items-center space-y-4">
    <div class="flex flex-col justify-center items-center space-y-1 w-full">
      <img src="/logo.png" width="70%" style="max-width: 500px" />
    </div>
    <div class="flex flex-col justify-center items-center space-y-1 w-full text-center">
      <p class="text-white text-2xl font-bold">友達と「この後ご飯に行こう！」となった時</p>
      <p class="text-white text-2xl font-bold">なかなかお店が決まらずに</p>
      <p class="text-white text-2xl font-bold">困った経験はありませんか？<br /><br /></p>
      <p class="text-white text-2xl font-bold">そんな時は "回してごはん" を使って</p>
      <p class="text-white text-2xl font-bold">お店に向かう道中も楽しみながら</p>
      <p class="text-white text-2xl font-bold">新しいお店を開拓しましょう！</p>
    </div>
    <div class="flex flex-row justify-center items-center space-x-5 w-full">
      <nuxt-link to="/gacha">
        <button
          class="
            bg-[#F2B816]
            //hover:bg-yellow-400
            text-white
            font-bold
            text-xl
            py-10
            px-4
            rounded-full
            border-[#F9D10D] border-4
            focus:shadow-outline
          "
        >
          はじめる
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
</script>
<style>
body {
  background-color: #69b3b7;
}
</style>
<style scoped>
</style>
