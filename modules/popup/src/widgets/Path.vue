<template>
  <div>
    <div class="text-font-l font-medium text-fg-0 flex items-center">
      <div>{{ i18n('app_name') }}</div>
      <div v-if="githubUrl" class="ml-12 c-active-cover flex" @click="onClickGithub">
        <LogoGithubFilledIcon size="20" />
      </div>
    </div>
    <div class="text-font-m mt-4 text-fg-1 break-all">{{ path }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { LogoGithubFilledIcon } from 'tdesign-icons-vue-next';
import { i18n } from '../utils/i18n';

const { path } = defineProps<{ path: string }>();

const githubUrl = computed(() => {
  const url = process.env.GITHUB_URL;

  return url;
});

function onClickGithub() {
  window.open(githubUrl.value);
}
</script>
