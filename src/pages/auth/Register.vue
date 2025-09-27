<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useForm } from "vee-validate";
import { z } from "zod";
import { toFormValidator } from "@vee-validate/zod";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-vue-next";
import { useRegister } from "../../services/queries";

// schema
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const { mutate: registerUser, isPending } = useRegister();
const router = useRouter();

const { handleSubmit, errors, defineField, resetForm } = useForm({
  validationSchema: toFormValidator(registerSchema),
});

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");

const onSubmit = handleSubmit((values) => {
  registerUser(values, {
    onSuccess: () => {
      router.push("/home");
      resetForm();
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
          Create your account
        </h1>
        <p class="text-muted-foreground text-sm">
          Join thousands of professionals already using our todo app
        </p>
      </div>

      <!-- Card -->
      <div class="border border-border/50 shadow-lg rounded-xl bg-card">
        <div class="p-6">
          <h2 class="text-xl font-medium mb-1">Get started</h2>
          <p class="text-muted-foreground mb-4">
            Fill in your details to create your account
          </p>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <!-- Name -->
            <div class="space-y-2">
              <label for="name" class="text-sm font-medium">Name</label>
              <input
                v-model="name"
                v-bind="nameAttrs"
                id="name"
                type="text"
                placeholder="John Doe"
                class="h-11 border border-border/60 focus:border-primary w-full rounded px-3"
              />
              <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                {{ errors.name }}
              </p>
            </div>

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
                  placeholder="Create a strong password"
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

            <!-- Confirm Password -->
            <div class="space-y-2">
              <label for="confirmPassword" class="text-sm font-medium">
                Confirm password
              </label>
              <div class="relative">
                <input
                  v-model="confirmPassword"
                  v-bind="confirmPasswordAttrs"
                  id="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm your password"
                  class="h-11 border border-border/60 focus:border-primary w-full rounded px-3 pr-10"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <component
                    :is="showConfirmPassword ? EyeOff : Eye"
                    size="16"
                  />
                </button>
              </div>
              <p
                v-if="errors.confirmPassword"
                class="text-red-500 text-sm mt-1"
              >
                {{ errors.confirmPassword }}
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium mt-6 flex items-center justify-center rounded-lg"
              :disabled="isPending"
            >
              <Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
              <span v-if="isPending">Creating account...</span>
              <span v-else class="flex items-center">
                Create account
                <ArrowRight size="16" class="ml-2" />
              </span>
            </button>
          </form>

          <!-- Sign In Link -->
          <div class="text-center mt-6 pt-4 border-t border-border/50">
            <p class="text-sm text-muted-foreground">
              Already have an account?
              <RouterLink
                to="/"
                class="text-primary hover:underline font-medium"
              >
                Sign in
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
