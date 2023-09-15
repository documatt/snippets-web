<template>
  <div class="min-h-screen flex relative lg:static bg-dm-mocca">
    <div
      id="app-sidebar-9"
      class="h-screen surface-section hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-5 border-right-1 surface-border w-18rem lg:w-4rem select-none"
    >
      <div class="flex flex-column h-full">
        <div
          class="flex align-items-center justify-content-center flex-shrink-0 mt-3"
        >
          <img
            src="/icon.svg"
            alt="Documatt logo"
            height="40"
          />
        </div>
        <div class="mt-3">

          <!-- Leftbar upper menu -->
          <ul class="list-none p-0 m-0">
            <li>
              <a
                v-ripple
                class="flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-cyan-600 border-left-2 border-cyan-600 hover:border-300 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-home mr-2 lg:mr-0 text-base lg:text-2xl"></i>
                <span class="font-medium inline text-base lg:text-xs lg:hidden"
                  >Home</span
                >
              </a>
            </li>
            <li>
              <a
                v-ripple
                class="flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-search mr-2 lg:mr-0 text-base lg:text-2xl"></i>
                <span class="font-medium inline text-base lg:text-xs lg:hidden"
                  >Search</span
                >
              </a>
            </li>
            <li>
              <a
                v-ripple
                class="flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-users mr-2 lg:mr-0 text-base lg:text-2xl"></i>
                <span class="font-medium inline text-base lg:text-xs lg:hidden"
                  >Team</span
                >
              </a>
            </li>
            <li class="relative">
              <a
                v-ripple
                class="flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors p-ripple"
                v-styleclass="{
                  selector: '@next',
                  enterClass: 'hidden',
                  leaveToClass: 'hidden',
                  hideOnOutsideClick: true,
                }"
              >
                <i
                  class="pi pi-chart-line mr-2 lg:mr-0 text-base lg:text-2xl"
                  v-badge.danger
                ></i>
                <span class="font-medium inline text-base lg:text-xs lg:hidden"
                  >Reports</span
                >
                <i class="pi pi-chevron-down ml-auto lg:hidden"></i>
              </a>
              <ul
                class="list-none pl-3 pr-0 py-0 lg:p-3 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out static border-round-right lg:absolute left-100 top-0 z-1 surface-overlay shadow-none lg:shadow-2 w-full lg:w-15rem"
              >
                <li>
                  <a
                    v-ripple
                    class="flex align-items-center cursor-pointer p-3 hover:surface-100 hover:text-900 border-round text-600 hover:text-700 transition-duration-150 transition-colors p-ripple"
                    v-styleclass="{ selector: '@next', toggleClass: 'hidden' }"
                  >
                    <i class="pi pi-chart-line mr-2"></i>
                    <span class="font-medium">Revenue</span>
                    <i class="pi pi-chevron-down ml-auto"></i>
                  </a>
                  <ul
                    class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
                  >
                    <li>
                      <a
                        v-ripple
                        class="flex align-items-center cursor-pointer p-3 hover:surface-100 hover:text-900 border-round text-600 hover:text-700 transition-duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-table mr-2"></i>
                        <span class="font-medium">View</span>
                      </a>
                    </li>
                    <li>
                      <a
                        v-ripple
                        class="flex align-items-center cursor-pointer p-3 hover:surface-100 hover:text-900 border-round text-600 hover:text-700 transition-duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-search mr-2"></i>
                        <span class="font-medium">Search</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex align-items-center cursor-pointer p-3 hover:surface-100 hover:text-900 border-round text-600 hover:text-700 transition-duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-chart-line mr-2"></i>
                    <span class="font-medium">Expenses</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                v-ripple
                class="flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors p-ripple"
              >
                <i
                  class="pi pi-calendar mr-2 lg:mr-0 text-base lg:text-2xl"
                ></i>
                <span class="font-medium inline text-base lg:text-xs lg:hidden"
                  >Events</span
                >
              </a>
            </li>
            <li>
              <a
                v-ripple
                class="flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-cog mr-2 lg:mr-0 text-base lg:text-2xl"></i>
                <span class="font-medium inline text-base lg:text-xs lg:hidden"
                  >Options</span
                >
              </a>
            </li>
          </ul>

        </div>
        <div class="mt-auto">
          <hr class="mx-3 border-top-1 border-none surface-border" />

          <!-- Leftbar bottom menu -->
          <a
            v-ripple
            class="my-3 flex flex-row lg:flex-column align-items-center cursor-pointer p-3 lg:justify-content-center text-600 border-left-2 border-transparent hover:border-300 transition-duration-150 transition-colors p-ripple"
          >
            <i
              class="pi pi-sign-out mr-2 lg:mr-0 text-base lg:text-1xl text-pink-500"
            ></i>
            <span class="font-medium inline lg:hidden">Sign Out</span>
          </a>

        </div>
      </div>
    </div>

    <!-- Right part - topbar, main stage and footer -->
    <div class="min-h-screen h-screen flex flex-column relative flex-auto section-width">

      <!-- Topbar -->
      <div
        class="flex justify-content-between align-items-center px-5 relative lg:static border-bottom-1 surface-border bg-dm-mocca"
        style="height: 10vh"
      >
        <div class="flex">

          <!-- Burger menu for leftbar (hidden on < LG)-->
          <a
            v-ripple
            class="cursor-pointer block lg:hidden text-700 mr-3 mt-1 p-ripple"
            v-styleclass="{
              selector: '#app-sidebar-9',
              enterClass: 'hidden',
              enterActiveClass: 'fadeinleft',
              leaveToClass: 'hidden',
              leaveActiveClass: 'fadeoutleft',
              hideOnOutsideClick: true,
            }"
          >
            <i class="pi pi-bars text-4xl"></i>
          </a>

          <!-- Search field -->
          <!-- <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText
              type="text"
              class="border-none w-8rem sm:w-20rem"
              placeholder="Search"
            />
          </span> -->

        </div>

        <!-- Three dots button for topbar (hidden on < LG) -->
        <a
          v-ripple
          class="cursor-pointer block lg:hidden text-700 ml-auto p-ripple"
          v-styleclass="{
            selector: '#topbarmenu',
            enterClass: 'hidden',
            enterActiveClass: 'fadein',
            leaveToClass: 'hidden',
            leaveActiveClass: 'fadeout',
            hideOnOutsideClick: true,
          }"
        >
          <i class="pi pi-ellipsis-v text-2xl"></i>
        </a>

        <!-- Topbar menu -->
        <ul
          id="topbarmenu"
          class="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row lg:ml-auto border-1 lg:border-none surface-border right-0 top-100 z-5 shadow-2 lg:shadow-none absolute lg:static bg-dm-mocca"
        >
          <li>
            <a
              v-ripple
              class="flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"
            >
              <i class="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0"></i>
              <span class="block lg:hidden font-medium">Inbox</span>
            </a>
          </li>
          <li>
            <a
              v-ripple
              class="flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"
            >
              <i
                class="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0"
                v-badge.danger
              ></i>
              <span class="block lg:hidden font-medium">Notifications</span>
            </a>
          </li>
          <li class="border-top-1 surface-border lg:border-top-none">
            <a
              v-ripple
              class="flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer transition-duration-150 transition-colors p-ripple"
            >
              <img
                src="/avatar-f-1.png"
                class="mr-3 lg:mr-0"
                style="width: 32px; height: 32px"
              />
              <div class="block lg:hidden">
                <div class="text-900 font-medium">Amy Elsner</div>
                <span class="text-600 font-medium text-sm"
                  >Marketing Specialist</span
                >
              </div>
            </a>
          </li>
        </ul>

      </div>

      <!-- Main content -->
      <div class="p-2 flex flex-auto bg-white"
           style="height: 85vh;">
        <slot></slot>
      </div>

      <!-- Status bar / footer -->
      <div class="p-0"
           style="height: min-content;">
        <LayoutFooter/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const { texts } = useAppConfig();
</script>

<style scoped lang="scss">
// 95vw on < LG, 100vw otherwise
.section-width {
  width: 95vw;

  @media screen and (max-width: $lg) {
    width: 100vw;
  }
}
</style>
