<template>
  <div class="text-justify hyphens-auto leading-relaxed">
    <section class="content-narrow py-8" id="case-twin-v1-vat">
      <div class="mb-8">
        <router-link
            to="/case-studies"
            class="text-sm text-text-secondary hover:text-text-primary"
        >
          ← Back to Case Studies
        </router-link>
      </div>

      <header class="mb-8">
        <h1 class="text-xl text-left text-text-primary leading-tight mb-2">
          Handling a VAT Increase in a Legacy, Real-Time System
        </h1>
        <p class="text-text-secondary max-w-2xl">
          Twin v1 — Regulatory change under production and architectural constraints
        </p>
      </header>

      <article class="space-y-8">
        <section>
          <p class="label-mono mb-1">Context</p>
          <div class="space-y-4">
            <p>
              Twin v1 is a business-critical distributor system used daily for sales, invoicing,
              and financial reporting across multiple branches. In 2022, the Indonesian government
              officially increased VAT (PPN) from 10% to 11%, directly impacting invoice totals,
              financial reports, and legal compliance.
            </p>
            <p>
              I had long been aware that the system’s tax logic was fragile, as VAT percentages were
              hardcoded deep inside the codebase. When the regulation change was announced, the
              request to handle this update came directly from the CEO, reflecting the financial
              and legal sensitivity of the issue.
            </p>
          </div>
        </section>

        <section>
          <p class="label-mono mb-1">The Problem</p>
          <div class="space-y-4">
            <p>
              The system calculated VAT dynamically every time data was fetched. There were no
              persisted calculated values for totals, VAT, or grand totals. Instead, all values
              were recalculated in real time from master data.
            </p>
            <p>
              VAT logic was duplicated across multiple APIs, and there was no reliable historical
              record of which VAT percentage had been applied to a given transaction. Changing
              hardcoded values was never a valid option, as it would retroactively alter historical
              invoices and reports, creating serious accounting and legal risks.
            </p>
          </div>
        </section>

        <section>
          <p class="label-mono mb-2">Constraints</p>
          <ul class="pl-5 list-disc space-y-2">
            <li>Transactions could not be paused or stopped during the change.</li>
            <li>No centralized calculation service existed in the codebase.</li>
            <li>Automated test coverage was minimal and uneven.</li>
            <li>The system relied heavily on real-time recalculation.</li>
            <li>I handled the fix alone due to system complexity and sensitivity.</li>
            <li>A full architectural refactor was too risky for a production-critical system.</li>
          </ul>
        </section>

        <section>
          <p class="label-mono mb-1">Decision and Approach</p>
          <div class="space-y-4">
            <p>
              I implemented a versioned, configuration-based tax strategy. For new transactions,
              VAT was driven by configuration rather than hardcoded values. I introduced a new
              column in the existing transaction table to store the VAT percentage applied to
              each transaction.
            </p>
            <p>
              Historical records preserved their original VAT values, while new transactions
              respected the configured rate. This prevented retroactive recalculation and allowed
              the system to safely support regulatory changes.
            </p>
          </div>
        </section>

        <section>
          <p class="label-mono mb-1">Risk Management and Verification</p>
          <div class="space-y-4">
            <p>
              To reduce operational and legal risk, I added end-to-end tests for critical
              operational APIs and performed extensive manual validation. I collaborated closely
              with the finance team to verify calculations and edge cases.
            </p>
            <p>
              I also introduced a runtime flag that blocked transactions if the VAT percentage
              did not match the officially valid value during the initial rollout period. For
              two weeks, invoices and reports were continuously revalidated to ensure correctness.
            </p>
          </div>
        </section>

        <section>
          <p class="label-mono mb-1">Outcome</p>
          <p>
            The system handled the VAT increase without disrupting daily operations. Invoice
            totals and reports remained accurate, historical data was preserved, and a major
            legal and financial risk was removed without stopping the business.
          </p>
        </section>

        <section>
          <p class="label-mono mb-1">Reflection</p>
          <div class="space-y-4">
            <p>
              This change did not improve Twin v1’s overall architecture. Due to the lack of
              centralized logic, the solution required defensive additions across multiple APIs.
              In practice, this was a controlled patch rather than a structural refactor.
            </p>
            <p>
              However, this experience strongly influenced how I designed later systems—especially
              LAAS—where tax and pricing logic are treated as versioned, auditable data rather than
              dynamically recomputed values.
            </p>
          </div>
        </section>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
// Case Study: Twin v1 VAT
</script>
