<script setup>
import { useAuthStore } from "@/stores/Auth";
import {
  requiredValidator,
  passwordValidator,
  confirmPasswordValidator,
} from "@validators";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const email = route.query.email;
const code = route.query.code;

if (!email || !code) {
  router.replace({ name: "forgot-password" });
}

const formState = reactive({
  email,
  code,
  password: "",
  password_confirmation: "",
});

const isSubmitting = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const submitNewPassword = async () => {
  try {
    isSubmitting.value = true;
    await auth.setNewPassword(formState);

    toast("تم تغيير كلمة المرور بنجاح", { rtl: true, hideProgressBar: true });
    router.replace({ name: "login" });
  } catch (error) {
    console.error(error);

    if (error?.response?.message) {
      toast(error.response.message, { rtl: true, hideProgressBar: true });
      return;
    }

    toast("خطأ غير متوقع!", { rtl: true, hideProgressBar: true });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <VRow no-gutters class="auth-wrapper text-black">
    <VCol
      cols="12"
      sm="10"
      md="8"
      lg="5"
      class="d-flex flex-column align-center justify-center py-4 pa-0 mx-auto"
    >
      <div class="w-100 d-flex justify-center pb-6 pt-3 px-4">
        <img width="280" src="/logo-colored.svg" alt="امتثال" />
      </div>
      <VCard flat class="w-100 app-logo py-4 px-2 px-sm-6 px-xl-12 rounded-xl">
        <VCardTitle style="flex: 0">
          <h1 class="text-h5 text-sm-h4 font-weight-semibold mb-1">
            تعيين كلمة المرور الجديدة
          </h1>
          <p class="mb-4 text-lg" style="color: #75797c">
            الرجاء إدخال كلمة المرور الجديدة
          </p>
        </VCardTitle>
        <v-divider class="my-3" />
        <VCardText style="flex: 0" class="px-4">
          <VForm @submit.prevent="submitNewPassword" class="mb-8">
            <VRow>
              <VCol cols="12" class="py-1">
                <label class="d-block text-subtitle-1 mb-2 text-dark">
                  كلمة المرور الجديدة*
                </label>
                <VTextField
                  v-model="formState.password"
                  :type="showPassword ? 'text' : 'password'"
                  bg-color="white"
                  density="comfortable"
                  placeholder="********"
                  rounded="lg"
                  :rules="[requiredValidator, passwordValidator]"
                  dir="ltr"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                />
              </VCol>

              <VCol cols="12" class="py-1">
                <label class="d-block text-subtitle-1 mb-2 text-dark">
                  تأكيد كلمة المرور*
                </label>
                <VTextField
                  v-model="formState.password_confirmation"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  bg-color="white"
                  density="comfortable"
                  placeholder="********"
                  rounded="lg"
                  :rules="[
                    requiredValidator,
                    (val) => confirmPasswordValidator(val, formState.password),
                  ]"
                  dir="ltr"
                  :append-inner-icon="
                    showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  @click:append-inner="
                    showConfirmPassword = !showConfirmPassword
                  "
                />
              </VCol>

              <VCol cols="12" class="py-1">
                <div class="d-flex align-center justify-space-between mt-6">
                  <div></div>

                  <VBtn
                    rounded="pill"
                    :loading="isSubmitting"
                    type="submit"
                    size="large"
                    height="50"
                    class="px-10"
                  >
                    حفظ كلمة المرور
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.auth-wrapper {
  background: url(/bg.webp) no-repeat center;
  background-size: cover;
}
</style>
