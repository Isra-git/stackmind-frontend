/* 

    Pagina History

*/
// src/pages/History.jsx
import React from "react";
import { Link } from "react-router-dom";

import {
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineChatBubbleLeftRight,
  HiOutlineArrowRight,
} from "react-icons/hi2";

const History = () => {
  return (
    <div className="w-full bg-base-100 font-sans pb-16">
      {/* inicio de la historia */}
      <section className="relative w-full bg-base-200 py-20 px-6 lg:px-12 overflow-hidden flex flex-col items-center text-center border-b border-base-300">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-base-100 to-base-100"></div>
        <div className="z-10 max-w-4xl">
          <span className="badge badge-accent badge-outline mb-6 font-bold tracking-widest uppercase px-4 py-3">
            Nuestra Filosofía
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-base-content mb-6 leading-tight">
            De los primeros foros <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              a la revolución de la IA
            </span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Internet no cambió el mundo por los cables o los servidores, sino
            porque nos permitió conectar con otras personas. Hoy, StackMind
            recupera ese espíritu original para desmitificar la Inteligencia
            Artificial.
          </p>
        </div>
      </section>

      {/* EL PASADO  */}
      <section className="max-w-6xl mx-auto py-16 px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
            <HiOutlineGlobeAlt className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-bold">Cuando internet se hizo humano</h2>
          <p className="text-base-content/70 leading-relaxed text-lg">
            A finales de los años 90 y principios de los 2000, la verdadera
            magia de la web sucedió en los foros. Sitios rudimentarios, llenos
            de texto, pero rebosantes de vida. Eran lugares donde alguien con un
            problema podía lanzar una pregunta al vacío y, sorprendentemente, un
            desconocido al otro lado del mundo dedicaba su tiempo a responderla.
          </p>
          <p className="text-base-content/70 leading-relaxed text-lg">
            Ese fue el verdadero punto de inflexión de la red: el conocimiento
            dejó de estar encerrado en bibliotecas para ser democratizado{" "}
            <strong>de humanos a humanos</strong>. La colaboración desinteresada
            construyó la web moderna.
          </p>
        </div>
        <div className="md:w-1/2 w-full">
          {/* El contenedor del navegador falso -> DaisyUI */}
          <div className="mockup-browser border border-base-300 bg-base-200 shadow-xl">
            {/* LA BARRA DE DIRECCIONES */}
            <div className="mockup-browser-toolbar">
              <div className="input border border-base-300 text-base-content/50">
                http://foro-antiguo.com
              </div>
            </div>

            {/*CONTENIDO  */}
            <div className="flex justify-center px-4 py-6 bg-base-200">
              <img
                src="/img/history/forum.jpg"
                alt="Aspecto de un foro antiguo"
                className="w-full h-auto rounded-lg shadow-sm opacity-85 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRESENTE ->La IA como nueva frontera */}
      <section className="max-w-6xl mx-auto py-16 px-6 lg:px-12 flex flex-col md:flex-row-reverse items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
            <HiOutlineUserGroup className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-bold">
            Volviendo a las raíces para algo maravilloso
          </h2>
          <p className="text-base-content/70 leading-relaxed text-lg">
            Hoy nos enfrentamos a un cambio de paradigma igual o mayor: la
            Inteligencia Artificial. Sin embargo, la IA puede parecer
            intimidante, fría, o un terreno exclusivo para ingenieros y
            programadores. Creemos que esto es un error.
          </p>
          <p className="text-base-content/70 leading-relaxed text-lg">
            En StackMind estamos aplicando los mismos principios que
            popularizaron internet a la revolución de la IA. Hemos construido un{" "}
            <strong>Ágora Digital</strong> diseñado específicamente para
            personas sin conocimientos técnicos. Un espacio seguro y en español
            donde la comunidad te ayuda a implementar la IA en tu trabajo, tus
            estudios o tu vida personal, con explicaciones claras y paso a paso.
          </p>
        </div>
        <div className="md:w-1/2 w-full relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-base-200 group">
            <img
              src="/img/history/mano.avif"
              alt="Mano robótica sosteniendo letras AI en neón azul"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* degradado oscuro en la parte inferior -> profundidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* El Asistente de IA */}
      <section className="w-full bg-primary/5 py-20 mt-8 border-y border-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <HiOutlineSparkles className="w-16 h-16 mx-auto text-primary mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            No necesitas ser un experto para preguntar
          </h2>
          <p className="text-xl text-base-content/80 mb-10 leading-relaxed">
            Sabemos que, a veces, lo más difícil de la IA es saber cómo formular
            la pregunta. Por eso, StackMind integra un{" "}
            <strong>Asistente de IA exclusivo</strong> en nuestro editor. Antes
            de publicar, nuestro ayudante pule tu texto, estructura tu duda y la
            optimiza para que la comunidad pueda entenderte a la perfección. Tú
            pones la idea, nosotros le damos forma.
          </p>
        </div>
      </section>

      {/*  CALL TO ACTIONS */}
      <section className="max-w-5xl mx-auto py-20 px-6 text-center">
        <h2 className="text-2xl font-bold mb-10">
          ¿Listo para formar parte de la historia?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Escribir pregunta */}
          <Link
            to="/newquestion"
            className="card bg-base-100 shadow-md border border-base-200 hover:border-primary hover:shadow-xl transition-all duration-300 group"
          >
            <div className="card-body items-center text-center">
              <HiOutlineChatBubbleLeftRight className="w-10 h-10 text-primary mb-2" />
              <h3 className="card-title">Haz una Pregunta</h3>
              <p className="text-sm text-base-content/60">
                Usa nuestro asistente y resuelve tu duda hoy mismo.
              </p>
              <span className="text-primary font-semibold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Empezar <HiOutlineArrowRight />
              </span>
            </div>
          </Link>

          {/* Ver Top Preguntas */}
          <Link
            to="/questions"
            className="card bg-base-100 shadow-md border border-base-200 hover:border-secondary hover:shadow-xl transition-all duration-300 group"
          >
            <div className="card-body items-center text-center">
              <HiOutlineSparkles className="w-10 h-10 text-secondary mb-2" />
              <h3 className="card-title">Ver lo más Top</h3>
              <p className="text-sm text-base-content/60">
                Descubre cómo otros usuarios ya están usando la IA.
              </p>
              <span className="text-secondary font-semibold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explorar <HiOutlineArrowRight />
              </span>
            </div>
          </Link>

          {/* Registrarse */}
          <Link
            to="/register"
            className="card bg-neutral text-neutral-content shadow-md border border-neutral hover:shadow-xl transition-all duration-300 group hover:bg-neutral-focus"
          >
            <div className="card-body items-center text-center">
              <HiOutlineUserGroup className="w-10 h-10 mb-2" />
              <h3 className="card-title">Únete a la Comunidad</h3>
              <p className="text-sm opacity-80">
                Regístrate gratis y empieza a aprender de humanos a humanos.
              </p>
              <span className="font-semibold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Registrarse <HiOutlineArrowRight />
              </span>
            </div>
          </Link>
        </div>

        {/* Contacto */}
        <div className="mt-16 pt-8 border-t border-base-200">
          <p className="text-base-content/60">
            ¿Tienes alguna duda o sugerencia sobre nuestro proyecto? <br />
            Escríbenos a{" "}
            <a
              href="mailto:stackmind.app@gmail.com?subject=Hola%20equipo%20de%20StackMind"
              className="font-bold text-primary hover:underline transition-all"
            >
              stackmind.app@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default History;
