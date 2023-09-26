import "./Main.css"
import {Header} from "../Header/Header";
import {Promo} from "./Promo/Promo";
import {Footer} from "../Footer/Footer";
import {NavTab} from "./NavTab/NavTab";
import {AboutProject} from "./AboutProject/AboutProject";
import {Techs} from "./Techs/Techs";
import {AboutMe} from "./AboutMe/AboutMe";
import {Portfolio} from "./Portfolio/Portfolio";

export function Main() {
  return (
    <>
      <Header/>
      <main className="main">
        <Promo/>
        <NavTab/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Portfolio/>
      </main>
      <Footer/>
    </>
  )
}