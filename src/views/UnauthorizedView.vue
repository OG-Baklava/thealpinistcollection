<template>
  <div>
    <section>
      <div class="py-16">
        <div class="text-center">
          <p class="text-sm font-semibold text-primary uppercase tracking-wide">
            401 error
          </p>
          <h1
            class="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl"
          >
            Unauthorized
          </h1>
          <p class="mt-2 text-base text-neutral-300">
            Sorry, the access to this page is unauthorized.
          </p>
          <div class="mt-6">
            <router-link
              to="/"
              class="text-base font-medium text-primary hover:text-opacity-80"
              >Go back home<span aria-hidden="true"> &rarr;</span></router-link
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
