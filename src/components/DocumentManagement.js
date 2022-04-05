import { DocumentManagementMenu } from "./DocumentManagementMenu"
import { Menu } from "./Menu"
import { DocumentManager } from "./DocumentManager"


const todos = [
    {
        action_link: "/",
        action_text: "Управление документами",
        action: DocumentManager
    }
]

export const DocumentManagement = () => {
    return (
        <main className="main">
            <div className="container main_container" style={{gridTemplateColumns : "1.5fr 8fr"}}>
                <DocumentManagementMenu/>
                <section className="middle">
                    <Menu actions={todos} minh={"400px"} scroll={true}/>
                </section>
            </div>
        </main>
    )
}