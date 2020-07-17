<template>
  <div class="auth">
    <AuthForm />
  </div>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue";

export default {
  name: "Auth",
  components: {
    AuthForm
  }
};
</script>
