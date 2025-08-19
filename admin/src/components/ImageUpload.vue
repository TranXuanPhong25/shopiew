<script lang="ts" setup>

</script>

<template>
   <div class="image-upload">
      <n-upload :action="`https://www.mocky.io/v2/5e4bafc63100007100d8b70f`" :show-file-list="true" list-type="image"
         :on-success="() => { }" :on-error="() => { }" directory-dnd>
         <n-upload-dragger>
            <div style="margin-bottom: 12px">
               <n-icon size="48" :depth="3">
                  <ArchiveIcon />
               </n-icon>
            </div>
            <n-text style="font-size: 16px">
               Click or drag a file to this area to upload
            </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
               Strictly prohibit from uploading sensitive information. For example,
               your bank card PIN or your credit card expiry date.
            </n-p>
         </n-upload-dragger>
      </n-upload>
   </div>
</template>