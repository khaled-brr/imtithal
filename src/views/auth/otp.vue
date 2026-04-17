<script setup>
import { useAuthStore } from "@/stores/Auth";
import { requiredValidator } from "@validators";
import { toast } from "vue3-toastify";
import VOtpInput from "vue3-otp-input";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const email = route.query.email;
if (!email) {
  router.replace({ name: "forgot-password" });
}

const formState = reactive({
  code: "",
});

const isSubmitting = ref(false);
const otpInput = ref(null);

const submitOTP = async () => {
  try {
    isSubmitting.value = true;
    await auth.verifyOTP({ email, code: formState.code });

    router.replace({
      name: "reset-password",
      query: { email, code: formState.code },
    });
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

const resendOTP = async () => {
  try {
    await auth.resetPassword({ email });
    toast("تم إرسال رمز التحقق مرة أخرى", { rtl: true, hideProgressBar: true });
    // Reset OTP input after resending
    otpInput.value?.clearInput();
  } catch (error) {
    console.error(error);
    toast("حدث خطأ أثناء إعادة إرسال رمز التحقق", {
      rtl: true,
      hideProgressBar: true,
    });
  }
};

const handleOnComplete = (value) => {
  formState.code = value;
  submitOTP();
};

const handleOnChange = (value) => {
  formState.code = value;
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
            التحقق من البريد الإلكتروني
          </h1>
          <p class="mb-4 text-lg" style="color: #75797c">
            أدخل رمز التحقق المكون من 4 أرقام الذي تم إرساله إلى بريدك
            الإلكتروني
          </p>
        </VCardTitle>
        <v-divider class="my-3" />
        <VCardText style="flex: 0" class="px-4">
          <VForm @submit.prevent="submitOTP" class="mb-8">
            <VRow>
              <VCol cols="12" class="py-1">
                <div dir="ltr" class="mb-4">
                  <VOtpInput
                    ref="otpInput"
                    v-model="formState.code"
                    :disabled="isSubmitting"
                    :rules="[requiredValidator]"
                    :length="4"
                    :input-classes="'otp-input'"
                    separator=" "
                    :num-inputs="4"
                    input-type="number"
                    should-auto-focus
                    @on-change="handleOnChange"
                    @on-complete="handleOnComplete"
                  />
                </div>
              </VCol>

              <VCol cols="12" class="py-1">
                <div class="d-flex align-center justify-space-between mt-6">
                  <VBtn
                    variant="text"
                    @click="resendOTP"
                    :disabled="isSubmitting"
                  >
                    إعادة إرسال الرمز
                  </VBtn>

                  <VBtn
                    rounded="pill"
                    :loading="isSubmitting"
                    type="submit"
                    size="large"
                    height="50"
                    class="px-10"
                  >
                    تحقق
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
:deep(.vue-otp-input) {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

:deep(.otp-input) {
  width: 60px !important;
  height: 60px !important;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: white;
  font-size: 1.5rem;
  text-align: center;

  &:focus {
    outline: none;
    border-color: rgb(var(--v-theme-primary));
  }
}

.auth-wrapper {
  background: url(/bg.webp) no-repeat center;
  background-size: cover;
}
.otp-input-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
</style>
