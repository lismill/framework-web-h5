<template>
  <div class="bg-ffffff p-24">
    <h3 class="page-title m-b24">二维码</h3>
    <l-qrcode text="canvas: 111111">
      <template #header>
        <div>头部插槽</div>
      </template>
      <template #footer>
        <div>底部插槽</div>
      </template>
    </l-qrcode>
  </div>
</template>
