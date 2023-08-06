<template>
  <div>
    <v-row v-if="paso==0" fill-height fluid>
      <v-col cols="12" align="center" justify="center">
        <transition name="slide-fade">
          <div>
            <h1 class="grey--text text--darken-2">¿Estás Listo?</h1>
            <br />
            <h1 style="font-size:200px; " class="grey--text text--darken-2">{{tiempo}}</h1>
          </div>
        </transition>
      </v-col>
    </v-row>
    <transition name="slide-fade">
      <v-row v-if="paso>0 && paso<11">
        <v-col cols="12" class="pt-0">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="6" class="py-0 my-0">
                  <div align="left">
                    <span>Pregunta {{paso}} de 10</span>
                  </div>
                </v-col>
                <v-col cols="6" class="py-0 my-0">
                  <div align="right">
                    <div align="right">Correctas {{correctas.length}}</div>
                  </div>
                </v-col>
              </v-row>

              <v-progress-linear
                color="warning"
                height="10"
                rounded
                stream
                striped
                :value="porcentaje"
              ></v-progress-linear>
            </v-col>
            <v-col cols="12" class="mb-5">
              <v-card elevation="0" style="height:200px;">
                <div class="grey--text text--darken-3" align="center" style="padding-top:10px;">
                  <h5>
                    ¿Como se escribe el siguiente oración
                    <br />en Idioma Poqomam?
                  </h5>
                  <br />
                  <h2
                    class="grey--text text--darken-2"
                    style="font-size:43px;"
                  >{{mostrar_pregunta.palabra}}</h2>
                </div>
              </v-card>
            </v-col>
            <template v-for="(respuesta,index) in respuestas">
              <v-col
                :key="'r'+index"
                cols="12"
                md="6"
                :class="(index%2)?'pt-0 pr-3':'pt-0 pr-1'"
                align="center"
                justify="center"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 8 : 0"
                    color="grey lighten-3"
                    outlined
                    @click="responder(respuesta)"
                  >
                    <div
                      :class="hover?'info--text':'grey--text text--darken-1'"
                      style="height:80px; padding-top:25px;"
                    >
                      <h2>{{respuesta}}</h2>
                    </div>
                  </v-card>
                </v-hover>
              </v-col>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </transition>
    <transition name="slide-fade">
      <v-row align="center" v-if="paso>10" justify="center">
        <v-col cols="12" class="mb-5">
          <v-card elevation="0" style="height:200px;">
            <div class="grey--text text--darken-3" align="center" style="padding-top:10px; ">
              <h3 style="font-size:20px;">
                - Oraciones -
                <br />Respuestas Correctas
              </h3>
              <br />
              <div style="height:150px;">
                <h2 class="grey--text text--darken-2" style="font-size:150px;">{{correctas.length}}</h2>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" class="mt-5">
          <div align="center">
            <v-btn
              x-large
              color="grey darken-1"
              small
              class="ma-3"
              @click="empezar()"
              depressed
              dark
            >
              <v-icon left>autorenew</v-icon>Intentar de Nuevo
            </v-btn>
            <br />
            <v-btn x-large color="grey darken-1" small class="ma-3" @click="reset()" depressed dark>
              <v-icon left>home</v-icon>Volver a Inicio
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </transition>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card :color="correcta?'green':'red'">
        <v-card-text class="headline pt-4">
          <div align="center">
            <h2 class="white--text" v-if="correcta">Correcto</h2>
            <h2 class="white--text" v-else>Incorrecto</h2>
          </div>
        </v-card-text>

        <v-card-text>
          <div align="center" class="white--text">
            En Idoma Poqomam
            <br />
            <strong>{{mostrar_pregunta.palabra}}</strong>
            <br />se escribe de la siguiente manera
            <br />
            <br />
            <h2>
              <strong>{{mostrar_pregunta.correcta}}</strong>
            </h2>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :color="correcta?'green darken-3':'red darken-3'"
            depressed
            dark
            block
            @click="dialog = false,generarPregunta()"
          >Siguiente Pregunta</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["volume", "preguntas"],
  mounted() {
    this.empezar();
  },
  data() {
    return {
      paso: -1,
      tiempo: 3,
      pregunta: 0,
      correcta: false,
      colores: ["grey darken-3", "red", "warning", "info"],
      dialog: false,

      respuestas: [],
      anterior: "",

      preguntas_respondidas: [],
      fondo: undefined,
      hechas: [],
      conteo: undefined
    };
  },
  methods: {
    empezar() {
      console.log("espera");
      this.paso = 0;
      this.tiempo = 3;
      this.preguntas_respondidas = [];
      this.conteo = setInterval(() => {
        this.tiempo = this.tiempo - 1;
      }, 1000);
      setTimeout(() => {
        this.generarPregunta();
        clearInterval(this.conteo);
      }, 3000);
    },
    generarPregunta() {
      for (let index = 0; index < 2; index++) {
        this.pregunta = Math.round(Math.random() * (39 - 0) + 0);
        this.hechas.forEach(p => {
          if (this.pregunta == p) {
            index = 0;
          } else {
            index = 2;
          }
        });
      }
      this.hechas.push(this.pregunta);

      let n1 = Math.round(Math.random());
      let respuestas = [];
      if (n1 == 0) {
        respuestas = [this.mostrar_pregunta[1], this.mostrar_pregunta[2]];
      } else {
        respuestas = [this.mostrar_pregunta[2], this.mostrar_pregunta[1]];
      }

      this.respuestas = respuestas;
      this.paso++;
    },
    responder(respuesta) {
      if (this.mostrar_pregunta.correcta == respuesta) {
        this.correcta = true;
        this.registrar(this.mostrar_pregunta, true);
        let audio = new Audio(require("@/assets/success.mp3")); // path to file
        if (this.volume) {
          audio.volume = 1;
        } else {
          audio.volume = 0;
        }

        audio.play();
      } else {
        this.registrar(this.mostrar_pregunta, false);
        this.correcta = false;
        let audio = new Audio(require("@/assets/failed.mp3")); // path to file
        if (this.volume) {
          audio.volume = 0.3;
        } else {
          audio.volume = 0;
        }
        audio.play();
      }
      this.dialog = true;
    },
    registrar(pregunta, correcta) {
      let i = { pregunta: pregunta, correcta: correcta };
      this.preguntas_respondidas.push(i);
    },
    reset() {
      //this.fondo.pause();
      this.$emit("reset");
    }
  },
  computed: {
    mostrar_pregunta() {
      return this.preguntas[this.pregunta];
    },
    porcentaje() {
      return Math.round((this.paso / 10) * 100) - 10;
    },
    correctas() {
      return this.preguntas_respondidas.filter(e => e.correcta == true);
    }
  }
};
</script>

<style>
</style>