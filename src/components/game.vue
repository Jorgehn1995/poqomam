<template>
  <v-container fill-height fluid>
    <v-app-bar app color="white" dark class="border-bottom" elevation="0">
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="@/assets/ap.png"
          transition="scale-transition"
          width="150"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn
        depressed
        color="white"
        class="grey--text"
        dark
        icon
        @click="volume = !volume"
      >
        <v-icon v-if="volume">volume_up</v-icon>
        <v-icon v-else>volume_off</v-icon>
      </v-btn>
      <v-btn
        depressed
        color="white"
        class="grey--text"
        dark
        icon
        v-if="start"
        @click="(start = false), (tipo = '')"
      >
        <v-icon>home</v-icon>
      </v-btn>
    </v-app-bar>
    <v-row class="text-center" align="center" justify="center">
      <v-col v-if="!start">
        <div class="lb">
          <h1 class="font-weight-bold mb-3 warning--text">
            ¿Listo para Jugar?
          </h1>

          <p class="subheading font-weight-regular">
            En este juego pondrás a prueba tus conocimientos
            <br />en el
            <strong>Idioma Maya Poqomam</strong>
            <br />mientras aprendes nuevas palabras.
          </p>

          <v-btn depressed x-large dark @click="select()" color="green "
            >Jugar</v-btn
          >
        </div>

        <p class="grey--text text--darken-1" v-if="false">
          <i>
            <small>
              Este es un Proyecto de Mejoramiento Educativo
              <br />del Programa Académico de Desarrollo Profesional Docente.
              <br />PADEP/D. USAC.
            </small>
          </i>
        </p>
        <p class="grey--text text--lighten-1">
          <a
            href="https://www.facebook.com/jorgehn95"
            target="_blank"
            class="grey--text text--lighten-1"
          >
            <i>
              <small>Programación y Desarrollo PWA</small>
              <br />
              <small>Jorge Hernández</small>
              <br />
              <small>Versión 0.3</small>
            </i>
          </a>
        </p>
      </v-col>
      <v-col v-if="start && tipo == 'palabras'" class="pt-0">
        <palabras :volume="volume" @reset="reset"></palabras>
      </v-col>
      <v-col v-if="start && tipo == 'adjetivos'" class="pt-0">
        <adjetivos :volume="volume" @reset="reset"></adjetivos>
      </v-col>
      <v-col v-if="start && tipo == 'oraciones'" class="pt-0">
        <oraciones :volume="volume" @reset="reset"></oraciones>
      </v-col>
    </v-row>

    <v-dialog v-model="seleccionar" persistent max-width="350">
      <v-card>
        <v-card-title class="green--text body-1"
          >Selecciona el tipo de juego</v-card-title
        >
        <v-card-text>
          <br />
          <v-btn
            block
            text
            @click="(tipo = 'palabras'), (seleccionar = false), (start = true)"
            >Palabras</v-btn
          >
          <br />
          <v-btn
            block
            text
            @click="(tipo = 'adjetivos'), (seleccionar = false), (start = true)"
            >Adjetivos</v-btn
          >
          <br />
          <v-btn
            block
            text
            @click="(tipo = 'oraciones'), (seleccionar = false), (start = true)"
            >Oraciones</v-btn
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey--text text--darken-3"
            text
            @click="seleccionar = false"
          >
            <v-icon>keyboard_arrow_left</v-icon>volver
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Oraciones from "./oraciones.vue";
import Adjetivos from "./adjetivos.vue";
import Palabras from "./palabras.vue";

export default {
  components: { Palabras, Adjetivos, Oraciones },

  mounted() {},

  data() {
    return {
      start: false,
      seleccionar: false,
      tipo: "",
      volume: true,
    };
  },
  methods: {
    reset() {
      (this.start = false), (this.seleccionar = false), (this.tipo = "");
    },
    select() {
      this.seleccionar = true;
    },
  },
};
</script>

<style>
.lb {
  height: calc(100vh - 250px);
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
