<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { z } from "zod";
import { toFormValidator } from "@vee-validate/zod";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-vue-next";

import { useLogin } from "../../services/queries";

// validation schema
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const { mutate: loginUser, isPending } = useLogin();
const router = useRouter();
const showPassword = ref(false);

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toFormValidator(loginSchema),
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit((values) => {
  loginUser(values, {
    onSuccess: () => {
      router.push("/home");
    },
  });
});
</script>

<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4"
        >
          <div class="w-6 h-6 rounded bg-primary"></div>
        </div>
        <h1 class="text-2xl font-semibold text-foreground mb-2 text-balance">
          Welcome back
        </h1>
        <p class="text-muted-foreground text-sm">
          Sign in to continue to your dashboard
        </p>
      </div>

      <!-- Card -->
      <div class="border border-border/50 shadow-lg rounded-xl bg-card">
        <div class="p-6">
          <h2 class="text-xl font-medium mb-1">Sign in</h2>
          <p class="text-muted-foreground mb-4">
            Enter your credentials to access your account
          </p>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <!-- Email -->
            <div class="space-y-2">
              <label for="email" class="text-sm font-medium">Email</label>
              <input
                v-model="email"
                v-bind="emailAttrs"
                id="email"
                type="email"
                placeholder="john.doe@gmail.com"
                class="h-11 border border-border/60 focus:border-primary w-full rounded px-3"
              />
              <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                {{ errors.email }}
              </p>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label for="password" class="text-sm font-medium">Password</label>
              <div class="relative">
                <input
                  v-model="password"
                  v-bind="passwordAttrs"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  class="h-11 border border-border/60 focus:border-primary w-full rounded px-3 pr-10"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <component :is="showPassword ? EyeOff : Eye" size="16" />
                </button>
              </div>
              <p v-if="errors.password" class="text-red-500 text-sm mt-1">
                {{ errors.password }}
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium mt-6 flex items-center justify-center rounded-lg"
              :disabled="isPending"
            >
              <Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
              <span v-if="isPending">Signing in...</span>
              <span v-else class="flex items-center">
                Sign in
                <ArrowRight size="16" class="ml-2" />
              </span>
            </button>
          </form>

          <!-- Sign up Link -->
          <div class="text-center mt-6 pt-4 border-t border-border/50">
            <p class="text-sm text-muted-foreground">
              Don’t have an account?
              <RouterLink
                to="/register"
                class="text-primary hover:underline font-medium"
              >
                Sign up
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
