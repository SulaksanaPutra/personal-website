<template>
  <div class="space-y-8 my-8 text-justify hyphens-auto leading-relaxed">
    <section class="content-narrow">
      <div class="grid gap-8">
        <article
            class=" pb-8 border-b border-border-subtle last:border-0"
        >
          <h2 class="text-xl font-semibold text-left mb-2 leading-snug">
            <router-link
                to="/case-studies/twin-v1-vat"
                class="text-text-primary hover:text-accent-primary no-underline"
            >
              Handling a VAT Increase in a Legacy, Real-Time System
            </router-link>
          </h2>


          <p class="text-text-secondary max-w-2xl mb-4">
            Twin v1 — Regulatory change under production and architectural constraints
          </p>

          <p class="mb-4 max-w-prose">
            How I managed a critical regulatory update in a legacy system with hardcoded tax logic, ensuring zero downtime and data integrity.
          </p>

          <router-link
              to="/case-studies/twin-v1/handling-a-vat-increase-in-a-legacy-real-time-system"
          >
            Read case study →
          </router-link>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Home view
</script>
