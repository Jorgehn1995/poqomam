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
                    ¿Como se escribe la siguiente palabra
                    <br />en Idioma Poqomam?
                  </h5>
                  <br />
                  <h2
                    class="grey--text text--darken-2"
                    style="font-size:60px;"
                  >{{mostrar_pregunta.palabra}}</h2>
                </div>
              </v-card>
            </v-col>
            <template v-for="(respuesta,index) in respuestas">
              <v-col
                :key="'r'+index"
                cols="6"
                :class="(index%2)?'pt-0 pr-3':'pt-0 pr-1'"
                align="center"
                justify="center"
                md="6"
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
                - Palabras -
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
            <h1>
              <strong>{{mostrar_pregunta.correcta}}</strong>
            </h1>
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
  props: ["volume"],
  mounted() {
    this.empezar();
    //this.fondo = new Audio(require("@/assets/lobby.mp3")); // path to file
    //this.fondo.volume = 0.2;
    //this.fondo.play();
  },
  data() {
    return {
      paso: -1,
      tiempo: 3,
      pregunta: 0,
      correcta: false,
      colores: ["grey darken-3", "red", "warning", "info"],
      dialog: false,
      preguntas: [
        {
          "1": "Araan",
          "2": "Alamunix",
          "3": "Pak",
          "4": "Rum",
          palabra: "Naranja",
          correcta: "Araan"
        },
        {
          "1": "Alamunix",
          "2": "Tapaal",
          "3": "Tilul",
          "4": "Santiyes",
          palabra: "Limón",
          correcta: "Alamunix"
        },
        {
          "1": "Rum",
          "2": "Meluanix",
          "3": "Ijiij",
          "4": "Muuy",
          palabra: "Jocote",
          correcta: "Rum"
        },
        {
          "1": "Pak",
          "2": "Kanayah",
          "3": "Alamunix",
          "4": "Araan",
          palabra: "Anona",
          correcta: "Pak"
        },
        {
          "1": "Tapaal",
          "2": "Kaq'",
          "3": "Rum",
          "4": "Pak",
          palabra: "Nance",
          correcta: "Tapaal"
        },
        {
          "1": "Tilul",
          "2": "Santiyes",
          "3": "Muuy",
          "4": "Ijiij",
          palabra: "Zapote",
          correcta: "Tilul"
        },
        {
          "1": "Santiyes",
          "2": "Meluanix",
          "3": "Araan",
          "4": "Kanayah",
          palabra: "Sandía",
          correcta: "Santiyes"
        },
        {
          "1": "Muuy",
          "2": "Alamunix",
          "3": "Rum",
          "4": "Pak",
          palabra: "Chico",
          correcta: "Muuy"
        },
        {
          "1": "Ijiij",
          "2": "Kaq'",
          "3": "Tilul",
          "4": "Tapaal",
          palabra: "Caña",
          correcta: "Ijiij"
        },
        {
          "1": "Kanayah",
          "2": "Araan",
          "3": "Rum",
          "4": "Alamunix",
          palabra: "Banano",
          correcta: "Kanayah"
        },
        {
          "1": "Pix",
          "2": "Tz'iin",
          "3": "Ichaaj",
          "4": "Iik",
          palabra: "Tomate",
          correcta: "Pix"
        },
        {
          "1": "Tz'iin",
          "2": "Kinaq'",
          "3": "Aaxux",
          "4": "Sewayah",
          palabra: "Yuca",
          correcta: "Tz'iin"
        },
        {
          "1": "Ichaaj",
          "2": "K'uum",
          "3": "Ixiim",
          "4": "Sies",
          palabra: "Chipilin",
          correcta: "Ichaaj"
        },
        {
          "1": "Iik",
          "2": "Tz'iin",
          "3": "Chukte'",
          "4": "Pix",
          palabra: "Chile",
          correcta: "Iik"
        },
        {
          "1": "Kinaq'",
          "2": "Sies",
          "3": "Aaxux",
          "4": "Sewayah",
          palabra: "Frijol",
          correcta: "Kinaq'"
        },
        {
          "1": "Sewayah",
          "2": "Ixiim",
          "3": "k'uxub'",
          "4": "Aaxux",
          palabra: "Cebolla",
          correcta: "Sewayah"
        },
        {
          "1": "Aaxux",
          "2": "K'uum",
          "3": "Pix",
          "4": "Tz'iin",
          palabra: "Ajo",
          correcta: "Aaxux"
        },
        {
          "1": "Sies",
          "2": "Ichaaj",
          "3": "Kinaq'",
          "4": "Iik",
          palabra: "Bledo",
          correcta: "Sies"
        },
        {
          "1": "Ixiim",
          "2": "Sewayah",
          "3": "Sies",
          "4": "Chukte'",
          palabra: "Maíz",
          correcta: "Ixiim"
        },
        {
          "1": "K'uum",
          "2": "Tz'iin",
          "3": "k'uxub'",
          "4": "Pix",
          palabra: "Ayote",
          correcta: "K'uum"
        },
        {
          "1": "Ak'ach",
          "2": "B'ihiil",
          "3": "Paatu'",
          "4": "Mis",
          palabra: "Pollo",
          correcta: "Ak'ach"
        },
        {
          "1": "B'ihiil",
          "2": "Piip",
          "3": "Ak'ach",
          "4": "wakax",
          palabra: "Gallo",
          correcta: "B'ihiil"
        },
        {
          "1": "Paatu'",
          "2": "Tuutak'ach",
          "3": "Kuayuh",
          "4": "Wiewa'",
          palabra: "Pato",
          correcta: "Paatu'"
        },
        {
          "1": "Mis",
          "2": "Kuayuh",
          "3": "Ak'ach",
          "4": "Tz'e'",
          palabra: "Gato",
          correcta: "Mis"
        },
        {
          "1": "Waakax",
          "2": "B'ihiil",
          "3": "Kuayuh",
          "4": "Ahq",
          palabra: "Vaca",
          correcta: "Waakax"
        },
        {
          "1": "Kuayuh",
          "2": "Tz'e'",
          "3": "Ahq",
          "4": "Piip",
          palabra: "Caballo",
          correcta: "Kuayuh"
        },
        {
          "1": "Tz'e'",
          "2": "Tuutak'ach",
          "3": "Mis",
          "4": "Wakax",
          palabra: "Perro",
          correcta: "Tz'e'"
        },
        {
          "1": "Piip",
          "2": "Paatu'",
          "3": "Wiewa'",
          "4": "Kuayuh",
          palabra: "chompipe",
          correcta: "Piip"
        },
        {
          "1": "Ahq",
          "2": "Mis",
          "3": "Tz'e'",
          "4": "Tuutak'ach",
          palabra: "Marrano",
          correcta: "Ahq"
        },
        {
          "1": "Tutak'ach",
          "2": "Wuruh",
          "3": "Piip",
          "4": "Ak'ach",
          palabra: "Gallina",
          correcta: "Tutak'ach"
        },
        {
          "1": "Imul",
          "2": "Uaw",
          "3": "Xojm",
          "4": "Kiej",
          palabra: "Conejo",
          correcta: "Imul"
        },
        {
          "1": "Kiej",
          "2": "K'uay",
          "3": "Ch'ua",
          "4": "Kuuk",
          palabra: "Venado",
          correcta: "Kiej"
        },
        {
          "1": "Xojm",
          "2": "Kuuk",
          "3": "Ch'ua",
          "4": "Pahar",
          palabra: "Coyote",
          correcta: "Xojm"
        },
        {
          "1": "Uaw",
          "2": "Tukx",
          "3": "Kojl",
          "4": "Kok",
          palabra: "Mapache",
          correcta: "Uaw"
        },
        {
          "1": "K'uay",
          "2": "Xojm",
          "3": "Kiej",
          "4": "Imul",
          palabra: "Mono",
          correcta: "K'uay"
        },
        {
          "1": "Ch'ua",
          "2": "K'uay",
          "3": "Uaw",
          "4": "Kuuk",
          palabra: "Ratón",
          correcta: "Ch'ua"
        },
        {
          "1": "Kuuk",
          "2": "Tukx",
          "3": "Pahar",
          "4": "Kok",
          palabra: "Ardilla",
          correcta: "Kuuk"
        },
        {
          "1": "Pahar",
          "2": "Yaak",
          "3": "Imul",
          "4": "Kiej",
          palabra: "Zorrillo",
          correcta: "Pahar"
        },
        {
          "1": "Kok",
          "2": "Xojm",
          "3": "Uaw",
          "4": "Kojl",
          palabra: "Tortuga",
          correcta: "Kok"
        },
        {
          "1": "Tukx",
          "2": "Kuuk",
          "3": "Ch'ua",
          "4": "K'uay",
          palabra: "Tacuacín",
          correcta: "Tukx"
        }
      ],
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
      let respuestas = [
        this.mostrar_pregunta[1],
        this.mostrar_pregunta[2],
        this.mostrar_pregunta[3],
        this.mostrar_pregunta[4]
      ];
      for (let i = respuestas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = respuestas[i];
        respuestas[i] = respuestas[j];
        respuestas[j] = temp;
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