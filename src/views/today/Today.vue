<template>
  <div v-if="isLoading">
  </div>
  <div v-else class="container-xxl h-100">
    <div class="row h-100">
      <div class="col-lg-8 d-lg-flex flex-lg-column justify-content-lg-center">
        <div class="row">
          <div class="col-sm-12 pt-4">
            <p class="light-dark-color text-center">
              {{ getDateTime(dayFormat) }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="d-flex justify-content-center text-center">
              <img
                class="mt-4"
                width="50"
                height="50"
                :src="iconUrl(today.weather[0].icon)"
              />
              <h1 class="display-1-g mb-2">{{ today.main.temp.toFixed() }}°</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <h1 class="display-5 text-center mb-0">
              {{ capitalize(today.weather[0].description) }}.
            </h1>
          </div>
        </div>
        <div class="row">
          <div
            class="col"
            style="
              height: 80px;
              overflow: hidden;
              margin-top: 50px;
              margin-bottom: 20px;
              background: #2b2626;
              transform: translateZ(10px);
            "
          >
            <div
              class="a"
              style="
                width: 300px;
                margin: 0 auto;
                height: 170px;
                background: linear-gradient(181deg, #fe6b6f, transparent 55%);
                border-radius: 50%;
                border: none;
              "
            >
              <div
                class="ab"
                role="progressbar"
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="100"
                style="
                  width: 300px;
                  height: 170px;
                  background: #2b2626;
                  border-radius: 50%;
                  margin: 0 auto;
                  transform: translateY(10px);
                  border: none;
                "
              ></div>
            </div>
          </div>
        </div>
        <div class="row justify-content-between">
          <div class="col-4 text-center">
            <h3>Sunrise</h3>
            <h5 class="light-dark-color">
              {{ unixDateTime(today.sys.sunrise, "h:mm a") }}
            </h5>
          </div>
          <div class="col-4 text-center">
            <h3>Sunset</h3>
            <h5 class="light-dark-color">
              {{ unixDateTime(today.sys.sunset, "h:mm a") }}
            </h5>
          </div>
        </div>
      </div>
      <div class="col-lg-4 d-lg-flex flex-lg-column justify-content-lg-center">
        <div class="row pt-4 text-center text-lg-start d-lg-flex flex-lg-column justify-content-lg-center">
          <div class="col">
            <h1 class="display-2">{{ today.main.temp_min.toFixed() }}°</h1>
            <h5 class="py-1 light-dark-color">Minimal</h5>
          </div>
          <div class="col">
            <h1 class="display-2">{{ today.main.temp_max.toFixed() }}°</h1>
            <h5 class="py-1 light-dark-color">Maximum</h5>
          </div>
          <div class="col">
            <h1 class="display-2">{{ today.main.humidity }} %</h1>
            <h5 class="py-1 light-dark-color">Humidity</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Today.ts" lang="ts"></script>
