<template>
  <div class="bg-[#69B3B7] flex flex-col h-screen justify-center items-center space-y-4">
    <div class="flex flex-col justify-center items-center space-y-1 w-full">
      <img src="../static/gohan.png" width="600" height="300" />
    </div>
    <div class="flex flex-col justify-center items-center space-y-1 w-full">
      <p class="text-white text-2xl font-bold">友達と「この後ご飯に行こう！」となった時</p>
      <p class="text-white text-2xl font-bold">なかなかお店が決まらずに</p>
      <p class="text-white text-2xl font-bold">困った経験はありませんか？<br /><br /></p>
      <p class="text-white text-2xl font-bold">そんな時は "回してごはん" を使って</p>
      <p class="text-white text-2xl font-bold">お店に向かう道中も楽しみながら</p>
      <p class="text-white text-2xl font-bold">新しいお店を開拓しましょう！</p>
    </div>
    <div class="flex flex-row justify-center items-center space-x-5 w-full">
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
        @click="$router.push('/gacha')"
      >
        はじめる
      </button>
    </div>
  </div>
</template>

<script>
</script>
