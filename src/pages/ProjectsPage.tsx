import FullPageCanvas from "../components/FullPage3DCanvas";
import Hero from "../components/Hero";
import { RotatingObject } from "../components/Object3D";
// import { Pin } from "../components/Pin3DObject";
import { Vector3 } from "three";

import { TxtLoc } from "../components/LanguageContext";
import Tablette from "../components/Tablette3D";
import Section from "../components/Section";
import Manifesto from "../components/Manifesto";
import { SafeFullPageScene } from "../components/FullPage3dScene";
import { Motto } from "../components/Motto";
import { useContext, useEffect, useState } from "react";
import { PinContainer, Pin, LerpDisplay } from "../components/ScrollPin";
import { SpaceTaker } from "../components/SpaceTaker";
import { DAContext } from "../components/DAContext";
import "./ProjectPage.css";

// TODO clean section ordering here
const ProjectsPage = () => {
  return (
    <div className="page">
      <SpaceTaker height={"10rem"} />
      <div className="actualContent">
        <div className="project-grid">
          <div className="project-grid-child project-title ">
            Ain't No Rest For The Wicked
          </div>
          <div className="project-grid-child project-description">
            <Pin id={0}></Pin>
            <div>[Verse 1]</div>
            <div>
              I was walking down the street when out the corner of my eye I saw
              a pretty little thing approaching me
            </div>
            <div>
              She said, "I never seen a man, who looks so all alone Oh, could
              you use a little company?
            </div>
            <div>
              If you pay the right price, your evening will be nice And you can
              go and send me on my way."
            </div>
            <div>
              I said, "You're such a sweet young thing, why you do this to
              yourself?" She looked at me and this is what she said:
            </div>
            <div>[Chorus]</div>
            <div>
              "Oh there ain't no rest for the wicked Money don't grow on trees
            </div>
            <div>
              I got bills to pay, I got mouths to feed There ain't nothing in
              this world for free
            </div>
            <div>
              Oh no, I can't slow down, I can't hold back Though you know, I
              wish I could
            </div>
            <div>
              Oh no there ain't no rest for the wicked Until we close our eyes
              for good"
            </div>
          </div>
          <div className="project-grid-child project-image"></div>
          {[...Array(24)].map(() => (
            <div className="project-grid-child project-placeholder"></div>
          ))}
        </div>
        <Pin id={1}></Pin>
        <SpaceTaker height={"10rem"} />

        <div className="project-grid">
          <div className="project-grid-child project-title ">
            Enfant de la ville
          </div>
          <div className="project-grid-child project-description">
            <Pin id={2}></Pin>
            <div>[Chorus]</div>
            <div>J'suis un enfant de la ville, j'suis un enfant du bruit</div>
            <div>
              J'aime la foule quand ça grouille, j'aime les rires et les cris
            </div>
            <div>J'écris mon envie d'croiser du mouvement et des visages</div>
            <div>
              J'veux que ça claque et que ça sonne, je ne veux pas que des vies
              sages.
            </div>
            <div>[...]</div>
            <div>
              J'dit pas que le béton c'est beau, j'dis que le béton c'est brut.
            </div>
            <div>
              Ca sent le vrai l'authntique, peut-être que c'est ça le truc
            </div>
            <div>
              Quant on le regarde dans es yeux, on voit bien que s'y reflètent
              nos vies
            </div>
            <div>
              Et on comprend que slam et hip-hop ne pouvaient naître qu'ici
            </div>
          </div>
          <div className="project-grid-child project-image"></div>
          {[...Array(24)].map(() => (
            <div className="project-grid-child project-placeholder"></div>
          ))}
        </div>
        <Pin id={3}></Pin>
      </div>
    </div>
  );
};

export default ProjectsPage;
