import { NewsManagementMenu } from "./NewsManagementMenu"
import { Menu } from "./Menu"
import { NewsManager } from "./NewsManager"


const todos = [
    {
        action_link: "/",
        action_text: "NewsManager",
        action: NewsManager
    }
]

export const NewsManagement = () => {
    return (
        <main className="main">
            <div className="container main_container" style={{gridTemplateColumns : "1.5fr 8fr"}}>
                <NewsManagementMenu/>
                <section className="middle">
                    <Menu actions={todos} minh={"400px"} scroll={true}/>
                </section>
            </div>
        </main>
    )
}