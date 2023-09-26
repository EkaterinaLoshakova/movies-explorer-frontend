import "./NavTab.css"

export function NavTab() {
  return (
    <section className="nav-tab">
      <nav>
        <ul className="nav-tab__links">
          <li><a href="/#about-project" className="nav-tab__link link-hover">О проекте</a></li>
          <li><a href="/#techs" className="nav-tab__link link-hover">Технологии</a></li>
          <li><a href="/#about-me" className="nav-tab__link link-hover">Студент</a></li>
        </ul>
      </nav>
    </section>
  )
}