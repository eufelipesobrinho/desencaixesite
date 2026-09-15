import { Logo } from "@/components/Picture";

export function BrandStory() {
  return (
    <section className="section brand-story" aria-labelledby="brand-title">
      <div className="container brand-story-inner reveal">
        <Logo className="brand-story-logo" variant="light" />
        <p className="eyebrow light">Por que Desencaixe?</p>
        <h2 id="brand-title">
          Desencaixe também é sobre encontrar novas possibilidades.
        </h2>
        <p>
          Nem sempre precisamos nos encaixar em padrões, situações ou formas de
          agir que não funcionam para nós.
        </p>
        <p>
          Não se trata de simplesmente abandonar quem você é. Trata-se de
          compreender seus comportamentos, seus contextos e seus padrões —
          identificando possibilidades de desenvolver novos repertórios.
        </p>
        <p>
          A psicoterapia pode ser esse espaço: para observar, compreender e
          construir maneiras mais funcionais de lidar com as situações da vida.
        </p>
      </div>
    </section>
  );
}
