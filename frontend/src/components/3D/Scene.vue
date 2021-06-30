<template>
    <div>
        <h>Scene</h>
        <canvas id="renderCanvas" touch-action="none"></canvas>
    </div>
</template>

<script>
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Scene extends Vue {
   public mounted() {
       const recaptchaScript = document.createElement('script');
       recaptchaScript.setAttribute('src', 'http://localhost:8080/js/bundle.js');
       document.head.appendChild(recaptchaScript);
    }
}
</script>