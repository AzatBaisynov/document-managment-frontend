import { Employee } from "./Employee"
import { Menu } from "./Menu"
import { Related } from "./Related"


const todos = [
    {
        action_link: "/",
        action_text: "Related",
        action: Related
    }
]

export const RelatedProcesses = () => {
    return (
        <main className="main">
            <div className="container main_container" style={{gridTemplateColumns : "1.5fr 8fr"}}>
                <Employee/>
                <section className="middle">
                    <Menu actions={todos} minh={"400px"} scroll={true}/>
                </section>
            </div>
        </main>
    )
}