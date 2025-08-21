<template>
   <div class="loading-demo">
      <h2>Loading Block Demos</h2>

      <div class="demo-section">
         <h3>Types</h3>
         <div class="demo-row">
            <div v-for="type in types" :key="type" class="demo-item">
               <LoadingBlock :type="type" :text="`${type} loading`" />
               <div class="demo-label">{{ type }}</div>
            </div>
         </div>
      </div>

      <div class="demo-section">
         <h3>Sizes</h3>
         <div class="demo-row">
            <div v-for="size in sizes" :key="size" class="demo-item">
               <LoadingBlock type="pulse" :size="size" :text="`${size} size`" />
               <div class="demo-label">{{ size }}</div>
            </div>
         </div>
      </div>

      <div class="demo-section">
         <h3>Colors</h3>
         <div class="demo-row">
            <div v-for="color in colors" :key="color" class="demo-item">
               <LoadingBlock type="bounce" :color="color" :text="`${color} color`" />
               <div class="demo-label">{{ color }}</div>
            </div>
         </div>
      </div>

      <div class="demo-section">
         <h3>Full Block</h3>
         <div class="demo-full-block">
            <LoadingBlock type="dots" full-block text="Loading content..." />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import LoadingBlock from '@/components/ui/LoadingBlock.vue'

const types = ['pulse', 'spin', 'bounce', 'progress', 'dots']
const sizes = ['small', 'medium', 'large']
const colors = ['#18a058', '#2080f0', '#d03050', '#f0a020']
</script>

<style scoped>
.loading-demo {
   padding: 20px;
   max-width: 1200px;
   margin: 0 auto;
}

.demo-section {
   margin-bottom: 30px;
   border: 1px solid #eee;
   border-radius: 8px;
   padding: 20px;
}

h2 {
   margin-bottom: 20px;
   font-size: 24px;
}

h3 {
   margin-bottom: 15px;
   font-size: 18px;
   color: #666;
}

.demo-row {
   display: flex;
   flex-wrap: wrap;
   gap: 30px;
}

.demo-item {
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 150px;
   height: 150px;
   border: 1px solid #eee;
   border-radius: 6px;
   padding: 15px;
}

.demo-label {
   margin-top: 10px;
   font-size: 14px;
   color: #666;
}

.demo-full-block {
   height: 300px;
   border: 1px dashed #ccc;
   border-radius: 6px;
}
</style>
