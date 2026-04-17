<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { authService } from '@/services/auth.service';
import { toast } from 'vue3-toastify';
import { loginApiBaseUrl } from '@/config';
import axios from 'axios';
import { hasPermissionFrom } from '@/helpers/permissions';
// import { useRouter } from "vue-router";

const isPasswordVisible = ref(false);
const form = ref(null);
const hasNoPermission = ref(false);
const noPermissionMessage = 'عذرا، لا تملك الصلاحية للدخول إلى هذه المنصة';
const formState = reactive({
  email: '',
  password: ''
});

const auth = useAuthStore();
// const router = useRouter();

const isSubmitting = ref(false);

const loginUser = async () => {
  const { valid } = await form.value.validate();

  if (!valid) return;

  try {
    isSubmitting.value = true;
    const { data } = await axios.post(`${loginApiBaseUrl}/login`, formState);

    if (!data) {
      throw new Error('No data received from server');
    }

    // Handle both possible response structures
    const token = data?.token || data?.data?.token || null;
    const user = data?.user || data?.data || null;

    if (
      !hasPermissionFrom(
        user?.user?.permissions,
        [
          'interactive_map.view',
          'operations_platform.view',
          'readiness_indicators.view',
          'data_platform.view',
          'companies_performance.view',
          'recruitment_indicators.view'
        ],
        true
      )
    ) {
      hasNoPermission.value = true;
      toast.error(noPermissionMessage, {
        rtl: true,
        hideProgressBar: true,
        position: 'top-center'
      });
      return;
    }

    if (token) {
      // location.href = "/";
      authService.setUser(user);
      location.href = '/';
    } else {
      throw new Error('بيانات تسجيل الدخول غير صحيحة');
    }
  } catch (error) {
    console.error('Login error:', error);

    if ([422, 401].includes(error.response?.status)) {
      toast.error('بيانات الدخول غير صحيحة', {
        rtl: true,
        hideProgressBar: true,
        position: 'top-center'
      });
      return;
    }

    if (error?.response?.data?.message) {
      toast.error(error.response.data.message, {
        rtl: true,
        hideProgressBar: true,
        position: 'top-center'
      });
    } else if (error?.message) {
      toast.error(error.message, {
        rtl: true,
        hideProgressBar: true,
        position: 'top-center'
      });
    } else {
      toast.error('حدث خطأ أثناء تسجيل الدخول', {
        rtl: true,
        hideProgressBar: true,
        position: 'top-center'
      });
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="d-flex justify-center align-center overflow-auto" style="height: 100vh">
    <v-container style="width: 1300px; max-width: 100%">
      <VRow no-gutters class="auth-wrapper text-black">
        <VCol
          cols="12"
          sm="10"
          md="8"
          lg="5"
          class="d-flex flex-column align-center justify-center py-4 pa-0 mx-auto"
        >
          <div class="w-100 d-flex justify-center pb-6 pt-3 px-4">
            <a href="/" class="pa-1">
              <img width="200" src="/img/imtithal-logo.svg" />
            </a>
          </div>
          <VCard flat class="w-100 app-logo py-4 px-2 px-sm-6 rounded-xl">
            <VCardTitle style="flex: 0">
              <h1 class="text-h5 text-sm-h4 font-weight-semibold mb-1">تسجيل الدخول!</h1>
              <p class="mb-4 text-lg" style="color: #75797c">
                أدخل بياناتك لتسجيل الدخول إلى حسابك.
              </p>
            </VCardTitle>
            <v-divider class="my-4" />
            <VCardText style="flex: 0" class="px-4">
              <VForm ref="form" @submit.prevent="loginUser" class="mb-8">
                <VRow>
                  <VCol cols="12" class="py-1">
                    <label class="d-block text-subtitle-1 mb-2 text-dark">
                      البريد الإلكتروني
                    </label>
                    <VTextField
                      v-model="formState.email"
                      variant="outlined"
                      type="email"
                      bg-color="#1a1a1a"
                      density="comfortable"
                      placeholder="ادخل البريد الإلكتروني"
                      rounded="lg"
                      :rules="[(v) => !!v || 'البريد الإلكتروني مطلوب']"
                    />
                  </VCol>

                  <VCol cols="12" class="py-1">
                    <label class="d-block text-subtitle-1 mb-2 text-dark"> كلمة المرور </label>
                    <VTextField
                      v-model="formState.password"
                      variant="outlined"
                      bg-color="#1a1a1a"
                      density="comfortable"
                      placeholder="أدخل كلمة المرور"
                      rounded="lg"
                      :rules="[(v) => !!v || 'كلمة المرور مطلوبة']"
                      :type="isPasswordVisible ? 'text' : 'password'"
                      :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                      @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />

                    <div class="d-flex align-center justify-space-between mt-6">
                      <!-- <v-btn
                        :to="{ name: 'forgot-password' }"
                        variant="text"
                        class="text-primary text-base px-0"
                      >
                        نسيت كلمة المرور؟
                      </v-btn> -->

                      <VBtn
                        rounded="pill"
                        :loading="isSubmitting"
                        type="submit"
                        size="large"
                        height="50"
                        color="primary"
                        class="px-8"
                      >
                        تسجيل الدخول
                      </VBtn>
                    </div>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </v-container>
  </div>
</template>

<style lang="scss">
.layout-blank {
  .auth-wrapper {
    background-color: rgb(var(--v-theme-surface));
    min-block-size: calc(var(--vh, 1vh) * 100);
  }

  .auth-bg {
    background-color: rgb(var(--v-theme-background));
  }

  .auth-v1-top-shape,
  .auth-v1-bottom-shape {
    position: absolute;
    block-size: 233px;
    inline-size: 238px;
  }

  .auth-footer-mask {
    position: absolute;
    inset-block-end: 0;
    min-inline-size: 100%;
  }

  .auth-card {
    z-index: 1 !important;
  }

  .auth-illustration {
    z-index: 1;
  }

  .auth-v1-top-shape {
    inset-block-start: -77px;
    inset-inline-start: -40px;
  }

  .auth-v1-bottom-shape {
    inset-block-end: -55px;
    inset-inline-end: -55px;
  }
}

@media (min-width: 960px) {
  .skin--bordered {
    .auth-card-v2 {
      border-inline-start: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    }
  }
}

.text-danger {
  color: red;
}
</style>
