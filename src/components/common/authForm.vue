<template>
  <main class="form-signin text-center">
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <form>
      <h1 class="mb-5 pt-5">Weatherly</h1>
      <h4 class="mb-1 pt-5">Please Sign {{ mode == "login" ? "In" : "Up" }}</h4>
      <router-link
        class="we__link d-block mb-3"
        v-if="mode == 'login'"
        to="/signup"
        >Need an account?</router-link
      >
      <router-link
        class="we__link d-block mb-3"
        v-if="mode == 'signup'"
        to="/login"
        >Have an account?</router-link
      >
      <div v-if="mode != 'login'" class="form-floating">
        <input
          type="text"
          v-model.trim="name"
          class="form-control no-bottom-radius"
          placeholder="Name"
          style="
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC');
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-size: 16px 18px;
            background-position: 98% 50%;
            cursor: auto;
          "
        />
        <label for="floatingPassword">Enter your name</label>
      </div>
      <div class="form-floating">
        <input
          type="email"
          v-model.trim="email"
          class="form-control"
          :class="{
            'no-top-radius no-bottom-radius': mode == 'signup',
            'no-bottom-radius': mode == 'login',
          }"
          id="floatingInput"
          placeholder="name@example.com"
          autocomplete="off"
          style="
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC');
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-size: 16px 18px;
            background-position: 98% 50%;
            cursor: auto;
          "
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          v-model.trim="password"
          class="form-control no-top-radius"
          id="floatingPassword"
          placeholder="Password"
          autocomplete="off"
          style="
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC');
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-size: 16px 18px;
            background-position: 98% 50%;
            cursor: auto;
          "
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div v-if="mode != 'login'" class="form-floating">
        <input
          type="text"
          v-model.trim="city"
          class="form-control mb-2"
          placeholder="City"
          style="
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAPhJREFUOBHlU70KgzAQPlMhEvoQTg6OPoOjT+JWOnRqkUKHgqWP4OQbOPokTk6OTkVULNSLVc62oJmbIdzd95NcuGjX2/3YVI/Ts+t0WLE2ut5xsQ0O+90F6UxFjAI8qNcEGONia08e6MNONYwCS7EQAizLmtGUDEzTBNd1fxsYhjEBnHPQNG3KKTYV34F8ec/zwHEciOMYyrIE3/ehKAqIoggo9inGXKmFXwbyBkmSQJqmUNe15IRhCG3byphitm1/eUzDM4qR0TTNjEixGdAnSi3keS5vSk2UDKqqgizLqB4YzvassiKhGtZ/jDMtLOnHz7TE+yf8BaDZXA509yeBAAAAAElFTkSuQmCC');
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-size: 16px 18px;
            background-position: 98% 50%;
            cursor: auto;
          "
        />
        <label for="floatingPassword">Enter your city</label>
      </div>
      <p v-if="!formIsValid" class="text-white">
        Please enter a valid email {{ mode == "signup" ? "your city" : "" }} and
        password (must be at least 6 characters long).
      </p>
      <button
        @click.prevent="submitForm"
        class="w-100 mb-3 we__btn btn btn-lg"
        type="submit"
      >
        Sign {{ mode == "login" ? "In" : "Up" }}
      </button>
    </form>
  </main>
</template>

<script src="./authForm.ts" lang="ts"></script>
<style src="./authForm.scss" lang="scss"></style>
